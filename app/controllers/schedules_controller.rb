class SchedulesController < ApplicationController

    def show 
        schedule = Schedule.find_by(therapist_id: params[:therapist_id])
        if schedule
            filtered_schedule = filter_by_availability(schedule.default)
            render json: filtered_schedule
          else
            render json: { error: "Schedule not found" }, status: :not_found
        end
        
    end

    private

    def filter_by_availability schedule
        filtered = {}
        schedule.each do |day, hours|
            filtered[day] = hours.select do |hour|
                hour.values.first==true
            end
        end
        filtered
    end
end
