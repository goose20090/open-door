class AddBiographyColumnToTherapists < ActiveRecord::Migration[7.0]
  def change
    add_column :therapists, :biography, :string
  end
end
