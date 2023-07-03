class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type, :notifications

  has_many :appointments

  def user_type
    'Client'
  end

  def notifications
    ActiveModel::SerializableResource.new(object.user.notifications.where.not(originator_id: object.user.id))
  end
end