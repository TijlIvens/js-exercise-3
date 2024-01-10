const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const totalDice = document.getElementById("totalDice");
const rollButton = document.getElementById("rollButton");

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

rollButton.addEventListener("click", () => {
  rollDice();
});
