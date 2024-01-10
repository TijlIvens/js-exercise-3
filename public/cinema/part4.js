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

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
