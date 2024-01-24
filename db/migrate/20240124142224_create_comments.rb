class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :review, null: false, foreign_key: true
      t.text :content, null: false
      t.integer :vote, default: 0
      t.string :email

      t.timestamps
    end
  end
end
