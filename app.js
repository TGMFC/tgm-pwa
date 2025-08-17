// Load Fixtures
fetch('/fixtures.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('fixtures-list');
    data.forEach(game => {
      const div = document.createElement('div');
      div.innerHTML = `<p><strong>${game.date}</strong>: ${game.opponent} at ${game.venue}</p>`;
      list.appendChild(div);
    });
  });

// Load Announcements
fetch('/announcements.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('announcements-list');
    data.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `<p><strong>${post.title}</strong>: ${post.message}</p>`;
      list.appendChild(div);
    });
  });

// Populate Game Select
fetch('/fixtures.json')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('game-select');
    data.forEach(game => {
      const option = document.createElement('option');
      option.value = game.id;
      option.textContent = `${game.date} vs ${game.opponent}`;
      select.appendChild(option);
    });
  });

// RSVP Form Submit
document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('player-name').value;
  const gameId = document.getElementById('game-select').value;

  // Simulate sending to Google Sheets (we'll connect this next)
  alert(`RSVP received, ${name}! You're in for game ${gameId}.`);
  document.getElementById('rsvp-success').classList.remove('hidden');

  // Reset form
  document.getElementById('rsvp-form').reset();
});
