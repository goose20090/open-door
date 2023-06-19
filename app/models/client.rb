class Client < ApplicationRecord

    has_one :user, as: :userable

    has_many :appointments
    has_many :therapists, through: :appointments
    has_many :feedbacks, through: :appointments
end
