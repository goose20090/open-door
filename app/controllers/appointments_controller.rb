class AppointmentsController < ApplicationController

    def create
        user = User.includes(:userable).find_by(id: session[:user_id])
        client_id = user.userable.id
        start_date = Date.parse(params[:date])
        
        if params[:appointment_type] == 'recurring'
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
        elsif params[:appointment_type] == 'single'
            appointment = Appointment.create!(
                client_id: client_id,
                therapist_id: params[:therapist_id],
                start_time: params[:start_time].to_i,
                date: Date.parse(params[:date]),
                week_day: nil,
                recurring: false,
                status: 'pending'
            )
            render json: appointment, status: :created
        end
    end

    def update

        statuses = {
            confirm: 'confirmed',
            reject: 'rejected'
        }
        debugger
        appointment = Appointment.find_by(id: params[:id])
        appointment[:status] = statuses[params[:button_action].to_sym]
        appointment.save!
        render json: appointment
    end

    private

    def appointment_params
        params.permit(:week_day, :date, :start_time, :appointment_type, :therapist_id)
    end
end
