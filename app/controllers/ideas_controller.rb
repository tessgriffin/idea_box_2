class IdeasController < ApplicationController
  def index
    @ideas = Idea.all
    @idea = Idea.new
  end

  def create
    @idea = Idea.new idea_params
    if @idea.save
      flash[:success] = "Idea created"
      redirect_to ideas_path
    else
      flash.now[:error] = @idea.errors.full_messages.join(", ")
      render :index
    end
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end