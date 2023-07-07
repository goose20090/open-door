Rails.application.routes.draw do

  namespace :api do
    resources :appointments
    resources :therapists, only: [:index]
    resources :clients, only: [:create]


    post 'login', to: "sessions#create"
    post 'signup', to: "clients#create"

    get 'me', to: "users#show"
    delete 'logout', to: "sessions#destroy"

    patch '/notifications', to: 'notifications#mark_as_read'

    get '/mutual_availabilities/:client_id/:therapist_id/:recurring', to: 'mutual_availabilities#show'


    patch '/therapists/:therapist_id/schedule', to: 'schedules#update'
    get '/therapists/:therapist_id/schedule/', to: 'schedules#show'
  end


  get '*path', to: 'fallback#index', constraints: -> (req) {!req.xhr? && req.format.html?}

end
