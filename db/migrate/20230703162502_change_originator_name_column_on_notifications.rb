class ChangeOriginatorNameColumnOnNotifications < ActiveRecord::Migration[7.0]
  def change
    rename_column :notifications, :originator_name, :originator_id
    change_column :notifications, :originator_id, :integer, using: 'originator_id::integer'
  end
end
