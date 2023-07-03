class Notification < ApplicationRecord
    belongs_to :user
    belongs_to :originator, class_name: 'User', foreign_key: 'originator_id'

    def self.create_notification(appointment, user_id, params)
        originator = User.includes(:userable).find_by(id: user_id)
        recipient = if originator.userable_type == 'Client'
            User.find_by(userable_type: 'Therapist', userable_id: appointment.therapist_id)
        else
            User.find_by(userable_type: 'Client', userable_id: appointment.client_id)
        end

        type = self.figure_out_notification_type(appointment, params)

        notification = self.create!(
            user_id: recipient.id,
            originator_id: originator.id,
            notification_type: type,
            recurring: appointment.recurring,
            start_time: appointment.start_time,
            date: appointment.date,
            rescheduled_by: appointment.rescheduled_by,
            rollback_start_time: appointment.rollback_start_time,
            rollback_week_day: appointment.rollback_week_day,
        )
    end

    def self.figure_out_notification_type appointment, params
        if appointment.status === 'pending' && params[:status] === 'confirmed'
            return 'confirm'
        end
    end
    

end
