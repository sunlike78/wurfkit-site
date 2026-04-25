// PDF templates — HTML→PDF via html2canvas + jsPDF
// Source: 0_Doc/templates_research/ (real German VDH templates)

// ===== HTML BUILDERS =====

function pdfPageStyles() {
  return `
    body{margin:0;padding:0;font-family:'DM Sans',Arial,sans-serif;color:#1a1a1a;background:#fff;-webkit-font-smoothing:antialiased}
    .pg{width:794px;min-height:1123px;padding:80px 70px 60px;background:linear-gradient(180deg,#fff 0%,#FAFAF7 100%);box-sizing:border-box;position:relative;page-break-after:always}
    .pg:last-child{page-break-after:auto}
    .pg::before{content:'';position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#1B4332 0%,#2D6A4F 30%,#52B788 70%,#74C69D 100%)}
    .pg-head{position:absolute;top:24px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:flex-start;font-size:10px;color:#71717A;border-bottom:1px solid #E8E8E0;padding-bottom:10px}
    .pg-head .lg{font-family:'Playfair Display',Georgia,serif;font-size:14px;color:#1B4332;letter-spacing:-0.5px}
    .pg-head .lg b{color:#2D6A4F;font-weight:600}
    .pg-head .meta{text-align:right;font-size:9.5px;line-height:1.5}
    .wm{position:absolute;bottom:60px;right:30px;font-family:'Playfair Display',Georgia,serif;font-size:88px;color:rgba(45,106,79,.04);transform:rotate(-22deg);letter-spacing:6px;font-weight:600;pointer-events:none;user-select:none}
    h1{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:500;text-align:center;letter-spacing:1px;margin:8px 0 6px;color:#1B4332;position:relative}
    h1::after{content:'';display:block;width:40px;height:2px;background:linear-gradient(90deg,#52B788,#2D6A4F);margin:8px auto 0}
    h2{font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:600;margin:24px 0 8px;color:#2D6A4F;border-bottom:1px solid #D8F3DC;padding-bottom:4px;position:relative}
    h2::before{content:'\\25c6';color:#52B788;font-size:9px;margin-right:8px;vertical-align:middle}
    h3{font-size:13px;font-weight:700;margin:16px 0 6px;color:#2D6A4F;text-transform:uppercase;letter-spacing:0.5px}
    p{font-size:12px;line-height:1.55;margin:6px 0;color:#1a1a1a}
    .sub{text-align:center;font-size:10.5px;color:#71717A;margin-bottom:16px}
    .par{font-weight:700;margin:14px 0 4px;font-size:13px;color:#1B4332}
    .ku{display:grid;grid-template-columns:160px 1fr;gap:5px 16px;margin:8px 0 12px;font-size:12px}
    .ku b{color:#71717A;font-weight:500}
    table{width:100%;border-collapse:collapse;font-size:11px;margin-top:6px}
    th,td{padding:5px 6px;border-bottom:1px dashed #E8E8E0;text-align:left}
    th{background:#F5F5F0;font-weight:600;color:#2D6A4F;text-transform:uppercase;letter-spacing:0.4px;font-size:10px;border-bottom:1px solid #2D6A4F}
    .disc{background:#FEF3C7;border:1px solid #FDE68A;color:#78350F;padding:10px 14px;font-size:10.5px;line-height:1.5;border-radius:4px;margin-top:18px}
    .sig{margin-top:32px;display:grid;grid-template-columns:1fr 30px 1fr;gap:0;font-size:11px}
    .sig .l{border-top:1px solid #1a1a1a;padding-top:5px}
    .check::before{content:'\\2611';color:#2D6A4F;margin-right:4px}
    .uncheck::before{content:'\\2610';color:#71717A;margin-right:4px}
    ul{padding-left:20px;font-size:12px;line-height:1.7}
    ol{padding-left:20px;font-size:12px;line-height:1.7}
    .footer{position:absolute;bottom:30px;left:70px;right:70px;font-size:9px;color:#A1A1AA;text-align:center;border-top:1px solid #E8E8E0;padding-top:8px;display:flex;justify-content:space-between}
    .footer .lg-mini{font-family:'Playfair Display',Georgia,serif;color:#2D6A4F;font-weight:500}
    .stamp{display:inline-block;padding:8px 18px;border:2px solid #2D6A4F;border-radius:50%;color:#2D6A4F;font-weight:700;font-family:'Playfair Display',Georgia,serif;font-size:11px;letter-spacing:2px;transform:rotate(-6deg);background:rgba(216,243,220,.4)}
    .cover{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:1003px}
    .cover-name{font-family:'Playfair Display',Georgia,serif;font-size:54px;font-weight:500;color:#1B4332;margin:30px 0 12px;letter-spacing:-1px}
    .cover-sub{font-size:16px;color:#2D6A4F;font-weight:500;margin-bottom:8px}
    .cover-meta{font-size:13px;color:#4A4A4A;margin-bottom:30px}
    .cover-photo{width:280px;height:280px;border-radius:50%;object-fit:cover;border:6px solid #fff;box-shadow:0 12px 32px rgba(0,0,0,.18)}
    .pedigree-cell{padding:6px 8px;border:1px solid #D4D4C8;border-radius:3px;background:#F5F5F0;font-size:9.5px}
    .pedigree-cell.sire{background:#DBEAFE;border-color:#93C5FD}
    .pedigree-cell.dam{background:#FCE7F3;border-color:#F9A8D4}
    .pedigree-cell.common{background:#FEF3C7;border-color:#FCD34D;border-width:2px}
    .pedigree-cell .nm{font-weight:600;font-size:10px}
    .pedigree-cell .sub{font-size:8.5px;color:#71717A;margin:0;text-align:left}
    .pedigree-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:12px;width:100%}
    .ped-col{display:flex;flex-direction:column;justify-content:space-around;gap:6px}
    .qrwrap{display:flex;align-items:center;gap:14px;padding:14px;background:#F5F5F0;border-radius:6px;margin-top:8px}
    .qrwrap .qrbox{width:120px;height:120px;background:#fff;padding:6px;border-radius:4px;box-shadow:0 2px 6px rgba(0,0,0,.06)}
    .qrwrap .qrbox svg{width:100%;height:100%}
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}
    .stats-grid .stat{padding:10px;background:#F5F5F0;border-radius:5px;text-align:center}
    .stats-grid .stat-n{font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:600;color:#2D6A4F;line-height:1}
    .stats-grid .stat-l{font-size:10px;color:#71717A;font-weight:500;letter-spacing:0.4px;text-transform:uppercase;margin-top:4px}
  `;
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// === Kaufvertrag HTML page (1-3 pages depending on length) ===
function buildKaufvertragHTML(puppy, opts) {
  opts = opts || {};
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;
  const buyer = puppy.buyer || { name: '[Käuferdaten ausstehend]', address: '—', phone: '—', email: '—', birthDate: '—' };
  const price = puppy.salePrice || 0;
  const priceWords = numberToGermanWords(Math.floor(price));
  const saleDate = puppy.saleDate || '2026-03-15';

  return `
    <h1>WELPEN-KAUFVERTRAG</h1>
    <div class="sub">Verbraucher zu Verbraucher · Stand: 25.04.2026 · Vorlage v1.0</div>

    <div class="par">§ 1 Vertragsgegenstand</div>
    <p><b>Verkäufer und Züchter:</b></p>
    <div class="ku">
      <b>Name</b><span>${escapeHtml(BREEDER.fullName)}</span>
      <b>Zwingername</b><span>${escapeHtml(BREEDER.kennelName)} (FCI/VDH-geschützt)</span>
      <b>Anschrift</b><span>${escapeHtml(BREEDER.street)}, ${escapeHtml(BREEDER.postalCode)} ${escapeHtml(BREEDER.city)}</span>
      <b>Verein / Mitgl.-Nr.</b><span>${escapeHtml(BREEDER.zuchtverein)} / ${escapeHtml(BREEDER.vdhMember)}</span>
      <b>Telefon / E-Mail</b><span>${escapeHtml(BREEDER.phone)} / ${escapeHtml(BREEDER.email)}</span>
    </div>

    <p><b>Käufer:</b></p>
    <div class="ku">
      <b>Name</b><span>${escapeHtml(buyer.name)}</span>
      <b>Anschrift</b><span>${escapeHtml(buyer.address)}</span>
      <b>Geburtsdatum</b><span>${escapeHtml(buyer.birthDate)}</span>
      <b>Telefon / E-Mail</b><span>${escapeHtml(buyer.phone)} / ${escapeHtml(buyer.email)}</span>
    </div>

    <p><b>Verkauft wird folgender Welpe:</b></p>
    <div class="ku">
      <b>Rufname</b><span>${escapeHtml(puppy.name)}</span>
      <b>Zuchtname</b><span>${escapeHtml(puppy.fullName)}</span>
      <b>Rasse</b><span>${escapeHtml(litter.breed)}</span>
      <b>Geschlecht</b><span>${puppy.sex === 'male' ? 'Rüde' : 'Hündin'}</span>
      <b>Wurfdatum</b><span>${formatDateDE(litter.birthDate)}</span>
      <b>Fellfarbe</b><span>${escapeHtml(puppy.color)}</span>
      <b>Mikrochip-Nr.</b><span style="font-family:monospace">${escapeHtml(puppy.microchip)}</span>
      <b>ZB-Nr.</b><span>folgt mit Ahnentafel</span>
      <b>Vater</b><span>${escapeHtml(sire.name)} (${escapeHtml(sire.zbNr)})</span>
      <b>Mutter</b><span>${escapeHtml(dam.fullName)} (${escapeHtml(dam.zbNr)})</span>
    </div>

    <div class="par">§ 2 Beschaffenheit / Verkaufsart</div>
    <p>Der Hund wird als <b>Liebhaber- und Familienhund</b> verkauft. Er stammt aus eigener Zucht des Verkäufers und wurde nach den Bestimmungen der Zuchtordnung des ${escapeHtml(BREEDER.zuchtverein)} aufgezogen. Die Eintragungen in der Ahnentafel und im EU-Heimtierausweis entsprechen der Wahrheit. Mit der Wurfabnahme durch den Zuchtwart wurden alle erforderlichen Identitäts- und Gesundheitsprüfungen durchgeführt.</p>

    <div class="par">§ 3 Kaufpreis und Zahlung</div>
    <p>Der Kaufpreis beträgt <b>${formatPrice(price)}</b> (in Worten: ${priceWords} Euro). Eine Anzahlung in Höhe von 300,00 € wurde bei Vertragsunterzeichnung geleistet. Die Restzahlung erfolgt Zug um Zug bei Übergabe in bar oder per Überweisung auf folgendes Konto:</p>
    <div class="ku">
      <b>Kontoinhaber</b><span>${escapeHtml(BREEDER.fullName)}</span>
      <b>IBAN</b><span style="font-family:monospace">${escapeHtml(BREEDER.iban)}</span>
      <b>BIC</b><span style="font-family:monospace">${escapeHtml(BREEDER.bic)}</span>
      <b>Bank</b><span>${escapeHtml(BREEDER.bank)}</span>
    </div>

    <div class="par">§ 4 Übergabe / Gefahr- und Eigentumsübergang</div>
    <p>Die Übergabe des Hundes erfolgt am <b>${formatDateDE(saleDate)}</b> in ${escapeHtml(BREEDER.city)}. Die Gefahr einer zufälligen Verschlechterung oder eines Untergangs des Welpen geht mit der Übergabe auf den Käufer über. Das <b>Eigentum am Hund geht erst mit vollständiger Bezahlung</b> des Kaufpreises auf den Käufer über (Eigentumsvorbehalt).</p>

    <div class="par">§ 5 Gesundheitszustand</div>
    <p>Der Hund ist nach aktuellem Kenntnisstand des Verkäufers gesund und in einwandfreiem Zustand. Bis zum heutigen Tag wurden folgende Maßnahmen durchgeführt: Grundimmunisierung gemäß StIKo Vet 2025 (SHP + Leptospirose mit 8 Wochen, SHP + Lepto + Tollwut mit 12 Wochen), zweimalige Entwurmung, tierärztliche Allgemeinuntersuchung mit Mikrochip-Implantation. Sämtliche Daten sind im EU-Heimtierausweis dokumentiert.</p>
    <p><b>Bekannte Mängel/Erkrankungen:</b> <span class="check"></span>keine bekannt.</p>
    <p>Der Käufer bestätigt, den Hund ausführlich besichtigt zu haben. Der Hund war zum Zeitpunkt der Übergabe gesund und wies keine Krankheits- oder Mangelerscheinungen auf.</p>
    <p>Hinweis nach § 90a BGB: Tiere sind keine Sachen. Es handelt sich beim verkauften Hund um ein Lebewesen, das in der Wachstumsphase Veränderungen unterworfen ist. Der Verkäufer kann keine Gewähr für künftige Größe, Gebäude, Charakter, innere Organe, Sinnesorgane oder noch nicht erkannte Erbkrankheiten übernehmen.</p>

    <div class="par">§ 6 Sachmängelhaftung (Verbraucher zu Verbraucher)</div>
    <p>Da beide Vertragsparteien Verbraucher im Sinne des § 13 BGB sind, vereinbaren sie hiermit individuell ausgehandelt den <b>Ausschluss jeglicher Sachmängelhaftung</b>, soweit nicht unter § 5 eine bestimmte Beschaffenheit vereinbart wurde oder dem Verkäufer Mängel bekannt waren und nicht offengelegt wurden (Arglist nach § 444 BGB).</p>

    <div class="par">§ 7 Pflichten des Käufers (Tierschutz)</div>
    <p>Der Käufer versichert, dass er über die für die Aufzucht und Haltung eines Hundes der oben genannten Rasse notwendigen Kenntnisse, Fähigkeiten und Möglichkeiten verfügt. Er verpflichtet sich zur Haltung mit Familienanschluss und zur ausreichenden Sozialisierung des Welpen. Die Bestimmungen des Tierschutzgesetzes (TierSchG) und der Tierschutz-Hundeverordnung (TierSchHuV) sind ihm bekannt und werden eingehalten. Anketten oder dauerhafte Zwingerhaltung sind ausgeschlossen.</p>

    <div class="par">§ 8 Zuchtbeschränkung</div>
    <p>Der Hund wird als Liebhaberhund verkauft. Eine zuchtmäßige Verwendung ist ohne ausdrückliche schriftliche Zustimmung des Verkäufers nicht gestattet. Sollte der Käufer den Hund zur Zucht einsetzen wollen, ist eine Zucht ausschließlich im Rahmen eines FCI/VDH-anerkannten Vereins unter Beachtung der dortigen Vorschriften zulässig.</p>

    <div class="par">§ 9 Vorkaufsrecht des Verkäufers</div>
    <p>Sollte der Käufer den Hund aus zwingenden Gründen abgeben müssen, räumt er dem Verkäufer ein Vorkaufsrecht ein (§§ 463 ff. BGB). Der Käufer informiert den Verkäufer mindestens 4 Wochen vor einer geplanten Weitergabe schriftlich. Der Verkäufer hat 2 Wochen Zeit zur Ausübung des Vorkaufsrechts; der Rückkaufpreis beträgt höchstens den ursprünglichen Kaufpreis.</p>

    <div class="par">§ 10 Schlussbestimmungen</div>
    <p>Mündliche Nebenabreden bestehen nicht. Änderungen oder Ergänzungen dieses Vertrages bedürfen der Schriftform. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt (Salvatorische Klausel). Jede Vertragspartei erhält eine Ausfertigung dieses Vertrages.</p>

    <div class="disc"><b>Hinweis:</b> Diese Vorlage basiert auf dem Muster des Verbands für Kleine Münsterländer e.V. (Verbraucher-zu-Verbraucher) und auf der VDH-Zucht-Ordnung (Stand 09/2024). Sie ist als Hilfsmittel gedacht und ersetzt keine individuelle Rechtsberatung. Vor finaler Verwendung wird Prüfung durch einen Fachanwalt für Vertrags-/Tierrecht empfohlen.</div>

    <p style="margin-top:18px"><b>Ort, Datum:</b> ${escapeHtml(BREEDER.city)}, ${formatDateDE(saleDate)}</p>

    <div class="sig">
      <div class="l">Verkäufer<br><i style="color:#71717A">${escapeHtml(BREEDER.fullName)}</i></div>
      <div></div>
      <div class="l">Käufer<br><i style="color:#71717A">${escapeHtml(buyer.name)}</i></div>
    </div>
  `;
}

// === Wurfmeldung HTML ===
function buildWurfmeldungHTML(litter) {
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;
  const puppies = PUPPIES.filter(p => p.litterId === litter.id);
  const males = puppies.filter(p => p.sex === 'male');
  const females = puppies.filter(p => p.sex === 'female');
  const sorted = males.concat(females);

  return `
    <h1>WURFMELDUNG / DECKMELDUNG</h1>
    <div class="sub">Datenblatt zur Vorlage beim ${escapeHtml(BREEDER.zuchtverein)}</div>

    <div class="par">Züchter / Anbieter</div>
    <div class="ku">
      <b>Name</b><span>${escapeHtml(BREEDER.fullName)}</span>
      <b>Zwingername</b><span>${escapeHtml(BREEDER.kennelName)}</span>
      <b>Anschrift</b><span>${escapeHtml(BREEDER.street)}, ${escapeHtml(BREEDER.postalCode)} ${escapeHtml(BREEDER.city)}</span>
      <b>Telefon</b><span>${escapeHtml(BREEDER.phone)}</span>
      <b>E-Mail</b><span>${escapeHtml(BREEDER.email)}</span>
      <b>Verein</b><span>${escapeHtml(BREEDER.zuchtverein)}</span>
      <b>Mitglieds-Nr.</b><span>${escapeHtml(BREEDER.vdhMember)}</span>
    </div>

    <div class="par">Zuchthündin (Mutter)</div>
    <div class="ku">
      <b>Rufname</b><span>${escapeHtml(dam.name)}</span>
      <b>Zuchtbuchname</b><span>${escapeHtml(dam.fullName)}</span>
      <b>ZB-Nr.</b><span>${escapeHtml(dam.zbNr)}</span>
      <b>Mikrochip</b><span style="font-family:monospace">${escapeHtml(dam.microchip)}</span>
      <b>Wurftag (eigener)</b><span>${formatDateDE(dam.birth)}</span>
      <b>Rasse / Farbe</b><span>${escapeHtml(dam.breed)} / ${escapeHtml(dam.color)}</span>
      <b>HD / ED</b><span>${escapeHtml(dam.hd)} / ${escapeHtml(dam.ed)}</span>
      <b>Formwert / ZTP</b><span>${escapeHtml(dam.formwert)} / ${dam.ztp ? formatDateDE(dam.ztpDate) : 'nein'}</span>
    </div>

    <div class="par">Deckrüde (Vater)</div>
    <div class="ku">
      <b>Rufname</b><span>${escapeHtml(sire.name.split(' ')[0])}</span>
      <b>Zuchtbuchname</b><span>${escapeHtml(sire.name)}</span>
      <b>ZB-Nr.</b><span>${escapeHtml(sire.zbNr)}</span>
      <b>Mikrochip</b><span style="font-family:monospace">${escapeHtml(sire.microchip)}</span>
      <b>Wurftag (eigener)</b><span>${formatDateDE(sire.birth)}</span>
      <b>Rasse / Farbe</b><span>${escapeHtml(litter.breed)} / ${escapeHtml(sire.color)}</span>
      <b>HD / ED</b><span>${escapeHtml(sire.hd)} / ${escapeHtml(sire.ed)}</span>
      <b>Eigentümer</b><span>${escapeHtml(sire.owner)}</span>
    </div>

    <div class="par">Deck- und Wurfdaten</div>
    <div class="ku">
      <b>Deckdatum</b><span>${formatDateDE(litter.deckDate)}</span>
      <b>Ort der Deckung</b><span>${escapeHtml(litter.deckOrt)}</span>
      <b>Wurftag</b><span>${formatDateDE(litter.birthDate)}</span>
      <b>Wurfstärke gesamt</b><span>${litter.wurfStaerke.total}</span>
      <b>davon lebend</b><span>${litter.wurfStaerke.alive}</span>
      <b>davon totgeboren</b><span>${litter.wurfStaerke.stillborn}</span>
      <b>Rüden / Hündinnen</b><span>${litter.wurfStaerke.male} R / ${litter.wurfStaerke.female} H</span>
      <b>Wurfbuchstabe</b><span>${escapeHtml(litter.litterLetter)}</span>
      <b>Geburtsverlauf</b><span>natürlich</span>
    </div>

    <div class="par">Welpen-Liste</div>
    <table>
      <thead>
        <tr>
          <th style="width:30px">Lfd.</th>
          <th>Rufname</th>
          <th style="width:40px">Geschl.</th>
          <th>Farbe</th>
          <th>Mikrochip-Nr.</th>
          <th style="width:60px;text-align:right">Geb.gew.</th>
          <th>Verbleib</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(p.name)}</td>
            <td>${p.sex === 'male' ? 'R' : 'H'}</td>
            <td>${escapeHtml(p.color)}</td>
            <td style="font-family:monospace;font-size:10px">${escapeHtml(p.microchip)}</td>
            <td style="text-align:right">${p.birthWeight} g</td>
            <td>lebend</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="par">Anlagen</div>
    <ul style="list-style:none;padding-left:0">
      <li><span class="check"></span>Original-Deckschein / Deckbescheinigung</li>
      <li><span class="check"></span>Ahnentafel-Kopie der Zuchthündin</li>
      <li><span class="check"></span>Ahnentafel-Kopie des Deckrüden</li>
      <li><span class="check"></span>Mikrochip-Bestätigung Tierarzt (Aufkleber)</li>
      <li><span class="uncheck"></span>Wurfabnahmeprotokoll des Zuchtwarts (folgt nach Wurfabnahme: ${formatDateDE(litter.wurfabnahmeDate)})</li>
    </ul>

    <div class="disc"><b>Hinweis:</b> Dieses Datenblatt ist eine <b>Vorbereitung</b> für das Wurfmeldungs-Formular Ihres Zuchtvereins. Die formelle Wurfmeldung wird durch das Vereins-Formular nach Wurfabnahme durch den Zuchtwart eingereicht. Sie ersetzt nicht die offizielle Wurfmeldung beim Zuchtbuchamt.</div>

    <p style="margin-top:18px"><b>Ort, Datum:</b> ${escapeHtml(BREEDER.city)}, ${formatDateDE(litter.wurfmeldungDate)}</p>

    <div class="sig">
      <div class="l">Unterschrift Züchter<br><i style="color:#71717A">${escapeHtml(BREEDER.fullName)}</i></div>
      <div></div>
      <div class="l">Unterschrift Zuchtwart<br><i style="color:#71717A">(nach Wurfabnahme)</i></div>
    </div>
  `;
}

// === Welpen-Paket cover page ===
function buildWelpenpaketCoverHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  return `
    <div class="cover" style="position:relative">
      <!-- Decorative corners -->
      <div style="position:absolute;top:30px;left:30px;width:60px;height:60px;border-top:3px solid #2D6A4F;border-left:3px solid #2D6A4F"></div>
      <div style="position:absolute;top:30px;right:30px;width:60px;height:60px;border-top:3px solid #2D6A4F;border-right:3px solid #2D6A4F"></div>
      <div style="position:absolute;bottom:30px;left:30px;width:60px;height:60px;border-bottom:3px solid #2D6A4F;border-left:3px solid #2D6A4F"></div>
      <div style="position:absolute;bottom:30px;right:30px;width:60px;height:60px;border-bottom:3px solid #2D6A4F;border-right:3px solid #2D6A4F"></div>

      <div style="font-family:'Playfair Display',Georgia,serif;font-size:13px;letter-spacing:8px;color:#52B788;font-weight:600;margin-bottom:6px">— WELPEN-PAKET —</div>
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:11px;color:#A1A1AA;letter-spacing:3px">VOLLSTÄNDIGE UNTERLAGEN</div>

      <div style="position:relative;margin:36px 0 20px">
        <img class="cover-photo" src="${puppy.photo}" alt="${escapeHtml(puppy.name)}" crossorigin="anonymous"/>
        <div style="position:absolute;bottom:-8px;right:-8px;background:#fff;border-radius:50%;padding:6px;box-shadow:0 4px 12px rgba(0,0,0,.15)">
          <div style="background:linear-gradient(135deg,#52B788,#2D6A4F);color:#fff;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:12px;letter-spacing:.5px">VDH</div>
        </div>
      </div>

      <div class="cover-name">${escapeHtml(puppy.name)}</div>
      <div class="cover-sub">${escapeHtml(puppy.fullName)}</div>
      <div style="display:flex;align-items:center;gap:8px;margin:6px 0;font-size:11px;color:#71717A">
        <span style="display:inline-block;width:30px;height:1px;background:#52B788"></span>
        <span style="font-style:italic">${escapeHtml(litter.breed)}</span>
        <span style="display:inline-block;width:30px;height:1px;background:#52B788"></span>
      </div>
      <div class="cover-meta">${puppy.sex === 'male' ? 'Rüde' : 'Hündin'} · ${escapeHtml(puppy.color)} · geboren ${formatDateDE(litter.birthDate)}</div>

      <div style="margin-top:36px;width:100%;max-width:460px;background:#fff;padding:24px 30px;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.06);border:1px solid #E8E8E0">
        <div style="text-align:center;font-family:'Playfair Display',Georgia,serif;font-size:16px;color:#1B4332;font-weight:600;letter-spacing:.5px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #D8F3DC">Inhalt dieses Pakets</div>
        <ol style="text-align:left;font-size:12.5px;line-height:1.9;padding-left:20px;margin:0;color:#2D6A4F">
          <li><b>Welpen-Kaufvertrag</b> <span style="color:#A1A1AA;font-size:11px">— Verbraucher zu Verbraucher</span></li>
          <li><b>Stammbaum-Übersicht</b> <span style="color:#A1A1AA;font-size:11px">— 3 Generationen mit COI</span></li>
          <li><b>Impfübersicht</b> <span style="color:#A1A1AA;font-size:11px">— nach StIKo Vet 2025</span></li>
          <li><b>Fütterungsplan</b> <span style="color:#A1A1AA;font-size:11px">— erste 12 Monate</span></li>
          <li><b>Pflegehinweise</b> <span style="color:#A1A1AA;font-size:11px">— Sozialisation, Erziehung, Tierarzt</span></li>
          <li><b>QR-Code</b> <span style="color:#A1A1AA;font-size:11px">— digitales Welpen-Profil</span></li>
        </ol>
      </div>

      <div style="margin-top:30px;display:flex;align-items:center;gap:14px">
        <span class="stamp">VDH-Verein · DRC</span>
      </div>

      <div style="margin-top:auto;font-size:10.5px;color:#A1A1AA;padding-top:24px;text-align:center">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:13px;color:#2D6A4F;margin-bottom:4px"><b>Wurf</b>Kit</div>
        Erstellt für ${escapeHtml(BREEDER.kennelName)} · ${formatDateDE(new Date().toISOString().split('T')[0])}
      </div>
    </div>
  `;
}

