class Notification < ApplicationRecord
    belongs_to :user

    def self.create_notification(appointment, user_id, params)
        # Don't make a notification if the appointment hasn't been confirmed yet or if it's a cancellation of a reschedule request
        if appointment[:status] === 'pending' && params[:status] === 'pending' && !appointment.rescheduled_by || params[:rollback]
            return
        end

        # Find the user who's mutated the appointment
        originator = User.includes(:userable).find_by(id: user_id)

        # Find the user affected by the change
        recipient = if originator.userable_type == 'Client'
            User.find_by(userable_type: 'Therapist', userable_id: appointment.therapist_id)
        else
            User.find_by(userable_type: 'Client', userable_id: appointment.client_id)
        end


        # Find out what kind of notification this is
        type = self.figure_out_notification_type(appointment, params)

        # Create the notification
            notification = self.create!(
            user_id: recipient.id,
            originator_name: originator.userable.name,
            notification_type: type,
            read: false
            )
    end

    def self.figure_out_notification_type appointment, params

        if params[:action] === 'destroy' && !!appointment
            return 'delete'
        end

        if appointment.status === 'confirmed' && !!params[:rescheduled_by]
            return 'reschedule_confirm'
        end
        if appointment.status === 'confirmed' && params[:status] === 'confirmed'
            return 'confirm'
        end

        if appointment.status === 'rejected' && params[:status] === 'rejected'
            return 'reject'
        end

        if appointment.status === 'pending' && !!params[:rescheduled_by]
            return 'reschedule_request'
        end

        if appointment.status === 'confirmed' && params[:status] === 'rejected'
            return 'reschedule_reject'
        end
    end
end
