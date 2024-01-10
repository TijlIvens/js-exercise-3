const movieListElement = document.getElementById("list");

let inputText = "";
let movies = [];

const getMovieIsLikedForId = (movieId) => {
  const storedMovieIdString = localStorage.getItem("likedMovies");
  const storedMovieIds = storedMovieIdString?.split(",") ?? [];

  const isMovieLiked = storedMovieIds.includes(movieId);

  return isMovieLiked;
};

const getHeartIcon = (movieId) => {
  const isLiked = getMovieIsLikedForId(movieId);

  const heartIcon = document.createElement("i");
  heartIcon.className = isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart";

  return heartIcon;
};

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

const onSearchItems = () => {
  const searchedItems = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(inputText.toLowerCase())
  );

  movieListElement.innerHTML = "";
  searchInput.value = "";

  searchedItems.forEach((item) => {
    addMovieToDOM(item);
  });
};

searchButton.addEventListener("click", onSearchItems);

searchInput.addEventListener("input", (event) => {
  inputText = event.target.value;
});

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
