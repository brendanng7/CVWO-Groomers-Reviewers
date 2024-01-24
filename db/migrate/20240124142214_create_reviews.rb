class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.text :title, null: false
      t.text :description
      t.integer :rating
      t.float :price
      t.text :address
      t.string :nearest_mrt
      t.string :email
      # t.string :animal_type, array: true, default: [], null: false

      t.timestamps
    end
  end
end
