class Appointment < ApplicationRecord

    belongs_to :client
    belongs_to :therapist
  
    validates :week_day, presence: true, if: :recurring
    validates :date, presence: true, unless: :recurring
    validates :status, inclusion: ['confirmed', 'pending', 'rejected']
    validate :not_past_date_validation, unless: :recurring
    validate :not_today_validation, unless: :recurring
    validate :working_day_validation, unless: :recurring
  
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