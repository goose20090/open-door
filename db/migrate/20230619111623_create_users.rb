class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :userable_type
      t.integer :userable_id

      t.timestamps
    end
  end
end