// === Ahnentafel page ===
function buildAhnentafelHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;

  // Build pedigree using existing data
  const sireTree = buildPedigreeTree({ ...sire, fullName: sire.name }, ANCESTORS);
  const damTree = buildPedigreeTree(dam, ANCESTORS);
  const result = calculateCOI({ ...sire, fullName: sire.name, pedigree: sire.pedigree }, dam, ANCESTORS);
  const commonIds = new Set(result.commonAncestors.map(c => c.id));

  function renderCell(node, side) {
    if (!node) return '<div class="pedigree-cell" style="opacity:.4">—</div>';
    const cls = commonIds.has(node.id) ? 'common' : side;
    const titles = node.titles && node.titles.length ? node.titles.join(', ') + ' · ' : '';
    return `<div class="pedigree-cell ${cls}">
      <div class="nm">${escapeHtml(node.name || '—')}</div>
      <div class="sub">${titles}${escapeHtml(node.zbNr || '')}${node.hd ? ' · HD ' + escapeHtml(node.hd) : ''}${node.formwert ? ' · ' + escapeHtml(node.formwert) : ''}</div>
    </div>`;
  }

  return `
    <h1>STAMMBAUM-ÜBERSICHT</h1>
    <div class="sub">${escapeHtml(puppy.fullName)} · ${escapeHtml(litter.breed)} · 3 Generationen</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
      <div>
        <h3>Welpe</h3>
        <div class="pedigree-cell" style="background:#D8F3DC;border-color:#52B788;border-width:2px">
          <div class="nm" style="font-size:13px">${escapeHtml(puppy.name)}</div>
          <div class="sub">${escapeHtml(puppy.fullName)}<br/>geb. ${formatDateDE(litter.birthDate)} · ${escapeHtml(puppy.color)}<br/>Mikrochip: ${escapeHtml(puppy.microchip)}</div>
        </div>
      </div>
      <div>
        <h3>Wurfstatistik</h3>
        <div class="ku" style="grid-template-columns:120px 1fr;font-size:11px">
          <b>Wurfdatum</b><span>${formatDateDE(litter.birthDate)}</span>
          <b>Wurfbuchstabe</b><span>${escapeHtml(litter.litterLetter)}</span>
          <b>Wurfstärke</b><span>${litter.wurfStaerke.total} (${litter.wurfStaerke.male} R, ${litter.wurfStaerke.female} H)</span>
          <b>COI (Wurf)</b><span>${result.coi.toFixed(2)}% (Rasse-Ø: ${BREED_AVG_COI[litter.breed] || 7.1}%)</span>
          <b>Züchter</b><span>${escapeHtml(BREEDER.fullName)} (${escapeHtml(BREEDER.kennelName)})</span>
        </div>
      </div>
    </div>

    <h2>Vater (Deckrüde) — Linie</h2>
    <div class="pedigree-grid">
      <div class="ped-col">${renderCell({ name: sire.name, zbNr: sire.zbNr, hd: sire.hd, formwert: sire.formwert, titles: sire.titles }, 'sire')}</div>
      <div class="ped-col">${sireTree ? renderCell(sireTree.gen1.sire, 'sire') + renderCell(sireTree.gen1.dam, 'sire') : ''}</div>
      <div class="ped-col">${sireTree ? renderCell(sireTree.gen2.pgs, 'sire') + renderCell(sireTree.gen2.pgd, 'sire') + renderCell(sireTree.gen2.mgs, 'sire') + renderCell(sireTree.gen2.mgd, 'sire') : ''}</div>
      <div class="ped-col">${sireTree ? Object.values(sireTree.gen3).map(n => renderCell(n, 'sire')).join('') : ''}</div>
    </div>

    <h2>Mutter (Zuchthündin) — Linie</h2>
    <div class="pedigree-grid">
      <div class="ped-col">${renderCell({ name: dam.fullName, zbNr: dam.zbNr, hd: dam.hd, formwert: dam.formwert }, 'dam')}</div>
      <div class="ped-col">${damTree ? renderCell(damTree.gen1.sire, 'dam') + renderCell(damTree.gen1.dam, 'dam') : ''}</div>
      <div class="ped-col">${damTree ? renderCell(damTree.gen2.pgs, 'dam') + renderCell(damTree.gen2.pgd, 'dam') + renderCell(damTree.gen2.mgs, 'dam') + renderCell(damTree.gen2.mgd, 'dam') : ''}</div>
      <div class="ped-col">${damTree ? Object.values(damTree.gen3).map(n => renderCell(n, 'dam')).join('') : ''}</div>
    </div>

    ${result.commonAncestors.length ? `
    <h2>Gemeinsame Vorfahren</h2>
    <p>Zwischen Vater- und Mutterlinie wurden ${result.commonAncestors.length} gemeinsame Vorfahren identifiziert (gelb hervorgehoben). Diese tragen zum COI-Wert bei.</p>
    <ul>
      ${result.commonAncestors.map(c => `<li><b>${escapeHtml(c.name)}</b> · Beitrag: ${(c.contribution * 100).toFixed(2)}%</li>`).join('')}
    </ul>
    ` : ''}

    <div class="disc"><b>Hinweis:</b> Diese Stammbaum-Übersicht ist eine <b>Vorbereitung</b> auf die offizielle VDH-Ahnentafel. Die rechtlich verbindliche Ahnentafel mit Zuchtbuchnummer wird vom Zuchtbuchamt des ${escapeHtml(BREEDER.zuchtverein)} ausgestellt.</div>
  `;
}

