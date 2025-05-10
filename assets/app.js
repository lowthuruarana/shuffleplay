// Browser detection
const isDesktopChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent);

const titleEl   = document.getElementById('title');
const categoryEl = document.getElementById('category');
const anotherBtn = document.getElementById('anotherBtn');
const ytplayerEl = document.getElementById('ytplayer');

let list = [];

fetch('data/videos.json')
  .then(r => r.json())
  .then(data => {
    list = data;
    pick();
  })
  .catch(err => {
    console.error(err);
    titleEl.textContent = '⚠️ දේශනා ලබා ගත නොහැක';
    categoryEl.textContent = '';
    if (ytplayerEl) ytplayerEl.style.display = 'none';
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
  categoryEl.textContent = `(Category: ${item.category ? item.category : 'not available'})`;

  // Set embedded player
  const videoId = getYouTubeId(item.link);
  if (videoId) {
    ytplayerEl.src = `https://www.youtube.com/embed/${videoId}`;
    ytplayerEl.style.display = '';
  } else {
    ytplayerEl.src = '';
    ytplayerEl.style.display = 'none';
  }
}

anotherBtn.addEventListener('click', pick); 