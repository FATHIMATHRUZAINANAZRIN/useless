const startBtn = document.getElementById('startBtn');
const textInput = document.getElementById('textInput');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timerDisplay');
const messageDisplay = document.getElementById('messageDisplay');

let countdown = null;

startBtn.addEventListener('click', startSaveCountdown);

function startSaveCountdown() {
  if (countdown) { clearInterval(countdown); countdown = null; }

  const text = textInput.value.trim();
  if (!text) { alert('Type something first!'); return; }

  messageDisplay.textContent = text;
  textInput.value = '';

  let timeLeft = Math.max(1, parseInt(secondsInput.value, 10) || 5);
  timerDisplay.textContent = `Saving in ${timeLeft} second${timeLeft > 1 ? 's' : ''}...`;

  countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerDisplay.textContent = `Saving in ${timeLeft} second${timeLeft > 1 ? 's' : ''}...`;
    } else {
      clearInterval(countdown);
      countdown = null;
      timerDisplay.textContent = '✅ Message saved!';
      saveMessage(messageDisplay.textContent);
    }
  }, 1000);
}

function saveMessage(text) {
  // Save to localStorage
  const savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  savedMessages.push({ text, date: new Date().toLocaleString() });
  localStorage.setItem('savedMessages', JSON.stringify(savedMessages));

  // Optional: Show a confirmation effect
  messageDisplay.classList.add('fade-in');
  setTimeout(() => {
    messageDisplay.classList.remove('fade-in');
  }, 800);
}
