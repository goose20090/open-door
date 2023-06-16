class AddDateColumnToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :date, :datetime
  end
end
