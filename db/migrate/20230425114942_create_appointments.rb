class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.integer :client_id
      t.integer :therapist_id
      t.datetime :start_time
      t.string :status

      t.timestamps
    end
  end
end
