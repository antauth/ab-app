Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "voters#cast"

  # Voting app routes
  post "/login", to: "sessions#create"
  get "/login", to: "voters#index"
  get "/me", to: "voters#show"
  get "/vote", to: "voters#cast"
  get "/candidates", to: "candidates#index"
  post "/candidates", to: "candidates#create"
  post "/votes", to: "votes#create"
  get "/results", to: "votes#index"
  get "/summary", to: "votes#summary"
end
