// app.js — simple, readable, beginner-friendly
(() => {
  // DOM nodes
  const chooseHeads = document.getElementById('choose-heads');
  const chooseTails = document.getElementById('choose-tails');
  const player2Choice = document.getElementById('player2-choice');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const flipsEl = document.getElementById('flips');
  const p1CountEl = document.getElementById('p1-count');
  const p2CountEl = document.getElementById('p2-count');
  const finalEl = document.getElementById('final');
  const roundsInput = document.getElementById('rounds');

  let player1 = null; // 'Heads' or 'Tails'
  let player2 = null;
  let isRunning = false;

  function setChoice(choice) {
    if (isRunning) return;
    player1 = choice;
    player2 = (choice === 'Heads') ? 'Tails' : 'Heads';
    player2Choice.textContent = player2;
    startBtn.disabled = false;
    chooseHeads.classList.toggle('selected', choice === 'Heads');
    chooseTails.classList.toggle('selected', choice === 'Tails');
  }

  chooseHeads.addEventListener('click', () => setChoice('Heads'));
  chooseTails.addEventListener('click', () => setChoice('Tails'));

  function randFlip() {
    return (Math.random() < 0.5) ? 'Heads' : 'Tails';
  }

  function appendFlip(i, value) {
    const row = document.createElement('div');
    row.className = 'flip-row';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `Flip ${i}`;
    const result = document.createElement('div');
    result.textContent = value;
    result.className = value === 'Heads' ? 'flip-heads' : 'flip-tails';
    row.appendChild(label);
    row.appendChild(result);
    flipsEl.prepend(row); // show newest at top
  }

  function reset() {
    isRunning = false;
    player1 = null;
    player2 = null;
    player2Choice.textContent = '—';
    flipsEl.innerHTML = '';
    p1CountEl.textContent = '0';
    p2CountEl.textContent = '0';
    finalEl.textContent = '';
    startBtn.disabled = true;
    chooseHeads.classList.remove('selected');
    chooseTails.classList.remove('selected');
  }

  resetBtn.addEventListener('click', reset);

  async function runGame() {
    if (!player1) return;
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    flipsEl.innerHTML = '';
    finalEl.textContent = '';
    let rounds = parseInt(roundsInput.value, 10) || 10;
    rounds = Math.max(1, Math.min(100, rounds));
    let p1 = 0, p2 = 0;

    for (let i = 1; i <= rounds; i++) {
      // small pause to animate and let user watch flips
      await new Promise(r => setTimeout(r, 300));

      const flip = randFlip();
      appendFlip(i, flip);

      if (flip === player1) p1++;
      else p2++;

      p1CountEl.textContent = p1;
      p2CountEl.textContent = p2;
    }

    // final message
    let msg;
    if (p1 > p2) msg = `🎉 Player 1 wins! (${p1} vs ${p2})`;
    else if (p2 > p1) msg = `🎉 Player 2 wins! (${p2} vs ${p1})`;
    else msg = `🤝 It's a draw! (${p1} - ${p2})`;
    finalEl.textContent = msg;

    isRunning = false;
  }

  startBtn.addEventListener('click', runGame);

  // keyboard accessibility: press H/T to choose, Enter to start
  window.addEventListener('keydown', (e) => {
    if (isRunning) return;
    const key = e.key.toLowerCase();
    if (key === 'h') setChoice('Heads');
    if (key === 't') setChoice('Tails');
    if (key === 'enter' && player1) runGame();
  });

})();
