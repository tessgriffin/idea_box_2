class Idea < ActiveRecord::Base
  validates :title, length: { minimum: 2, maximum: 50 }
  validates :body, presence: true

  enum quality: [ :swill, :plausible, :genius ]

  default_scope -> { order('created_at DESC') }
end