// === Impfübersicht page ===
function buildImpfuebersichtHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const v8 = formatDateDE(addDaysISO(litter.birthDate, 56));
  const v12 = formatDateDE(addDaysISO(litter.birthDate, 84));
  const v16 = formatDateDE(addDaysISO(litter.birthDate, 112));
  const v15m = formatDateDE(addDaysISO(litter.birthDate, 456));

  return `
    <h1>IMPFÜBERSICHT</h1>
    <div class="sub">${escapeHtml(puppy.fullName)} · Mikrochip: ${escapeHtml(puppy.microchip)} · gemäß StIKo Vet 6. Auflage 2025</div>

    <div class="par">Bisher durchgeführte Impfungen</div>
    <table>
      <thead>
        <tr><th>Datum</th><th>Alter</th><th>Impfung</th><th>Impfstoff</th><th>Charge</th><th>Tierarzt</th></tr>
      </thead>
      <tbody>
        <tr><td>${v8}</td><td>8 Wochen</td><td>SHP + Lepto</td><td>Nobivac DHP+L4</td><td>A2024-3491</td><td>Dr. Müller, München</td></tr>
        <tr><td>${v12}</td><td>12 Wochen</td><td>SHP + Lepto + Tollwut</td><td>Nobivac DHP+L4 + Versican Plus R</td><td>A2024-3492 / R-2401</td><td>Dr. Müller, München</td></tr>
      </tbody>
    </table>
    <p style="font-size:11px;color:#71717A;margin-top:6px"><i>Entwurmungen mit Drontal Puppy: ${formatDateDE(addDaysISO(litter.birthDate, 14))}, ${formatDateDE(addDaysISO(litter.birthDate, 28))}, ${formatDateDE(addDaysISO(litter.birthDate, 42))}, ${formatDateDE(addDaysISO(litter.birthDate, 56))}.</i></p>

    <div class="par">Empfohlene weitere Impfungen (nicht im Lieferumfang)</div>
    <table>
      <thead>
        <tr><th>Geplantes Datum</th><th>Alter</th><th>Impfung</th><th>Erläuterung</th></tr>
      </thead>
      <tbody>
        <tr><td>${v16}</td><td>16 Wochen</td><td>SHP + Tollwut</td><td>Abschluss Grundimmunisierung</td></tr>
        <tr><td>${v15m}</td><td>15 Monate</td><td>SHP + Lepto + Tollwut</td><td>1. Auffrischung — befestigt Grundimmunisierung</td></tr>
        <tr><td>jährlich</td><td>jährlich</td><td>Leptospirose</td><td>Kurzer Immunschutz, jährliche Auffrischung</td></tr>
        <tr><td>alle 3 Jahre</td><td>—</td><td>SHP (Staupe, HCC, Parvo)</td><td>Core-Impfungen, 3-Jahres-Schutz nach 1. Auffrischung</td></tr>
        <tr><td>alle 1–3 Jahre</td><td>—</td><td>Tollwut</td><td>Je nach Hersteller; bei Auslandsreise zwingend</td></tr>
      </tbody>
    </table>

    <div class="par">Wichtige Hinweise</div>
    <ul>
      <li>Die <b>Grundimmunisierung wird erst durch die Auffrischung mit ca. 15 Monaten</b> vollständig wirksam (StIKo Vet 2025).</li>
      <li>Für die ersten 4 Wochen bei den neuen Eltern: <b>denselben Impfstoff oder mindestens denselben Antigentyp</b> verwenden wie bei der Grundimmunisierung.</li>
      <li>Den <b>EU-Heimtierausweis sorgfältig aufbewahren</b> — er ist das einzige amtliche Impfdokument und dient als Reisedokument innerhalb der EU.</li>
      <li>Bei <b>Reisen ins Ausland</b>: Tollwut-Impfung muss mindestens 21 Tage alt und im EU-Heimtierausweis vom Tierarzt mit Stempel und Unterschrift bestätigt sein.</li>
    </ul>

    <div class="disc"><b>Hinweis:</b> Diese Übersicht <b>ersetzt nicht</b> den EU-Heimtierausweis. Maßgebend für jede Impfung ist das vom Tierarzt persönlich unterschriebene und gestempelte Dokument im Original-Heimtierausweis.</div>
  `;
}

