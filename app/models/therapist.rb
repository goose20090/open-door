class Therapist < ApplicationRecord
  has_one :user, as: :userable
  delegate :schedule, to: :user
  delegate :notifications, to: :user

  has_many :appointments
  has_many :clients, through: :appointments

end