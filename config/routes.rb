Rails.application.routes.draw do
  namespace :v1 do
    resources :ideas, defaults: { format: 'json' }
  end
  root to: "ideas#index"
  resources :ideas
  post "/ideas/:id/upvote",   to: "ideas#upvote"
  post "/ideas/:id/downvote", to: "ideas#downvote"
end
