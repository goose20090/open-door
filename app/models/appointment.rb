class Appointment < ApplicationRecord

    belongs_to :client
    belongs_to :therapist
    has_one :feedback
end
