class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.integer :therapist_id
      t.jsonb :default

      t.timestamps
    end
  end
end
