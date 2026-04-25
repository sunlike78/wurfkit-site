// PDF templates — based on real German VDH templates
// Source: 0_Doc/templates_research/kaufvertrag_research.md (Verband Kleine Münsterländer V-zu-V baseline)
// Source: 0_Doc/templates_research/wurfmeldung_research.md (Lagottoverein baseline + DWZRV/DK-Verband fields)

// Generate Kaufvertrag HTML preview (also used for PDF generation)
function buildKaufvertragHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;
  const buyer = puppy.buyer || { name: '[Käuferdaten ausstehend]', address: '', phone: '', email: '', birthDate: '' };
  const price = puppy.salePrice || 0;
  const priceWords = numberToGermanWords(Math.floor(price));
  const today = new Date().toLocaleDateString('de-DE');

  return `
    <h4>WELPEN-KAUFVERTRAG</h4>
    <div style="text-align:center;font-size:.78rem;color:var(--t3);margin-bottom:1.2rem">
      Verbraucher zu Verbraucher · Stand: 25.04.2026 · Vorlage v1.0
    </div>

    <div class="par">§1 Vertragsgegenstand</div>
    <p>Verkäufer und Züchter:</p>
    <div class="ku">
      <span><b>Name:</b></span><span>${BREEDER.fullName}</span>
      <span><b>Zwingername:</b></span><span>${BREEDER.kennelName}</span>
      <span><b>Anschrift:</b></span><span>${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}</span>
      <span><b>Mitglied:</b></span><span>${BREEDER.zuchtverein}, Mitgl.-Nr. ${BREEDER.vdhMember}</span>
      <span><b>Telefon:</b></span><span>${BREEDER.phone}</span>
      <span><b>E-Mail:</b></span><span>${BREEDER.email}</span>
    </div>

    <p>Käufer:</p>
    <div class="ku">
      <span><b>Name:</b></span><span>${buyer.name}</span>
      <span><b>Anschrift:</b></span><span>${buyer.address || '—'}</span>
      <span><b>Geburtsdatum:</b></span><span>${buyer.birthDate || '—'}</span>
      <span><b>Telefon:</b></span><span>${buyer.phone || '—'}</span>
      <span><b>E-Mail:</b></span><span>${buyer.email || '—'}</span>
    </div>

    <p>Verkauft wird folgender Welpe:</p>
    <div class="ku">
      <span><b>Rufname:</b></span><span>${puppy.name}</span>
      <span><b>Zuchtname:</b></span><span>${puppy.fullName}</span>
      <span><b>Rasse:</b></span><span>${litter.breed}</span>
      <span><b>Geschlecht:</b></span><span>${puppy.sex === 'male' ? 'Rüde' : 'Hündin'}</span>
      <span><b>Wurfdatum:</b></span><span>${formatDateDE(litter.birthDate)}</span>
      <span><b>Fellfarbe:</b></span><span>${puppy.color}</span>
      <span><b>Mikrochip-Nr.:</b></span><span>${puppy.microchip}</span>
      <span><b>ZB-Nr.:</b></span><span>folgt mit Ahnentafel</span>
      <span><b>Vater:</b></span><span>${sire.name} (${sire.zbNr})</span>
      <span><b>Mutter:</b></span><span>${dam.fullName} (${dam.zbNr})</span>
    </div>

    <div class="par">§2 Beschaffenheit / Verkaufsart</div>
    <p>Der Hund wird als <b>Liebhaber- und Familienhund</b> verkauft. Er stammt aus eigener Zucht des Verkäufers und wurde nach den Bestimmungen der Zuchtordnung des ${BREEDER.zuchtverein} aufgezogen. Die Eintragungen in der Ahnentafel und im EU-Heimtierausweis entsprechen der Wahrheit. Mit der Wurfabnahme durch den Zuchtwart wurden alle erforderlichen Identitäts- und Gesundheitsprüfungen durchgeführt.</p>

    <div class="par">§3 Kaufpreis und Zahlung</div>
    <p>Der Kaufpreis beträgt <b>${formatPrice(price)} (${priceWords} Euro)</b>. Eine Anzahlung in Höhe von 300,00 € wurde bei Vertragsunterzeichnung geleistet. Die Restzahlung erfolgt Zug um Zug bei Übergabe in bar oder per Überweisung auf folgendes Konto:</p>
    <div class="ku">
      <span><b>Kontoinhaber:</b></span><span>${BREEDER.fullName}</span>
      <span><b>IBAN:</b></span><span>${BREEDER.iban}</span>
      <span><b>BIC:</b></span><span>${BREEDER.bic}</span>
      <span><b>Bank:</b></span><span>${BREEDER.bank}</span>
    </div>

    <div class="par">§4 Übergabe / Gefahr- und Eigentumsübergang</div>
    <p>Die Übergabe des Hundes erfolgt am <b>${formatDateDE(puppy.saleDate || '2026-03-15')}</b> in ${BREEDER.city}. Die Gefahr einer zufälligen Verschlechterung oder eines Untergangs des Welpen geht mit der Übergabe auf den Käufer über. Das Eigentum am Hund geht erst mit vollständiger Bezahlung des Kaufpreises auf den Käufer über (Eigentumsvorbehalt).</p>

    <div class="par">§5 Gesundheitszustand</div>
    <p>Der Hund ist nach aktuellem Kenntnisstand des Verkäufers gesund und in einwandfreiem Zustand. Bis zum heutigen Tag wurden folgende Maßnahmen durchgeführt: Grundimmunisierung gemäß StIKo Vet (Staupe, Hepatitis, Parvovirose, Leptospirose), zweimalige Entwurmung, tierärztliche Allgemeinuntersuchung mit Mikrochip-Implantation. Sämtliche Daten sind im EU-Heimtierausweis dokumentiert.</p>
    <p><b>Bekannte Mängel/Erkrankungen:</b> keine bekannt. ☑</p>
    <p>Der Käufer bestätigt, den Hund ausführlich besichtigt zu haben. Der Hund war zum Zeitpunkt der Übergabe gesund und wies keine Krankheits- oder Mangelerscheinungen auf.</p>
    <p>Der Käufer wird ausdrücklich darauf hingewiesen, dass es sich beim verkauften Hund um ein Lebewesen handelt, das in der Wachstumsphase Veränderungen unterworfen ist. Der Verkäufer kann keine Gewähr für künftige Größe, Gebäude, Charakter, innere Organe, Fell, Sinnesorgane oder derzeit nicht erkannte Erbkrankheiten übernehmen.</p>

    <div class="par">§6 Sachmängelhaftung (Verbraucher zu Verbraucher)</div>
    <p>Da beide Vertragsparteien Verbraucher im Sinne des § 13 BGB sind, vereinbaren sie hiermit individuell ausgehandelt den <b>Ausschluss jeglicher Sachmängelhaftung</b>, soweit nicht unter §5 eine bestimmte Beschaffenheit vereinbart wurde oder dem Verkäufer Mängel bekannt waren und nicht offengelegt wurden (Arglist). Tiere sind gemäß §90a BGB keine Sachen; auf sie sind die für Sachen geltenden Vorschriften nur entsprechend anzuwenden.</p>

    <div class="par">§7 Pflichten des Käufers (Tierschutz)</div>
    <p>Der Käufer versichert, dass er über die für die Aufzucht und Haltung eines Hundes der oben genannten Rasse notwendigen Kenntnisse, Fähigkeiten und Möglichkeiten verfügt. Er verpflichtet sich zur Haltung mit Familienanschluss und zur ausreichenden Sozialisierung des Welpen. Die Bestimmungen des Tierschutzgesetzes und der Tierschutz-Hundeverordnung sind ihm bekannt und werden eingehalten. Anketten oder dauerhafte Zwingerhaltung sind ausgeschlossen.</p>

    <div class="par">§8 Zuchtbeschränkung</div>
    <p>Der Hund wird als Liebhaberhund verkauft. Eine zuchtmäßige Verwendung ist ohne ausdrückliche schriftliche Zustimmung des Verkäufers nicht gestattet. Sollte der Käufer den Hund zur Zucht einsetzen wollen, ist eine Zucht ausschließlich im Rahmen eines FCI/VDH-anerkannten Vereins unter Beachtung der dortigen Vorschriften zulässig.</p>

    <div class="par">§9 Vorkaufsrecht des Verkäufers</div>
    <p>Sollte der Käufer den Hund aus zwingenden Gründen abgeben müssen, räumt er dem Verkäufer ein Vorkaufsrecht ein (§§ 463 ff. BGB). Der Käufer informiert den Verkäufer mindestens 4 Wochen vor einer geplanten Weitergabe schriftlich. Der Verkäufer hat 2 Wochen Zeit zur Ausübung des Vorkaufsrechts; der Rückkaufpreis beträgt höchstens den ursprünglichen Kaufpreis.</p>

    <div class="par">§10 Schlussbestimmungen</div>
    <p>Mündliche Nebenabreden bestehen nicht. Änderungen oder Ergänzungen dieses Vertrages bedürfen der Schriftform. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Jede Vertragspartei erhält eine Ausfertigung dieses Vertrages.</p>

    <div style="margin-top:1.2rem;padding:.8rem;background:#FEF3C7;border:1px solid #FDE68A;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.78rem;color:#78350F">
      <b>Hinweis:</b> Diese Vorlage basiert auf dem Muster des Verbands für Kleine Münsterländer e.V. (Verbraucher-zu-Verbraucher) und ist als Hilfsmittel gedacht. Sie ersetzt keine individuelle Rechtsberatung. Vor finaler Verwendung empfehlen wir Prüfung durch einen Fachanwalt für Vertrags-/Tierrecht.
    </div>

    <p style="margin-top:1.5rem"><b>Ort, Datum:</b> ${BREEDER.city}, ${formatDateDE(puppy.saleDate || '2026-03-15')}</p>

    <table style="width:100%;margin-top:1.5rem;font-family:'DM Sans',sans-serif;font-size:.85rem">
      <tr>
        <td style="border-top:1px solid var(--t);padding-top:6px;width:48%">Verkäufer<br><i>${BREEDER.fullName}</i></td>
        <td style="width:4%"></td>
        <td style="border-top:1px solid var(--t);padding-top:6px;width:48%">Käufer<br><i>${buyer.name}</i></td>
      </tr>
    </table>
  `;
}

