Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/member-data', to: 'members#show'

  namespace :api do
    namespace :v1 do
      get 'comments/index'
      get 'comments/create'
      get 'comments/show'
      get 'comments/destroy'

      get 'reviews/index'
      post 'reviews/create'
      get '/show/:id', to: 'reviews#show'
      delete '/destroy/:id', to: 'users#destroy'
    end
  end

  root 'home#index'
  get '/*path' => 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
