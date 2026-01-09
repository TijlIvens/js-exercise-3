const params = new URL(document.location).searchParams;
const productId = params.get("productId");

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productAmount = document.getElementById("productAmount");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");
const basketAmount = document.getElementById("basketAmount");
const addToBasketButton = document.getElementById("addToBasketButton");
const subtractFromBasketButton = document.getElementById(
  "subtractFromBasketButton"
);

const setAmountOfProductInBasket = () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  const amount = basket[productId] || 0;
  basketAmount.innerText = amount;
};

const showProductDetails = (product) => {
  productImage.src = `/images/${product.image}`;
  productName.innerText = product.name;
  productAmount.innerText = `${product.amount}${product.unit}`;
  productPrice.innerText = `€${product.amount * product.pricePerUnit}`;
  productCategory.innerText = product.category;
  productDescription.innerText = product.description;
  setAmountOfProductInBasket();
};

addToBasketButton.addEventListener("click", () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  const newBasket = { ...basket, [productId]: (basket[productId] || 0) + 1 };
  localStorage.setItem("basket", JSON.stringify(newBasket));
  setAmountOfProductInBasket();
});

subtractFromBasketButton.addEventListener("click", () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  if ((basket[productId] || 0) === 0) {
    return;
  }
  const newBasket = {
    ...basket,
    [productId]: Math.max(0, (basket[productId] || 0) - 1),
  };
  localStorage.setItem("basket", JSON.stringify(newBasket));
  setAmountOfProductInBasket();
});

const onResponse = (response) => {
  const product = response.groceryProducts.find(
    (product) => product.id.toString() === productId
  );
  showProductDetails(product);
};

fetch("/products.json")
  .then((res) => res.json())
  .then((res) => onResponse(res));
