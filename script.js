document.addEventListener('DOMContentLoaded', () => {

  // Gestione Navbar: aggiunge/rimuove classe 'scrolled' in base allo scroll
  const handleNavbarScroll = () => {
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
  };

  // Countdown per l'evento
  const handleCountdown = () => {
    const countdownElem = document.getElementById('countdown');
    if (!countdownElem) return;

    // Imposta la data del tuo evento
    const eventDate = new Date('2025-11-06T09:00:00+01:00'); // 6 Novembre 2025, 09:00 AM, fuso orario +01:00

    const tick = () => {
      const now = new Date();
      const diff = eventDate - now; // Differenza in millisecondi

      if (diff <= 0) {
        clearInterval(timer); // Ferma il countdown
        countdownElem.innerHTML = `<p style="font-size:1.2rem; color:var(--c-accent-primary);">L'evento è iniziato!</p>`;
        return;
      }

      // Calcola giorni, ore, minuti, secondi
      const s = Math.floor(diff / 1000); // Secondi totali
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;

      // Aggiorna il DOM, assicurandosi che i numeri abbiano sempre 2 cifre
      document.getElementById('dd').textContent = String(days).padStart(2, '0');
      document.getElementById('hh').textContent = String(hours).padStart(2, '0');
      document.getElementById('mm').textContent = String(minutes).padStart(2, '0');
      document.getElementById('ss').textContent = String(seconds).padStart(2, '0');
    };

    // Aggiorna ogni secondo
    const timer = setInterval(tick, 1000);
    tick(); // Esegui subito all'inizio per popolare il countdown immediatamente
  };

  // Gestione Tab del Programma
  const handleProgramTabs = () => {
    const daySwitch = document.getElementById('day-switch');
    if (!daySwitch) return;

    daySwitch.addEventListener('click', (e) => {
      // Assicurati che il click sia su un bottone con classe 'pill'
      if (!e.target.matches('.pill')) return;

      const day = e.target.dataset.day; // Ottieni il giorno dal data-day attributo

      // Rimuovi la classe 'active' da tutti i bottoni e i pannelli
      daySwitch.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.day-panel').forEach(panel => panel.classList.remove('active'));

      // Aggiungi la classe 'active' al bottone e al pannello del giorno cliccato
      e.target.classList.add('active');
      document.getElementById(`panel-day-${day}`).classList.add('active');
    });
  };

  // Gestione Lightbox per la Galleria immagini
  const handleGalleryLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault(); // Previene il comportamento predefinito del link
        lightboxImage.src = item.href; // Imposta la sorgente dell'immagine grande
        lightbox.classList.add('open'); // Apre la lightbox
        document.body.style.overflow = 'hidden'; // Blocca lo scroll del body
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open'); // Chiude la lightbox
      document.body.style.overflow = ''; // Ripristina lo scroll del body
      lightboxImage.src = ''; // Pulisce la sorgente dell'immagine
    };

    // Chiudi la lightbox cliccando sullo sfondo o sul bottone di chiusura
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.matches('.lightbox__close')) {
        closeLightbox();
      }
    });
    // Chiudi la lightbox premendo ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  };

  // Gestione PDF Modal per le slide del programma
  const handlePdfModal = () => {
    const pdfModal = document.getElementById('pdfModal');
    if (!pdfModal) return;

    const pdfFrame = document.getElementById('pdfFrame');
    const pdfTitleElem = document.getElementById('pdfTitle'); // Elemento per il titolo del PDF

    document.querySelectorAll('.program-slot[data-pdf]').forEach(slot => {
      slot.addEventListener('click', () => {
        const pdfUrl = slot.dataset.pdf;
        const slotTitle = slot.dataset.title || "Dettagli Presentazione"; // Prendi il titolo o un default

        pdfFrame.src = pdfUrl + '#toolbar=0&navpanes=0'; // Apre il PDF, nascondendo toolbar e pannelli di navigazione
        pdfTitleElem.textContent = slotTitle; // Imposta il titolo nella modale
        pdfModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closePdfModal = () => {
      pdfModal.classList.remove('open');
      document.body.style.overflow = '';
      pdfFrame.src = ''; // Pulisce il frame per evitare caricamenti persistenti
      pdfTitleElem.textContent = ''; // Pulisce il titolo
    };

    // Chiudi la modale cliccando sullo sfondo o sul bottone di chiusura
    pdfModal.addEventListener('click', (e) => {
        if(e.target === pdfModal || e.target.matches('.pdf-modal__close')) {
            closePdfModal();
        }
    });
    // Chiudi la modale premendo ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfModal.classList.contains('open')) closePdfModal();
    });
  };

  // Inizializza tutte le funzionalità
  handleNavbarScroll();
  handleCountdown();
  handleProgramTabs();
  handleGalleryLightbox();
  handlePdfModal();
});
