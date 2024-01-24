class AddArrayToReview < ActiveRecord::Migration[7.1]
  def change
    remove_column :reviews, :animal_type
    add_column :reviews, :animal_type, :text, default: '[]'
  end
end
