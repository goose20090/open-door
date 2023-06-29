Rails.application.routes.draw do
  # get '/:user_type_key/:id/schedule', to: 'schedules#show'

  resources :appointments
  resources :therapists
  resources :clients


  post 'login', to: "sessions#create"
  post 'signup', to: "clients#create"

  get 'me', to: "users#show"
  delete 'logout', to: "sessions#destroy"


  get '/mutual_availabilities/:client_id/:therapist_id/:recurring', to: 'mutual_availabilities#show'


  patch '/therapists/:therapist_id/schedule', to: 'schedules#update'
  get '/therapists/:therapist_id/schedule/', to: 'schedules#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
