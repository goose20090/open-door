class Therapist < ApplicationRecord
    has_secure_password

    has_many :appointments
    has_many :clients, through: :appointments
    has_many :feedbacks, through: :appointments
end
