class TherapistSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type, :notifications
  has_many :appointments

  def user_type
    'Therapist'
  end
end
