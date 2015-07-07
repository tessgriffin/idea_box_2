Rails.application.routes.draw do
  namespace :v1 do
    resources :ideas, defaults: { format: 'json' }
  end
  root to: "ideas#index"
  resources :ideas
end
