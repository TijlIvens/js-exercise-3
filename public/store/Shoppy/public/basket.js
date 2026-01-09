const totalAmountElement = document.getElementById("totalAmount");
const clearBasketButton = document.getElementById("clearBasketButton");
const basketItemsList = document.getElementById("basketItemsList");
const goBackButtonElement = document.getElementById("goBackButton");

goBackButtonElement.addEventListener("click", () => {
  history.back();
});

let products = [];

const getAmountOfProductInBasket = (productId) => {
  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  return basket[productId] || 0;
};

const createProductAmountButtons = (productId) => {
  const subtractIcon = document.createElement("i");
  subtractIcon.className = "fa-solid fa-minus";
  subtractIcon.ariaHidden = true;

  const addIcon = document.createElement("i");
  addIcon.className = "fa-solid fa-plus";
  addIcon.ariaHidden = true;

  const subtractButton = document.createElement("button");
  subtractButton.appendChild(subtractIcon);

  const addButton = document.createElement("button");
  addButton.appendChild(addIcon);

  const productAmount = document.createElement("p");
  productAmount.innerText = getAmountOfProductInBasket(productId);

  const productAmountBox = document.createElement("div");
  productAmountBox.classList.add("basketItemActions");
  productAmountBox.appendChild(subtractButton);
  productAmountBox.appendChild(productAmount);
  productAmountBox.appendChild(addButton);

  addButton.addEventListener("click", () => {
    const basket = JSON.parse(localStorage.getItem("basket")) || {};

    const newBasket = { ...basket, [productId]: (basket[productId] || 0) + 1 };

    localStorage.setItem("basket", JSON.stringify(newBasket));

    updateUI();
  });

  subtractButton.addEventListener("click", () => {
    if (getAmountOfProductInBasket(productId) === 0) {
      return;
    }
    const basket = JSON.parse(localStorage.getItem("basket")) || {};

    const newBasket = {
      ...basket,
      [productId]: Math.max(0, (basket[productId] || 0) - 1),
    };

    localStorage.setItem("basket", JSON.stringify(newBasket));

    updateUI();
  });

  return productAmountBox;
};

const addProductToBasketDOM = (product) => {
  const productImage = document.createElement("img");
  productImage.src = `/images/${product.image}`;

  const productName = document.createElement("h3");
  productName.innerText = product.name;

  const basketInfoBox = document.createElement("div");
  basketInfoBox.classList.add("basketItemInfo");
  basketInfoBox.appendChild(productImage);
  basketInfoBox.appendChild(productName);

  const productAmountButtons = createProductAmountButtons(product.id);

  const basketItem = document.createElement("div");
  basketItem.classList.add("basketItem");
  basketItem.appendChild(basketInfoBox);
  basketItem.appendChild(productAmountButtons);

  basketItemsList.appendChild(basketItem);
};

const updateUI = () => {
  basketItemsList.innerHTML = "";

  const basket = JSON.parse(localStorage.getItem("basket")) || {};

  const productsInBasket = products.filter(
    (product) => (basket[product.id] ?? 0) > 0
  );

  const totalAmount = productsInBasket.reduce((acc, product) => {
    return (
      acc + product.pricePerUnit * product.amount * (basket[product.id] ?? 0)
    );
  }, 0);

  totalAmountElement.innerText = `Total: €${totalAmount.toFixed(2)}`;

  productsInBasket.forEach((product) => {
    addProductToBasketDOM(product);
  });
};

clearBasketButton.addEventListener("click", () => {
  localStorage.removeItem("basket");
  updateUI();
});

const onResponse = (response) => {
  products = response.groceryProducts;

  updateUI();
};

fetch("/products.json")
  .then((res) => res.json())
  .then((res) => onResponse(res));
