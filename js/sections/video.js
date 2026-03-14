export function initVideo() {
  const video = document.getElementById('mainVideo');
  const items = document.querySelectorAll('.video-playlist-item');
  if (!video || !items.length) return;

  items.forEach(item => {
    item.addEventListener('click', function () {
      if (item.classList.contains('active')) return;

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const src = item.getAttribute('data-src');
      while (video.firstChild) video.removeChild(video.firstChild);
      const source = document.createElement('source');
      source.setAttribute('src', src);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);
      video.load();

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const tryPlay = () => {
            video.play();
            video.removeEventListener('loadeddata', tryPlay);
          };
          video.addEventListener('loadeddata', tryPlay);
        });
      }
    });
  });
}