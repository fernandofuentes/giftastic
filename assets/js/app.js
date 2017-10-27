// array of topics which are game animals yay
var games = ["Super Mario", "The Legend Of Zelda", "Contra"];

// a function that renders the buttons for this array
function renderButtons() {

    $("#game-view").empty();

    // create for loop for array topic games button which will append
    for (var i = 0; i < games.length; i++) {

        var a = $("<button>");
        a.addClass("game");
        a.attr("data-name", games[i]);
        a.text(games[i]);
        $("#game-view").append(a);
    }
}

// on click event add button that pushes user input
$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var game = $("#user-input").val().trim();
    games.push(game);
    renderButtons();
    $("#user-input").val("");
});

renderButtons();

// this on click event button infiltrates the dom with giphy api
$(document).on("click", "button", function() {
    var gameButton = $(this).attr("data-name");
    console.log(gameButton)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gameButton + "&api_key=dc6zaTOxFJmzC&limit=10";

    // ajax queries the giphy URL to grab the info and the done function
    // and for loop loops through the users results and displays the rating
    // for each giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gameImage = $("<img>");

                gameImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gameImage);
                $("#gifs-appear-here").prepend(gifDiv);
            }
        }
    });
});
