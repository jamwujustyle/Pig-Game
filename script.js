'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceImage = document.querySelector('.dice')

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let accumulator, activePlayer, scores, running;

diceImage.classList.add('hidden');

const init = function () {
  accumulator = 0;
  activePlayer = 0;
  scores = [0, 0]
  running = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceImage.classList.add('hidden')
}
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  accumulator = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}
init();

btnRoll.addEventListener('click', function () {
  if(running){
const dice = Math.trunc(Math.random() * 6) + 1;

diceImage.src = `dice-${dice}.png`;
diceImage.classList.remove('hidden')

  if(dice !== 1) {
    accumulator += dice;
    document.getElementById(`current--${activePlayer}`).textContent = accumulator;
  }else {
    switchPlayers();
  }
}
});

btnHold.addEventListener('click', function () {
  if(running) {
  scores[activePlayer] += accumulator;

  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 10){
      running = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.getElementById(`player--${activePlayer}`).classList.remove('player--active');
      diceImage.classList.add('hidden');
    }else {
      switchPlayers();
    }
  }
});
btnNew.addEventListener('click', init);