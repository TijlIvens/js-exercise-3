const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const totalDice = document.getElementById("totalDice");
const rollButton = document.getElementById("rollButton");
const resultsList = document.getElementById("resultsList");

const getRandomRoll = () => Math.floor(Math.random() * 6) + 1;

const rollDice = () => {
  const roll1 = getRandomRoll();
  const roll2 = getRandomRoll();
  const totalRoll = roll1 + roll2;

  dice1.innerText = roll1;
  dice2.innerText = roll2;

  totalDice.innerText = totalRoll;

  return totalRoll;
};

const addResult = (result) => {
  const resultText = document.createElement("p");
  resultText.innerText = result;
  resultsList.appendChild(resultText);
};

const saveResult = (result) => {
  const storedString = localStorage.getItem("results");

  const storedItems = storedString?.split(",") ?? [];

  const newItems = [...storedItems, result];

  localStorage.setItem("results", newItems.join(","));
};

rollButton.addEventListener("click", () => {
  const total = rollDice();

  addResult(total);
  saveResult(total);
});

const loadSavedResults = () => {
  const storedString = localStorage.getItem("results") ?? "";

  const storedItems = storedString.split(",");

  storedItems.forEach((item) => {
    addResult(item);
  });
};

loadSavedResults();
