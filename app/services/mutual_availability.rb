class MutualAvailability
  DAYS_OF_WEEK = %w[sunday monday tuesday wednesday thursday friday saturday]

  attr_reader :client, :therapist, :date, :weekday, :recurring, :reschedule

  def initialize(client:, therapist:, date:, weekday:, recurring:, reschedule:)
    @client = client
    @therapist = therapist
    @date = date
    @weekday = weekday
    @recurring = recurring
    @reschedule = reschedule
  end

  def calculate
    target_day = recurring ? weekday : date.wday
    schedule = therapist.schedule.availability.presence || therapist.schedule.default
    booked_slots = merge_booked_slots(get_booked_slots(therapist), get_booked_slots(client))

    if needs_filtering?
      booked_slots = filter_reschedule_time(booked_slots)
    end

    available_hours = filter_by_availability(schedule, booked_slots, target_day)
  end

  private

  def needs_filtering?
    return false unless reschedule
    appointment = Appointment.find(reschedule)
    if recurring
      appointment.week_day === weekday
    else
      appointment.date === date
    end
  end

  def filter_reschedule_time(booked_slots)
    reschedule_time = Appointment.find(reschedule).start_time
    booked_slots.each do |type, slots|
      booked_slots[type] = slots.reject { |hour| hour == reschedule_time }
    end
  end

  def get_booked_slots(user)
    {
      recurring: get_recurring_appointments_for_user(user),
      single: get_single_appointments_for_user(user)
    }
  end

  def merge_booked_slots(therapist_booked_slots, client_booked_slots)
    {
      recurring: therapist_booked_slots[:recurring] | client_booked_slots[:recurring],
      single: therapist_booked_slots[:single] | client_booked_slots[:single]
    }
  end

  def filter_by_availability(schedule, merged_booked_slots, target_day)
    hours = schedule[DAYS_OF_WEEK[target_day]]
    filtered_hours = hours.select do |hour|
      hour.values.first == true && !merged_booked_slots[:single].include?(hour.keys.first.to_i) && !merged_booked_slots[:recurring].include?(hour.keys.first.to_i)
    end
    filtered_hours.map { |hash| hash.keys.first }
  end

  def get_recurring_appointments_for_user(user)
    user.appointments.where(recurring: true, week_day: weekday, status: ['confirmed', 'pending']).pluck(:start_time)
  end

  def get_single_appointments_for_user(user)
    if recurring
      user.appointments.where("recurring = ? AND week_day = ? AND date >= ? AND status IN (?)", false, weekday, Date.today, ['confirmed', 'pending']).pluck(:start_time)
    else
      user.appointments.where(recurring: false, date: date, status: ['confirmed', 'pending']).pluck(:start_time)
    end
  end
end