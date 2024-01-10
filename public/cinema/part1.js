const movieListElement = document.getElementById("list");

let movies = [];

const addMovieToDOM = (movie) => {
  const movieLink = document.createElement("a");
  const movieItem = document.createElement("div");
  const movieContentBox = document.createElement("div");
  const movieImage = document.createElement("img");
  const movieTitle = document.createElement("p");

  movieTitle.innerText = movie.Title;
  movieImage.src = movie.Poster;

  movieLink.href = `/movie?movieId=${movie.Id}`;
  movieItem.className = "movieBox";

  movieItem.appendChild(movieImage);
  movieContentBox.appendChild(movieTitle);
  movieItem.appendChild(movieContentBox);
  movieLink.appendChild(movieItem);
  movieListElement.appendChild(movieLink);
};

const onResponse = (response) => {
  movies = response;

  response.forEach((movie) => {
    addMovieToDOM(movie);
  });
};

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
