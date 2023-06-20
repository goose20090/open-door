class AddWeekDayColumnToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :week_day, :integer
  end
end
