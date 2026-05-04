/* ============================================================
   SITE ACADÊMICO - JAVASCRIPT COMPARTILHADO
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- NAVEGAÇÃO MOBILE ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      this.classList.toggle('open');
      links.classList.toggle('open');
    });
    // Fecha ao clicar em qualquer link
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  /* ---------- MARCA LINK ATIVO NA NAVBAR ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- BUSCA GLOBAL (páginas: materiais e provas) ---------- */
  const searchInput = document.getElementById('search-input');
  const searchCount = document.getElementById('search-count');

  if (searchInput) {
    const searchTargets = document.querySelectorAll('[data-searchable]');

    function doSearch() {
      const q = searchInput.value.trim().toLowerCase();
      let visible = 0;
      searchTargets.forEach(el => {
        const text = el.textContent.toLowerCase();
        const match = q === '' || text.includes(q);
        el.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (searchCount) {
        if (q === '') {
          searchCount.textContent = '';
        } else {
          searchCount.textContent =
            visible === 0 ? 'Nenhum resultado encontrado.'
              : `${visible} resultado${visible !== 1 ? 's' : ''} encontrado${visible !== 1 ? 's' : ''}.`;
        }
      }
    }

    searchInput.addEventListener('input', doSearch);
    // Limpa ao pressionar ESC
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { this.value = ''; doSearch(); }
    });
  }

  /* ---------- ABAS DE PROVAS (tabs por disciplina) ---------- */
  document.querySelectorAll('.exam-tabs').forEach(tabGroup => {
    const tabs   = tabGroup.querySelectorAll('.exam-tab');
    const panels = tabGroup.parentElement.querySelectorAll('.exam-panel');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });

    // Ativa o primeiro por padrão
    if (tabs[0]) tabs[0].click();
  });

  /* ---------- LAZY LOAD DOS IFRAMES DO YOUTUBE ----------
     Os iframes ficam com src vazio e o atributo data-src.
     Ao clicar no placeholder, o iframe é carregado.        */
  document.querySelectorAll('.video-thumb-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      const wrapper = this.parentElement;
      const iframe  = wrapper.querySelector('iframe[data-src]');
      if (iframe) {
        iframe.src = iframe.dataset.src + '?autoplay=1';
        this.style.display = 'none';
        iframe.style.display = 'block';
      }
    });
  });

});
