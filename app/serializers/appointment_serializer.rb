class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :start_time, :date, :recurring, :week_day, :rejected_by, :rescheduled_by, :future_recurring

  belongs_to :therapist
  belongs_to :client

  def future_recurring
    object.date.present? && object.date.future? && object.recurring
  end
end
