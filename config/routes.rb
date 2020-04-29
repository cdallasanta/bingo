Rails.application.routes.draw do
  namespace :api do
    resources :games
    resources :cards
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # mount ActionCable.server => '/cable'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
