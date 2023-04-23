// Your code here

const ApiUrl = "http://localhost:3000/films"


//  capture and display all the movie details for the  first movie by targeting it with  its Id.  
function firstMovie (id) {
    fetch(`${ApiUrl}/${id}`)
    .then(resp => resp.json())
    .then(movie => {
      // destructure  the  movie object by dispaying it  on  the DOM
        document.getElementById("poster").src = movie.poster;

        document.getElementById("title").innerHTML = movie.title;

        document.getElementById("runtime").innerHTML = movie.runtime;

        document.getElementById("film-info").innerHTML = movie.description;

        document.getElementById("showtime").innerHTML = movie.showtime;

     // Subtract one from the remaining tickets count when the "Buy Ticket" button is clicked
    const buyTicketButton = document.getElementById("buy-ticket");
    buyTicketButton.onclick = function() {
    const numTicketsAvailable = movie.capacity - movie.tickets_sold;
    if (numTicketsAvailable > 0) {
        movie.tickets_sold++;
        document.getElementById("ticket-num").innerHTML = numTicketsAvailable - 1;
        buyTicketButton.innerHTML = `Buy Ticket (${numTicketsAvailable - 1} left)`;
    } else {
        buyTicketButton.innerHTML = "SOLD OUT";
    }
    };
    })
}

// Fetch all movies and display their titles as clickable links
function displayMovieTitles() {
  fetch(`${ApiUrl}`)
    .then(resp => resp.json())
    .then(movies => {
      const movieList = document.getElementById("films");
      movies.forEach(movie => {
        const movieLink = document.createElement("a");
        movieLink.href = "#";
        movieLink.innerHTML = movie.title.toUpperCase();
        movieLink.onclick = function() {
          firstMovie(movie.id);
        };
        const movieItem = document.createElement("li");
        movieItem.appendChild(movieLink);
        movieList.appendChild(movieItem);
      });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    firstMovie(1);
    displayMovieTitles();
})

