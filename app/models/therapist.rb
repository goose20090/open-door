class Therapist < ApplicationRecord
  has_one :user, as: :userable
  delegate :schedule, to: :user
  delegate :notifications, to: :user

  validates :email, uniqueness: true

  has_many :appointments
  has_many :clients, through: :appointments

end