class Api::UsersController < ApplicationController
  before_action :authorize

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
      render json: { errors: ['not found'] }, status: :not_found
    end
  end

  private

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include?(:user_id)
  end
end