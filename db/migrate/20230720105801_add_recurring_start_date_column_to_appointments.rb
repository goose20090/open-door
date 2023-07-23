class AddRecurringStartDateColumnToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :recurring_start_date, :datetime
  end
end
