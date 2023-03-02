'use strict';
//IMPLEMENT HELP USING MODALS WITH AT LEAST 2 LANGUAGES - CREATED MENU BUTTON
//LET USER SET GAME POINT LIMIT FOR WIN - DONE
//ADD WIN MESSAGE ON SCREEN USING MODAL
//ADD DARK AND LIGHT THEME TO THE GAME AND BUTTON FOR IT
//ADD USER NAMES INSTEAD OF PLAYER 1 AND 2

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, gameScore;

//Initialize Game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  gameScore = Number(prompt(`Points to win?`));
};

//Save current score to global score
const saveScore = () => {
  //SAVE SCORES AND SET THEM
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

init();
//Switch player
const switchPlayer = () => {
  saveScore();
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//CHECKS WINNER BEFORE CLICKING BUTTON
const isThereWinner = () => {
  if (scores[activePlayer] + currentScore >= gameScore) {
    saveScore();
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    playing = false;
    return true;
  }
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    dicee = dice;
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Checking if dice is 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
    isThereWinner();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
