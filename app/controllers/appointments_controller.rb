class AppointmentsController < ApplicationController

    def create
        debugger
        user = User.includes(:userable).find_by(id: session[:user_id])
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
        appointment[:status] = params[:status]
        appointment.save!
        render json: appointment
    end

    private

    def appointment_params
        params.permit(:week_day, :date, :start_time, :appointment_type, :therapist_id)
    end
end