// === Fütterungsplan page ===
function buildFuetterungsplanHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const qrUrl = `https://wurfkit.de/welpe/${puppy.id}`;
  let qrSVG = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">📱</div>';
  try {
    if (typeof qrcode !== 'undefined') {
      const qr = qrcode(0, 'M');
      qr.addData(qrUrl);
      qr.make();
      qrSVG = qr.createSvgTag({ scalable: true, cellSize: 4, margin: 1 });
    }
  } catch(e) {}

  return `
    <h1>FÜTTERUNGSPLAN &amp; PFLEGE</h1>
    <div class="sub">${escapeHtml(puppy.fullName)} · ${escapeHtml(litter.breed)} · Empfehlungen für die ersten 12 Monate</div>

    <div class="par">Fütterungsschema</div>
    <table>
      <thead>
        <tr><th>Alter</th><th>Mahlzeiten/Tag</th><th>Menge/Tag</th><th>Empfohlenes Futter</th></tr>
      </thead>
      <tbody>
        <tr><td>8–12 Wochen</td><td>4×</td><td>200–300 g</td><td>Welpenfutter (z.B. Royal Canin Golden Retriever Junior, Eukanuba Puppy Large)</td></tr>
        <tr><td>3–6 Monate</td><td>3×</td><td>300–400 g</td><td>Welpen- bzw. Junior-Futter Large Breed</td></tr>
        <tr><td>6–12 Monate</td><td>2×</td><td>350–500 g</td><td>Junior-Futter, schrittweise Umstellung auf Adult ab 12 Monaten</td></tr>
        <tr><td>ab 12 Monaten</td><td>2×</td><td>nach Bedarf</td><td>Adult-Futter Large Breed</td></tr>
      </tbody>
    </table>
    <p style="font-size:11px;color:#71717A;margin-top:4px"><i>Die genauen Mengen richten sich nach Aktivität, Körpergewicht und individuellem Bedarf. Bei Zweifeln bitte den Tierarzt konsultieren.</i></p>

    <div class="par">Wichtige Regeln</div>
    <ul>
      <li><b>Frisches Wasser</b> jederzeit verfügbar.</li>
      <li><b>Keine Knochen</b> (Verletzungsgefahr), keine Schokolade, Trauben/Rosinen, Zwiebeln, Avocados oder Süßstoffe.</li>
      <li><b>Futterumstellung schrittweise</b> über 7–10 Tage durchführen, um Verdauungsprobleme zu vermeiden.</li>
      <li><b>Nach dem Fressen 1–2 Stunden Ruhe</b> — Großrassen sind anfällig für Magendrehung bei Aktivität nach der Mahlzeit.</li>
      <li>Eine konstante <b>Fütterungszeit</b> hilft beim Stubenreinheitstraining.</li>
    </ul>

    <div class="par">Pflege &amp; Sozialisation</div>
    <ul>
      <li><b>Bürsten:</b> 2–3× pro Woche (im Fellwechsel täglich).</li>
      <li><b>Krallen:</b> alle 4–6 Wochen schneiden, falls nicht durch Bewegung abgenutzt.</li>
      <li><b>Zähne:</b> ab dem 4. Monat 2–3× pro Woche reinigen (Hundezahnpasta, kein Menschen-Zahnpasta!).</li>
      <li><b>Sozialisation 8–16 Wochen:</b> wichtigste Phase. Möglichst viele positive Erlebnisse mit Menschen, anderen Hunden, Geräuschen, Untergründen.</li>
      <li><b>Welpenschule</b> ab 10–12 Wochen empfohlen.</li>
      <li><b>Aktivität:</b> Welpenregel 1 Minute / Lebenswoche / Spaziergang. Nicht überlasten — Wachstumsplatten brauchen Schutz bis 12–18 Monate.</li>
    </ul>

    <div class="par">Empfehlung Tierarzt</div>
    <ul>
      <li>Erste eigene Untersuchung beim Tierarzt innerhalb der ersten 7 Tage nach Übergabe.</li>
      <li>Kastration / Sterilisation: nicht vor 12–15 Monaten (Wachstum, Hormonsystem).</li>
      <li>Hüftkontrolle (HD-Röntgen): nach 12 Monaten möglich, für Zuchtanmeldung VDH typischerweise frühestens nach 15 Monaten.</li>
    </ul>

    <h2>Digitales Welpen-Profil</h2>
    <div class="qrwrap">
      <div class="qrbox">${qrSVG}</div>
      <div style="font-size:12px;line-height:1.6">
        <div style="font-weight:600;margin-bottom:4px">QR-Code scannen — alle Unterlagen jederzeit aktuell:</div>
        <div style="font-family:monospace;color:#2D6A4F;font-size:11px">${escapeHtml(qrUrl)}</div>
        <div style="font-size:10.5px;color:#71717A;margin-top:6px">Stammbaum, Impfübersicht, Züchterkontakt, Wurf-Geschwister, Booster-Erinnerungen.</div>
      </div>
    </div>

    <h2>Züchter-Kontakt</h2>
    <div class="ku">
      <b>Name</b><span>${escapeHtml(BREEDER.fullName)}</span>
      <b>Zwinger</b><span>${escapeHtml(BREEDER.kennelName)}</span>
      <b>Anschrift</b><span>${escapeHtml(BREEDER.street)}, ${escapeHtml(BREEDER.postalCode)} ${escapeHtml(BREEDER.city)}</span>
      <b>Telefon</b><span>${escapeHtml(BREEDER.phone)}</span>
      <b>E-Mail</b><span>${escapeHtml(BREEDER.email)}</span>
      <b>Verein</b><span>${escapeHtml(BREEDER.zuchtverein)}</span>
    </div>
  `;
}

