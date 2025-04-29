const buttons = document.querySelectorAll('.rating-button');
const result = document.getElementById('rating-result');

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b, i) => {
      b.classList.toggle('selected', i <= index);
    });
    result.textContent = `You rated ${index + 1} / 5`;
  });
});