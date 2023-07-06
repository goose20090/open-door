class Api::SchedulesController < ApplicationController
  before_action :authorize
  def show
    schedule = current_user.schedule

    availability = if schedule.availability?
                     schedule.availability
                   else
                     schedule.default
                   end
    render json: availability
  end

  def update
    schedule = current_user.schedule
    if schedule.update(availability: params[:new_schedule])
      render json: { success: "Availability updated successfully." }
    else
      render json: { error: "Failed to update availability." }, status: :unprocessable_entity
    end
  end

  private

  def find_user
    User.includes(:schedule).find_by(userable_type: 'Therapist', userable_id: params[:therapist_id])
  end

  def authorize
    return render json: {error: "Not authorised"}, status: :unauthorized unless session.include? :user_id
  end 
  
end
