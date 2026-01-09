const listElement = document.getElementById("product-list");
const searchButton = document.getElementById("formButton");
const searchInput = document.getElementById("input");
const emptyStateItem = document.getElementById("noItemsFound");
const categorySelect = document.getElementById("categorySelect");

let products;
let inputText = "";

const createProductBasketButton = (productId) => {
  const productBasketButton = document.createElement("button");
  productBasketButton.onclick = (event) => {
    event.preventDefault();
    const basket = JSON.parse(localStorage.getItem("basket")) || {};

    const newBasket = { ...basket, [productId]: (basket[productId] || 0) + 1 };

    localStorage.setItem("basket", JSON.stringify(newBasket));
  };

  const basketIcon = document.createElement("i");
  basketIcon.className = "fa-solid fa-cart-shopping";
  basketIcon.ariaHidden = true;

  productBasketButton.appendChild(basketIcon);

  return productBasketButton;
};

const showProductInDOM = (product) => {
  const productImage = document.createElement("img");
  productImage.src = `/images/${product.image}`;

  const productName = document.createElement("h3");
  productName.innerText = product.name;
  const productAmount = document.createElement("p");
  productAmount.innerText = `${product.amount}${product.unit}`;
  const productPrice = document.createElement("p");
  productPrice.innerText = `€${product.amount * product.pricePerUnit}`;

  const productTextBox = document.createElement("div");
  productTextBox.classList.add("productTextBox");
  productTextBox.appendChild(productName);
  productTextBox.appendChild(productAmount);
  productTextBox.appendChild(productPrice);

  const productBasketButton = createProductBasketButton(product.id);

  const productInfoBox = document.createElement("div");
  productInfoBox.classList.add("productInfoBox");
  productInfoBox.appendChild(productTextBox);
  productInfoBox.appendChild(productBasketButton);

  const productBox = document.createElement("div");
  productBox.classList.add("productBox");
  productBox.appendChild(productImage);
  productBox.appendChild(productInfoBox);

  const productLinkWrapper = document.createElement("a");
  productLinkWrapper.href = `/product?productId=${product.id}`;
  productLinkWrapper.appendChild(productBox);

  listElement.appendChild(productLinkWrapper);
};

const onSearchItems = () => {
  const searchedItems = products.filter((product) =>
    product.name.toLowerCase().includes(inputText.toLowerCase())
  );

  listElement.innerHTML = "";
  searchInput.value = "";
  inputText = "";

  if (searchedItems.length === 0) {
    emptyStateItem.style.display = "flex";
  } else {
    emptyStateItem.style.display = "none";
    searchedItems.forEach((plant) => {
      showProductInDOM(plant);
    });
  }
};

searchButton.addEventListener("click", onSearchItems);

searchInput.addEventListener("input", (event) => {
  inputText = event.target.value;
});

const setCategorySelect = () => {
  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];

  const initialOption = document.createElement("option");
  initialOption.value = "";
  initialOption.innerText = "Not selected";

  categorySelect.appendChild(initialOption);

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    categorySelect.appendChild(option);
  });
};

categorySelect.addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  listElement.innerHTML = "";

  if (selectedCategory === "") {
    products.forEach((product) => showProductInDOM(product));
  } else {
    filteredProducts.forEach((product) => showProductInDOM(product));
  }
});

const onResponse = (response) => {
  products = response.groceryProducts;
  products.forEach((product) => showProductInDOM(product));
  setCategorySelect();
};

fetch("/products.json")
  .then((res) => res.json())
  .then((res) => onResponse(res));
