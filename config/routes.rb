Rails.application.routes.draw do
  resources :feedbacks
  resources :appointments
  resources :therapists
  resources :clients

  post 'login', to: "sessions#create"
  post 'signup', to: "clients#create"

  get 'me', to: "users#show"
  delete 'logout', to: "sessions#destroy"
  get '/schedules/:therapist_id', to: 'schedules#show'

  
  patch '/:therapist_id/schedule/availability', to: 'schedules#update_availability'
  get '/:therapist_id/schedule/availability', to: 'schedules#availability'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
