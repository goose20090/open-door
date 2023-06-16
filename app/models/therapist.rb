class Therapist < ApplicationRecord
  has_secure_password

  has_one :schedule, dependent: :destroy
  has_many :appointments
  has_many :clients, through: :appointments
  has_many :feedbacks, through: :appointments

  after_create :create_default_schedule

  private

  def create_default_schedule
    self.build_schedule.save!
  end
end