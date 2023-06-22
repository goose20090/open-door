class SessionsController < ApplicationController
    def create
        user = User.includes(:userable).find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id

            if user.userable_type == 'Client'
                client = user.userable
                render json: client, include: ['appointments', 'appointments.therapist'], status: :created
            else # the userable is a Therapist
                debugger
                therapist = user.userable
                render json: therapist, include: ['appointments', 'appointments.client'], status: :created
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
