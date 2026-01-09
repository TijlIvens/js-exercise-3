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
const plantLikeButton = document.getElementById("plantLikeButton");
const plantLikeIcon = document.getElementById("plantLikeIcon");
const plantDetailImagesList = document.getElementById("plantDetailImagesList");

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

  Object.keys(plant.images).forEach((key) => {
    const imagesOfKey = plant.images[key];
    const imagesList = document.createElement("div");
    imagesList.classList.add("imagesList");

    imagesOfKey.forEach((image) => {
      const imageElement = document.createElement("img");
      imageElement.src = image.image_url;
      imagesList.appendChild(imageElement);
    });

    const plantDetailImageWrapper = document.createElement("div");
    plantDetailImageWrapper.classList.add("plantDetailImageWrapper");

    const plantDetailImageTitle = document.createElement("h2");
    plantDetailImageTitle.innerText =
      key.charAt(0).toUpperCase() + key.slice(1);

    plantDetailImageWrapper.appendChild(plantDetailImageTitle);
    plantDetailImageWrapper.appendChild(imagesList);

    plantDetailImagesList.appendChild(plantDetailImageWrapper);
  });
};

const setLikeButton = (plantId) => {
  const likedItems = localStorage.getItem("likedItems")?.split(",") || [];
  const isLiked = likedItems.includes(plantId);

  plantLikeIcon.className = isLiked
    ? "fa-solid fa-heart"
    : "fa-regular fa-heart";
};

plantLikeButton.addEventListener("click", () => {
  const likedItems = localStorage.getItem("likedItems")?.split(",") || [];
  if (likedItems.includes(plantId)) {
    localStorage.setItem(
      "likedItems",
      likedItems.filter((item) => item !== plantId).join(",")
    );
  } else {
    localStorage.setItem("likedItems", [...likedItems, plantId].join(","));
  }
  setLikeButton(plantId);
});

const onResponse = (response) => {
  const plant = response.data;
  updatePlantDataInDOM(plant);
};

fetch(
  `https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/species/${plantSlug}`
)
  .then((res) => res.json())
  .then((res) => onResponse(res));

setLikeButton(plantId);
