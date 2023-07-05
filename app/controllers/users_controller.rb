class UsersController < ApplicationController
def show
    user = User.includes(:userable).find_by(id: session[:user_id])
    if user
      if user.userable_type == 'Client'
        client = user.userable
        render json: client, include: ['appointments', 'appointments.therapist'], status: :ok
      else # the userable is a Therapist
        therapist = user.userable
        render json: therapist, include: ['appointments', 'appointments.client'], status: :ok
      end
    else
      render json: {error: "Not authorised"}, status: :unauthorized
    end
  end

end

