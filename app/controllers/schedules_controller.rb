class SchedulesController < ApplicationController
  DAYS_OF_WEEK = %w[sunday monday tuesday wednesday thursday friday saturday]

  def availability
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])

    availability = if schedule.availability?
                     schedule.availability
                   else
                     schedule.default
                   end

    render json: availability
  end

  def update_availability
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])

    if schedule.update(availability: params[:availability])
      render json: { success: "Availability updated successfully." }
    else
      render json: { error: "Failed to update availability." }, status: :unprocessable_entity
    end
  end
end