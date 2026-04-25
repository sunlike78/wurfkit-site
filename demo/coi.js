// COI calculation — Wright formula
// COI = Σ [(0.5)^(n1+n2+1) × (1 + Fa)]
// where n1 = generations from common ancestor to sire, n2 = to dam, Fa = COI of common ancestor (0 simplified)

function buildPedigreeTree(dog, ancestorsPool) {
  // Returns tree as { id, name, sire, dam, generation }
  if (!dog || !dog.pedigree) return null;
  const p = dog.pedigree;
  const node = (id, gen) => {
    if (!id) return null;
    const a = ancestorsPool[id];
    if (!a) return null;
    return { id: a.zbNr || id, name: a.name, ...a, generation: gen };
  };
  return {
    self: { id: dog.zbNr || dog.id, name: dog.fullName || dog.name, ...dog, generation: 0 },
    gen1: { sire: node(p.sire, 1), dam: node(p.dam, 1) },
    gen2: {
      pgs: node(p.pgs, 2), pgd: node(p.pgd, 2),
      mgs: node(p.mgs, 2), mgd: node(p.mgd, 2)
    },
    gen3: {
      ggs1: node(p.ggs1, 3), ggd1: node(p.ggd1, 3),
      ggs2: node(p.ggs2, 3), ggd2: node(p.ggd2, 3),
      ggs3: node(p.ggs3, 3), ggd3: node(p.ggd3, 3),
      ggs4: node(p.ggs4, 3), ggd4: node(p.ggd4, 3)
    }
  };
}

function flattenTree(tree, side) {
  // Returns { ancestorId: [generations from animal] }
  // side: 'sire' or 'dam' relative to the offspring
  const out = {};
  if (!tree) return out;
  const add = (node, gen) => {
    if (!node) return;
    if (!out[node.id]) out[node.id] = [];
    out[node.id].push(gen);
  };
  add(tree.gen1.sire, 1); add(tree.gen1.dam, 1);
  add(tree.gen2.pgs, 2); add(tree.gen2.pgd, 2);
  add(tree.gen2.mgs, 2); add(tree.gen2.mgd, 2);
  Object.values(tree.gen3 || {}).forEach(n => add(n, 3));
  return out;
}

function calculateCOI(sireDog, damDog, ancestorsPool) {
  const sireTree = buildPedigreeTree(sireDog, ancestorsPool);
  const damTree = buildPedigreeTree(damDog, ancestorsPool);
  if (!sireTree || !damTree) return { coi: 0, commonAncestors: [] };

  const sireAncestors = flattenTree(sireTree); // { id: [gen1, gen2, ...] }
  const damAncestors = flattenTree(damTree);

  let coi = 0;
  const commonAncestors = [];

  for (const id in sireAncestors) {
    if (damAncestors[id]) {
      // Common ancestor found
      const ancestor = ancestorsPool[Object.keys(ancestorsPool).find(k => ancestorsPool[k].zbNr === id)] ||
                       (id.startsWith('DRC') ? { name: id } : null);
      // For each occurrence on each side, sum contribution
      let contribution = 0;
      for (const n1 of sireAncestors[id]) {
        for (const n2 of damAncestors[id]) {
          contribution += Math.pow(0.5, n1 + n2 + 1);
        }
      }
      coi += contribution;
      commonAncestors.push({ id, name: ancestor?.name || id, contribution });
    }
  }

  return {
    coi: Math.round(coi * 10000) / 100, // percentage with 2 decimals
    commonAncestors
  };
}

function coiStatus(coi) {
  if (coi < 6.25) return { class: 'ok', key: 'low' };
  if (coi < 12.5) return { class: 'warn', key: 'medium' };
  return { class: 'err', key: 'high' };
}

function coiStatusLabel(status, lang) {
  const labels = {
    low: { de: 'Niedrig — Verpaarung empfohlen', en: 'Low — mating recommended', ru: 'Низкий — вязка рекомендована' },
    medium: { de: 'Mittel — Vorsicht geboten', en: 'Medium — caution', ru: 'Средний — осторожно' },
    high: { de: 'Hoch — Verpaarung nicht empfohlen', en: 'High — mating not recommended', ru: 'Высокий — не рекомендована' }
  };
  return labels[status.key][lang] || labels[status.key].de;
}
