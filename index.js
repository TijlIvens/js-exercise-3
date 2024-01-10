const plusButton = document.getElementById("plusButton");
const minusButton = document.getElementById("minusButton");
const resetButton = document.getElementById("resetButton");
const counterText = document.getElementById("counterText");
const counterInput = document.getElementById("input");
const setButton = document.getElementById("formButton");
const alertText = document.getElementById("alertText");

let currentCount = 0;

let inputText = "";

const setCount = (count) => {
  counterText.innerText = count;

  saveCount(count);
};

const saveCount = (count) => {
  localStorage.setItem("count", count);
};

plusButton.addEventListener("click", () => {
  count++;

  setCount(count);
});

minusButton.addEventListener("click", () => {
  count--;

  setCount(count);
});

resetButton.addEventListener("click", () => {
  count = 0;

  setCount(count);
});

counterInput.addEventListener("input", (event) => {
  inputText = event.target.value;
});

const clearInput = () => {
  inputText = "";
  counterInput.value = "";
  alertText.innerText = "";
};

setButton.addEventListener("click", () => {
  clearInput();

  if (inputText === "" || isNaN(inputText)) {
    alertText.innerText = "Enter a number!";

    return;
  }

  count = parseInt(inputText);

  setCount(count);
});

const setInitialCount = () => {
  const storedCountString = localStorage.getItem("count") ?? 0;
  const storedCount = parseInt(storedCountString);

  count = storedCount;

  setCount(count);
};

setInitialCount();
