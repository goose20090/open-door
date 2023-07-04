class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.string :originator_name
      t.string :notification_type
      t.boolean :read
      t.timestamps
    end
  end
end
