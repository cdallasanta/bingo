Rails.application.routes.draw do
  namespace :api do
    resources :games
    resources :cards
  end
  
  mount ActionCable.server => '/cable'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
