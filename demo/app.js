// WurfKit Demo App — main controller
// Tab navigation, rendering, interactions

let weightChart = null;

function goTab(tab, opts) {
  STATE.currentTab = tab;
  document.querySelectorAll('section.tabview').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.add('active');
  document.querySelectorAll('.tb').forEach(b => {
    const matches = b.dataset.go === tab || (tab === 'dog' && b.dataset.go === 'overview') || (tab === 'litter' && b.dataset.go === 'litters');
    b.classList.toggle('active', matches);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAll();
}

function openDogDetail(id) {
  STATE.currentDog = id;
  goTab('dog');
}

function openLitterDetail(id) {
  STATE.currentLitter = id;
  goTab('litter');
}

function statusBadge(p) {
  const map = {
    available: { cls: 'ok', label: t('status.available') },
    reserved: { cls: 'warn', label: t('status.reserved') },
    sold: { cls: 'muted', label: t('status.sold') },
    kept_by_breeder: { cls: 'info', label: t('status.kept_by_breeder') }
  };
  const m = map[p.status] || map.available;
  return `<span class="bg ${m.cls}">${m.label}</span>`;
}

// ===== Render Übersicht =====
function renderOverview() {
  const list = document.getElementById('dog-list');
  if (!list) return;
  list.innerHTML = DOGS.map(d => {
    const badge = `<span class="bg ${d.statusBadge.type}">${d.statusBadge[STATE.lang] || d.statusBadge.de}</span>`;
    return `
      <div class="card clk dc" onclick="openDogDetail('${d.id}')">
        <div class="dav">${d.photo}</div>
        <div class="di">
          <div class="dnm">${d.fullName}</div>
          <div class="dmt"><span>${d.breed}</span> · <span>${formatAge(d.birth)}</span> · <span>${t('sex.' + d.sex)}</span></div>
        </div>
        <div class="bd">${badge}</div>
      </div>
    `;
  }).join('');
}

// ===== Render Dog Detail =====
function renderDogDetail() {
  const dog = DOGS.find(d => d.id === STATE.currentDog);
  if (!dog) return;
  const c = document.getElementById('dog-detail');
  const litters = LITTERS.filter(l => l.damId === dog.id || l.sireId === dog.id);

  // Build Zuchtprüfung if pedigree exists
  let zuchtSection = '';
  if (dog.id === 'luna' || (dog.hd && dog.formwert && dog.ztp)) {
    const items = ZUCHTPRUEFUNG_LUNA.map(it => {
      const cls = it.status === 'ok' ? 'ok' : it.status === 'err' ? 'err' : 'warn';
      const icon = it.status === 'ok' ? '✓' : it.status === 'err' ? '✗' : '!';
      return `<div class="chkr"><div class="chki ${cls}">${icon}</div><div class="chkl">${it.label[STATE.lang] || it.label.de}</div><div class="chks">${it.detail}</div></div>`;
    }).join('');
    const allOk = ZUCHTPRUEFUNG_LUNA.every(it => it.status === 'ok');
    const totalCls = allOk ? 'ok' : 'err';
    const totalLbl = allOk
      ? { de: '✓ Zuchtfähig nach VDH-Zuchtordnung', en: '✓ Breeding-eligible per VDH', ru: '✓ Допущена к разведению по VDH' }
      : { de: '✗ Nicht zuchtfähig — fehlende Nachweise', en: '✗ Not eligible — missing checks', ru: '✗ Не допущена — нет проверок' };
    zuchtSection = `
      <div class="sec">
        <div class="sech">${t('common.breeding')}</div>
        <div class="chk">${items}</div>
        <div class="zst ${totalCls}">${totalLbl[STATE.lang] || totalLbl.de}</div>
      </div>
    `;
  }

  // Litters section
  let lSection = '';
  if (litters.length) {
    lSection = `
      <div class="sec">
        <div class="sech">${dog.sex === 'female' ? (STATE.lang==='de'?'Würfe als Mutter':STATE.lang==='en'?'Litters as dam':'Помёты как мать') : (STATE.lang==='de'?'Würfe als Vater':STATE.lang==='en'?'Litters as sire':'Помёты как отец')}</div>
        ${litters.map(l => `
          <div class="pli" onclick="openLitterDetail('${l.id}')">
            <div class="pliav">🐾</div>
            <div class="plii"><div class="plin">${l.name}</div><div class="plis">${formatDateDE(l.birthDate)} · ${l.wurfStaerke.total} ${t('common.welpen')}</div></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  c.innerHTML = `
    <div class="ddh">
      <div class="dxa">${dog.photo}</div>
      <div>
        <div class="dxn">${dog.fullName}</div>
        <div class="dxs">${dog.breed} · ${t('sex.' + dog.sex)} · ${formatAge(dog.birth)}</div>
        <div class="dxbg"><span class="bg ${dog.statusBadge.type}">${dog.statusBadge[STATE.lang] || dog.statusBadge.de}</span></div>
      </div>
    </div>

    <div class="sec">
      <div class="sech">${STATE.lang === 'de' ? 'Stammdaten' : STATE.lang === 'en' ? 'Basic data' : 'Основные данные'}</div>
      <div class="kv">
        <div class="kvr"><span class="kvk">${t('common.breed')}</span><span class="kvv">${dog.breed}</span></div>
        <div class="kvr"><span class="kvk">${t('common.sex_')}</span><span class="kvv">${t('sex.' + dog.sex)}</span></div>
        <div class="kvr"><span class="kvk">${t('common.birth')}</span><span class="kvv">${formatDateDE(dog.birth)}</span></div>
        <div class="kvr"><span class="kvk">${t('common.color')}</span><span class="kvv">${dog.color}</span></div>
        <div class="kvr"><span class="kvk">${t('common.microchip')}</span><span class="kvv" style="font-family:monospace;font-size:.82rem">${dog.microchip}</span></div>
        <div class="kvr"><span class="kvk">${t('common.zbNr')}</span><span class="kvv">${dog.zbNr}</span></div>
      </div>
    </div>

    <div class="sec">
      <div class="sech">${t('common.health')}</div>
      <div class="kv">
        <div class="kvr"><span class="kvk">HD</span><span class="kvv">${dog.hd}</span></div>
        <div class="kvr"><span class="kvk">ED</span><span class="kvv">${dog.ed}</span></div>
        <div class="kvr"><span class="kvk">${t('common.formwert')}</span><span class="kvv">${dog.formwert}</span></div>
        <div class="kvr"><span class="kvk">${t('common.ztp')}</span><span class="kvv">${dog.ztp ? '✓ ' + formatDateDE(dog.ztpDate) : '—'}</span></div>
        ${dog.eyes ? `<div class="kvr"><span class="kvk">${t('common.eyes')}</span><span class="kvv">${dog.eyes.result} (${formatDateDE(dog.eyes.date)})</span></div>` : ''}
        ${dog.workTitles ? `<div class="kvr"><span class="kvk">${t('common.titles')}</span><span class="kvv">${dog.workTitles.join(', ')}</span></div>` : ''}
      </div>
    </div>

    ${zuchtSection}
    ${lSection}

    ${dog.notes ? `<div class="sec"><div class="sech">${t('common.notes')}</div><p style="font-size:.92rem;color:var(--t2);line-height:1.65">${dog.notes}</p></div>` : ''}
  `;
}

// ===== Render Litters =====
function renderLitters() {
  const list = document.getElementById('litter-list');
  if (!list) return;
  list.innerHTML = LITTERS.map(l => {
    const dam = DOGS.find(d => d.id === l.damId);
    const sireName = l.externalSire ? l.externalSire.name : (DOGS.find(d => d.id === l.sireId) || {}).fullName || '—';
    return `
      <div class="card clk li" onclick="openLitterDetail('${l.id}')">
        <div class="dav">🐾</div>
        <div>
          <div class="lim">${l.name}</div>
          <div class="lis">${dam.fullName} × ${sireName}</div>
          <div class="lis">${formatDateDE(l.birthDate)} · ${l.wurfStaerke.total} ${t('common.welpen')} (${l.wurfStaerke.male} R / ${l.wurfStaerke.female} H)</div>
        </div>
        <div class="bd"><span class="bg info">${STATE.lang === 'de' ? 'Wurfabnahme ✓' : STATE.lang === 'en' ? 'Inspected ✓' : 'Осмотрен ✓'}</span></div>
      </div>
    `;
  }).join('');
}

// ===== Render Litter Detail =====
function renderLitterDetail() {
  const litter = LITTERS.find(l => l.id === STATE.currentLitter);
  if (!litter) return;
  const c = document.getElementById('litter-detail');
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;
  const puppies = PUPPIES.filter(p => p.litterId === litter.id);

  c.innerHTML = `
    <div class="ddh">
      <div class="dxa">🐾</div>
      <div>
        <div class="dxn">${litter.name}</div>
        <div class="dxs">${litter.breed} · ${formatDateDE(litter.birthDate)} · ${litter.weeks} ${STATE.lang === 'de' ? 'Wochen' : STATE.lang === 'en' ? 'weeks' : 'недель'}</div>
        <div class="dxbg"><span class="bg info">Wurfbuchstabe ${litter.litterLetter}</span><span class="bg ok">${litter.wurfStaerke.alive} lebend</span></div>
      </div>
    </div>

    <div class="sec">
      <div class="sech">${t('common.parents')}</div>
      <div class="kv">
        <div class="kvr"><span class="kvk">${t('common.dam')}</span><span class="kvv">${dam.fullName} (${dam.zbNr}, HD ${dam.hd})</span></div>
        <div class="kvr"><span class="kvk">${t('common.sire')}</span><span class="kvv">${sire.name} (${sire.zbNr}, HD ${sire.hd})</span></div>
        <div class="kvr"><span class="kvk">${t('common.deckdate')}</span><span class="kvv">${formatDateDE(litter.deckDate)}</span></div>
        <div class="kvr"><span class="kvk">${t('common.wurfdate')}</span><span class="kvv">${formatDateDE(litter.birthDate)}</span></div>
        <div class="kvr"><span class="kvk">${t('common.wurfstaerke')}</span><span class="kvv">${litter.wurfStaerke.total} (${litter.wurfStaerke.male} R / ${litter.wurfStaerke.female} H)</span></div>
        <div class="kvr"><span class="kvk">${t('common.wurfabnahme')}</span><span class="kvv">${formatDateDE(litter.wurfabnahmeDate)} ✓</span></div>
        <div class="kvr"><span class="kvk">${t('common.wurfmeldung')}</span><span class="kvv">${litter.wurfmeldungSubmitted ? '✓ ' + formatDateDE(litter.wurfmeldungDate) : '—'}</span></div>
      </div>
    </div>

    <div class="sec">
      <div class="sech">${STATE.lang === 'de' ? 'Welpen' : STATE.lang === 'en' ? 'Puppies' : 'Щенки'}</div>
      <div class="pl">
        ${puppies.map(p => `
          <div class="pli" onclick="openPuppy('${p.id}')">
            <div class="pliav">${p.photo}</div>
            <div class="plii">
              <div class="plin">${p.name} <span style="color:var(--t3);font-weight:400">— ${p.fullName}</span></div>
              <div class="plis">${t('sex.' + p.sex)} · ${p.color} · ${(p.weights[p.weights.length-1].g/1000).toFixed(1)} kg</div>
            </div>
            <div>${statusBadge(p)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="sec">
      <div class="sech">${t('common.weight')}</div>
      <div class="chrt"><canvas id="weight-chart"></canvas></div>
    </div>

    <div class="btn-row">
      <button class="btn primary" onclick="openPDFPreview('wurfmeldung','${litter.id}')">📋 ${STATE.lang === 'de' ? 'Wurfmeldung-Datenblatt' : STATE.lang === 'en' ? 'Litter Reg. data sheet' : 'Лист данных Wurfmeldung'}</button>
      <button class="btn secondary" onclick="goTab('coi')">🧬 COI Rechner</button>
    </div>
  `;

  // Init weight chart
  setTimeout(() => initWeightChart(puppies), 0);
}

function initWeightChart(puppies) {
  const ctx = document.getElementById('weight-chart');
  if (!ctx || typeof Chart === 'undefined') return;
  if (weightChart) weightChart.destroy();
  const colors = ['#2D6A4F', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7'];
  weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: puppies[0].weights.map(w => w.week + ' Wo'),
      datasets: puppies.map((p, i) => ({
        label: p.name,
        data: p.weights.map(w => w.g / 1000),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '22',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: { callbacks: { label: c => c.dataset.label + ': ' + c.parsed.y.toFixed(2) + ' kg' } }
      },
      scales: {
        x: { title: { display: true, text: t('common.age_weeks'), font: { size: 11 } }, grid: { display: false } },
        y: { title: { display: true, text: t('common.weight_kg'), font: { size: 11 } }, beginAtZero: true }
      }
    }
  });
}

// ===== Puppy detail modal =====
function openPuppy(id) {
  const p = PUPPIES.find(x => x.id === id);
  if (!p) return;
  const litter = LITTERS.find(l => l.id === p.litterId);
  const c = document.getElementById('puppy-detail');
  c.innerHTML = `
    <div class="mh">
      <div class="mt">${p.fullName}</div>
      <div class="mss">${litter.breed} · ${t('sex.' + p.sex)} · ${p.color}</div>
    </div>
    <div class="mb">
      <div class="kv" style="margin-bottom:1rem">
        <div class="kvr"><span class="kvk">${t('common.microchip')}</span><span class="kvv" style="font-family:monospace;font-size:.82rem">${p.microchip}</span></div>
        <div class="kvr"><span class="kvk">${STATE.lang === 'de' ? 'Geburtsgewicht' : STATE.lang === 'en' ? 'Birth weight' : 'Вес при рождении'}</span><span class="kvv">${p.birthWeight} g</span></div>
        <div class="kvr"><span class="kvk">${STATE.lang === 'de' ? 'Aktuelles Gewicht' : STATE.lang === 'en' ? 'Current weight' : 'Текущий вес'}</span><span class="kvv">${(p.weights[p.weights.length-1].g/1000).toFixed(2)} kg (${litter.weeks} ${STATE.lang === 'de' ? 'Wo' : STATE.lang === 'en' ? 'wk' : 'нед'})</span></div>
        <div class="kvr"><span class="kvk">Status</span><span class="kvv">${statusBadge(p)}</span></div>
        ${p.salePrice ? `<div class="kvr"><span class="kvk">${t('common.saleprice')}</span><span class="kvv">${formatPrice(p.salePrice)}</span></div>` : ''}
        ${p.saleDate ? `<div class="kvr"><span class="kvk">${t('common.saledate')}</span><span class="kvv">${formatDateDE(p.saleDate)}</span></div>` : ''}
      </div>
      ${p.buyer ? `
        <h3>${t('common.buyer')}</h3>
        <div class="kv" style="margin-bottom:1rem">
          <div class="kvr"><span class="kvk">${STATE.lang === 'de' ? 'Name' : STATE.lang === 'en' ? 'Name' : 'Имя'}</span><span class="kvv">${p.buyer.name}</span></div>
          <div class="kvr"><span class="kvk">${STATE.lang === 'de' ? 'Anschrift' : STATE.lang === 'en' ? 'Address' : 'Адрес'}</span><span class="kvv">${p.buyer.address}</span></div>
          <div class="kvr"><span class="kvk">${STATE.lang === 'de' ? 'Telefon' : 'Phone'}</span><span class="kvv">${p.buyer.phone}</span></div>
          <div class="kvr"><span class="kvk">E-Mail</span><span class="kvv">${p.buyer.email}</span></div>
        </div>
      ` : ''}
      <div class="btn-row">
        <button class="btn primary" onclick="openPDFPreview('kaufvertrag','${p.id}'); closePuppy()">📄 Kaufvertrag</button>
        <button class="btn primary" onclick="openPDFPreview('welpenpaket','${p.id}'); closePuppy()">📦 ${t('docs.welpenpaket')}</button>
        <button class="btn secondary" onclick="closePuppy()">${t('common.close')}</button>
      </div>
    </div>
  `;
  const m = document.getElementById('puppy-modal');
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePuppy() {
  const m = document.getElementById('puppy-modal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ===== Documents tab =====
function renderDocs() {
  const list = document.getElementById('doc-list');
  if (!list) return;
  // Show all puppies — for each: Kaufvertrag + Welpenpaket actions
  // Plus Wurfmeldung for litter
  const items = [];

  LITTERS.forEach(l => {
    items.push({
      icon: '📋',
      title: STATE.lang === 'de' ? 'Wurfmeldung-Datenblatt' : STATE.lang === 'en' ? 'Litter Registration data sheet' : 'Лист данных Wurfmeldung',
      sub: `Wurf «${l.litterLetter}» · ${l.breed}`,
      desc: t('docs.wurfmeldung_desc'),
      action: () => openPDFPreview('wurfmeldung', l.id)
    });
  });

  PUPPIES.forEach(p => {
    if (p.buyer) {
      items.push({
        icon: '📄',
        title: `Kaufvertrag — ${p.name}`,
        sub: `${p.fullName} → ${p.buyer.name.split(' ').pop()}`,
        desc: t('docs.kaufvertrag_desc'),
        action: () => openPDFPreview('kaufvertrag', p.id)
      });
    }
    items.push({
      icon: '📦',
      title: `${t('docs.welpenpaket')} — ${p.name}`,
      sub: p.fullName,
      desc: t('docs.welpenpaket_desc'),
      action: null,
      actionId: { type: 'welpenpaket', id: p.id }
    });
  });

  list.innerHTML = items.map((it, i) => `
    <div class="card dcd" data-i="${i}" onclick="docAction(${i})">
      <div class="dch">
        <div class="dci">${it.icon}</div>
        <div><div class="dct">${it.title}</div><div class="dcs">${it.sub}</div></div>
      </div>
      <p>${it.desc}</p>
    </div>
  `).join('');

  window._docActions = items;
}

function docAction(i) {
  const it = window._docActions[i];
  if (it.action) it.action();
  else if (it.actionId) openPDFPreview(it.actionId.type, it.actionId.id);
}

// ===== PDF preview =====
function openPDFPreview(type, id) {
  STATE.currentPDF = { type, id };
  const m = document.getElementById('pdf-modal');
  const titles = {
    kaufvertrag: { de: 'Welpen-Kaufvertrag', en: 'Puppy Purchase Contract', ru: 'Договор купли-продажи' },
    wurfmeldung: { de: 'Wurfmeldung-Datenblatt', en: 'Litter Registration', ru: 'Регистрация помёта' },
    welpenpaket: { de: 'Welpen-Paket', en: 'Puppy Packet', ru: 'Пакет щенка' }
  };
  document.getElementById('pdf-mt').textContent = titles[type][STATE.lang] || titles[type].de;
  document.getElementById('pdf-mss').textContent = STATE.lang === 'de' ? 'Vorschau · Klick «PDF herunterladen» für echtes PDF' : STATE.lang === 'en' ? 'Preview · Click «Download PDF» for actual PDF' : 'Превью · Нажмите «Скачать PDF» для реального PDF';

  let html = '';
  if (type === 'kaufvertrag') html = buildKaufvertragHTML(PUPPIES.find(p => p.id === id));
  else if (type === 'wurfmeldung') html = buildWurfmeldungHTML(LITTERS.find(l => l.id === id));
  else if (type === 'welpenpaket') html = buildWelpenpaketHTML(PUPPIES.find(p => p.id === id));

  document.getElementById('pdf-prev').innerHTML = html;
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const x = m.querySelector('.mx'); if (x) x.focus(); }, 50);
}

function closePDF() {
  const m = document.getElementById('pdf-modal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  STATE.currentPDF = null;
}

// ===== COI Rechner =====
function renderCOI() {
  const sireSel = document.getElementById('coi-sire');
  const damSel = document.getElementById('coi-dam');
  if (!sireSel || !damSel) return;

  // Sire options: external sire from litter + male dogs
  const sireOpts = [
    { val: 'apollo_external', label: 'Apollo vom Sonnenhof (DRC 20-09876, HD A1)' },
    { val: 'rex', label: 'Rex vom Waldberg (DSH, HD A1, IGP3)' }
  ];
  const damOpts = DOGS.filter(d => d.sex === 'female').map(d => ({ val: d.id, label: `${d.fullName} (${d.zbNr}, HD ${d.hd})` }));

  sireSel.innerHTML = sireOpts.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
  damSel.innerHTML = damOpts.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
  sireSel.value = 'apollo_external';
  damSel.value = 'luna';

  calcCOI();
}

function calcCOI() {
  const sireVal = document.getElementById('coi-sire').value;
  const damVal = document.getElementById('coi-dam').value;

  let sireDog;
  if (sireVal === 'apollo_external') {
    const litter = LITTERS[0];
    sireDog = {
      ...litter.externalSire,
      fullName: litter.externalSire.name,
      zbNr: litter.externalSire.zbNr,
      pedigree: litter.externalSire.pedigree
    };
  } else {
    sireDog = DOGS.find(d => d.id === sireVal);
  }
  const damDog = DOGS.find(d => d.id === damVal);

  if (!sireDog || !damDog || !sireDog.pedigree || !damDog.pedigree) {
    document.getElementById('coi-value').textContent = 'N/A';
    document.getElementById('coi-status').className = 'coist warn';
    document.getElementById('coi-status').innerHTML = STATE.lang === 'de' ? 'Stammbaum unvollständig' : STATE.lang === 'en' ? 'Pedigree incomplete' : 'Родословная неполная';
    document.getElementById('ped-svg').innerHTML = '';
    return;
  }

  const result = calculateCOI(sireDog, damDog, ANCESTORS);
  const coi = result.coi;
  document.getElementById('coi-value').textContent = coi.toFixed(2) + '%';
  const status = coiStatus(coi);
  const statusEl = document.getElementById('coi-status');
  statusEl.className = 'coist ' + status.class;
  statusEl.textContent = coiStatusLabel(status, STATE.lang);

  // Update bars
  const breed = damDog.breed || 'Golden Retriever';
  const breedAvg = BREED_AVG_COI[breed] || 7.1;
  const barThis = document.getElementById('bar-this');
  barThis.style.width = Math.min(coi / 25 * 100, 100) + '%';
  barThis.style.background = status.class === 'ok' ? 'var(--p)' : status.class === 'warn' ? 'var(--warn)' : 'var(--err)';
  document.getElementById('bar-this-v').textContent = coi.toFixed(2) + '%';
  document.getElementById('bar-avg-v').textContent = breedAvg.toFixed(1) + '%';

  // Render pedigree
  renderPedigreeSVG(sireDog, damDog, ANCESTORS, document.getElementById('ped-svg'));
}

// ===== Master render =====
function renderAll() {
  renderOverview();
  if (STATE.currentDog) renderDogDetail();
  renderLitters();
  if (STATE.currentLitter) renderLitterDetail();
  renderDocs();
  renderCOI();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', function() {
  setLang(STATE.lang);
  renderAll();
});

// Close modals on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePDF();
    closePuppy();
  }
});
