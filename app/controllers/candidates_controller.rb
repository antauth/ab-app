class CandidatesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @candidates = Candidate.all
    render json: @candidates
  end

  def create
    if Candidate.count >= 10 || Vote.where(email: session[:user_id]).count > 0
      render json: {"message": "No more candidates can be added."}, status: :ok
    else
      @candidate = Candidate.new(name: params[:candidate])
      if @candidate.save
        render json: @candidate, status: :created
      else
        render json: @candidate.errors, status: :unprocessable_entity
      end
    end    
  end
end
