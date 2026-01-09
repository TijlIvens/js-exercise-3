const listElement = document.getElementById("product-list");

let products;

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

  const productInfoBox = document.createElement("div");
  productInfoBox.classList.add("productInfoBox");
  productInfoBox.appendChild(productTextBox);

  const productBox = document.createElement("div");
  productBox.classList.add("productBox");
  productBox.appendChild(productImage);
  productBox.appendChild(productInfoBox);

  const productLinkWrapper = document.createElement("a");
  productLinkWrapper.href = `/product?productId=${product.id}`;
  productLinkWrapper.appendChild(productBox);

  listElement.appendChild(productLinkWrapper);
};

const onResponse = (response) => {
  products = response.groceryProducts;
  products.forEach((product) => showProductInDOM(product));
};

fetch("/products.json")
  .then((res) => res.json())
  .then((res) => onResponse(res));
