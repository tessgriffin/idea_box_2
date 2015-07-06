class Idea < ActiveRecord::Base
  validates :title, length: { minimum: 2, maximum: 50 }
  validates :body, presence: true
end
