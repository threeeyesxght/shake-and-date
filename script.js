$(".dropdown-trigger").dropdown();
$(".restaurants").hide();
$(".location").hide();

// Global Variables

var saveMovieButton = $(".save-button1");
var saveCuisineButton = $(".save-button2");
var displayMovie = $(".movie-display");
var movieSaveRow = $(".movie-save-row");
var clearButton = $(".clear-history-button");
var savedContainer = $(".final-container");
var savedDiv = $(".saved-div");
var restaurantOption = $(".restaurant-yes-no");
var restaurantDrop = $(".restaurantDrop");
var viewDate = $(".selected-date-here");

var movieStorage = JSON.parse(localStorage.getItem("movies")) || [];
var restaurantStorage = JSON.parse(localStorage.getItem("Restaurants")) || [];

var movieArray = []
var restArray  = []

///////////CLEAR FUNCTION USED TO EMPTY ELEMENTS BEFORE PRODUCING NEW CONTENT. CALLED RIGHT AFTER EVENTLISTENER///////////////////
function clear() {
  $(".movie-title").empty();
  $(".movie-poster").empty();
  $(".movie-synopsis").empty();
  $(".movie-rating").empty();
  $(".movie-stream").empty();
  $(".movie-rent").empty();
}
//////////////FUNCTION FOR GRABING CITY ID FROM COURT//////////////////////
function cityIdSnatcher() {
  $(".cityOptions").on("click", function (event) {
    var cityId = $(event.target).val();
    console.log(cityId);
  });
}

/////////////// OBJECTS FOR GATHERING STREEMING INFORMATION IF OBJECT KEY:VALLUE MATCHES////////////////

var objectStreem = {
  "HBO Max": "https://www.hbomax.com/",
  "HBO Now": "https://play.hbonow.com/page/urn:hbo:page:home",
  DIRECTV: "https://www.directv.com/",
  "Sling TV": "https://watch.sling.com/",
  FXNow: "https://fxnow.fxnetworks.com/",
  "Disney Plus": "https://www.disneyplus.com/",
  Netflix: "https://www.netflix.com/",
  "Spectrum On Demand": "https://www.spectrumondemand.com/",
  fuboTV: "https://www.fubo.tv/welcome",
  Starz: "https://www.starz.com/us/en/",
  Hulu: "https://www.hulu.com/",
  IndieFlix: "https://www.indieflix.com/",
  "Max Go": "https://play.maxgo.com/page/urn:hbo:page:home",
  "Amazon Prime Video": "https://www.amazon.com/Amazon-Video/",
  TNT: "https://www.tntdrama.com/",
  TBS: "https://www.tbs.com/",
  "USA Network": "https://www.usanetwork.com/",
};

var objectRent = {
  "Apple iTunes": "https://tv.apple.com/",
  "Google Play Movies": "https://play.google.com/store/movies?hl=en_US&gl=US",
  "Amazon Video":
    "https://www.amazon.com/gp/video/storefront/ref=atv_scout_redirect#ace-g7448806443",
  YouTube: "https://www.youtube.com/",
  Vudu: "https://www.vudu.com/",
  "Microsoft Store": "https://www.microsoft.com/en-us/store/movies-and-tv",
  Redbox: "https://www.redbox.com/",
  DIRECTV: "https://www.directv.com/",
  "AMC on Demand": "https://www.amctheatres.com/on-demand",
};

////////////////////CONTROLS WHAT HAPPENS WHEN MOVIE BUTTON IS HIT YES OR NO////////////////////////
function displayControl() {
  $(".movieDrop").on("click", function (event) {
    if ($(event.target).attr("class") === "yes") {
      $(".showMovie").css("display", "block");
      $(".random-button-1").css("display", "flex");
      $(".random-button-1").css("justify-content", "center");
      $(".phase1IfYes").css("display", "none");
    }
    if ($(event.target).attr("class") === "no") {
      $(".movie").hide();
      $(".movie-display").hide();
      // $(".body-container").prepend($(".location").show());
      restaurantOption.removeClass("hide");
      movieStorage.push(" ");
      localStorage.setItem("movies", JSON.stringify(movieStorage))
    }
  });
}
displayControl();
////////////////////CONTROLS WHAT HAPPENS WHEN RESTAURANT BUTTON IS HIT YES OR NO////////////////////////

