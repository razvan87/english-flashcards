const container = document.getElementById('cards-container');

async function fetchCards() {
  try {
    const response = await fetch('http://localhost:3000/api/cards');
    const data = await response.json();

    data.data.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.classList.add('card');

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">${card.text}</div>
          <div class="card-back">
            ${card.meanings.map(m => `<p><strong>${m.partOfSpeech}:</strong> ${m.definition}</p>`).join('')}
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');
      });

      container.appendChild(cardEl);
    });
  } catch (err) {
    console.error('Error fetching cards:', err);
    container.innerHTML = '<p>Failed to load cards.</p>';
  }
}

fetchCards();
