class TherapistsController < ApplicationController

    def index
        therapists = Therapist.all
        render json: therapists
    end

    def schedule
        therapist = Therapist.find_by(id: params[:id])
        schedule = schedule_filtered_by_availability(therapist.availability.schedule)
        render json: schedule
    end

    private

    def schedule_filtered_by_availability schedule
        filtered = {}
        schedule.each do |day, hours|
            filtered[day] = hours.select do |hour|
                hour.values.first==true
            end
        end
        filtered
    end
end
