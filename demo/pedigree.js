// SVG pedigree tree renderer (3 generations)
// Layout: animal (col 0) -> parents (col 1, 2 cells) -> grandparents (col 2, 4 cells) -> great-grandparents (col 3, 8 cells)
// Total cells: 1 + 2 + 4 + 8 = 15

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

  const W = 920, H = 460;
  const colX = [10, 200, 400, 640]; // x positions of generation columns
  const cellW = 170, cellH = 34;

  let svg = `<svg class="ped" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  function cell(x, y, node, sideClass, isCommon) {
    if (!node) {
      svg += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="4"/>`;
      svg += `<text x="${x + cellW / 2}" y="${y + cellH / 2 + 3}" text-anchor="middle" fill="#aaa" font-size="10">—</text>`;
      return;
    }
    const cls = isCommon ? 'common' : sideClass;
    svg += `<rect class="${cls}" x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="4"/>`;
    const name = node.name || '—';
    const truncName = name.length > 24 ? name.substring(0, 22) + '…' : name;
    svg += `<text class="t" x="${x + 6}" y="${y + 14}">${escapeXml(truncName)}</text>`;
    const sub = (node.zbNr || '') + (node.hd ? ' · HD ' + node.hd : '') + (node.formwert ? ' · ' + node.formwert : '');
    const truncSub = sub.length > 30 ? sub.substring(0, 28) + '…' : sub;
    svg += `<text class="s" x="${x + 6}" y="${y + 27}">${escapeXml(truncSub)}</text>`;
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

  // Generation 1: parents
  const sireY = H / 4 - cellH / 2;
  const damY = (3 * H) / 4 - cellH / 2;
  cell(colX[1], sireY, { name: sireDog.fullName || sireDog.name, zbNr: sireDog.zbNr, hd: sireDog.hd, formwert: sireDog.formwert }, 'sire', false);
  cell(colX[1], damY, { name: damDog.fullName || damDog.name, zbNr: damDog.zbNr, hd: damDog.hd, formwert: damDog.formwert }, 'dam', false);
  line(colX[0] + cellW, yMid + cellH / 2, colX[1], sireY + cellH / 2);
  line(colX[0] + cellW, yMid + cellH / 2, colX[1], damY + cellH / 2);

  // Generation 2: grandparents
  // Sire side: pgs (top), pgd (below pgs)
  // Dam side: mgs (above mgd), mgd (bottom)
  const sireTop = H * 0.10, sireBot = H * 0.40;
  const damTop = H * 0.60, damBot = H * 0.90;
  const grandparentYs = [sireTop - cellH / 2, sireBot - cellH / 2, damTop - cellH / 2, damBot - cellH / 2];
  const sireGen2 = sireTree ? [sireTree.gen2.pgs, sireTree.gen2.pgd] : [null, null];
  const damGen2 = damTree ? [damTree.gen2.mgs, damTree.gen2.mgd] : [null, null];
  const allGen2 = [...sireGen2, ...damGen2];
  const allGen2Side = ['sire', 'sire', 'dam', 'dam'];

  allGen2.forEach((node, i) => {
    cell(colX[2], grandparentYs[i], node, allGen2Side[i], node && commonIds.has(node.id));
    // line from parent to grandparent
    const parentY = i < 2 ? sireY : damY;
    line(colX[1] + cellW, parentY + cellH / 2, colX[2], grandparentYs[i] + cellH / 2);
  });

  // Generation 3: great-grandparents (8 cells)
  const ggYs = [];
  const step = H / 8;
  for (let i = 0; i < 8; i++) {
    ggYs.push(step / 2 + i * step - cellH / 2);
  }
  const sireGen3 = sireTree ? [sireTree.gen3.ggs1, sireTree.gen3.ggd1, sireTree.gen3.ggs2, sireTree.gen3.ggd2] : [null, null, null, null];
  const damGen3 = damTree ? [damTree.gen3.ggs3, damTree.gen3.ggd3, damTree.gen3.ggs4, damTree.gen3.ggd4] : [null, null, null, null];
  const allGen3 = [...sireGen3, ...damGen3];
  const allGen3Side = ['sire','sire','sire','sire','dam','dam','dam','dam'];

  allGen3.forEach((node, i) => {
    cell(colX[3], ggYs[i], node, allGen3Side[i], node && commonIds.has(node.id));
    // line from grandparent to great-grandparent
    const gpIdx = Math.floor(i / 2);
    line(colX[2] + cellW, grandparentYs[gpIdx] + cellH / 2, colX[3], ggYs[i] + cellH / 2);
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

function escapeXml(s) {
  if (!s) return '';
  return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}
