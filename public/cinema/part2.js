const params = new URL(document.location).searchParams;
const movieId = params.get("movieId");

const onResponse = (response) => {
  const movie = response.find((item) => item.Id === movieId);
};

fetch("https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/movies")
  .then((res) => res.json())
  .then((res) => onResponse(res));
