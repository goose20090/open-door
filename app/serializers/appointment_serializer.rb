class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :start_time, :date, :recurring

  belongs_to :therapist
  belongs_to :client
end
