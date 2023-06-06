class Feedback < ApplicationRecord
    belongs_to :client
    belongs_to :appointment 
end
