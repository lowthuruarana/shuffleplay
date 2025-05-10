const titleEl   = document.getElementById('title');
const categoryEl = document.getElementById('category');
const watchBtn  = document.getElementById('watchBtn');
const anotherBtn = document.getElementById('anotherBtn');

let list = [];

fetch('data/videos.json')
  .then(r => r.json())
  .then(data => {
    list = data;
    pick();
  })
  .catch(err => {
    console.error(err);
    titleEl.textContent = '⚠️  දේශනා පූරණය කළ නොහැකි විය';
    if (categoryEl) categoryEl.style.display = 'none';
  });

function pick() {
  if (!list.length) return;
  const item = list[Math.floor(Math.random() * list.length)];
  titleEl.textContent = item.title;
  watchBtn.href = item.link;
  if (item.category) {
    categoryEl.textContent = `(Category: ${item.category})`;
  } else {
    categoryEl.textContent = '(Category: not available)';
  }
  categoryEl.style.display = '';
}

anotherBtn.addEventListener('click', pick); 