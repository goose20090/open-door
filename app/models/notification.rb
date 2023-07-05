class Notification < ApplicationRecord
    belongs_to :user

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
            originator_name: originator.userable.name,
            notification_type: type,
            read: false
            )
    end

    def self.figure_out_notification_type appointment, params
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
