class IdeasController < ApplicationController
  respond_to :json
  def index
    @ideas = Idea.all
  end

  def create
    #respond_with @idea, status: 201, location: ideas_path
    @idea = Idea.new(idea_params)
    @idea.save!
    respond_with @idea, location: ""
  end

  def edit
    @idea = Idea.find(params[:id])
  end

  def update
    @idea = Idea.find(params[:id])
    if @idea.update(idea_params)
      flash[:success] = "Idea updated"
      redirect_to ideas_path
    else
      flash[:errors] = @idea.errors.full_messages.join(", ")
      render edit
    end
  end

  def destroy
    @idea = Idea.find(params["id"])
    @idea.destroy!
    respond_with @idea, location: ""
  end

  def upvote
    @idea = Idea.find(params["id"])
    @idea.update(quality: @idea[:quality] + 1)
    respond_with @idea, location: ""
  end

  def downvote
    @idea = Idea.find(params["id"])
    @idea.update(quality: @idea[:quality] - 1)
    respond_with @idea, location: ""
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end