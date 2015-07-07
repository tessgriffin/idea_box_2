$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'v1/ideas',
    success: function(ideas) {
      $.each(ideas, function(index, idea){
        $("#ideas-div").append("<h4>" + idea.title + "</h4> <p>" + idea.body + "</p>")
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
          $("#ideas-div").before("<h4>" + newIdea.title + "</h4> <p>" + newIdea.body + "</p>")
          $(".idea-title").val("")
          $(".idea-body").val("")
      }
    })
  })
})
