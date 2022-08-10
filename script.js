'use strict';

function displayCurrentScore(currentScore) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

function displayScore(score) {
  document.getElementById(`score--${activePlayer}`).textContent = score;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function rollValue() {
  return Math.trunc(Math.random() * 6) + 1;
}

function rollDice() {
  if (playing) {
    // Generate random dice roll
    let roll = rollValue();

    // Display Dice
    diceEl.src = `dice-${roll}.png`;
    diceEl.classList.remove('hidden');

    // Check for rolled 1 ? switch to next player
    if (roll !== 1) {
      currentScore += roll;
      displayCurrentScore(currentScore);
    } else {
      // Switch to next player
      currentScore = 0;
      displayCurrentScore(currentScore);
      switchPlayer();
    }
  }
}

function hold() {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    displayScore(scores[activePlayer]);

    // if player's score is >= 100 finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector('.dice').classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
}

function reset() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector(`.player--${activePlayer}`);

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0.classList.toggle('player--active');
}

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Roll Dice Functionality
btnRoll.addEventListener('click', rollDice);

// Hold functionality
btnHold.addEventListener('click', hold);

// New game
btnNew.addEventListener('click', reset);
