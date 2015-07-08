$(document).ready(function() {
  var ideasDiv = $('#ideas-div')
  $.ajax({
    type: 'GET',
    url: 'v1/ideas',
    success: function(ideas) {
      $.each(ideas, function(index, idea){
        addIdeaToPage(idea, ideasDiv);
      })
    }
  })

  // $('.search-box').keyup(function(){
  //   console.log($(this).val())
  //   console.log($('#ideas-div').children().text())
  // });

  $("#create-idea").on("click", function(){
      var ideaParams = { idea: {title: $(".idea-title").val(), body: $(".idea-body").val()} }

      $.ajax({
        type: 'POST',
        url: '/ideas',
        data: ideaParams,
        success: function(newIdea) {
          addIdeaToPage(newIdea, $('#new-idea'))
          $(".idea-title").val("")
          $(".idea-body").val("")
      }
    })
  })
})

function deleteIdea(idea) {
  var idea_id = idea.id
  var ideaParams = { idea: {id: idea_id} }

  $.ajax({
    type: 'delete',
    url: '/ideas/' + idea_id,
    success: function(deletedIdea) {
      $('#idea_' + idea_id).hide()
      $('.vote-' + idea_id).hide()
    }
  })
}

function upvoteIdea(idea){
  $.ajax({
    type: 'post',
    url: '/ideas/'+ idea.id +'/upvote/',
    success: function(upvotedIdea) {
      $('.quality-' + upvotedIdea.id).text(upvotedIdea.quality)
    }
  })
}

function downvoteIdea(idea){
  $.ajax({
    type: 'post',
    url: '/ideas/'+ idea.id +'/downvote/',
    success: function(downvotedIdea) {
      $('.quality-' + downvotedIdea.id).text(downvotedIdea.quality)
    }
  })
}

function addIdeaToPage(idea, target) {
  $(target).append(
    "<div id='idea_"
    + idea.id
    + "'><h4>"
    + idea.title
    + "</h4> <p>"
    + idea.body
    + "</p><p class='quality-"+ idea.id +"'>"
    + idea.quality
    + "</p><a class='btn' href='/ideas/" + idea.id +"/edit'>Edit</a>"
    + "<button class='btn purple lighten-1 delete-" + idea.id + "' data-id='" + idea.id
    +"'>Delete</button><br>"
    +"<button class='btn purple lighten-1 upvote-"+ idea.id +"' data-id='" + idea.id + "'>+</button>"
    +"<button class='btn purple lighten-1 downvote-"+ idea.id +"' data-id='" + idea.id + "'>-</button>"
    +"</div>").find($('.delete-' + idea.id)).on('click', function(){
      deleteIdea(idea)
    })
  $('.upvote-' + idea.id).on('click', function(){
    upvoteIdea(idea)
  })
  $('.downvote-' + idea.id).on('click', function(){
    downvoteIdea(idea)
  })
}