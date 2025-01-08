const plantsList = document.getElementById("list");

let plants = [];

const addPlantToList = (plant) => {
  const plantImage = document.createElement("img");
  plantImage.src = plant.image_url;

  const plantName = document.createElement("p");
  plantName.innerText = plant.common_name;

  const plantNameBox = document.createElement("div");
  plantNameBox.appendChild(plantName);

  const plantBox = document.createElement("div");
  plantBox.classList.add("plantBox");
  plantBox.appendChild(plantImage);
  plantBox.appendChild(plantNameBox);

  const plantLinkWrapper = document.createElement("a");
  plantLinkWrapper.href = `/plant?plantId=${plant.id}&slug=${plant.slug}`;
  plantLinkWrapper.appendChild(plantBox);

  plantsList.appendChild(plantLinkWrapper);
};

const onResponse = (response) => {
  plants = response.data;
  plants.forEach((plant) => addPlantToList(plant));
};

fetch(
  "https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/plants"
)
  .then((res) => res.json())
  .then((res) => onResponse(res));
