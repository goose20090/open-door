class User < ApplicationRecord
  has_secure_password
  has_one :schedule, dependent: :destroy
  belongs_to :userable, polymorphic: true
  
  after_create :create_default_schedule

  private

  def create_default_schedule
    self.build_schedule.save!
  end
end
