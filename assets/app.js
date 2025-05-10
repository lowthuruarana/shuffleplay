const titleEl   = document.getElementById('title');
const categoryEl = document.getElementById('category');
const watchBtn  = document.getElementById('watchBtn');
const anotherBtn = document.getElementById('anotherBtn');
const thumbnailEl = document.getElementById('thumbnail');

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
    categoryEl.textContent = '';
    if (thumbnailEl) thumbnailEl.style.display = 'none';
  });

function getYouTubeId(url) {
  // Handles both youtu.be and youtube.com links
  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function pick() {
  if (!list.length) return;
  const item = list[Math.floor(Math.random() * list.length)];
  titleEl.textContent = item.title;
  watchBtn.href = item.link;
  categoryEl.textContent = `(Category: ${item.category ? item.category : 'not available'})`;

  // Set thumbnail
  const videoId = getYouTubeId(item.link);
  if (videoId) {
    thumbnailEl.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnailEl.style.display = '';
  } else {
    thumbnailEl.style.display = 'none';
  }
}

anotherBtn.addEventListener('click', pick); 