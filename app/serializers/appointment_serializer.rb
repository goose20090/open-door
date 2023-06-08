class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :start_time

  belongs_to :therapist
  belongs_to :client
end
