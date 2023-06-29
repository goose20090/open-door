class TherapistsController < ApplicationController

    def index
        therapists = Therapist.all
        render json: therapists
    end

end
