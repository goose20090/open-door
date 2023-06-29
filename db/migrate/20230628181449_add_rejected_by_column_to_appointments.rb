class AddRejectedByColumnToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :rejected_by, :string
  end
end
