class Therapist < ApplicationRecord
    has_secure_password

    has_one :availability
    has_many :appointments
    has_many :clients, through: :appointments
    has_many :feedbacks, through: :appointments

    after_create :create_default_availability

    private
  
    def create_default_availability
      availability = self.build_availability
      availability.schedule = default_availability_schedule
      availability.save!
    end
  
    def default_availability_schedule
        days = %w[monday tuesday wednesday thursday friday]
        slots = (9..16).map { |hour| { "#{hour}" => true } }
        schedule = {}
      
        days.each do |day|
          schedule[day] = slots
        end
      
        return schedule
     end
end

