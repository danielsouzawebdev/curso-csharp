(() => {
  const modules = [
    ['modulo0-ambiente-ferramentas','M0','Ambiente'],
    ['modulo1-logica-estruturada','M1','Lógica'],
    ['modulo2-poo','M2','POO'],
    ['modulo3-windows-forms','M3','Windows Forms'],
    ['modulo4-ux-ui','M4','UX/UI'],
    ['modulo5-banco-dados','M5','Banco'],
    ['modulo6-qualidade-codigo','M6','Código'],
    ['modulo7-gestao-qualidade','M7','Qualidade'],
    ['modulo8-projeto-integrador','M8','Projeto']
  ];
  const path = location.pathname;
  const completed = new Set(JSON.parse(localStorage.getItem('csharp-course:completed') || '[]'));
  const main = document.querySelector('main');
  if (!main) return;
  const bodyModule = Number(document.body.dataset.module);
  const inModule = Number.isInteger(bodyModule) && bodyModule >= 0 && bodyModule <= 8;
  const prefix = inModule ? '../' : '';

  // Barra horizontal entre módulos: torna a trilha acessível em qualquer página.
  const header = document.querySelector('header');
  if (header && !header.querySelector('.module-strip')) {
    const strip = document.createElement('div');
    strip.className = 'module-strip';
    strip.setAttribute('aria-label','Navegação entre módulos');
    strip.innerHTML = modules.map((m,i) => `<a href="${prefix}${m[0]}/index.html" class="${inModule && i===bodyModule ? 'active':''}" title="Módulo ${i} · ${m[2]}">${m[1]} · ${m[2]}</a>`).join('');
    header.appendChild(strip);
  }

  // Abas da página atual do módulo.
  if (inModule && !main.querySelector('.page-tabs')) {
    const current = document.body.dataset.page || 'index';
    const tabs = document.createElement('nav');
    tabs.className='page-tabs'; tabs.setAttribute('aria-label','Etapas do módulo');
    const pages=[['index','index.html','Visão geral'],['teoria','teoria.html','Teoria'],['pratica','pratica.html','Prática'],['avaliacao','avaliacao.html','Avaliação']];
    tabs.innerHTML=pages.map(p=>`<a href="${p[1]}" class="${current===p[0]?'active':''}">${p[2]}</a>`).join('');
    const bc=main.querySelector('.breadcrumb');
    (bc || main.firstElementChild)?.insertAdjacentElement('afterend',tabs);
  }

  // Copiar código.
  document.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.copy-code')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-code'; btn.type = 'button'; btn.textContent = 'Copiar';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText.replace('Copiar','');
      try { await navigator.clipboard.writeText(code); btn.textContent = 'Copiado ✓'; }
      catch { btn.textContent = 'Selecione e copie'; }
      setTimeout(() => btn.textContent = 'Copiar', 1500);
    });
    pre.appendChild(btn);
  });

  // Tabelas responsivas.
  document.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('table-wrap')) return;
    const wrap = document.createElement('div'); wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table); wrap.appendChild(table);
  });

  // Ferramentas de estudo.
  const tools = document.createElement('div'); tools.className = 'learning-tools';
  const done = completed.has(path);
  tools.innerHTML = `<button type="button" data-action="done">${done ? '✓ Etapa concluída' : 'Marcar como concluída'}</button><button type="button" data-action="top">↑ Voltar ao topo</button><button type="button" data-action="print">Imprimir / PDF</button>`;
  const tabs=main.querySelector('.page-tabs');
  (tabs || main.firstElementChild)?.insertAdjacentElement('afterend', tools);
  tools.querySelector('[data-action="done"]').addEventListener('click', (e) => {
    if (completed.has(path)) completed.delete(path); else completed.add(path);
    localStorage.setItem('csharp-course:completed', JSON.stringify([...completed]));
    e.currentTarget.textContent = completed.has(path) ? '✓ Etapa concluída' : 'Marcar como concluída';
    updateProgress();
  });
  tools.querySelector('[data-action="top"]').onclick = () => scrollTo({top:0, behavior:'smooth'});
  tools.querySelector('[data-action="print"]').onclick = () => print();

  // Módulo anterior / próximo no fim de qualquer página do módulo.
  if (inModule && !main.querySelector('.module-neighbors')) {
    const wrap=document.createElement('div'); wrap.className='module-neighbors';
    const prev=bodyModule>0 ? modules[bodyModule-1] : null;
    const next=bodyModule<modules.length-1 ? modules[bodyModule+1] : null;
    wrap.innerHTML = `${prev?`<a href="../${prev[0]}/index.html"><small>← Módulo anterior</small><strong>${prev[1]} · ${prev[2]}</strong></a>`:'<span></span>'}${next?`<a class="next" href="../${next[0]}/index.html"><small>Próximo módulo →</small><strong>${next[1]} · ${next[2]}</strong></a>`:''}`;
    main.appendChild(wrap);
  }

  function updateProgress(){
    let progress = document.querySelector('.course-progress');
    if(!progress){
      progress=document.createElement('div'); progress.className='course-progress';
      progress.innerHTML='<span>Seu progresso</span><div class="course-progress-track"><div class="course-progress-bar"></div></div><strong>0%</strong>';
      header?.insertBefore(progress, header.querySelector('.module-strip'));
    }
    const total = 36; // 9 módulos × 4 páginas
    const n = new Set([...completed].filter(p=>p.includes('modulo'))).size;
    const pct = Math.min(100, Math.round(n/total*100));
    progress.querySelector('.course-progress-bar').style.width = pct+'%';
    progress.querySelector('strong').textContent = pct+'%';
  }
  updateProgress();
})();
