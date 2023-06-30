class AddCreatedByColumnToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :created_by, :string
  end
end
