class SchedulesController < ApplicationController
  DAYS_OF_WEEK = %w[sunday monday tuesday wednesday thursday friday saturday]

   def show
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])
    if schedule
      # Select the user availability if it exists; otherwise, use the default.
      schedule_availability = schedule.availability.presence || schedule.default
      
      # Include the week day in recurring appointments
      recurring_appointments = Appointment.where(therapist_id: params[:therapist_id], recurring: true).pluck(:week_day, :start_time)
      single_appointments = Appointment.where(therapist_id: params[:therapist_id], recurring: false, date: Date.parse(params[:date]))

      # transform appointments into an array of booked slots
      booked_slots = single_appointments.map(&:start_time)
      
      # Create a hash of booked recurring appointments with week day as the key (converted to a string day name)
      recurring_booked_slots = {}
      recurring_appointments.each do |appointment|
        day_name = DAYS_OF_WEEK[appointment[0]]
        recurring_booked_slots[day_name] ||= []
        recurring_booked_slots[day_name] << appointment[1]
      end

      filtered_schedule = filter_by_availability(schedule_availability, booked_slots, recurring_booked_slots)
      render json: filtered_schedule
    else
      render json: { error: "Schedule not found" }, status: :not_found
    end
  end

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
    debugger
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])
  
    if schedule.update(availability: params[:availability])
      render json: { success: "Availability updated successfully." }
    else
      render json: { error: "Failed to update availability." }, status: :unprocessable_entity
    end
  end
  private

  def filter_by_availability(schedule, booked_slots, recurring_booked_slots)
    filtered = {}
    schedule.each do |day, hours|
      # Get the recurring appointments for this day
      recurring_booked_slots_for_day = recurring_booked_slots[day] || []
      
      filtered[day] = hours.select do |hour|
        # only keep the hour if it's available and not booked
        hour.values.first == true && !booked_slots.include?(hour.keys.first.to_i) && !recurring_booked_slots_for_day.include?(hour.keys.first.to_i)
      end
    end
    filtered
  end
end
