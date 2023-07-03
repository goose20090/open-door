class User < ApplicationRecord
  has_secure_password
  has_one :schedule, dependent: :destroy
  has_many :notifications
  belongs_to :userable, polymorphic: true
  
  after_create :create_default_schedule

  private

  def create_default_schedule
    if self.userable_type == 'Therapist'
      self.build_schedule.save!
    end
  end
end