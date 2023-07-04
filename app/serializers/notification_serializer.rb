class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :notification_type, :originator_name, :read
end