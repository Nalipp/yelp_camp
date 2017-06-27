
$(document).ready(() => {

  $("#clickButton").click(function() {
    var comment = $('#commentInput').val();
    console.log(comment); 

    var url = window.location.href.split('/')
    var campgroundId = url[url.length - 1];

    $.post('/campgrounds/' + campgroundId + '/comments', 
      {
        text: comment,
        author: 'Nate'
      }, 
      function(result) {
      $('#all-comments').prepend(
        '<p class="comments">'
        + result[result.length - 1].author + ' : ' 
        + result[result.length - 1].text + 
        '</p>');
        console.log(result); 
    });
  });
});
