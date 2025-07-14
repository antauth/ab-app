# Primarily handles a voters ability to vote
class VotersController < ApplicationController
  def show
    voter = session[:user_id]
    if voter
      render json: '{"voter":"' + session[:user_id] + '"}'
    else
       render json: { error: "You must login to vote"}, status: :unauthorized
    end
  end
  def cast 
    @voter = session[:user_id]
  end 
end
