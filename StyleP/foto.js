const grid = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const lightboxLoader = document.getElementById('lightboxLoader');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    let currentIndex = 0;
    let page = 0; // Pagina corrente
    const PAGE_SIZE = 12; // Quante thumbs per pagina
    function renderGrid() {
      grid.innerHTML = '';
      const start = page * PAGE_SIZE;
      const end = Math.min(start + PAGE_SIZE, window.galleryImages.length);
      for (let i = start; i < end; i++) {
        const a = document.createElement('a');
        a.href = '#';
        a.onclick = e => { e.preventDefault(); showLightbox(i); };
        const img = document.createElement('img');
        img.src = 'public/images/thumbs/' + window.galleryImages[i];
        img.className = 'gallery-thumb';
        img.alt = `Anteprima ${i+1}`;
        img.loading = 'lazy';
        a.appendChild(img);
        grid.appendChild(a);
      }
      prevPageBtn.disabled = page===0;
      nextPageBtn.disabled = (end>=window.galleryImages.length);
    }
    prevPageBtn.onclick = function(){
      if (page>0){ page--; renderGrid(); window.scrollTo(0, grid.offsetTop-30); }
    };
    nextPageBtn.onclick = function(){
      const nextStart = (page+1)*PAGE_SIZE;
      if (nextStart<window.galleryImages.length) { page++; renderGrid(); window.scrollTo(0, grid.offsetTop-30); }
    };
    function showLightbox(i) {
      currentIndex = i;
      lightboxImg.style.display = 'none';
      lightboxLoader.style.display = 'block';
      const bigSrc = 'public/images/web/' + window.galleryImages[i];
      lightboxImg.src = bigSrc;
      downloadBtn.href = 'public/images/original/' + window.galleryImages[i];
      downloadBtn.setAttribute('download', window.galleryImages[i]);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lightboxImg.onload = function(){ lightboxImg.style.display = 'block'; lightboxLoader.style.display = 'none'; };
      lightboxImg.onerror = function(){ lightboxLoader.innerText = 'Immagine non trovata!'; };
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    closeBtn.onclick = closeLightbox;
    prevBtn.onclick = function() {
      let idx = currentIndex-1; if(idx<0) idx=window.galleryImages.length-1;
      showLightbox(idx);
    };
    nextBtn.onclick = function() {
      let idx = (currentIndex+1)%window.galleryImages.length;
      showLightbox(idx);
    };
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn.onclick();
      if (e.key === 'ArrowRight') nextBtn.onclick();
    });
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    // Swipe mobile per lightbox
    let startX = null;
    lightboxImg.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; });
    lightboxImg.addEventListener('touchend', function(e){
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { if (dx > 0) prevBtn.onclick(); else nextBtn.onclick(); }
      startX = null;
    });
    // Avvio (solo se immagini trovate):
    if (window.galleryImages && window.galleryImages.length) {
      renderGrid();
    } else {
      grid.innerText = 'Nessuna immagine trovata.';
      prevPageBtn.style.display = nextPageBtn.style.display = "none";
    }
