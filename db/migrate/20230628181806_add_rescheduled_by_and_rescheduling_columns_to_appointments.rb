class AddRescheduledByAndReschedulingColumnsToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :rescheduled_by, :string
  end
end
