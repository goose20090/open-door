class SchedulesController < ApplicationController
  DAYS_OF_WEEK = %w[sunday monday tuesday wednesday thursday friday saturday]

  def show
    # Get user from user_type and userable_id
    user = User.find_by(userable_type: params[:user_type_key].classify, userable_id: params[:id])

    # Get the date and weekday to check
    date = Date.new(params[:date])
    week_day = date.wday

    # Are we checking AV for a recurring or single appointment?
    recurring = ActiveRecord::Type::Boolean.new.cast(params[:recurring])

    # Are we getting the full week's AV or just the requested date's/week day's?
    full_week = ActiveRecord::Type::Boolean.new.cast(params[:full_week])

    if user&.schedule
      # Get correct starting schedule
      schedule = user.schedule
      schedule_availability = schedule.availability.presence || schedule.default

      # Get pertinent single and recurring appointments
      recurring_appointments = get_recurring_appointments(user, week_day)
      single_appointments = get_single_appointments(user, params[:recurring], date, week_day)

      # Get the starting times of those appointments
      recurring_booked_slots = get_recurring_booked_slots(recurring_appointments)
      single_booked_slots = single_appointments.map(&:start_time)

      # Set relevant starting times of schedule to false
      filtered_schedule = filter_by_availability(schedule_availability, single_booked_slots, recurring_booked_slots)

      if full_week
        render json: filtered_schedule

      else
        render json: filtered_schedule[DAYS_OF_WEEK[week_day].downcase]
      end
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
    schedule = Schedule.find_by(therapist_id: params[:therapist_id])

    if schedule.update(availability: params[:availability])
      render json: { success: "Availability updated successfully." }
    else
      render json: { error: "Failed to update availability." }, status: :unprocessable_entity
    end
  end

  private

  def filter_by_availability(schedule, single_booked_slots, recurring_booked_slots)
    filtered = {}
    schedule.each do |day, hours|
      # Get the recurring appointments for this day
      recurring_booked_slots_for_day = recurring_booked_slots[day] || []

      filtered[day] = hours.select do |hour|
        # Only keep the hour if it's available and not booked
        hour.values.first == true && !single_booked_slots.include?(hour.keys.first.to_i) && !recurring_booked_slots_for_day.include?(hour.keys.first.to_i)
      end
    end
    filtered
  end

  def get_recurring_appointments(user, week_day)
    user.userable.appointments.where(recurring: true, status: ['confirmed', 'pending']).pluck(:week_day, :start_time)
  end

  def get_single_appointments(user, is_recurring, date, week_day)
    if is_recurring
      user.userable.appointments.where(recurring: false, week_day: week_day, date: Date.today..Float::INFINITY, status: ['confirmed', 'pending'])
    else
      user.userable.appointments.where(recurring: false, date: Date.parse(date), status: ['confirmed', 'pending'])
    end
  end

  def get_recurring_booked_slots(recurring_appointments)
    recurring_booked_slots = {}
    recurring_appointments.each do |appointment|
      day_name = DAYS_OF_WEEK[appointment[0]]
      recurring_booked_slots[day_name] ||= []
      recurring_booked_slots[day_name] << appointment[1]
    end
    recurring_booked_slots
  end
end