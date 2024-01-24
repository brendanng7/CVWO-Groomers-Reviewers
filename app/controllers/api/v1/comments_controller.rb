class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:update]
  before_action :set_user, only: [:create]

  def index
    comments = Review.find(params[:review_id]).comments.all.order(created_at: :desc)
    render json: comments
  end

  def create
    comment = Comment.new(comment_params)
    comment.review = Review.find(params[:review_id])
    comment.user = @user
    # comment = @user.reviews.find(params[:review_id]).comments.create!(comment_params)
    # comment = Review.find(params[:review_id]).comments.create!(comment_params)
    if comment.save
      render json: {
        message: "Comment created",
        comment: comment
      }
    else
      render json: {
        message: "Failed to create comment.",
        errors: comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: {
        message: "Comment updated",
        comment: @comment
      }
    else
      render json: {
        message: "Failed to update comment.",
        errors: @comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def set_review
    @review = Review.find(params[:review_id])
  end

  def comment_params
    params.require(:comment).permit(:content, :email)
  end
end
