// SVG pedigree tree renderer (4 ancestor generations for the prospective litter)
// Layout: litter (col 0) -> parents (col 1, 2) -> grandparents (col 2, 4)
//         -> great-grandparents (col 3, 8) -> great-great-grandparents (col 4, 16)
// Litter gen N = each parent's gen N-1 (parent trees from buildPedigreeTree hold 3 generations).
// The common ancestors driving the demo COI sit in the parents' gen3 = litter gen4 (col 4).

function renderPedigreeSVG(sireDog, damDog, ancestorsPool, container) {
  if (!sireDog || !damDog) {
    container.innerHTML = '<p style="color:var(--t3);text-align:center;padding:2rem">' +
      (STATE.lang === 'de' ? 'Stammbaum nicht verfügbar.' :
       STATE.lang === 'en' ? 'Pedigree not available.' : 'Родословная недоступна.') + '</p>';
    return;
  }

  // Build full tree for the prospective offspring (sire + dam pedigrees combined)
  const sireTree = buildPedigreeTree(sireDog, ancestorsPool);
  const damTree = buildPedigreeTree(damDog, ancestorsPool);

  // Detect common ancestors for highlighting
  const result = calculateCOI(sireDog, damDog, ancestorsPool);
  const commonIds = new Set(result.commonAncestors.map(c => c.id));

  const W = 940, H = 580;
  const colX = [10, 196, 382, 568, 754]; // x positions of generation columns
  const cellW = 170, cellH = 34;

  let svg = `<svg class="ped" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  function cell(x, y, node, sideClass, isCommon, opts) {
    if (!node) {
      svg += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="4"/>`;
      svg += `<text x="${x + cellW / 2}" y="${y + cellH / 2 + 3}" text-anchor="middle" fill="#aaa" font-size="10">—</text>`;
      return;
    }
    const cls = isCommon ? 'common' : sideClass;
    const name = node.name || '—';
    const truncName = name.length > 24 ? name.substring(0, 22) + '…' : name;
    const sub = (node.zbNr || '') + (node.hd ? ' · HD ' + node.hd : '') + (node.formwert ? ' · ' + node.formwert : '');
    const truncSub = sub.length > 30 ? sub.substring(0, 28) + '…' : sub;

    // Wrap cell in clickable <g>: parents (Gen 1) → open dog detail;
    // grandparents / great-grandparents → open ancestor-info modal.
    // Identifier passed via data attribute. Keyboard accessible via tabindex.
    const dogId = opts && opts.dogId ? escapeXml(opts.dogId) : '';
    const zbNr = node.zbNr ? escapeXml(node.zbNr) : '';
    const action = dogId
      ? `onclick="goTab('overview');openDogDetail('${dogId}')"`
      : zbNr
        ? `onclick="openAncestorModal('${zbNr}')"`
        : '';
    const titleTxt = escapeXml(name) + (node.zbNr ? ' — ' + escapeXml(node.zbNr) : '');
    svg += `<g class="pcell" tabindex="0" role="button" aria-label="${titleTxt}" ${action} onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.dispatchEvent(new MouseEvent('click'))}">`;
    svg += `<title>${titleTxt}</title>`;
    svg += `<rect class="${cls}" x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="4"/>`;
    svg += `<text class="t" x="${x + 6}" y="${y + 14}">${escapeXml(truncName)}</text>`;
    svg += `<text class="s" x="${x + 6}" y="${y + 27}">${escapeXml(truncSub)}</text>`;
    svg += `</g>`;
  }

  function line(x1, y1, x2, y2) {
    const mx = (x1 + x2) / 2;
    svg += `<path d="M${x1},${y1} L${mx},${y1} L${mx},${y2} L${x2},${y2}"/>`;
  }

  // Animal (offspring) — generation 0
  const yMid = H / 2 - cellH / 2;
  svg += `<rect x="${colX[0]}" y="${yMid}" width="${cellW}" height="${cellH}" rx="4" fill="#D8F3DC" stroke="#52B788" stroke-width="2"/>`;
  svg += `<text class="t" x="${colX[0] + cellW / 2}" y="${yMid + 14}" text-anchor="middle" font-weight="700" fill="#1B4332">A × Wurf</text>`;
  svg += `<text class="s" x="${colX[0] + cellW / 2}" y="${yMid + 27}" text-anchor="middle">${sireDog.name} × ${damDog.name}</text>`;

  // Center Y of cell i in a column of n cells
  const yAt = (n, i) => H * (2 * i + 1) / (2 * n) - cellH / 2;
  // Gen-1 parents that are own dogs link to their profile, external ones to the ancestor modal
  const dogOpts = d => (typeof DOGS !== 'undefined' && d && d.id && DOGS.some(x => x.id === d.id)) ? { dogId: d.id } : undefined;

  // Generation 1: parents
  const sireY = yAt(2, 0);
  const damY = yAt(2, 1);
  cell(colX[1], sireY, { name: sireDog.fullName || sireDog.name, zbNr: sireDog.zbNr, hd: sireDog.hd, formwert: sireDog.formwert }, 'sire', false, dogOpts(sireDog));
  cell(colX[1], damY, { name: damDog.fullName || damDog.name, zbNr: damDog.zbNr, hd: damDog.hd, formwert: damDog.formwert }, 'dam', false, dogOpts(damDog));
  line(colX[0] + cellW, yMid + cellH / 2, colX[1], sireY + cellH / 2);
  line(colX[0] + cellW, yMid + cellH / 2, colX[1], damY + cellH / 2);

  // Generation 2: litter grandparents = each parent's parents (gen1 of the parent trees)
  const allGen2 = [
    sireTree ? sireTree.gen1.sire : null, sireTree ? sireTree.gen1.dam : null,
    damTree ? damTree.gen1.sire : null, damTree ? damTree.gen1.dam : null
  ];
  const gen2Ys = allGen2.map((_, i) => yAt(4, i));
  allGen2.forEach((node, i) => {
    cell(colX[2], gen2Ys[i], node, i < 2 ? 'sire' : 'dam', node && commonIds.has(node.id));
    const parentY = i < 2 ? sireY : damY;
    line(colX[1] + cellW, parentY + cellH / 2, colX[2], gen2Ys[i] + cellH / 2);
  });

  // Generation 3: litter great-grandparents = each parent's grandparents (gen2 of the parent trees)
  const allGen3 = [
    ...(sireTree ? [sireTree.gen2.pgs, sireTree.gen2.pgd, sireTree.gen2.mgs, sireTree.gen2.mgd] : [null, null, null, null]),
    ...(damTree ? [damTree.gen2.pgs, damTree.gen2.pgd, damTree.gen2.mgs, damTree.gen2.mgd] : [null, null, null, null])
  ];
  const gen3Ys = allGen3.map((_, i) => yAt(8, i));
  allGen3.forEach((node, i) => {
    cell(colX[3], gen3Ys[i], node, i < 4 ? 'sire' : 'dam', node && commonIds.has(node.id));
    line(colX[2] + cellW, gen2Ys[Math.floor(i / 2)] + cellH / 2, colX[3], gen3Ys[i] + cellH / 2);
  });

  // Generation 4: each parent's great-grandparents (gen3 of the parent trees) —
  // this is where the demo's common ancestors live, so the COI highlight stays visible
  const g3keys = ['ggs1', 'ggd1', 'ggs2', 'ggd2', 'ggs3', 'ggd3', 'ggs4', 'ggd4'];
  const allGen4 = [
    ...g3keys.map(k => sireTree ? sireTree.gen3[k] : null),
    ...g3keys.map(k => damTree ? damTree.gen3[k] : null)
  ];
  const gen4Ys = allGen4.map((_, i) => yAt(16, i));
  allGen4.forEach((node, i) => {
    cell(colX[4], gen4Ys[i], node, i < 8 ? 'sire' : 'dam', node && commonIds.has(node.id));
    line(colX[3] + cellW, gen3Ys[Math.floor(i / 2)] + cellH / 2, colX[4], gen4Ys[i] + cellH / 2);
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

function escapeXml(s) {
  if (!s) return '';
  return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}