function displayRestaurant() {
  restaurantDrop.on("click", function (event) {
    if ($(event.target).attr("class") === "yes") {
      console.log("hi");
      $(".body-container").prepend($(".location").show());
      restaurantOption.hide();
    }
    if ($(event.target).attr("class") === "no") {
      $(".final-date").removeClass("hide");
      restaurantOption.hide();
      viewDate.append($(".movie-display"));
      $(".movie-display").show();
      restaurantStorage.push("")
      localStorage.setItem("Restaurants", JSON.stringify(restaurantStorage))
    }
  });
}
displayRestaurant();

/////////////////////EVENT LISTENER SELECTS RANDOM GENRE AND PLUGS IT INTO STREEM FUNCTION////////////////////////////
$(".rando").on("click", function () {
  clear();
  var randomGenre = [
    "28",
    "12",
    "16",
    "35",
    "99",
    "18",
    "10751",
    "14",
    "27",
    "10402",
    "9648",
    "10749",
    "878",
    "53",
    "10752",
    "37",
  ];
  var randomNumber = Math.floor(Math.random() * 15);
  var genre = randomGenre[randomNumber];
  var movieList =
    "https://api.themoviedb.org/3/discover/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    genre;
  $.ajax({
    url: movieList,
    method: "GET",
  }).then(function (movies) {
    console.log(movies);
    var genreRandomMovie = Math.floor(Math.random() * 19);
    var movieId = movies.results[genreRandomMovie].id;
    ///calls streem function with movieId as variable
    streem(movieId);
  });
  displayMovie.removeClass("hide");
  saveMovieButton.removeClass("hide");
  movieSaveRow.removeClass("hide");
});
///////////////////Click Event Targets Genre and plugs in streem Function///////////////////////////
$(".genreDropdown").on("click", function (event) {
  clear();
  var textContent = $(event.target).text();
  $(".dropdown-genres").text(textContent);
  var genre = $(event.target).attr("data-id");
  console.log(genre);
  var movieList =
    "https://api.themoviedb.org/3/discover/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    genre;
  $.ajax({
    url: movieList,
    method: "GET",
  }).then(function (movies) {
    var genreRandomMovie = Math.floor(Math.random() * 19);
    var movieId = movies.results[genreRandomMovie].id;
    ///calls streem function with movieId as variable
    streem(movieId);
  });
  displayMovie.removeClass("hide");
  saveMovieButton.removeClass("hide");
  movieSaveRow.removeClass("hide");
});

// Function For Streeming Data//Insert movieId where x is.
function streem(x) {
  var streemLocation =
    "https://api.themoviedb.org/3/movie/" +
    x +
    "?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&append_to_response=watch%2Fproviders";
  $.ajax({
    url: streemLocation,
    method: "GET",
  }).then(function (streeming) {
    movieArray = []
    console.log(streeming);
    var poster = streeming.poster_path; // For poster
    var title = streeming.title; //For title
    var synops = streeming.overview; //For Synopsys
    var voterRate = streeming.vote_average; // For voteer rating
    $(".movie-title").text(title);
    $(".movie-poster").append(
      $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + poster)
    );
    $("img").attr("height", "320vw");
    $(".movie-synopsis").append(synops);
    $(".movie-rating").append(voterRate);
    movieArray.push(poster, title, synops, voterRate);
    
    /////////////////////Streeming And Rental Results USING API AND ABOVE LISTED OBJECTS/////////////////////////////////
    var subscription = streeming["watch/providers"].results.US.flatrate;
    try {
      for (var i = 0; i < subscription.length; i++) {
        for (
          var index = 0;
          index < Object.entries(objectStreem).length;
          index++
        ) {
          if (
            subscription[i].provider_name ===
            Object.entries(objectStreem)[index][0]
          ) {
            movieArray.push(
              Object.entries(objectStreem)[index][1],
              subscription[i].provider_name
            );
            $(".streaming-header").text("Streaming Availability:");
            $(".movie-stream").append(
              $("<ul>").append(
                $("<a>")
                  .attr("href", Object.entries(objectStreem)[index][1])
                  .text(subscription[i].provider_name)
                  .css({ "margine-left": "1vw", "margin-right": "1vw" })
                  .attr("target", "_blank")
                  .addClass("streaming-list")
              )
            );
          }
        }
      }
    } catch (err) {
      $(".movie-stream").append(
        $("<div>").text("No known subscription service.")
      );
    }
    var rental = streeming["watch/providers"].results.US.rent;
    try {
      for (var i = 0; i < 4; i++) {
        for (
          var index = 0;
          index < Object.entries(objectRent).length;
          index++
        ) {
          if (
            rental[i].provider_name === Object.entries(objectRent)[index][0]
          ) {
            movieArray.push(
              Object.entries(objectRent)[index][1],
              rental[i].provider_name
            );
            $(".rental-header").text("Rental Availability:");
            $(".movie-rent").append(
              $("<ul>").append(
                $("<a>")
                  .attr("href", Object.entries(objectRent)[index][1])
                  .text(rental[i].provider_name)
                  .css({ "margine-left": "1vw", "margin-right": "1vw" })
                  .attr("target", "_blank")
                  .addClass("rental-list")
              )
            );
            console.log(Object.entries(objectRent)[index][1]);
          }
        }
      }
    } catch (erro) {
      $(".movie-rent").append($("<div>").text("No known rental service."));
    }
    saveMovie();
  });
}

