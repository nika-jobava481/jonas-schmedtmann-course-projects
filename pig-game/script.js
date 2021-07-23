'use strict';

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

const btnsArr = document.querySelectorAll(".btn");

const dice = document.querySelector(".dice");

let scoresArr, activePlayer, playing, currentScore;

const resetGame = function () {
    scoresArr = [0, 0];
    activePlayer = 0;
    playing = true;
    currentScore = 0;

    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
}
resetGame();

const switchPlayer = function () {
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
}
rollBtn.addEventListener("click", function () {
    if (playing) {
        const diceNum = Math.ceil(Math.random() * 6);
        //display dice
        dice.classList.remove("hidden");
        dice.src = `dice-${diceNum}.png`;

        if (diceNum !== 1) {
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});
holdBtn.addEventListener("click", function () {
    if (playing) {
        scoresArr[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scoresArr[activePlayer];
        if (scoresArr[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            playing = false;
        } else {
            switchPlayer();
        }
    }
});
newGameBtn.addEventListener("click", resetGame);