class ClientsController < ApplicationController

    def show
        client = Client.find_by(id: session[:client_id])
        if client
            render json: client
        else
            render json: {error: "Not authorised"}, status: :unauthorized
        end
    end

    def create 
        client = Client.create client_params
        if client.valid?
            session[:client_id] = client.id
            render json: client, status: :created
        else
            render json: {errors: client.errors.full_messages}, status: :unprocessable_entity
        end
    end
end

private 

def client_params
    params.permit(:email, :name, :password, :password_confirmation)
end