////////////////////////////FUNCTION FOR DIRECT MOVIE SEARCH/////////////////////////////
//   $(".search").on("click", function(){
// var movieSearch = $("#prompt1").val()
// var searchName = "https://api.themoviedb.org/3/search/movie?api_key=dc7d76692b192b772ecce4d938dfa475&query=" + movieSearch
//   $.ajax({
//       url: searchName,
//       method: "GET"
//   }).then(function(movieName){
//     movieName.results[i].id

//   })

// })

///////////////// Restaurant Code Here/////////////

/////CITY INPUT FIELD AND SELECTOR////////
$(".city-search-btn").on("click", function (event) {
  $(".city-search-btn").hide();
  $(".city-drop").show();
  var searchedCity = $(".search-city").val();
  var cityUrl =
    "https://developers.zomato.com/api/v2.1/cities?q=" + searchedCity;

  $.ajax({
    method: "GET",
    url: cityUrl,
    headers: {
      "user-key": "b23ce13853bea993b459518ec134302f",
      "content-type": "application/json",
    },
  }).then(function (city) {
    for (var i = 0; i < city.location_suggestions.length; i++) {
      $(".city-option").append(
        $("<li>").append(
          $("<a>").append(
            $("<li>")
          .attr("href", "#!")
          .text(city.location_suggestions[i].name)
          .css("color", "#26a69a")
          .addClass("cityOptions")
          .val(city.location_suggestions[i].id)
          )
          )
      );
    }
    /////////SPECIFIC CITY SELECTOR//////////////
    $(".cityOptions").on("click", function (event) {
      var cityId = $(event.target).val();
      console.log(cityId);
      console.log(city);
      $(".search-city").val($(event.target).text());
      $(".city-drop").hide()
      
////////FUNCTION ACTS AS GOOGLE LUCKY BUTTON.....GENERATES RANDOME CUISINE///////
      lucky();
////////BELLOW CLICK EVENTS DISPLAY SELECTED MEAL LOCATIONS///////////
      $(".food-option").on("click", function (event) {
        restArray  = []
        
        $(".restaurant-display").removeClass("hide");
        $(".cuisineSelector").text($(event.target).text());
        var cuisineid = $(event.target).attr("data-foodid");
        cuisineurl =
          "https://developers.zomato.com/api/v2.1/search?entity_id=" +
          cityId +
          "&entity_type=city&count=20&radius=20%2C000&cuisines=" +
          cuisineid +
          "&sort=rating&order=desc";
        console.log(cuisineurl); 

        $.ajax({
          method: "GET",
          url: cuisineurl,
          headers: {
            "user-key": "b23ce13853bea993b459518ec134302f",
            "content-type": "application/json",
          },
        }).then(function (response) {
          try {
            var randomeRestaurant = Math.floor(
              Math.random() * response.restaurants.length
            );
            var astablishmentName =
              response.restaurants[randomeRestaurant].restaurant.name;
            $(".restaurant-name").text(astablishmentName);
            var establishmentCuisine =
              response.restaurants[randomeRestaurant].restaurant.cuisines;
            $(".restaurant-cuisines").text(establishmentCuisine);
            var establishmentCity =
              response.restaurants[randomeRestaurant].restaurant.location.city;
            $(".restaurant-city").text(establishmentCity);
            var establishmentAddress =
              response.restaurants[randomeRestaurant].restaurant.location
                .address;
            $(".restaurant-address").text(establishmentAddress);
            var establishmentRating =
              response.restaurants[randomeRestaurant].restaurant.user_rating
                .aggregate_rating;
            $(".restaurant-rating").text(establishmentRating);
            var establishmentMenu =
              response.restaurants[randomeRestaurant].restaurant.menu_url;
            $(".restaurant-menu").attr("href", establishmentMenu);
            $(".restaurant-menu").text("View Menu");
            $(".restaurant-menu").attr("target", "_blank");
            var establishmentImg =
              response.restaurants[randomeRestaurant].restaurant.featured_image;
            $(".restaurant-featuredimage").attr("src", establishmentImg);
            $(".restaurant-featuredimage").attr("height", "200vw");
            var establishmentContact =
              response.restaurants[randomeRestaurant].restaurant.phone_numbers;
            $(".restaurant-contact").text(establishmentContact);
          } catch (err) {
            $(".restaurant-name").text("No Restaurants Found!");
          }
          ////////////////////////////////////////Pushing array into globaly defined array and localStorage//////////////////////////////////////////////////
          restArray.push(
            astablishmentName,
            establishmentCuisine,
            establishmentCity,
            establishmentAddress,
            establishmentRating,
            establishmentMenu,
            establishmentImg,
            establishmentContact,
        );
            saveCuisine();

          saveCuisineButton.removeClass("hide").prepend($("<br>"));
        });
      });
    });
  });
});
/////////////FUNCTION MENTIONED ON LINE 331/////////////
var randomCuisine = ["1", "25", "156", "55", "60", "67", "73", "99", "308"];

