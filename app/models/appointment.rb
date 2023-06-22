class Appointment < ApplicationRecord

    belongs_to :client
    belongs_to :therapist
    has_many :feedbacks

    validates :status, presence: true
    validate :no_overlap

  private

  def no_overlap
    if self.class.where(
      "therapist_id = ? AND ((date = ? AND start_time = ?) OR (recurring = ? AND week_day = ? AND start_time = ?))", 
      therapist_id, 
      date, 
      start_time, 
      true, 
      week_day, 
      start_time
    ).exists?
      errors.add(:base, 'There is overlapping with another appointment')
    end
  end
end
