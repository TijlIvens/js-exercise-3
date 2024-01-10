const movieListElement = document.getElementById("list");
const searchButton = document.getElementById("formButton");
const searchInput = document.getElementById("input");
const moviesTodayButtonElement = document.getElementById("moviesTodayButton");
const sortMoviesButtonElement = document.getElementById("sortMoviesButton");

let inputText = "";
let movies = [];

const getMovieIsLikedForId = (movieId) => {
  const storedMovieIdString = localStorage.getItem("likedMovies");
  const storedMovieIds = storedMovieIdString?.split(",") ?? [];

  const isMovieLiked = storedMovieIds.includes(movieId);

  return isMovieLiked;
};

const setIsMovieLikedForId = (movieId, isLiked) => {
  const storedMovieIdString = localStorage.getItem("likedMovies");
  const storedMovieIds = storedMovieIdString?.split(",") ?? [];

  if (isLiked) {
    const newStoredMovieIds = [...storedMovieIds, movieId].join(",");
    localStorage.setItem("likedMovies", newStoredMovieIds);
  } else {
    const newStoredMovieIds = storedMovieIds
      .filter((item) => item !== movieId)
      .join(",");
    localStorage.setItem("likedMovies", newStoredMovieIds);
  }
};

const getHeartIcon = (movieId) => {
  const isLiked = getMovieIsLikedForId(movieId);

  const heartButton = document.createElement("button");
  const heartIcon = document.createElement("i");
  heartIcon.className = isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart";

  heartButton.appendChild(heartIcon);

  heartButton.addEventListener("click", (event) => {
    event.preventDefault();
    const isLiked = getMovieIsLikedForId(movieId);
    setIsMovieLikedForId(movieId, !isLiked);
    heartIcon.className = !isLiked
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";
  });

  return heartButton;
};

const addMovieToDOM = (movie) => {
  const movieLink = document.createElement("a");
  const movieItem = document.createElement("div");
  const movieContentBox = document.createElement("div");
  const movieImage = document.createElement("img");
  const movieTitle = document.createElement("p");
  const heartIcon = getHeartIcon(movie.Id);

  movieTitle.innerText = movie.Title;
  movieImage.src = movie.Poster;

  movieLink.href = `/movie?movieId=${movie.Id}`;
  movieItem.className = "movieBox";

  movieItem.appendChild(movieImage);
  movieContentBox.appendChild(movieTitle);
  movieContentBox.appendChild(heartIcon);
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

moviesTodayButtonElement.addEventListener("click", () => {
  const todayItems = movies.filter((movie) => movie.PlaysToday);

  movieListElement.innerHTML = "";

  todayItems.forEach((item) => {
    addMovieToDOM(item);
  });
});

sortMoviesButtonElement.addEventListener("click", () => {
  const sortedItems = movies.sort((a, b) => {
    if (a.Title < b.Title) {
      return -1;
    }
    if (a.Title > b.Title) {
      return 1;
    }
    return 0;
  });

  movieListElement.innerHTML = "";

  sortedItems.forEach((item) => {
    addMovieToDOM(item);
  });
});

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
