class NotificationsController < ApplicationController

    def mark_as_read
        notifications = Notification.all.where(user_id: current_user.id).update_all(read: true)
    end
end
