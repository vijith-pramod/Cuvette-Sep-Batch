// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const scoreNumber = document.querySelector(".score__number");
const myscoreNumber = document.querySelector(".myscore__number");

let score = 0;
let myscore = 0;

// Function to get scores from localStorage on page load
window.addEventListener('load', () => {
  // Retrieve scores from localStorage if available, or set default values to 0
  score = parseInt(localStorage.getItem('score')) || 0;
  myscore = parseInt(localStorage.getItem('myscore')) || 0;

  // Update the displayed scores
  scoreNumber.innerText = score;
  myscoreNumber.innerText = myscore;
});

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win Against PC";
      resultDivs[0].classList.toggle("winner");
      mykeepScore(1);

      // Show the "Next" button only if the user wins
      nextBtn.style.display = "block"; // Show the next button
    } else if (aiWins) {
      resultText.innerText = "You lose";
      resultDivs[1].classList.toggle("winner");
      keepScore(1);

      // Hide the "Next" button if the user loses
      nextBtn.style.display = "none"; // Hide the next button
    } else {
      resultText.innerText = "Draw";

      // Hide the "Next" button if it's a draw
      nextBtn.style.display = "none"; // Hide the next button
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Function to update localStorage with scores
function updateLocalStorageScores() {
  localStorage.setItem('score', score);
  localStorage.setItem('myscore', myscore);
}

// Inside keepScore() and mykeepScore() functions, update the scores and local storage
function mykeepScore(point){
  myscore += point;
  myscoreNumber.innerHTML = myscore;
  updateLocalStorageScores(); // Update local storage with myscore
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  updateLocalStorageScores(); // Update local storage with score
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
