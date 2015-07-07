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
    + "</p></div>")
  $('<button>Delete</button>')
    .addClass('btn delete-' + idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      deleteIdea(idea)
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
    + "</p></div>")
  $('<button>Delete</button>')
    .addClass('btn delete-' + idea.id)
    .attr('data-id', idea.id)
    .on('click', function(){
      deleteIdea(idea)
    })
    .insertBefore($('#ideas-div'));
}