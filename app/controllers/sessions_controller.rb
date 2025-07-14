class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    # check for required params
    session[:user_id] = params[:email]
    
    render :json => '{"voter":"' + session[:user_id] + '"}'
  end

  private

  def voter_params
    params.require(:email, :password, :zipCode)
  end
end
