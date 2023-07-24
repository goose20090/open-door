class Api::AppointmentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    before_action :authorize
    after_action :pass_to_notification_model, only: [:update]
    before_action :pass_to_notification_model, only: [:destroy]

    def create
        user = User.includes(:userable).find(session[:user_id])
        return render_not_found_response unless user&.userable_type == "Client"
    
        appointment = Appointment.create_appointment(appointment_params.merge(client_id: user.userable.id))
        render json: appointment, status: :created
    end
    
    def update
        appointment = find_appointment
        Appointment.update_appointment(appointment, appointment_params)
        render json: appointment
    end

    def destroy
        appointment = find_appointment
        appointment.destroy
        head :no_content
    end

    private

    # auth
    def authorize
        return render json: {errors: ["Not authorised"]}, status: :unauthorized unless session.include? :user_id
    end

    # Appointment methods
    def find_appointment
        Appointment.find(params[:id])
    end
 
    def appointment_params
        params.permit(:start_time, :client_id, :therapist_id, :week_day, :date, :recurring, :status, :rescheduled_by, :rejected_by, :rollback_date, :rollback_start_time, :rollback_week_day, :rollback)
    end

    # Error responses

    def render_not_found_response 
        render json: {errors: ['Not found']}, status: :not_found
    end

    def render_unprocessable_entity invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    # Notification creation

    def pass_to_notification_model
        Notification.create_notification(find_appointment, session[:user_id], params)
    end

end