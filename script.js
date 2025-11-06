document.addEventListener('DOMContentLoaded', () => {

  const handleNavbar = () => {
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-menu-toggle');

    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });

        // Chiudi il menu quando si clicca un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
            });
        });
    }
  };

  const handleCountdown = () => {
    const countdownElem = document.getElementById('countdown');
    if (!countdownElem) return;

    const eventDate = new Date('2025-11-07T08:45:00+01:00');

    const tick = () => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        countdownElem.innerHTML = `<p style="font-size:1.2rem; color:var(--c-accent-primary);">L'evento è iniziato!</p>`;
        return;
      }

      const s = Math.floor(diff / 1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;

      document.getElementById('dd').textContent = String(days).padStart(2, '0');
      document.getElementById('hh').textContent = String(hours).padStart(2, '0');
      document.getElementById('mm').textContent = String(minutes).padStart(2, '0');
      document.getElementById('ss').textContent = String(seconds).padStart(2, '0');
    };

    const timer = setInterval(tick, 1000);
    tick();
  };

  const handleProgramTabs = () => {
    const daySwitch = document.getElementById('day-switch');
    if (!daySwitch) return;

    daySwitch.addEventListener('click', (e) => {
      if (!e.target.matches('.pill')) return;
      const day = e.target.dataset.day;

      daySwitch.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');

      document.querySelector('.day-panel.active').classList.remove('active');
      document.getElementById(`panel-day-${day}`).classList.add('active');
    });
  };

  const handleGalleryLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImage.src = item.href;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImage.src = '';
    };

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.matches('.lightbox__close')) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  };

  const handlePdfModal = () => {
    const pdfModal = document.getElementById('pdfModal');
    if (!pdfModal) return;

    const pdfFrame = document.getElementById('pdfFrame');
    const pdfTitleElem = document.getElementById('pdfTitle');

    document.querySelectorAll('.program-slot[data-pdf]').forEach(slot => {
      slot.addEventListener('click', () => {
        const pdfUrl = slot.dataset.pdf;
        const slotTitle = slot.dataset.title || "Dettagli Presentazione";

        pdfFrame.src = pdfUrl + '#toolbar=0&navpanes=0';
        pdfTitleElem.textContent = slotTitle;
        pdfModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closePdfModal = () => {
      pdfModal.classList.remove('open');
      document.body.style.overflow = '';
      pdfFrame.src = '';
      pdfTitleElem.textContent = '';
    };

    pdfModal.addEventListener('click', (e) => {
        if(e.target === pdfModal || e.target.matches('.pdf-modal__close')) {
            closePdfModal();
        }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfModal.classList.contains('open')) closePdfModal();
    });
  };

  // ========== GESTIONE LOADER ==========
  const handleLoader = () => {
    const loaderOverlay = document.getElementById('loaderOverlay');
    if (!loaderOverlay) return;

    // Chiudi il loader cliccando sull'overlay
    loaderOverlay.addEventListener('click', (e) => {
      if (e.target === loaderOverlay) {
        loaderOverlay.classList.remove('active');
      }
    });

    // Applica il loader ai link con classe 'link-con-loader'
    document.querySelectorAll('.link-con-loader').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const destinazione = link.href;

        // Mostra il loader
        loaderOverlay.classList.add('active');

        // Vai alla pagina dopo 2 secondi
        setTimeout(() => {
          window.location.href = destinazione;
        }, 3000);
      });
    });
  };

  // Inizializza tutte le funzionalità
  handleNavbar();
  handleCountdown();
  handleProgramTabs();
  handleGalleryLightbox();
  handlePdfModal();
  handleLoader(); // <-- Aggiunto qui
});

// ========== EVENT LISTENERS PER IL LOADER (fuori da DOMContentLoaded) ==========

// Nascondi il loader quando la pagina si carica
window.addEventListener('load', () => {
  const loaderOverlay = document.getElementById('loaderOverlay');
  if (loaderOverlay) {
    loaderOverlay.classList.remove('active');
  }
});

// Nascondi il loader quando torni indietro
window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
    const loaderOverlay = document.getElementById('loaderOverlay');
    if (loaderOverlay) {
      loaderOverlay.classList.remove('active');
    }
  }
});

// Nascondi il loader prima di lasciare la pagina
//window.addEventListener('beforeunload', () => {
//  const loaderOverlay = document.getElementById('loaderOverlay');
//  if (loaderOverlay) {
//    loaderOverlay.classList.remove('active');
//  }
//});
// Quando mostri il loader
loaderOverlay.classList.add('active');
document.body.classList.add('loader-active');

// Quando nascondi il loader
loaderOverlay.classList.remove('active');
document.body.classList.remove('loader-active');
