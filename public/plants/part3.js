const plantsList = document.getElementById("list");
const searchButton = document.getElementById("formButton");
const searchInput = document.getElementById("input");
const emptyStateItem = document.getElementById("noItemsFound");

let plants = [];
let inputText = "";

const createLikeButton = (plantId) => {
  const likedItems = localStorage.getItem("likedItems")?.split(",") || [];

  const isLiked = likedItems.includes(plantId);

  const heartIcon = document.createElement("i");
  heartIcon.className = isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart";
  heartIcon.ariaHidden = true;

  const likeButton = document.createElement("button");
  likeButton.appendChild(heartIcon);

  likeButton.addEventListener("click", (event) => {
    event.preventDefault();
    const likedItems = localStorage.getItem("likedItems")?.split(",") || [];

    const isLiked = likedItems.includes(plantId);

    heartIcon.className = isLiked ? "fa-regular fa-heart" : "fa-solid fa-heart";

    if (isLiked) {
      const newLikedItems = likedItems.filter((id) => id !== plantId);
      localStorage.setItem("likedItems", newLikedItems.join(","));
    } else {
      localStorage.setItem("likedItems", [...likedItems, plantId].join(","));
    }
  });

  return likeButton;
};

const addPlantToList = (plant) => {
  const plantImage = document.createElement("img");
  plantImage.src = plant.image_url;

  const plantName = document.createElement("p");
  plantName.innerText = plant.common_name;

  const likeButton = createLikeButton(plant.id.toString());

  const plantNameBox = document.createElement("div");
  plantNameBox.appendChild(plantName);
  plantNameBox.appendChild(likeButton);

  const plantBox = document.createElement("div");
  plantBox.classList.add("plantBox");
  plantBox.appendChild(plantImage);
  plantBox.appendChild(plantNameBox);

  const plantLinkWrapper = document.createElement("a");
  plantLinkWrapper.href = `/plant?plantId=${plant.id}&slug=${plant.slug}`;
  plantLinkWrapper.appendChild(plantBox);

  plantsList.appendChild(plantLinkWrapper);
};

const onSearchItems = () => {
  const searchedItems = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(inputText.toLowerCase())
  );

  plantsList.innerHTML = "";
  searchInput.value = "";
  inputText = "";

  if (searchedItems.length === 0) {
    emptyStateItem.style.display = "flex";
  } else {
    emptyStateItem.style.display = "none";
    searchedItems.forEach((plant) => {
      addPlantToList(plant);
    });
  }
};

searchButton.addEventListener("click", onSearchItems);

searchInput.addEventListener("input", (event) => {
  inputText = event.target.value;
});

const onResponse = (response) => {
  plants = response.data;
  plants.forEach((plant) => addPlantToList(plant));
};

fetch(
  "https://europe-west1-javascript-lessons-tijl.cloudfunctions.net/plants/api/v1/plants"
)
  .then((res) => res.json())
  .then((res) => onResponse(res));