function lucky() {
  var cityId = $(event.target).val();
  console.log(cityId);
  $(".restaurant-random").on("click", function () {
    restArray  = []
    var randomCuisineid = Math.floor(Math.random() * 8);
    var cuisine = randomCuisine[randomCuisineid];
    $(".restaurant-display").removeClass("hide");
    var cuisineurl =
      "https://developers.zomato.com/api/v2.1/search?entity_id=" +
      cityId +
      "&entity_type=city&count=20&radius=20%2C000&cuisines=" +
      cuisine +
      "&sort=rating&order=desc";
    $.ajax({
      method: "GET",
      url: cuisineurl,
      headers: {
        "user-key": "b23ce13853bea993b459518ec134302f",
        "content-type": "application/json",
      },
    }).then(function (response) {
      try {
        var randomeRestaurant = Math.floor(
          Math.random() * response.restaurants.length
        );
        var astablishmentName =
          response.restaurants[randomeRestaurant].restaurant.name;
        $(".restaurant-name").text(astablishmentName);
        var establishmentCuisine =
          response.restaurants[randomeRestaurant].restaurant.cuisines;
        $(".restaurant-cuisines").text(establishmentCuisine);
        var establishmentCity =
          response.restaurants[randomeRestaurant].restaurant.location.city;
        $(".restaurant-city").text(establishmentCity);
        var establishmentAddress =
          response.restaurants[randomeRestaurant].restaurant.location.address;
        $(".restaurant-address").text(establishmentAddress);
        var establishmentRating =
          response.restaurants[randomeRestaurant].restaurant.user_rating
            .aggregate_rating;
        $(".restaurant-rating").text(establishmentRating);
        var establishmentMenu =
          response.restaurants[randomeRestaurant].restaurant.menu_url;
        $(".restaurant-menu").attr("href", establishmentMenu);
        $(".restaurant-menu").text("View Menu");
        $(".restaurant-menu").attr("target", "_blank");
        var establishmentImg =
          response.restaurants[randomeRestaurant].restaurant.featured_image;
        $(".restaurant-featuredimage").attr("src", establishmentImg);
        $(".restaurant-featuredimage").attr("height", "200vw");
        var establishmentContact =
          response.restaurants[randomeRestaurant].restaurant.phone_numbers;
        $(".restaurant-contact").text(establishmentContact);
      } catch (err) {
        $(".restaurant-name").text("No Restaurants Found!");
      }
      restArray.push(
        astablishmentName,
        establishmentCuisine,
        establishmentCity,
        establishmentAddress,
        establishmentRating,
        establishmentMenu,
        establishmentImg,
        establishmentContact,
      );
      saveCuisine() 
      
    });
    saveCuisineButton.removeClass("hide").prepend($("<br>"));
  });
}

