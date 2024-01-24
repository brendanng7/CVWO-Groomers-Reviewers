class AddAnimalTypeArray < ActiveRecord::Migration[7.1]
  def change
    add_column :reviews, :animal_type, :string
  end
end
