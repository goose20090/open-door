class Appointment < ApplicationRecord

    belongs_to :client
    belongs_to :therapist
  
    validates :week_day, presence: true, if: :recurring
    validates :date, presence: true, unless: :recurring
    validates :status, inclusion: ['confirmed', 'pending', 'rejected']
    validate :not_past_date_validation, unless: :recurring
    validate :not_today_validation, unless: :recurring
    validate :working_day_validation, unless: :recurring
    validate :recurring_slot_uniqueness, if: :recurring
    validate :single_slot_uniqueness, unless: :recurring
    # validate :always_fail


    def always_fail
        errors.add(:base, "This is a custom error for testing purposes.")
    end


    def recurring_slot_uniqueness
      # Find if there is any other recurring appointment with the same week_day and start_time
      test_query = Appointment.where(recurring: true, week_day: week_day, start_time: start_time, therapist_id: therapist_id, status: ['pending', 'confirmed']).where.not(id: id).exists?
  
      if test_query
        errors.add(:base, 'This therapist has a reccuring slot already booked at this time')
      end
    end
     
    def single_slot_uniqueness
      # Find if there is any other non-recurring appointment with the same date and start_time
      test_query = Appointment.where("date::date = ? AND start_time = ? AND recurring = ? AND therapist_id = ? AND status IN (?)", date.to_date, start_time, false, therapist_id, ['pending', 'confirmed']).where.not(id: id).exists?
  
      if test_query
        errors.add(:base, 'This therapist has an appointment already booked for this time')
      end
    end
    
    def not_past_date_validation
      errors.add(:date, "must be in the future") if date.present? && date < Date.current
    end
  
    def not_today_validation
      errors.add(:date, "cannot be today") if date.present? && date.to_date == Date.current
    end
  
    def working_day_validation
      if date.present? && ![1, 2, 3, 4, 5].include?(date.wday)
        errors.add(:date, "must be on a working day (Monday - Friday)") 
      end
    end


  end