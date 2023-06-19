class RemoveFieldsFromTherapistsAndClients < ActiveRecord::Migration[7.0]
  def change
    remove_column :therapists, :email
    remove_column :therapists, :password_digest
    remove_column :clients, :email
    remove_column :clients, :password_digest
  end
end
