$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'v1/ideas',
    success: function(ideas) {
      $.each(ideas, function(index, idea){
        addIdeaToPage(idea);
      })
    }
  })

  $("#create-idea").on("click", function(){
      var ideaParams = { idea: {title: $(".idea-title").val(), body: $(".idea-body").val()} }

      $.ajax({
        type: 'POST',
        url: '/ideas',
        data: ideaParams,
        success: function(newIdea) {
          addIdeaToTop(newIdea)
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
      $('.delete-' + idea_id).hide()
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

function addIdeaToPage(idea) {
  $("#ideas-div").append(
    "<div id='idea_"
    + idea.id
    + "'><h4>"
    + idea.title
    + "</h4> <p>"
    + idea.body
    + "</p><p class='quality-"+ idea.id +"'>"
    + idea.quality
    + "</p><a class='btn' href='/ideas/" + idea.id +"/edit'>Edit</a>"
    +"</div>")
  $('<button>Delete</button>')
    .addClass('btn purple lighten-1 delete-' + idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      deleteIdea(idea)
    })
    .appendTo($('#ideas-div'));
  $('<button>+</button>')
    .addClass('btn purple lighten-1 vote-'+ idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      upvoteIdea(idea)
    })
    .appendTo($('#ideas-div'));
  $('<button>-</button>')
    .addClass('btn purple lighten-1 vote-'+ idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      downvoteIdea(idea)
    })
    .appendTo($('#ideas-div'));
}

function addIdeaToTop(idea) {
  $("#ideas-div").before(
    "<div id='idea_"
    + idea.id
    + "'><h4>"
    + idea.title
    + "</h4> <p>"
    + idea.body
    + "</p><p class='quality-"+ idea.id +"'>"
    + idea.quality
    + "</p><a class='btn' href='/ideas/" + idea.id +"/edit'>Edit</a>"
    +"</div>")
  $('<button>Delete</button>')
    .addClass('btn purple lighten-1 delete-' + idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      deleteIdea(idea)
    })
    .insertBefore($('#ideas-div'));
    $('<button>+</button>')
    .addClass('btn purple lighten-1 vote-'+ idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      upvoteIdea(idea)
    })
    .insertBefore($('#ideas-div'));
    $('<button>-</button>')
    .addClass('btn purple lighten-1 vote-'+ idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      downvoteIdea(idea)
    })
    .insertBefore($('#ideas-div'));
}