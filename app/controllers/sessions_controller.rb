class SessionsController < ApplicationController
  def create
    user = User.includes(:userable, notifications: :originator).find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
  
      if user.userable_type == 'Client'
        client = user.userable
        render json: client, include: ['appointments', 'appointments.therapist', 'user.notifications', 'user.notifications.originator', 'user.notifications.originator.userable'], status: :created
      else 
        therapist = user.userable
        render json: therapist, include: ['appointments', 'appointments.client', 'user.notifications', 'user.notifications.originator', 'user.notifications.originator.userable'], status: :created
      end
    else
      render json: {error: "Invalid username or password"}, status: :unauthorized
    end
  end

    def destroy
        session.delete :user_id 
        head :no_content
    end
end
