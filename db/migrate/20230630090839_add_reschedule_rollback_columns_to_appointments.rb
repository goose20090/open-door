class AddRescheduleRollbackColumnsToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :rollback_start_time, :integer
    add_column :appointments, :rollback_date, :datetime
    add_column :appointments, :rollback_week_day, :integer
  end
end
