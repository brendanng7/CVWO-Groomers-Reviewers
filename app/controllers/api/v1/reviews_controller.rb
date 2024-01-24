class Api::V1::ReviewsController < ApplicationController
  before_action :set_review, only: %i[show destroy]
  before_action :set_user, only: %i[create]

  def index
    review = Review.all.order(created_at: :desc)
    render json: review
  end

  def create
    review = @user.reviews.create!(review_params)
    if review
      render json: {
        message: "Review created.",
        review: review
      }
    else
      render json: {
        message: "failed to create review."
      }
    end
  end

  def show
    render json: @review
  end

  def destroy
    @review&.destroy
    render json: { message: "Review deleted!"}
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end

  def set_user
    @user = User.find_by!(email: params[:email])
  end

  def review_params
    params.require(:review).permit(:email, :title, :description, :rating, :price, :address, :nearest_mrt, animal_type: [])
  end
end
