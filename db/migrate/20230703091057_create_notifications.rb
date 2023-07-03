class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.string :originator_name
      t.string :notification_type
      t.string :status
      t.string :recurring
      t.datetime :date
      t.integer :week_day
      t.string :rejected_by
      t.string :rescheduled_by
      t.integer :rollback_start_time
      t.datetime :rollback_date
      t.integer :rollback_week_day
      t.timestamps
    end
  end
end
