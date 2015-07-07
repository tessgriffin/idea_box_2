class IdeasController < ApplicationController
  respond_to :json
  def index
  end

  def create
    #respond_with @idea, status: 201, location: ideas_path
    @idea = Idea.new(idea_params)
    @idea.save!
    respond_with @idea, location: ""
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end