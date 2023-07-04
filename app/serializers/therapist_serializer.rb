class TherapistSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type, :unread, :notifications
  has_many :appointments

  def user_type
    'Therapist'
  end

  def unread
    object.user.unread_notifications_count
  end
end
