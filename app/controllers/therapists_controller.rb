class TherapistsController < ApplicationController

    def index
        therapists = Therapist.all
        render json: therapists
    end

    # def schedule
    #     therapist = Therapist.find_by(id: params[:id])
    #     schedule = schedule_filtered_by_availability(therapist.availability.schedule)
    #     render json: schedule
    # end

end
