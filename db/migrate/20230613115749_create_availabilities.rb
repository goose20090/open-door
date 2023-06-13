class CreateAvailabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :availabilities do |t|
      t.integer :therapist_id
      t.jsonb :schedule, default: {}
      t.timestamps
    end
  end
end
