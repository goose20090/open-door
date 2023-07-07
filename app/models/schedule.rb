class Schedule < ApplicationRecord
    belongs_to :user

    after_initialize :set_default_schedule, if: :new_record?

    private 

    def set_default_schedule
        days = %w[monday tuesday wednesday thursday friday]
        slots = (9..16).map { |hour| { "#{hour}" => true } }
        schedule = {}
    
        days.each do |day|
          schedule[day] = slots
        end
    
        self.default = schedule
    end
end
