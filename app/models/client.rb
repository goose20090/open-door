class Client < ApplicationRecord

    has_one :user, as: :userable
    delegate :notifications, to: :user

    has_many :appointments
    has_many :therapists, through: :appointments
    has_many :notifications, through: :appointments
end
