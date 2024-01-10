const params = new URL(document.location).searchParams;
const movieId = params.get("movieId");

const imageElement = document.getElementById("image");
const imagesListElement = document.getElementById("imagesList");
const movieTitleElement = document.getElementById("movieTitle");
const movieRuntimeElement = document.getElementById("movieRuntime");
const movieRoomElement = document.getElementById("movieRoom");
const genreListElement = document.getElementById("genreList");
const plotElement = document.getElementById("moviePlot");
const movieWriterElement = document.getElementById("movieWriter");
const movieDirectorElement = document.getElementById("movieDirector");
const movieActorsElement = document.getElementById("movieActors");
const movieLikeButtonElement = document.getElementById("movieLikeButton");
const movieLikeIconElement = document.getElementById("movieLikeIcon");
const goBackButtonElement = document.getElementById("goBackButton");

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

const onResponse = (response) => {
  const movie = response.find((item) => item.Id === movieId);

  imageElement.src = movie.Poster;
  movie.Images.forEach((element) => {
    const previewImageElement = document.createElement("img");
    previewImageElement.src = element;
    imagesListElement.appendChild(previewImageElement);
  });
  movieTitleElement.innerText = movie.Title;
  movieRuntimeElement.innerText = movie.Runtime;
  movieRoomElement.innerText = `Room: ${movie.Room}`;
  movie.Genre.forEach((genre) => {
    const genreElement = document.createElement("p");
    genreElement.innerText = genre;
    genreElement.className = "movieGenreItem";
    genreListElement.appendChild(genreElement);
  });
  plotElement.innerText = movie.Plot;
  movieWriterElement.innerText = movie.Writer;
  movieDirectorElement.innerText = movie.Director;
  movieActorsElement.innerText = movie.Actors.join(" - ");
};

const setLikedIcon = (isLiked) => {
  movieLikeIconElement.className = isLiked
    ? "fa-solid fa-heart"
    : "fa-regular fa-heart";
};

movieLikeButtonElement.addEventListener("click", () => {
  const isLiked = getMovieIsLikedForId(movieId);
  setLikedIcon(!isLiked);
  setIsMovieLikedForId(movieId, !isLiked);
});

goBackButtonElement.addEventListener("click", () => {
  history.back();
});

setLikedIcon(getMovieIsLikedForId(movieId));

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
