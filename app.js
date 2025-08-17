// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  loadFixtures();
  setupTabs();
  setupRSVPForm();
});

// Load Fixtures from JSON
function loadFixtures() {
  const fixturesList = document.getElementById('fixtures-list');

  fetch('/data/fixtures.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load fixtures');
      return response.json();
    })
    .then(data => {
      fixturesList.innerHTML = data.map(fixture => {
        return `
          <div class="fixture-item">
            <h3>${fixture.event}</h3>
            <p><strong>${fixture.day}, ${formatDate(fixture.date)}</strong> | 🕕 ${fixture.time} | 🏟️ ${fixture.location}</p>
          </div>
        `;
      }).join('');
    })
    .catch(err => {
      fixturesList.innerHTML = `<p style="color: #ff6b6b;">⚠️ Fixtures loading failed. Please check data/fixtures.json</p>`;
      console.error(err);
    });
}

// Format Date as "19 Aug"
function formatDate(dateStr) {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateStr).toLocaleDateString('en-ZA', options);
}

// Tab Switching
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// RSVP Form Submission
function setupRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const gameSelect = document.getElementById('game-select');
  const successMsg = document.getElementById('rsvp-success');

  // Populate dropdown with upcoming games
  fetch('/data/fixtures.json')
    .then(res => res.json())
    .then(fixtures => {
      gameSelect.innerHTML = fixtures.map(f => {
        return `<option value="${f.date}">${f.event} – ${f.day}, ${formatDate(f.date)} @ ${f.time}</option>`;
      }).join('');
    });

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('player-name').value;
    const game = gameSelect.value;

    alert(`✅ RSVP confirmed!\nPlayer: ${name}\nGame: ${gameSelect.options[gameSelect.selectedIndex].text}\nWe'll send details via WhatsApp.`);
    
    // Show success message
    successMsg.classList.remove('hidden');
    
    // Reset form
    form.reset();

    // Hide success after 5 seconds
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 5000);
  });
}
