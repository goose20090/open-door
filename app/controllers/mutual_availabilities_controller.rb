class MutualAvailabilitiesController < ApplicationController
  def show
    client = User.find_by(userable_type: "Client", userable_id: params[:client_id]).userable
    therapist = User.find_by(userable_type: "Therapist", userable_id: params[:therapist_id]).userable
    date = Date.parse(params[:date])
    recurring = ActiveRecord::Type::Boolean.new.cast(params[:recurring])

    mutual_availability = MutualAvailability.new(client: client, therapist: therapist, date: date, recurring: recurring)
   

    render json: mutual_availability.calculate
  end
end