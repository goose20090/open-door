class RemoveStatusAndAddStartTimeToNotifications < ActiveRecord::Migration[7.0]
  def change
    remove_column :notifications, :status, :string
    add_column :notifications, :start_time, :integer
  end
end
