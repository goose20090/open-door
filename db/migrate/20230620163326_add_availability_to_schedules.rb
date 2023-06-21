class AddAvailabilityToSchedules < ActiveRecord::Migration[7.0]
  def change
    add_column :schedules, :availability, :jsonb, default: {}
  end
end
