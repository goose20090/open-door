class RenameTherapistIdToUserIdInSchedules < ActiveRecord::Migration[7.0]
  def change
    rename_column :schedules, :therapist_id, :user_id
  end
end
