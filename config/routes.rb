Rails.application.routes.draw do
  resources :feedbacks
  resources :appointments
  resources :therapists
  resources :clients

  post 'login', to: "sessions#create"
  post 'signup', to: "clients#create"

  get 'me', to: "clients#show"
  delete 'logout', to: "sessions#destroy"
  get '/therapists/:id/schedule', to: 'therapists#schedule'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
