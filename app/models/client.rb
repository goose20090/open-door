class Client < ApplicationRecord
    has_secure_password

    has_many :appointments
    has_many :therapists, through: :appointments
    has_many :feedbacks, through: :appointments
end
