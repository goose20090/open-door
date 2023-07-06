class NotificationsController < ApplicationController
    before_action :authorize

    def mark_as_read
        notifications = Notification.all.where(user_id: current_user.id).update_all(read: true)
    end

    private 

    def authorize
        return render json: {error: "Not authorised"}, status: :unauthorized unless session.include? :user_id
    end
end
