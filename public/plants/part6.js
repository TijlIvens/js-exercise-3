const params = new URL(document.location).searchParams;
const plantId = params.get("plantId");
const plantSlug = params.get("slug");
const imageElement = document.getElementById("image");
const plantTitleElement = document.getElementById("plantTitle");
const plantScienceNameElement = document.getElementById("plantScienceName");
const plantBibliographyElement = document.getElementById("plantBibliography");
const plantAuthorElement = document.getElementById("plantAuthor");
const plantObservationsElement = document.getElementById("plantObservations");
const plantSynonymsList = document.getElementById("plantSynonymsList");
const plantSourcesList = document.getElementById("plantSourcesList");

const goBackButtonElement = document.getElementById("goBackButton");

goBackButtonElement.addEventListener("click", () => {
  history.back();
});

const updatePlantDataInDOM = (plant) => {
  imageElement.src = plant.image_url;
  plantTitleElement.innerText = plant.common_name;
  plantScienceNameElement.innerText = plant.scientific_name;
  plantBibliographyElement.innerText = plant.bibliography;
  plantAuthorElement.innerText = plant.author;
  plantObservationsElement.innerText = plant.observations;

  plant.synonyms.forEach((synonym) => {
    const synonymElement = document.createElement("p");
    synonymElement.innerText = synonym.name;
    synonymElement.classList.add("plantInfoListItem");
    plantSynonymsList.appendChild(synonymElement);
  });

  plant.sources.forEach((source) => {
    const hasLink = source.url;
    if (hasLink) {
      const sourceElement = document.createElement("a");
      sourceElement.innerText = source.name;
      sourceElement.href = source.url;
      sourceElement.classList.add("plantInfoListItem");
      plantSourcesList.appendChild(sourceElement);
    } else {
      const sourceElement = document.createElement("p");
      sourceElement.innerText = source.name;
      sourceElement.classList.add("plantInfoListItem");
      plantSourcesList.appendChild(sourceElement);
    }
  });
};

const onResponse = (response) => {
  const plant = response.data;
  updatePlantDataInDOM(plant);
};

fetch(
  `https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/species/${plantSlug}`
)
  .then((res) => res.json())
  .then((res) => onResponse(res));
