class ClientsController < ApplicationController

    def show
        client = Client.find_by(id: session[:client_id])
        if client
            render json: client, include: ['appointments', 'appointments.therapist']
        else
            render json: {error: "Not authorised"}, status: :unauthorized
        end
    end

    def create
        client = Client.new(name: params[:name])
    
        if client.save
          user = User.create!(userable: client, email: params[:email], password: params[:password])
          session[:user_id] = user.id
          render json: client, status: :created
        else
          render json: client.errors, status: :unprocessable_entity
        end
      end
    
      private
    
      def client_params
        params.require(:client).permit(:name, :email, :password)
      end
    
end

private 

def client_params
    params.permit(:email, :name, :password, :password_confirmation)
end
