class ClientsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def show
        client = Client.find_by(id: session[:client_id])
        if client
            render json: client, include: ['appointments', 'appointments.therapist']
        else
            render json: {error: "Not authorised"}, status: :unauthorized
        end
    end

    def create
      debugger
      client = Client.new(client_params)
      user = User.new(user_params)
  
      ActiveRecord::Base.transaction do
        client.save!
        user.userable = client
        user.save!
      end
  
      session[:user_id] = user.id
      render json: client, status: :created
  
    end
      private
    
      def client_params
        params.require(:client).permit(:name, :email, :password)
      end
    
end

private 

def client_params
    params.permit(:name)
end

def user_params
  params.permit(:email, :password, :password_confirmation)
end

def render_unprocessable_entity invalid
  render json: {errors: invalid.record.errors.full_messages}, status: :not_found
end

