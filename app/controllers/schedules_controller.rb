class SchedulesController < ApplicationController
  def show
    # debugger
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])
    if schedule
      recurring_appointments = Appointment.where(therapist_id: params[:therapist_id], recurring: true)
      single_appointments = Appointment.where(therapist_id: params[:therapist_id], recurring: false, date: Date.parse(params[:date]))

      # transform appointments into an array of booked slots
      booked_slots = recurring_appointments.map(&:start_time)

      # add single appointments to the booked slots
      booked_slots += single_appointments.map(&:start_time)

      filtered_schedule = filter_by_availability(schedule.default, booked_slots)
      render json: filtered_schedule
    else
      render json: { error: "Schedule not found" }, status: :not_found
    end
  end

  private

  def filter_by_availability(schedule, booked_slots)
    filtered = {}
    schedule.each do |day, hours|
      filtered[day] = hours.select do |hour|
        # only keep the hour if it's available and not booked
        hour.values.first == true && !booked_slots.include?(hour.keys.first.to_i)
      end
    end
    filtered
  end
end