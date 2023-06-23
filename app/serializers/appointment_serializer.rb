class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :start_time, :date, :recurring, :week_day

  belongs_to :therapist
  belongs_to :client
end
