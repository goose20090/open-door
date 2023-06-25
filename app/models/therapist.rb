class Therapist < ApplicationRecord
  has_one :user, as: :userable
  delegate :schedule, to: :user

  has_many :appointments
  has_many :clients, through: :appointments
  has_many :feedbacks, through: :appointments

end