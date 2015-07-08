require 'rails_helper'

feature 'edit idea' do
  let(:idea) { Idea.create!(title: "title1",
                            body: "body1")
                            }

  it "lets user edit their idea with valid parameters" do
    visit edit_idea_path(idea.id)

    expect(page).to have_content("Edit Idea")

    fill_in "Title", with: "I'm a new title!"
    fill_in "Body", with: "I'm a new body!"

    click_on "Update Idea"

    expect(current_path).to eq(ideas_path)

    updated_idea = Idea.first
    expect(updated_idea.title).to eq("I'm a new title!")
    expect(updated_idea.body).to eq("I'm a new body!")
  end
end