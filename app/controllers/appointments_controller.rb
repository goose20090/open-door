class AppointmentsController < ApplicationController

    def create
        debugger
        client_id = session[:client_id]

        start_date = Date.parse(params[:date])
        
        if params[:appointment_type] == 'recurring'
            appointment = Appointment.create!(
                client_id: client_id,
                therapist_id: params[:therapist_id],
                start_time: params[:start_time].to_i,
                date: Date.parse(params[:date]),
                recurring: true,
                status: 'pending'
            )
            render json: appointment, status: :created
        elsif params [:appointment_type] == 'single'
            # book single appointment
        end
    end

    private

    def appointment_params
        params.permit(:week_day, :date, :start_time, :appointment_type, :therapist_id)
    end
end
