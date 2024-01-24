Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/member-data', to: 'members#show'

  namespace :api do
    namespace :v1 do
      resources :reviews, only: [:index, :create, :show, :destroy] do
        resources :comments, only: [:index, :create]
      end
      resources :comments, only: [:update, :destroy]
      # resources :comments, only: [:index, :create, :update, :destroy]
      # resources :reviews, only: [:index, :create, :show, :destroy]

      # get 'comments/index'
      # post 'comments/create'
      # put 'comments/update/:id', to: 'comments#update'
      # # delete 'comments/destroy/:id'

      # get 'reviews/index'
      # post 'reviews/create'
      # get 'reviews/show/:id', to: 'reviews#show'
      # delete 'reviews/destroy/:id', to: 'reviews#destroy'
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