function addDaysISO(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ===== HTML → PDF rendering =====

async function renderSectionToCanvas(htmlContent, opts) {
  opts = opts || {};
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-99999px;top:0;width:794px;background:#fff;z-index:-1';

  const inner = document.createElement('div');
  inner.className = 'pg';
  inner.style.cssText = 'width:794px;min-height:1123px;padding:80px 70px 60px;background:linear-gradient(180deg,#fff 0%,#FAFAF7 100%);box-sizing:border-box;color:#1a1a1a;font-family:DM Sans,Arial,sans-serif;position:relative';

  // Header strip
  const headerBar = '<div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#1B4332 0%,#2D6A4F 30%,#52B788 70%,#74C69D 100%)"></div>';
  const docMeta = opts.docMeta || '';
  const pageHeader = opts.cover ? '' : `<div class="pg-head"><div class="lg"><b>Wurf</b>Kit</div><div class="meta">${docMeta}<br/>${formatDateDE(new Date().toISOString().split('T')[0])}</div></div>`;
  // Watermark for non-cover pages
  const wm = opts.cover || opts.noWatermark ? '' : `<div class="wm">WurfKit</div>`;
  // Footer
  const footer = opts.cover ? '' : `<div class="footer"><span class="lg-mini">WurfKit · ${escapeHtml(BREEDER.kennelName)}</span><span>Generiert am ${formatDateDE(new Date().toISOString().split('T')[0])}</span></div>`;

  inner.innerHTML = headerBar + pageHeader + wm + htmlContent + footer;

  const styleEl = document.createElement('style');
  styleEl.textContent = pdfPageStyles();

  wrap.appendChild(styleEl);
  wrap.appendChild(inner);
  document.body.appendChild(wrap);

  // Wait for fonts and images to load
  await document.fonts.ready;
  const imgs = inner.querySelectorAll('img');
  await Promise.all(Array.from(imgs).map(img => new Promise(resolve => {
    if (img.complete) return resolve();
    img.onload = resolve;
    img.onerror = resolve;
    setTimeout(resolve, 3000);
  })));

  await new Promise(r => setTimeout(r, 150));

  const canvas = await html2canvas(inner, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: 794,
    height: inner.scrollHeight
  });

  document.body.removeChild(wrap);
  return canvas;
}

