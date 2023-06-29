class SchedulesController < ApplicationController
  def show
    schedule =find_user.schedule

    availability = if schedule.availability?
                     schedule.availability
                   else
                     schedule.default
                   end
    render json: availability
  end

  def update
    schedule = find_user.schedule
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
end