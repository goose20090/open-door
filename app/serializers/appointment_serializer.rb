class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :start_time, :date, :recurring, :week_day, :rejected_by, :rescheduled_by, :created_by

  belongs_to :therapist
  belongs_to :client
end
