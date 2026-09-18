const photos = Array.from({ length: 14 }, (_, i) => `images/${String(i + 1).padStart(2, '0')}.jpg`);
const buttons = document.querySelectorAll('.photo-button');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const count = document.getElementById('photoCount');
let current = 0;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  lightboxImage.src = photos[current];
  lightboxImage.alt = `Birthday memory ${current + 1}`;
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${photos.length}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closePhoto() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
buttons.forEach((button) => button.addEventListener('click', () => showPhoto(Number(button.dataset.index))));
document.getElementById('closeLightbox').addEventListener('click', closePhoto);
document.getElementById('prevPhoto').addEventListener('click', () => showPhoto(current - 1));
document.getElementById('nextPhoto').addEventListener('click', () => showPhoto(current + 1));
document.getElementById('surpriseButton').addEventListener('click', () => document.getElementById('memories').scrollIntoView({ behavior: 'smooth' }));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closePhoto(); });
document.addEventListener('keydown', (event) => { if (!lightbox.classList.contains('open')) return; if (event.key === 'Escape') closePhoto(); if (event.key === 'ArrowLeft') showPhoto(current - 1); if (event.key === 'ArrowRight') showPhoto(current + 1); });