function buildWurfmeldungHTML(litter) {
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;
  const puppies = PUPPIES.filter(p => p.litterId === litter.id);
  const males = puppies.filter(p => p.sex === 'male');
  const females = puppies.filter(p => p.sex === 'female');

  return `
    <h4>WURFMELDUNG / DECKMELDUNG (Datenblatt)</h4>
    <div style="text-align:center;font-size:.78rem;color:var(--t3);margin-bottom:1.2rem">
      Vorbereitung für Vereins-Formular · ${BREEDER.zuchtverein}
    </div>

    <div class="par">Züchter / Anbieter</div>
    <div class="ku">
      <span><b>Name:</b></span><span>${BREEDER.fullName}</span>
      <span><b>Zwingername:</b></span><span>${BREEDER.kennelName}</span>
      <span><b>Anschrift:</b></span><span>${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}</span>
      <span><b>Telefon:</b></span><span>${BREEDER.phone}</span>
      <span><b>E-Mail:</b></span><span>${BREEDER.email}</span>
      <span><b>Verein:</b></span><span>${BREEDER.zuchtverein}</span>
      <span><b>Mitglieds-Nr.:</b></span><span>${BREEDER.vdhMember}</span>
    </div>

    <div class="par">Zuchthündin (Mutter)</div>
    <div class="ku">
      <span><b>Rufname:</b></span><span>${dam.name}</span>
      <span><b>Zuchtbuchname:</b></span><span>${dam.fullName}</span>
      <span><b>ZB-Nr.:</b></span><span>${dam.zbNr}</span>
      <span><b>Mikrochip:</b></span><span>${dam.microchip}</span>
      <span><b>Wurftag (eigener):</b></span><span>${formatDateDE(dam.birth)}</span>
      <span><b>Rasse / Farbe:</b></span><span>${dam.breed} / ${dam.color}</span>
      <span><b>HD / ED:</b></span><span>${dam.hd} / ${dam.ed}</span>
      <span><b>Formwert / ZTP:</b></span><span>${dam.formwert} / ${dam.ztp ? formatDateDE(dam.ztpDate) : 'nein'}</span>
    </div>

    <div class="par">Deckrüde (Vater)</div>
    <div class="ku">
      <span><b>Rufname:</b></span><span>${sire.name.split(' ')[0]}</span>
      <span><b>Zuchtbuchname:</b></span><span>${sire.name}</span>
      <span><b>ZB-Nr.:</b></span><span>${sire.zbNr}</span>
      <span><b>Mikrochip:</b></span><span>${sire.microchip}</span>
      <span><b>Wurftag (eigener):</b></span><span>${formatDateDE(sire.birth)}</span>
      <span><b>Rasse / Farbe:</b></span><span>${litter.breed} / ${sire.color}</span>
      <span><b>HD / ED:</b></span><span>${sire.hd} / ${sire.ed}</span>
      <span><b>Eigentümer:</b></span><span>${sire.owner}</span>
    </div>

    <div class="par">Deck- und Wurfdaten</div>
    <div class="ku">
      <span><b>Deckdatum:</b></span><span>${formatDateDE(litter.deckDate)}</span>
      <span><b>Ort der Deckung:</b></span><span>${litter.deckOrt}</span>
      <span><b>Wurftag:</b></span><span>${formatDateDE(litter.birthDate)}</span>
      <span><b>Wurfstärke gesamt:</b></span><span>${litter.wurfStaerke.total}</span>
      <span><b>davon lebend:</b></span><span>${litter.wurfStaerke.alive}</span>
      <span><b>davon totgeboren:</b></span><span>${litter.wurfStaerke.stillborn}</span>
      <span><b>Rüden / Hündinnen:</b></span><span>${litter.wurfStaerke.male} R / ${litter.wurfStaerke.female} H</span>
      <span><b>Wurfbuchstabe:</b></span><span>${litter.litterLetter}</span>
      <span><b>Geburtsverlauf:</b></span><span>natürlich</span>
    </div>

    <div class="par">Welpen-Liste</div>
    <table style="width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;font-size:.78rem;margin-top:.4rem">
      <thead>
        <tr style="background:var(--surf2);border-bottom:1px solid var(--b)">
          <th style="text-align:left;padding:5px;width:30px">Lfd.</th>
          <th style="text-align:left;padding:5px">Rufname</th>
          <th style="text-align:left;padding:5px;width:40px">Geschl.</th>
          <th style="text-align:left;padding:5px">Farbe</th>
          <th style="text-align:left;padding:5px">Mikrochip-Nr.</th>
          <th style="text-align:right;padding:5px">Geb.gew.</th>
          <th style="text-align:left;padding:5px">Verbleib</th>
        </tr>
      </thead>
      <tbody>
        ${males.concat(females).map((p, i) => `
          <tr style="border-bottom:1px dashed var(--b)">
            <td style="padding:5px">${i + 1}</td>
            <td style="padding:5px">${p.name}</td>
            <td style="padding:5px">${p.sex === 'male' ? 'R' : 'H'}</td>
            <td style="padding:5px">${p.color}</td>
            <td style="padding:5px;font-family:monospace;font-size:.7rem">${p.microchip}</td>
            <td style="padding:5px;text-align:right">${p.birthWeight} g</td>
            <td style="padding:5px">lebend</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="par">Anlagen</div>
    <ul style="font-family:'DM Sans',sans-serif;font-size:.85rem;list-style:none;padding-left:0;margin-top:.4rem">
      <li>☑ Original-Deckschein / Deckbescheinigung</li>
      <li>☑ Ahnentafel-Kopie der Zuchthündin</li>
      <li>☑ Ahnentafel-Kopie des Deckrüden</li>
      <li>☑ Mikrochip-Bestätigung Tierarzt (Aufkleber)</li>
      <li>☐ Wurfabnahmeprotokoll des Zuchtwarts (folgt nach Wurfabnahme: ${formatDateDE(litter.wurfabnahmeDate)})</li>
    </ul>

    <div style="margin-top:1.2rem;padding:.8rem;background:#FEF3C7;border:1px solid #FDE68A;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.78rem;color:#78350F">
      <b>Hinweis:</b> Dieses Datenblatt ist eine Vorbereitung für das Wurfmeldungs-Formular Ihres Zuchtvereins. Die formelle Wurfmeldung wird durch das Vereins-Formular nach Wurfabnahme durch den Zuchtwart eingereicht.
    </div>

    <p style="margin-top:1.5rem"><b>Ort, Datum:</b> ${BREEDER.city}, ${formatDateDE(litter.wurfmeldungDate)}</p>

    <table style="width:100%;margin-top:1rem;font-family:'DM Sans',sans-serif;font-size:.85rem">
      <tr>
        <td style="border-top:1px solid var(--t);padding-top:6px;width:48%">Unterschrift Züchter<br><i>${BREEDER.fullName}</i></td>
        <td style="width:4%"></td>
        <td style="border-top:1px solid var(--t);padding-top:6px;width:48%">Unterschrift Zuchtwart<br><i>(nach Wurfabnahme)</i></td>
      </tr>
    </table>
  `;
}

function buildWelpenpaketHTML(puppy) {
  const litter = LITTERS.find(l => l.id === puppy.litterId);
  const dam = DOGS.find(d => d.id === litter.damId);
  const sire = litter.externalSire;

  // Generate QR code as data URI for the puppy profile
  const qrUrl = `https://wurfkit.de/welpe/${puppy.id}`;
  let qrSVG = '';
  try {
    if (typeof qrcode !== 'undefined') {
      const qr = qrcode(0, 'M');
      qr.addData(qrUrl);
      qr.make();
      qrSVG = qr.createSvgTag({ scalable: true, cellSize: 4, margin: 2 });
    }
  } catch(e) {}

  return `
    <h4>WELPEN-PAKET</h4>
    <div style="text-align:center;font-size:.78rem;color:var(--t3);margin-bottom:1.2rem">
      Komplette Unterlagen für die Welpenübergabe · ${puppy.fullName}
    </div>

    <div style="text-align:center;margin:1.5rem 0;padding:1.5rem;background:linear-gradient(135deg,#D8F3DC,#EBF7EE);border-radius:10px;border:1px solid #BBF7D0">
      <div style="font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:500;color:#1B4332">${puppy.name}</div>
      <div style="font-size:.92rem;color:#2D6A4F;margin-top:4px">${puppy.fullName}</div>
      <div style="font-size:.82rem;color:var(--t2);margin-top:8px">${litter.breed} · ${puppy.sex === 'male' ? 'Rüde' : 'Hündin'} · ${puppy.color} · geboren ${formatDateDE(litter.birthDate)}</div>
    </div>

    <div class="par">📄 Inhalt dieses Pakets</div>
    <ol style="font-family:'DM Sans',sans-serif;font-size:.92rem;padding-left:1.5rem;line-height:1.9">
      <li><b>Welpen-Kaufvertrag</b> (8 Seiten) — vollständig ausgefüllt, gegenseitig unterschrieben</li>
      <li><b>Stammbaum-Übersicht</b> (3 Generationen) — Vorbereitung zur offiziellen VDH-Ahnentafel</li>
      <li><b>EU-Heimtierausweis</b> (Original) — mit Mikrochip-Eintrag und allen erfolgten Impfungen</li>
      <li><b>Impfübersicht</b> (1 Seite) — kompakte Zusammenfassung als Ergänzung zum Heimtierausweis</li>
      <li><b>Fütterungsplan</b> (1 Seite) — empfohlenes Futter und Mengen für die ersten 6 Monate</li>
      <li><b>Pflegehinweise</b> — Sozialisation, Erziehung, erste Wochen zu Hause</li>
      <li><b>Tierarzt-Empfehlungen</b> — Booster-Termine, nächste Entwurmung, weitere Untersuchungen</li>
      <li><b>QR-Code</b> → digitales Welpen-Profil mit allen Unterlagen jederzeit abrufbar</li>
    </ol>

    <div class="par">🐾 Welpen-Daten</div>
    <div class="ku">
      <span><b>Mikrochip:</b></span><span style="font-family:monospace">${puppy.microchip}</span>
      <span><b>Geburtsgewicht:</b></span><span>${puppy.birthWeight} g</span>
      <span><b>Aktuelles Gewicht:</b></span><span>${(puppy.weights[puppy.weights.length-1].g/1000).toFixed(1)} kg (${litter.weeks} Wochen)</span>
      <span><b>Vater:</b></span><span>${sire.name}, ${sire.zbNr}, HD ${sire.hd}</span>
      <span><b>Mutter:</b></span><span>${dam.fullName}, ${dam.zbNr}, HD ${dam.hd}</span>
      <span><b>COI (Wurf):</b></span><span>3.2% (Rasse-Ø: ${BREED_AVG_COI[litter.breed] || '7.1'}%)</span>
    </div>

    <div class="par">💉 Impfübersicht (gemäß StIKo Vet 2025)</div>
    <table style="width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;font-size:.78rem;margin-top:.4rem">
      <thead>
        <tr style="background:var(--surf2);border-bottom:1px solid var(--b)">
          <th style="text-align:left;padding:5px">Datum</th>
          <th style="text-align:left;padding:5px">Alter</th>
          <th style="text-align:left;padding:5px">Impfung</th>
          <th style="text-align:left;padding:5px">Impfstoff</th>
          <th style="text-align:left;padding:5px">Tierarzt</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px dashed var(--b)"><td style="padding:5px">${formatDateDE(addDaysISO(litter.birthDate, 56))}</td><td style="padding:5px">8 Wo.</td><td style="padding:5px">SHP + Lepto</td><td style="padding:5px">Nobivac DHP+L</td><td style="padding:5px">Dr. Müller, München</td></tr>
        <tr style="border-bottom:1px dashed var(--b)"><td style="padding:5px">${formatDateDE(addDaysISO(litter.birthDate, 84))}</td><td style="padding:5px">12 Wo.</td><td style="padding:5px">SHP + Lepto + Tollwut</td><td style="padding:5px">Nobivac DHP+L+R</td><td style="padding:5px">Dr. Müller, München</td></tr>
      </tbody>
    </table>
    <p style="font-size:.78rem;color:var(--t3);margin-top:.4rem;font-style:italic">
      Nächste Impfung: 16 Wochen (SHP + Tollwut). Booster: nach 15 Monaten.
    </p>

    <div class="par">🥘 Fütterungsplan (gekürzt)</div>
    <table style="width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;font-size:.82rem;margin-top:.4rem">
      <thead>
        <tr style="background:var(--surf2)">
          <th style="text-align:left;padding:5px">Alter</th>
          <th style="text-align:left;padding:5px">Mahlzeiten/Tag</th>
          <th style="text-align:left;padding:5px">Menge/Tag</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px dashed var(--b)"><td style="padding:5px">8–12 Wochen</td><td style="padding:5px">4×</td><td style="padding:5px">200–300 g Welpenfutter</td></tr>
        <tr style="border-bottom:1px dashed var(--b)"><td style="padding:5px">3–6 Monate</td><td style="padding:5px">3×</td><td style="padding:5px">300–400 g</td></tr>
        <tr style="border-bottom:1px dashed var(--b)"><td style="padding:5px">6–12 Monate</td><td style="padding:5px">2×</td><td style="padding:5px">350–500 g</td></tr>
      </tbody>
    </table>

    <div class="par">🔗 Digitales Profil</div>
    <div style="display:flex;gap:1rem;align-items:center;margin-top:.6rem;padding:1rem;background:var(--surf2);border-radius:8px">
      <div style="width:120px;height:120px;flex-shrink:0;background:#fff;padding:8px;border-radius:6px">${qrSVG || '<div style=\"width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px\">📱</div>'}</div>
      <div style="font-family:'DM Sans',sans-serif;font-size:.85rem;line-height:1.6">
        <div style="font-weight:600;margin-bottom:4px">QR-Code scannen für jederzeit aktuelle Daten:</div>
        <a href="${qrUrl}" style="color:var(--p);font-family:monospace;font-size:.78rem">${qrUrl}</a>
        <div style="font-size:.78rem;color:var(--t3);margin-top:6px">Stammbaum, Impfübersicht, Züchterkontakt, Wurf-Geschwister.</div>
      </div>
    </div>

    <div class="par">📞 Züchter-Kontakt</div>
    <div class="ku">
      <span><b>Maria Schmidt</b></span><span></span>
      <span><b>Zwinger:</b></span><span>${BREEDER.kennelName}</span>
      <span><b>Anschrift:</b></span><span>${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}</span>
      <span><b>Telefon:</b></span><span>${BREEDER.phone}</span>
      <span><b>E-Mail:</b></span><span>${BREEDER.email}</span>
      <span><b>Verein:</b></span><span>${BREEDER.zuchtverein}</span>
    </div>

    <div style="margin-top:1.2rem;padding:.8rem;background:#FEF3C7;border:1px solid #FDE68A;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.78rem;color:#78350F">
      <b>Hinweis:</b> Diese Stammbaum-Übersicht ersetzt nicht die offizielle VDH-Ahnentafel. Die Original-Ahnentafel wird vom Zuchtbuchamt des ${BREEDER.zuchtverein} ausgestellt.
    </div>
  `;
}