async function addCanvasToPDF(doc, canvas, isFirst) {
  const imgData = canvas.toDataURL('image/jpeg', 0.92);
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  if (imgHeight <= pdfHeight) {
    if (!isFirst) doc.addPage();
    doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {
    // Multi-page: slice the canvas image across pages
    let positionY = 0;
    let pageIndex = 0;
    while (positionY < imgHeight) {
      if (!isFirst || pageIndex > 0) doc.addPage();
      doc.addImage(imgData, 'JPEG', 0, -positionY, imgWidth, imgHeight);
      positionY += pdfHeight;
      pageIndex++;
    }
  }
}

async function downloadPDF() {
  if (!STATE.currentPDF) return;
  const { type, id } = STATE.currentPDF;
  const btn = document.getElementById('pdf-dl');
  const origText = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Generiere PDF...'; }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });

    if (type === 'kaufvertrag') {
      const puppy = PUPPIES.find(p => p.id === id);
      const canvas = await renderSectionToCanvas(buildKaufvertragHTML(puppy), { docMeta: 'Kaufvertrag · ' + escapeHtml(puppy.fullName) });
      await addCanvasToPDF(doc, canvas, true);
      doc.save(`Kaufvertrag_${puppy.name}_vom_Waldberg.pdf`);
    } else if (type === 'wurfmeldung') {
      const litter = LITTERS.find(l => l.id === id);
      const canvas = await renderSectionToCanvas(buildWurfmeldungHTML(litter), { docMeta: 'Wurfmeldung · Wurf «' + litter.litterLetter + '»' });
      await addCanvasToPDF(doc, canvas, true);
      doc.save(`Wurfmeldung_Wurf-${litter.litterLetter}_vom_Waldberg.pdf`);
    } else if (type === 'welpenpaket') {
      const puppy = PUPPIES.find(p => p.id === id);
      const docMetaBase = 'Welpen-Paket · ' + escapeHtml(puppy.fullName);
      const sections = [
        { name: 'cover', html: buildWelpenpaketCoverHTML(puppy), opts: { cover: true } },
        { name: 'kaufvertrag', html: buildKaufvertragHTML(puppy), opts: { docMeta: docMetaBase + ' · Kaufvertrag' } },
        { name: 'ahnentafel', html: buildAhnentafelHTML(puppy), opts: { docMeta: docMetaBase + ' · Stammbaum' } },
        { name: 'impfuebersicht', html: buildImpfuebersichtHTML(puppy), opts: { docMeta: docMetaBase + ' · Impfübersicht' } },
        { name: 'fuetterungsplan', html: buildFuetterungsplanHTML(puppy), opts: { docMeta: docMetaBase + ' · Fütterungsplan' } }
      ];
      for (let i = 0; i < sections.length; i++) {
        if (btn) btn.innerHTML = `⏳ Seite ${i + 1}/${sections.length}...`;
        const canvas = await renderSectionToCanvas(sections[i].html, sections[i].opts);
        await addCanvasToPDF(doc, canvas, i === 0);
      }
      doc.save(`Welpen-Paket_${puppy.name}_vom_Waldberg.pdf`);
    }
  } catch (e) {
    console.error('PDF generation failed:', e);
    alert('PDF-Generierung fehlgeschlagen: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = origText; }
  }
}

// Preview (HTML in modal) — re-uses the same builders, lighter styling
function buildPreviewHTML(type, id) {
  const styles = `<style>${pdfPageStyles()}</style>`;
  let inner = '';
  if (type === 'kaufvertrag') inner = buildKaufvertragHTML(PUPPIES.find(p => p.id === id));
  else if (type === 'wurfmeldung') inner = buildWurfmeldungHTML(LITTERS.find(l => l.id === id));
  else if (type === 'welpenpaket') {
    const p = PUPPIES.find(x => x.id === id);
    inner = buildWelpenpaketCoverHTML(p) +
      '<hr style="margin:20px 0;border:0;border-top:2px solid #2D6A4F"/>' +
      '<div style="font-size:11px;color:#71717A;margin:12px 0;font-style:italic">Folgende Seiten werden im PDF mitgeliefert:</div>' +
      buildKaufvertragHTML(p) +
      '<hr style="margin:20px 0;border:0;border-top:2px solid #2D6A4F"/>' +
      buildAhnentafelHTML(p) +
      '<hr style="margin:20px 0;border:0;border-top:2px solid #2D6A4F"/>' +
      buildImpfuebersichtHTML(p) +
      '<hr style="margin:20px 0;border:0;border-top:2px solid #2D6A4F"/>' +
      buildFuetterungsplanHTML(p);
  }
  return styles + '<div style="background:#fff;color:#1a1a1a">' + inner + '</div>';
}
