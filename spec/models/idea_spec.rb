require 'rails_helper'

RSpec.describe Idea, type: :model do
  let(:idea) { Idea.create!(title: "Sup", body: "Really, sup?")}

  it "is valid" do 
    expect(idea).to be_valid
  end

  it "has a default quality of 0" do 
    expect(idea[:quality]).to eq(0)
  end

  it "has a default quality of swill" do 
    expect(idea.quality).to eq('swill')
  end

  it "has a title of at least 2 characters" do 
    idea.title = "a"

    expect(idea).not_to be_valid
  end

  it "has a title of no more than 50 characters" do 
    idea.title = "a" * 51

    expect(idea).not_to be_valid
  end

  it "must have a body" do 
    idea.body = ""

    expect(idea).not_to be_valid
  end 
end
