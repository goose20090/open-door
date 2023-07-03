class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :notification_type, :start_time, :date, :recurring, :week_day, :rejected_by, :rescheduled_by

  belongs_to :originator, serializer: UserSerializer
end