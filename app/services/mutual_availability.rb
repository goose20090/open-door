class MutualAvailability
    DAYS_OF_WEEK = %w[sunday monday tuesday wednesday thursday friday saturday]
  
    attr_reader :client, :therapist, :date, :recurring, :week_day
  
    def initialize(client:, therapist:, date:, recurring:)
      @client = client
      @therapist = therapist
      @date = date
      @recurring = recurring
      @week_day = date.wday
    end
  
    def calculate
      schedule = self.therapist.schedule.availability.presence || self.therapist.schedule.default
      therapist_booked_slots = get_booked_slots_for_user(self.therapist)
      client_booked_slots = get_booked_slots_for_user(self.client)
      debugger
      mutual_availability = filter_by_availability(schedule, therapist_booked_slots, client_booked_slots)
      hours = mutual_availability[DAYS_OF_WEEK[self.week_day]].map { |hash| hash.keys.first }
    end
  
    private
  
    def get_booked_slots_for_user(user)
      {
        recurring: get_recurring_appointments_for_user(user),
        single: get_single_appointments_for_user(user)
      }
    end


    def filter_by_availability(schedule, client_booked_slots, therapist_booked_slots)
        filtered = {}
        hours = schedule[DAYS_OF_WEEK[self.week_day]]
        filtered[DAYS_OF_WEEK[self.week_day]] = hours.select do |hour|
          hour.values.first == true && !client_booked_slots[:single].include?(hour.keys.first.to_i) && !therapist_booked_slots[:recurring].include?(hour.keys.first.to_i)
        end
        filtered
      end
    
    def get_recurring_appointments_for_user(user)
      user.appointments.where(recurring: true, week_day: self.week_day, status: ['confirmed', 'pending']).pluck(:start_time)
    end
  
    def get_single_appointments_for_user(user)
      if self.recurring
        user.appointments.where("recurring = ? AND week_day = ? AND date >= ? AND status IN (?)", false, week_day, Date.today, ['confirmed', 'pending']).pluck(:start_time)
      else
        user.appointments.where(recurring: false, date: date, status: ['confirmed', 'pending']).pluck(:start_time)
      end
    end
  end