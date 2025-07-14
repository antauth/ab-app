class VotesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
   
  end
  def summary
     @votes = Vote.joins(:candidate)
     .select(
        "candidates.name",
        "count(candidate_id) total")
      .group("candidates.id")
    render json: @votes
  end

  def create
    @vote = Vote.new(candidate_id: params[:candidateId], email: session[:user_id])
    if @vote.save
      render json: @vote, status: create
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end
end
