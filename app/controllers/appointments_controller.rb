class AppointmentsController < ApplicationController

    def create
        # Only clients can create appointments
        user = User.includes(:userable).find_by(id: session[:user_id], userable_type: "Client")
        client_id = user.userable.id
        start_date = Date.parse(params[:date])
        
        if params[:recurring]
            appointment = Appointment.create!(
                client_id: client_id,
                therapist_id: params[:therapist_id],
                start_time: params[:start_time].to_i,
                date: Date.parse(params[:date]),
                week_day: params[:week_day],
                recurring: true,
                status: 'pending'
            )
            render json: appointment, status: :created
        else
            appointment = Appointment.create!(
                client_id: client_id,
                therapist_id: params[:therapist_id],
                start_time: params[:start_time].to_i,
                date: Date.parse(params[:date]),
                week_day: params[:week_day],
                recurring: false,
                status: 'pending'
            )
            render json: appointment, status: :created
        end
    end

    def update
        appointment = Appointment.find_by(id: params[:id])
        if appointment[:status] == 'pending' && params[:status] == 'rejected' && appointment[:rescheduled_by].present?
            appointment.update(
                status: 'confirmed',
                start_time: appointment[:rollback_start_time],
                date: appointment[:rollback_date],
                week_day: appointment[:rollback_week_day],
                rescheduled_by: nil,
                rollback_start_time: nil,
                rollback_date: nil,
                rollback_week_day: nil,
            )
            render json: appointment
        elsif appointment[:status] == 'pending' && params[:status] == 'confirmed' && appointment[:rescheduled_by].present?
            appointment.update(
                status: 'confirmed',
                rescheduled_by: nil,
                rollback_start_time: nil,
                rollback_date: nil,
                rollback_week_day: nil,
            )
            render json: appointment
        elsif appointment.update(appointment_params)
            render json: appointment
        else
            render json: {errors: appointment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        appointment = Appointment.find_by(id: params[:id])
        appointment.destroy
        head :no_content
    end

    private

    def appointment_params
        if params[:recurring]
            params.require(:appointment).permit(:start_time, :week_day, :status, :rescheduled_by, :rejected_by, :rollback_date, :rollback_start_time, :rollback_week_day)
        else
            params.require(:appointment).permit(:start_time, :date, :status, :rescheduled_by, :rejected_by, :rollback_date, :rollback_start_time, :rollback_week_day)
        end
    end
end
