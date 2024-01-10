const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const totalDice = document.getElementById("totalDice");
const rollButton = document.getElementById("rollButton");
const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const playersText = document.getElementById("players");
const currentPlayerText = document.getElementById("currentPlayer");
const resultsList = document.getElementById("resultsList");
const resetButton = document.getElementById("resetButton");

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

const getStoredNames = () => {
  const storedString = localStorage.getItem("names");

  const storedItems = storedString?.split(",") ?? [];

  return storedItems;
};

const showNextPlayer = () => {
  let currentPlayer = parseInt(localStorage.getItem("currentPlayer") ?? "0");

  const names = getStoredNames();

  if (names.length > 0) {
    currentPlayer++;
    if (currentPlayer >= names.length) {
      currentPlayer = 0;
    }

    currentPlayerText.innerText = names[currentPlayer];

    localStorage.setItem("currentPlayer", currentPlayer);
  }
};

rollButton.addEventListener("click", () => {
  const total = rollDice();

  addResult(total);
  saveResult(total);
  showNextPlayer();
});

const onReset = () => {
  resultsList.innerHTML = "";
  dice1.innerText = "";
  dice2.innerText = "";
  totalDice.innerText = "";
  currentPlayer.innerText = "";

  localStorage.clear();

  playersText.innerText = "Add players";
};

resetButton.addEventListener("click", onReset);

const onAddName = () => {
  const name = input.value;

  input.value = "";

  const names = getStoredNames();

  const newItems = [...names, name];

  localStorage.setItem("names", newItems.join(","));

  playersText.innerText = `Players: ${newItems.join(", ")}`;
};

addButton.addEventListener("click", onAddName);

const loadSavedResults = () => {
  const storedString = localStorage.getItem("results") ?? "";

  const storedItems = storedString.split(",");

  storedItems.forEach((item) => {
    addResult(item);
  });
};

const loadSavedNames = () => {
  const names = getStoredNames();

  if (names.length > 0) {
    playersText.innerText = `Players: ${names.join(", ")}`;

    const currentPlayer = parseInt(
      localStorage.getItem("currentPlayer") ?? "0"
    );
    currentPlayerText.innerText = names[currentPlayer];
  } else {
    playersText.innerText = "Add players";
  }
};

loadSavedResults();
