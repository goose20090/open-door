class Api::MutualAvailabilitiesController < ApplicationController
  def show
    client = User.find_by(userable_type: "Client", userable_id: params[:client_id]).userable
    therapist = User.find_by(userable_type: "Therapist", userable_id: params[:therapist_id]).userable
    recurring = ActiveRecord::Type::Boolean.new.cast(params[:recurring])
    date = params[:date] ? Date.parse(params[:date]) : nil
    weekday = params[:weekday] ? params[:weekday].to_i : date.wday

    mutual_availability = MutualAvailability.new(client: client, therapist: therapist, date: date, weekday: weekday, recurring: recurring, reschedule: params[:reschedule])

    render json: mutual_availability.calculate
  end
end