////////////////// SAVE BUTTON FUNCTIONS.....WILL USE FOR LOCAL STORAGE////////////////////////
function saveMovie() {
  saveMovieButton.on("click", function (event) {
    event.stopImmediatePropagation()
    saveMovieButton.hide();
    movieSaveRow.hide();
    $(".movie").hide();
    $(".movie-display").hide();
    movieStorage.push(movieArray)
    localStorage.setItem("movies", JSON.stringify(movieStorage))
    restaurantOption.removeClass("hide");
  });
}


function saveCuisine() {
  $(".location").append(saveCuisineButton); 
  saveCuisineButton.css("margine-left", "50%"); 
  saveCuisineButton.on("click", function (event) {
    event.stopImmediatePropagation()
    saveCuisineButton.hide();
    $(".rando").hide(); 
    $("#genre-question").hide(); 
    $(".dropdown-genres").hide(); 
    $(".body-container").prepend($(".final-date").removeClass("hide"));
    viewDate.append($(".movie-display"));
    viewDate.append($(".restaurant-display"));
    $(".movie-display").show();
    $(".buttons").remove();
    $(".final-save").hide();
    restaurantStorage.push(restArray)
    localStorage.setItem("Restaurants", JSON.stringify(restaurantStorage));
  });
}
//////////FOR LOOP RUNS THROUGH LOCAL STORAGE AND DISPLAYS ON FINAL HTML PAGE///////////////////
for (var i = restaurantStorage.length - 1; i >= 0; i--) {
  
  var savedCard = $("<div>")
    .addClass("card")
    .addClass("savedDate" + i);
  console.log(restaurantStorage[i]);

  if (restaurantStorage[i][0] === undefined){
    
  }else{savedCard.append(
      $("<p>")
      .text("Name: " + restaurantStorage[i][0])
      .addClass("name card-display")
  );}
  if (restaurantStorage[i][1] === undefined){
  }else{savedCard.append(
      $("<p>")
      .text("Cuisine: " + restaurantStorage[i][1])
      .addClass("type card-display")
  );}
  if (restaurantStorage[i][3] === undefined){
  }else{savedCard.append(
      $("<p>")
      .text("Address: " + restaurantStorage[i][3])
      .addClass("address card-display")
  );}
  if (restaurantStorage[i][4] === undefined){
  }else{savedCard.append(
      $("<p>")
      .text("Rating: " + restaurantStorage[i][4])
      .addClass("rating card-display")
  );}
  if (restaurantStorage[i][5] === undefined){
  }else{savedCard.append(
    $("<a>")
      .text("View Menu")
      .addClass("menu card-display")
      .attr("href", restaurantStorage[i][5])
      .attr("target", "_blank")
  );}
  if (restaurantStorage[i][7] === undefined){
  }else{savedCard.append(
    $("<p>").text(restaurantStorage[i][7]).addClass("number card-display")
  );}

  var savedMovie = $("<div>").addClass("savedDate" + i);
    if(movieStorage[i][0] !== " "){
  savedMovie.append(
    $("<img>")
      .attr("height", "200vw")
      .attr("src", "https://image.tmdb.org/t/p/w500" + movieStorage[i][0])
      .addClass("poster card-display")
  );}else{console.log("no Image")
  }
  if (movieStorage[i][1] === undefined){
  }else{
  savedMovie.append(
    $("<p>")
      .text("Title: " + movieStorage[i][1])
      .addClass("title card-display")
  );}
  if (movieStorage[i][2] === undefined){
  }else{
  savedMovie.append(
    $("<p>")
      .text("Synopsis: " + movieStorage[i][2])
      .addClass("synops card-display")
      .append($("<hr>"))
  );}
  
  savedCard.prepend(savedMovie);
  savedDiv.prepend(savedCard);
  savedContainer.prepend(savedDiv);
}

//////////////////// CLEAR BUTTON FUNCTION SAVED.HTML //////////////////
function clearHistory() {
  clearButton.on("click", function () {
    console.log("hi");
    savedDiv.empty();
    localStorage.clear();
  });
}
clearHistory();