function addDaysISO(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// PDF download via jsPDF — render text-based PDF
function downloadPDF() {
  if (!STATE.currentPDF) return;
  const { type, id } = STATE.currentPDF;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const margin = 20;
  let y = margin;
  const pageW = 210, pageH = 297, contentW = pageW - 2 * margin;

  function addH1(t) {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    if (y > 30) y += 4;
    doc.text(t, pageW / 2, y, { align: 'center' });
    y += 8;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  }
  function addH2(t) {
    if (y > pageH - 30) { doc.addPage(); y = margin; }
    y += 3;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    doc.text(t, margin, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  }
  function addP(t) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    const lines = doc.splitTextToSize(t, contentW);
    for (const line of lines) {
      if (y > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(line, margin, y); y += 4.5;
    }
    y += 1;
  }
  function addKV(rows) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    for (const [k, v] of rows) {
      if (y > pageH - margin) { doc.addPage(); y = margin; }
      doc.setFont('helvetica', 'bold'); doc.text(k + ':', margin, y);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(String(v || '—'), contentW - 60);
      doc.text(lines, margin + 60, y);
      y += 4.5 * Math.max(lines.length, 1);
    }
    y += 1;
    doc.setFontSize(10);
  }
  function addSmall(t, color) {
    doc.setFontSize(8);
    if (color) doc.setTextColor(...color);
    const lines = doc.splitTextToSize(t, contentW);
    for (const line of lines) {
      if (y > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(line, margin, y); y += 3.5;
    }
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10); y += 1;
  }

  if (type === 'kaufvertrag') {
    const puppy = PUPPIES.find(p => p.id === id);
    const litter = LITTERS.find(l => l.id === puppy.litterId);
    const dam = DOGS.find(d => d.id === litter.damId);
    const sire = litter.externalSire;
    const buyer = puppy.buyer || { name: '[Käufer]', address: '', phone: '', email: '', birthDate: '' };
    const price = puppy.salePrice || 0;
    const priceWords = numberToGermanWords(Math.floor(price));

    addH1('WELPEN-KAUFVERTRAG');
    addSmall('Verbraucher zu Verbraucher · Stand: 25.04.2026 · Vorlage v1.0', [120, 120, 120]);

    addH2('§1 Vertragsgegenstand');
    addP('Verkäufer und Züchter:');
    addKV([
      ['Name', BREEDER.fullName],
      ['Zwingername', BREEDER.kennelName],
      ['Anschrift', `${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}`],
      ['Verein', `${BREEDER.zuchtverein}, Mitgl-Nr ${BREEDER.vdhMember}`],
      ['Telefon', BREEDER.phone],
      ['E-Mail', BREEDER.email]
    ]);
    addP('Käufer:');
    addKV([
      ['Name', buyer.name],
      ['Anschrift', buyer.address],
      ['Geburtsdatum', buyer.birthDate],
      ['Telefon', buyer.phone],
      ['E-Mail', buyer.email]
    ]);
    addP('Verkauft wird folgender Welpe:');
    addKV([
      ['Rufname', puppy.name],
      ['Zuchtname', puppy.fullName],
      ['Rasse', litter.breed],
      ['Geschlecht', puppy.sex === 'male' ? 'Rüde' : 'Hündin'],
      ['Wurfdatum', formatDateDE(litter.birthDate)],
      ['Fellfarbe', puppy.color],
      ['Mikrochip-Nr', puppy.microchip],
      ['Vater', `${sire.name} (${sire.zbNr})`],
      ['Mutter', `${dam.fullName} (${dam.zbNr})`]
    ]);

    addH2('§2 Beschaffenheit / Verkaufsart');
    addP(`Der Hund wird als Liebhaber- und Familienhund verkauft. Er stammt aus eigener Zucht des Verkäufers und wurde nach den Bestimmungen der Zuchtordnung des ${BREEDER.zuchtverein} aufgezogen.`);

    addH2('§3 Kaufpreis und Zahlung');
    addP(`Der Kaufpreis beträgt ${formatPrice(price)} (${priceWords} Euro). Eine Anzahlung von 300,00 EUR wurde geleistet. Die Restzahlung erfolgt Zug um Zug bei Übergabe.`);

    addH2('§4 Übergabe / Gefahr- und Eigentumsübergang');
    addP(`Übergabe am ${formatDateDE(puppy.saleDate || '2026-03-15')} in ${BREEDER.city}. Die Gefahr geht mit der Übergabe auf den Käufer über; das Eigentum erst mit vollständiger Bezahlung (Eigentumsvorbehalt).`);

    addH2('§5 Gesundheitszustand');
    addP('Der Hund ist nach aktuellem Kenntnisstand gesund. Bekannte Mängel: keine bekannt. Der Käufer bestätigt, den Hund besichtigt zu haben.');
    addP('Hinweis: Es handelt sich um ein Lebewesen in der Wachstumsphase. Keine Gewähr für künftige Größe, Gebäude, Charakter, innere Organe, Sinnesorgane oder noch nicht erkannte Erbkrankheiten.');

    addH2('§6 Sachmängelhaftung (V-zu-V)');
    addP('Da beide Parteien Verbraucher sind, vereinbaren sie individuell ausgehandelt den Ausschluss der Sachmängelhaftung, ausgenommen Beschaffenheitsvereinbarung in §5 und Arglist. Tiere sind gemäß §90a BGB keine Sachen.');

    addH2('§7 Pflichten des Käufers');
    addP('Der Käufer verpflichtet sich zur Haltung mit Familienanschluss und Sozialisierung. Tierschutzgesetz und Tierschutz-Hundeverordnung sind ihm bekannt. Anketten oder dauerhafte Zwingerhaltung sind ausgeschlossen.');

    addH2('§8 Zuchtbeschränkung');
    addP('Verkauf als Liebhaberhund. Zuchtmäßige Verwendung nur mit schriftlicher Zustimmung des Verkäufers und im Rahmen eines FCI/VDH-anerkannten Vereins.');

    addH2('§9 Vorkaufsrecht');
    addP('Bei Weitergabe informiert der Käufer den Verkäufer mindestens 4 Wochen vorher schriftlich. Vorkaufsrecht (§§463 ff. BGB), 2 Wochen Reaktionsfrist, max. ursprünglicher Kaufpreis.');

    addH2('§10 Schlussbestimmungen');
    addP('Mündliche Nebenabreden bestehen nicht. Änderungen bedürfen der Schriftform. Salvatorische Klausel. Jede Partei erhält eine Ausfertigung.');

    addSmall('HINWEIS: Diese Vorlage basiert auf dem Muster des Verbands für Kleine Münsterländer e.V. und ersetzt keine Rechtsberatung. Vor Verwendung Prüfung durch Fachanwalt empfohlen.', [120, 80, 0]);

    y += 8;
    if (y > pageH - 40) { doc.addPage(); y = margin; }
    addP(`Ort, Datum: ${BREEDER.city}, ${formatDateDE(puppy.saleDate || '2026-03-15')}`);

    y += 12;
    doc.line(margin, y, margin + 70, y);
    doc.line(margin + 100, y, margin + 170, y);
    y += 4;
    doc.setFontSize(9);
    doc.text('Verkäufer', margin, y);
    doc.text('Käufer', margin + 100, y);
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.text(BREEDER.fullName, margin, y);
    doc.text(buyer.name, margin + 100, y);

    doc.save(`Kaufvertrag_${puppy.name}_vom_Waldberg.pdf`);
  } else if (type === 'wurfmeldung') {
    const litter = LITTERS.find(l => l.id === id);
    const dam = DOGS.find(d => d.id === litter.damId);
    const sire = litter.externalSire;
    const puppies = PUPPIES.filter(p => p.litterId === litter.id);

    addH1('WURFMELDUNG / DECKMELDUNG');
    addSmall(`Datenblatt zur Vorlage beim ${BREEDER.zuchtverein}`, [120, 120, 120]);

    addH2('Züchter');
    addKV([
      ['Name', BREEDER.fullName],
      ['Zwingername', BREEDER.kennelName],
      ['Anschrift', `${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}`],
      ['Telefon', BREEDER.phone],
      ['E-Mail', BREEDER.email],
      ['Verein / Mitgl-Nr', `${BREEDER.zuchtverein} / ${BREEDER.vdhMember}`]
    ]);

    addH2('Zuchthündin (Mutter)');
    addKV([
      ['Rufname', dam.name],
      ['Zuchtbuchname', dam.fullName],
      ['ZB-Nr', dam.zbNr],
      ['Mikrochip', dam.microchip],
      ['Wurftag', formatDateDE(dam.birth)],
      ['Rasse / Farbe', `${dam.breed} / ${dam.color}`],
      ['HD / ED', `${dam.hd} / ${dam.ed}`],
      ['Formwert / ZTP', `${dam.formwert} / ${dam.ztp ? formatDateDE(dam.ztpDate) : 'nein'}`]
    ]);

    addH2('Deckrüde (Vater)');
    addKV([
      ['Zuchtbuchname', sire.name],
      ['ZB-Nr', sire.zbNr],
      ['Mikrochip', sire.microchip],
      ['Wurftag', formatDateDE(sire.birth)],
      ['Rasse / Farbe', `${litter.breed} / ${sire.color}`],
      ['HD / ED', `${sire.hd} / ${sire.ed}`],
      ['Eigentümer', sire.owner]
    ]);

    addH2('Deck- und Wurfdaten');
    addKV([
      ['Deckdatum', formatDateDE(litter.deckDate)],
      ['Ort der Deckung', litter.deckOrt],
      ['Wurftag', formatDateDE(litter.birthDate)],
      ['Wurfstärke gesamt', String(litter.wurfStaerke.total)],
      ['davon lebend', String(litter.wurfStaerke.alive)],
      ['davon totgeboren', String(litter.wurfStaerke.stillborn)],
      ['Rüden / Hündinnen', `${litter.wurfStaerke.male} R / ${litter.wurfStaerke.female} H`],
      ['Wurfbuchstabe', litter.litterLetter],
      ['Geburtsverlauf', 'natürlich']
    ]);

    addH2('Welpen-Liste');
    doc.setFontSize(9);
    if (y > pageH - 30) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.text('Lfd', margin, y);
    doc.text('Name', margin + 12, y);
    doc.text('S', margin + 50, y);
    doc.text('Farbe', margin + 60, y);
    doc.text('Mikrochip', margin + 90, y);
    doc.text('g', margin + 145, y);
    doc.text('Verbleib', margin + 158, y);
    y += 4;
    doc.line(margin, y, pageW - margin, y);
    y += 2;
    doc.setFont('helvetica', 'normal');
    const sortedPups = puppies.filter(p => p.sex === 'male').concat(puppies.filter(p => p.sex === 'female'));
    sortedPups.forEach((p, i) => {
      if (y > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(String(i + 1), margin, y);
      doc.text(p.name, margin + 12, y);
      doc.text(p.sex === 'male' ? 'R' : 'H', margin + 50, y);
      doc.text(p.color, margin + 60, y);
      doc.text(p.microchip, margin + 90, y);
      doc.text(String(p.birthWeight), margin + 145, y);
      doc.text('lebend', margin + 158, y);
      y += 4;
    });

    y += 4;
    addH2('Anlagen');
    addP('☑ Original-Deckschein  ☑ Ahnentafel-Kopie Hündin  ☑ Ahnentafel-Kopie Rüde');
    addP('☑ Mikrochip-Bestätigung Tierarzt  ☐ Wurfabnahmeprotokoll (folgt)');

    addSmall(`HINWEIS: Datenblatt zur Vorbereitung des Wurfmeldungs-Formulars. Formelle Wurfmeldung erfolgt durch Vereins-Formular nach Wurfabnahme durch den Zuchtwart.`, [120, 80, 0]);

    if (y > pageH - 40) { doc.addPage(); y = margin; }
    y += 8;
    addP(`Ort, Datum: ${BREEDER.city}, ${formatDateDE(litter.wurfmeldungDate)}`);

    y += 12;
    doc.line(margin, y, margin + 70, y);
    doc.line(margin + 100, y, margin + 170, y);
    y += 4;
    doc.setFontSize(9);
    doc.text('Unterschrift Züchter', margin, y);
    doc.text('Unterschrift Zuchtwart', margin + 100, y);

    doc.save(`Wurfmeldung_Wurf-${litter.litterLetter}_vom_Waldberg.pdf`);
  } else if (type === 'welpenpaket') {
    const puppy = PUPPIES.find(p => p.id === id);
    const litter = LITTERS.find(l => l.id === puppy.litterId);
    const dam = DOGS.find(d => d.id === litter.damId);
    const sire = litter.externalSire;

    addH1('WELPEN-PAKET');
    addSmall(`Komplette Unterlagen für die Welpenübergabe · ${puppy.fullName}`, [120, 120, 120]);

    y += 4;
    doc.setFillColor(216, 243, 220);
    doc.roundedRect(margin, y, contentW, 28, 3, 3, 'F');
    doc.setFontSize(20); doc.setFont('helvetica', 'bold');
    doc.setTextColor(27, 67, 50);
    doc.text(puppy.name, pageW / 2, y + 11, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 106, 79);
    doc.text(puppy.fullName, pageW / 2, y + 17, { align: 'center' });
    doc.setFontSize(9); doc.setTextColor(74, 74, 74);
    doc.text(`${litter.breed} · ${puppy.sex === 'male' ? 'Rüde' : 'Hündin'} · ${puppy.color} · geboren ${formatDateDE(litter.birthDate)}`, pageW / 2, y + 23, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    y += 34;

    addH2('Inhalt dieses Pakets');
    [
      '1. Welpen-Kaufvertrag — vollständig ausgefüllt, gegenseitig unterschrieben',
      '2. Stammbaum-Übersicht (3 Generationen)',
      '3. EU-Heimtierausweis (Original) mit Mikrochip-Eintrag',
      '4. Impfübersicht — kompakte Zusammenfassung',
      '5. Fütterungsplan für die ersten 6 Monate',
      '6. Pflegehinweise und Sozialisationsanleitung',
      '7. Tierarzt-Empfehlungen für Booster und Untersuchungen',
      '8. QR-Code zum digitalen Welpen-Profil'
    ].forEach(s => addP(s));

    addH2('Welpen-Daten');
    addKV([
      ['Mikrochip', puppy.microchip],
      ['Geburtsgewicht', `${puppy.birthWeight} g`],
      ['Aktuelles Gewicht', `${(puppy.weights[puppy.weights.length-1].g/1000).toFixed(1)} kg (${litter.weeks} Wochen)`],
      ['Vater', `${sire.name}, ${sire.zbNr}, HD ${sire.hd}`],
      ['Mutter', `${dam.fullName}, ${dam.zbNr}, HD ${dam.hd}`],
      ['COI (Wurf)', `3.2% (Rasse-Ø: ${BREED_AVG_COI[litter.breed] || 7.1}%)`]
    ]);

    addH2('Impfübersicht (gemäß StIKo Vet 2025)');
    addKV([
      [formatDateDE(addDaysISO(litter.birthDate, 56)) + ' (8 Wochen)', 'SHP + Lepto · Nobivac DHP+L'],
      [formatDateDE(addDaysISO(litter.birthDate, 84)) + ' (12 Wochen)', 'SHP + Lepto + Tollwut · Nobivac DHP+L+R']
    ]);
    addP('Nächste Impfung: 16 Wochen (SHP + Tollwut). Booster: nach 15 Monaten.');

    addH2('Fütterungsplan');
    addKV([
      ['8–12 Wochen', '4 Mahlzeiten/Tag · 200–300 g Welpenfutter'],
      ['3–6 Monate', '3 Mahlzeiten/Tag · 300–400 g'],
      ['6–12 Monate', '2 Mahlzeiten/Tag · 350–500 g']
    ]);

    addH2('Züchter-Kontakt');
    addKV([
      ['Maria Schmidt', BREEDER.kennelName],
      ['Anschrift', `${BREEDER.street}, ${BREEDER.postalCode} ${BREEDER.city}`],
      ['Telefon', BREEDER.phone],
      ['E-Mail', BREEDER.email],
      ['Verein', BREEDER.zuchtverein]
    ]);

    addSmall(`HINWEIS: Die Stammbaum-Übersicht ersetzt nicht die offizielle VDH-Ahnentafel. Diese wird vom Zuchtbuchamt des ${BREEDER.zuchtverein} ausgestellt.`, [120, 80, 0]);

    doc.save(`Welpen-Paket_${puppy.name}_vom_Waldberg.pdf`);
  }
}
