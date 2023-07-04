class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type, :unread, :notifications

  has_many :appointments


  def user_type
    'Client'
  end

  def unread
    object.user.unread_notifications_count
  end
end