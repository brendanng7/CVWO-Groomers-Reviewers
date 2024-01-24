class Review < ApplicationRecord
  belongs_to :user
  has_many :comments
  validates :animal_type, inclusion: {in: %w(Dog Cat Bird Rabbit Horse Others)}
  validates :user, :title, :animal_type, presence: true
  validates :rating, numericality: {only_integer: true}, inclusion: {in: 1..5}
  validates :price, numericality: {greater_than_or_equal_to: 0}
  serialize :animal_type, Array, coder: JSON
end
