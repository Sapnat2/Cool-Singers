$(document).ready(function() {

    var singer = [
      "Beyonce", "Lady Gaga", "Taylor Swift", "Madonna", 
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".singer-button", function() {
      $("#singer").empty();
      $(".singer-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=EFdYy6QgWrVJwTuv70mdiev2AWpWscTV&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var singerDiv = $("<div class=\"singer-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var singerImage = $("<img>");
            singerImage.attr("src", still);
            singerImage.attr("data-still", still);
            singerImage.attr("data-animate", animated);
            singerImage.attr("data-state", "still");
            singerImage.addClass("singer-image");
  
            singerDiv.append(p);
            singerDiv.append(singerImage);
  
            $("#singer").append(singerDiv);
          }
        });
    });
  
    $(document).on("click", ".singer-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-singer").on("click", function(event) {
      event.preventDefault();
      var newSinger = $("input").eq(0).val();
  
      if (newSinger.length > 2) {
        singer.push(newSinger);
      }
  
      populateButtons(singer, "singer-button", "#singer-buttons");
  
    });
  
    populateButtons(singer, "singer-button", "#singer-buttons");
  });
  