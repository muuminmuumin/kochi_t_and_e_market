Rails.application.routes.draw do

  devise_for :users
  root 'items#index'
  
  resources :users, only: [:show] do
    collection do
      get 'logout'
      get 'card'
    end
  end

  resources :credit_cards, only: [:new, :create], as: :cards
end
