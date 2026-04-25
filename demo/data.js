// WurfKit Demo — Mock data
// Realistische Demo-Welt: Maria Schmidt, Zwinger «vom Waldberg», München, Golden Retriever
// Daten basierend auf realer VDH-Struktur (Quelle: 0_Doc/templates_research/)

const BREEDER = {
  fullName: 'Maria Schmidt',
  kennelName: 'vom Waldberg',
  birthDate: '15.06.1972',
  street: 'Schwanthalerstraße 42',
  postalCode: '80336',
  city: 'München',
  country: 'Deutschland',
  phone: '+49 89 12345678',
  email: 'maria@vom-waldberg.de',
  vdhMember: 'DRC-12345',
  zuchtverein: 'Deutscher Retriever Club e.V. (DRC)',
  iban: 'DE89 3704 0044 0532 0130 00',
  bic: 'COBADEFFXXX',
  bank: 'Commerzbank München'
};

// External ancestors pool — used by pedigree (3 generations = 14 ancestors per dog)
const ANCESTORS = {
  // Luna's pedigree (Golden Retriever)
  'luna_sire': { name: 'Buddy von Sonnenhof', zbNr: 'DRC 19-08234', color: 'gold', birth: '2018-04-12', titles: ['CH'], hd: 'A1', ed: '0', formwert: 'V' },
  'luna_dam': { name: 'Daisy vom Eichenhain', zbNr: 'DRC 20-03127', color: 'gold', birth: '2019-06-08', hd: 'A1', ed: '0', formwert: 'SG' },
  'luna_pgs': { name: 'Apollo Goldsmith\'s Pride', zbNr: 'DRC 14-11876', color: 'dunkelgold', birth: '2014-02-22', titles: ['VDH-CH', 'CH'], hd: 'A1' },
  'luna_pgd': { name: 'Cleo vom Eichenhain', zbNr: 'DRC 16-04298', color: 'gold', birth: '2015-09-15', hd: 'A1' },
  'luna_mgs': { name: 'Hero von Sonnenhof', zbNr: 'DRC 15-07432', color: 'hellgold', birth: '2014-11-03', titles: ['CH'], hd: 'A2' },
  'luna_mgd': { name: 'Stella vom Eichenhain', zbNr: 'DRC 17-02156', color: 'gold', birth: '2016-05-21', hd: 'A1' },
  'luna_ggs1': { name: 'Apollo der Erste', zbNr: 'DRC 09-01234', color: 'gold', birth: '2009-01-15' },
  'luna_ggd1': { name: 'Hera vom Bergland', zbNr: 'DRC 11-08765', color: 'dunkelgold', birth: '2010-08-19' },
  'luna_ggs2': { name: 'Ares Goldwing', zbNr: 'DRC 10-04567', color: 'gold', birth: '2010-03-07' },
  'luna_ggd2': { name: 'Athena vom Eichenhain', zbNr: 'DRC 12-03421', color: 'gold', birth: '2011-12-02' },
  'luna_ggs3': { name: 'Apollo der Erste', zbNr: 'DRC 09-01234', color: 'gold', birth: '2009-01-15' }, // SAME as ggs1 — common ancestor
  'luna_ggd3': { name: 'Luna vom Bergsee', zbNr: 'DRC 10-12345', color: 'gold', birth: '2010-04-30' },
  'luna_ggs4': { name: 'Bruno Goldsmith', zbNr: 'DRC 11-05678', color: 'hellgold', birth: '2011-06-14' },
  'luna_ggd4': { name: 'Mira vom Eichenhain', zbNr: 'DRC 12-09876', color: 'gold', birth: '2011-10-25' },

  // Apollo's pedigree (Sire of W1)
  'apollo_sire': { name: 'Cesar von Bergland', zbNr: 'DRC 17-03421', color: 'dunkelgold', birth: '2016-08-14', titles: ['VDH-CH'], hd: 'A1', ed: '0' },
  'apollo_dam': { name: 'Penny Goldwing', zbNr: 'DRC 18-09183', color: 'gold', birth: '2017-11-22', hd: 'A1' },
  'apollo_pgs': { name: 'Magnus von Bergland', zbNr: 'DRC 13-04567', color: 'dunkelgold', birth: '2012-07-08', titles: ['CH'] },
  'apollo_pgd': { name: 'Nora Goldsmith', zbNr: 'DRC 15-08321', color: 'gold', birth: '2014-09-12' },
  'apollo_mgs': { name: 'Aramis Goldwing', zbNr: 'DRC 14-11234', color: 'hellgold', birth: '2013-04-30' },
  'apollo_mgd': { name: 'Bella Goldwing', zbNr: 'DRC 15-06789', color: 'gold', birth: '2014-12-15' },
  'apollo_ggs1': { name: 'Maximus von Bergland', zbNr: 'DRC 09-02345', color: 'dunkelgold', birth: '2009-05-10' },
  'apollo_ggd1': { name: 'Wanda vom Sonnenhof', zbNr: 'DRC 11-03456', color: 'gold', birth: '2010-08-22' },
  'apollo_ggs2': { name: 'Apollo der Erste', zbNr: 'DRC 09-01234', color: 'gold', birth: '2009-01-15' }, // COMMON ANCESTOR with Luna
  'apollo_ggd2': { name: 'Bella Goldsmith', zbNr: 'DRC 10-09876', color: 'gold', birth: '2010-03-15' },
  'apollo_ggs3': { name: 'Erik Goldwing', zbNr: 'DRC 10-08765', color: 'hellgold', birth: '2009-12-01' },
  'apollo_ggd3': { name: 'Mira vom Eichenhain', zbNr: 'DRC 12-09876', color: 'gold', birth: '2011-10-25' }, // COMMON ANCESTOR with Luna (luna_ggd4)
  'apollo_ggs4': { name: 'Caesar Goldwing', zbNr: 'DRC 11-12345', color: 'gold', birth: '2010-09-08' },
  'apollo_ggd4': { name: 'Diana Goldwing', zbNr: 'DRC 12-04321', color: 'hellgold', birth: '2011-07-19' }
};

const DOGS = [
  {
    id: 'luna',
    name: 'Luna',
    fullName: 'Luna vom Waldberg',
    breed: 'Golden Retriever',
    sex: 'female',
    birth: '2023-03-15',
    color: 'gold',
    microchip: '276 098 106 234 567',
    zbNr: 'DRC 23-03421',
    formwert: 'V',
    hd: 'A1',
    ed: '0',
    ztp: true,
    ztpDate: '2024-09-10',
    eyes: { result: 'frei', date: '2024-08-15' },
    pedigree: {
      sire: 'luna_sire', dam: 'luna_dam',
      pgs: 'luna_pgs', pgd: 'luna_pgd',
      mgs: 'luna_mgs', mgd: 'luna_mgd',
      ggs1: 'luna_ggs1', ggd1: 'luna_ggd1',
      ggs2: 'luna_ggs2', ggd2: 'luna_ggd2',
      ggs3: 'luna_ggs3', ggd3: 'luna_ggd3',
      ggs4: 'luna_ggs4', ggd4: 'luna_ggd4'
    },
    photo: 'demo/img/luna.jpg',
    photoFallback: '🐕',
    statusBadge: { type: 'warn', de: 'Läufig', en: 'Heat', ru: 'Течка' },
    notes: 'Sanfter Charakter, sehr kinderfreundlich. Wurfplanung mit Apollo vom Sonnenhof Q1/2026.'
  },
  {
    id: 'bella',
    name: 'Bella',
    fullName: 'Bella von Esterhof',
    breed: 'Labrador Retriever',
    sex: 'female',
    birth: '2021-05-10',
    color: 'schwarz',
    microchip: '276 098 106 156 432',
    zbNr: 'LCD 21-08732',
    formwert: 'SG',
    hd: 'A2',
    ed: '0',
    ztp: true,
    ztpDate: '2023-04-22',
    eyes: { result: 'frei', date: '2024-03-12' },
    pedigree: null,
    photo: 'demo/img/bella.jpg',
    photoFallback: '🐩',
    statusBadge: { type: 'ok', de: 'Zuchtfähig', en: 'Breeding-eligible', ru: 'Допущена' },
    notes: 'Erfahrene Zuchthündin, 2 Würfe. Aktuell pausiert.'
  },
  {
    id: 'rex',
    name: 'Rex',
    fullName: 'Rex vom Waldberg',
    breed: 'Deutscher Schäferhund',
    sex: 'male',
    birth: '2022-07-22',
    color: 'schwarz-rot',
    microchip: '276 098 106 098 765',
    zbNr: 'SV 22-04156',
    formwert: 'V',
    hd: 'A1',
    ed: '0',
    ztp: true,
    ztpDate: '2024-06-18',
    eyes: { result: 'frei', date: '2024-09-02' },
    workTitles: ['IGP3', 'BH'],
    pedigree: null,
    photo: 'demo/img/rex.jpg',
    photoFallback: '🦮',
    statusBadge: { type: 'info', de: 'Deckrüde', en: 'Stud', ru: 'Кобель-производитель' },
    notes: 'Aktiver Deckrüde. Öffentliches Profil: wurfkit.de/rex-waldberg'
  }
];

const LITTERS = [
  {
    id: 'w1',
    name: 'Wurf «A» — Luna × Apollo',
    breed: 'Golden Retriever',
    sireId: 'apollo', // external — see externalSire
    damId: 'luna',
    externalSire: {
      name: 'Apollo vom Sonnenhof',
      zbNr: 'DRC 20-09876',
      microchip: '276 098 106 567 890',
      birth: '2020-04-12',
      color: 'gold',
      hd: 'A1',
      ed: '0',
      formwert: 'V',
      ztp: true,
      titles: ['VDH-CH', 'CH'],
      owner: 'Hans Becker, Augsburg',
      eyes: 'frei',
      pedigree: {
        sire: 'apollo_sire', dam: 'apollo_dam',
        pgs: 'apollo_pgs', pgd: 'apollo_pgd',
        mgs: 'apollo_mgs', mgd: 'apollo_mgd',
        ggs1: 'apollo_ggs1', ggd1: 'apollo_ggd1',
        ggs2: 'apollo_ggs2', ggd2: 'apollo_ggd2',
        ggs3: 'apollo_ggs3', ggd3: 'apollo_ggd3',
        ggs4: 'apollo_ggs4', ggd4: 'apollo_ggd4'
      }
    },
    deckDate: '2025-11-14',
    deckOrt: 'Augsburg',
    birthDate: '2026-01-12',
    weeks: 14, // weeks since birth at demo time
    litterLetter: 'A',
    wurfStaerke: { total: 5, alive: 5, stillborn: 0, male: 3, female: 2 },
    wurfabnahmeDate: '2026-03-09',
    wurfmeldungSubmitted: true,
    wurfmeldungDate: '2026-01-15',
    notes: 'Komplikationsfreie Geburt, alle Welpen gesund.'
  }
];

const PUPPIES = [
  {
    id: 'aaron',
    litterId: 'w1',
    name: 'Aaron',
    fullName: 'Aaron vom Waldberg',
    sex: 'male',
    color: 'gold',
    microchip: '276 098 106 345 001',
    birthWeight: 420, // grams
    weights: [
      { week: 0, g: 420 }, { week: 1, g: 780 }, { week: 2, g: 1240 },
      { week: 3, g: 1860 }, { week: 4, g: 2580 }, { week: 5, g: 3450 },
      { week: 6, g: 4500 }, { week: 7, g: 5780 }, { week: 8, g: 7200 }
    ],
    status: 'sold',
    buyer: {
      name: 'Thomas Weber',
      address: 'Mommsenstraße 17, 10629 Berlin',
      phone: '+49 30 8765432',
      email: 'thomas.weber@example.de',
      birthDate: '12.07.1985'
    },
    salePrice: 1800,
    saleDate: '2026-03-10',
    photo: 'demo/img/aaron.jpg',
    photoFallback: '🐶'
  },
  {
    id: 'ben',
    litterId: 'w1',
    name: 'Ben',
    fullName: 'Ben vom Waldberg',
    sex: 'male',
    color: 'dunkelgold',
    microchip: '276 098 106 345 002',
    birthWeight: 390,
    weights: [
      { week: 0, g: 390 }, { week: 1, g: 740 }, { week: 2, g: 1180 },
      { week: 3, g: 1790 }, { week: 4, g: 2490 }, { week: 5, g: 3340 },
      { week: 6, g: 4350 }, { week: 7, g: 5610 }, { week: 8, g: 6980 }
    ],
    status: 'reserved',
    buyer: {
      name: 'Anna Becker',
      address: 'Eppendorfer Weg 89, 20251 Hamburg',
      phone: '+49 40 5556789',
      email: 'anna.becker@example.de',
      birthDate: '24.03.1990'
    },
    salePrice: 1800,
    saleDate: null,
    photo: 'demo/img/ben.jpg',
    photoFallback: '🐶'
  },
  {
    id: 'caro',
    litterId: 'w1',
    name: 'Caro',
    fullName: 'Caro vom Waldberg',
    sex: 'female',
    color: 'gold',
    microchip: '276 098 106 345 003',
    birthWeight: 380,
    weights: [
      { week: 0, g: 380 }, { week: 1, g: 720 }, { week: 2, g: 1150 },
      { week: 3, g: 1730 }, { week: 4, g: 2410 }, { week: 5, g: 3220 },
      { week: 6, g: 4180 }, { week: 7, g: 5380 }, { week: 8, g: 6720 }
    ],
    status: 'available',
    buyer: null,
    salePrice: 1800,
    saleDate: null,
    photo: 'demo/img/caro.jpg',
    photoFallback: '🐶'
  },
  {
    id: 'diego',
    litterId: 'w1',
    name: 'Diego',
    fullName: 'Diego vom Waldberg',
    sex: 'male',
    color: 'hellgold',
    microchip: '276 098 106 345 004',
    birthWeight: 410,
    weights: [
      { week: 0, g: 410 }, { week: 1, g: 770 }, { week: 2, g: 1220 },
      { week: 3, g: 1830 }, { week: 4, g: 2540 }, { week: 5, g: 3400 },
      { week: 6, g: 4440 }, { week: 7, g: 5710 }, { week: 8, g: 7110 }
    ],
    status: 'sold',
    buyer: {
      name: 'Markus Schäfer',
      address: 'Friesenstraße 28, 50670 Köln',
      phone: '+49 221 4567890',
      email: 'markus.schaefer@example.de',
      birthDate: '08.11.1978'
    },
    salePrice: 1800,
    saleDate: '2026-03-12',
    photo: 'demo/img/diego.jpg',
    photoFallback: '🐶'
  },
  {
    id: 'elsa',
    litterId: 'w1',
    name: 'Elsa',
    fullName: 'Elsa vom Waldberg',
    sex: 'female',
    color: 'gold',
    microchip: '276 098 106 345 005',
    birthWeight: 370,
    weights: [
      { week: 0, g: 370 }, { week: 1, g: 700 }, { week: 2, g: 1120 },
      { week: 3, g: 1690 }, { week: 4, g: 2360 }, { week: 5, g: 3160 },
      { week: 6, g: 4110 }, { week: 7, g: 5290 }, { week: 8, g: 6610 }
    ],
    status: 'kept_by_breeder',
    buyer: null,
    salePrice: null,
    saleDate: null,
    photo: 'demo/img/elsa.jpg',
    photoFallback: '🐶'
  }
];

// Health checklist (Zuchtprüfung) — for Luna
const ZUCHTPRUEFUNG_LUNA = [
  { id: 'age', label: { de: 'Mindestalter (≥ 18 Monate)', en: 'Minimum age (≥ 18 months)', ru: 'Минимальный возраст (≥ 18 мес.)' }, status: 'ok', detail: '2 Jahre, 11 Monate' },
  { id: 'hd', label: { de: 'HD-Befund', en: 'HD result', ru: 'HD результат' }, status: 'ok', detail: 'A1 (frei)' },
  { id: 'ed', label: { de: 'ED-Befund', en: 'ED result', ru: 'ED результат' }, status: 'ok', detail: '0' },
  { id: 'fw', label: { de: 'Formwert', en: 'Conformation', ru: 'Экстерьер' }, status: 'ok', detail: 'V (vorzüglich)' },
  { id: 'ztp', label: { de: 'ZTP bestanden', en: 'ZTP passed', ru: 'ZTP сдан' }, status: 'ok', detail: '10.09.2024' },
  { id: 'eye', label: { de: 'Augenuntersuchung', en: 'Eye examination', ru: 'Обследование глаз' }, status: 'ok', detail: 'frei (15.08.2024)' },
  { id: 'coi', label: { de: 'COI < 6.25%', en: 'COI < 6.25%', ru: 'COI < 6.25%' }, status: 'ok', detail: '3.2% (mit Apollo vom Sonnenhof)' }
];

// Documents (already generated for the demo)
const DOCS = [
  { id: 'kv-aaron', type: 'kaufvertrag', puppyId: 'aaron', date: '2026-03-10', label: { de: 'Kaufvertrag – Aaron', en: 'Contract – Aaron', ru: 'Договор – Aaron' } },
  { id: 'kv-diego', type: 'kaufvertrag', puppyId: 'diego', date: '2026-03-12', label: { de: 'Kaufvertrag – Diego', en: 'Contract – Diego', ru: 'Договор – Diego' } },
  { id: 'wm-w1', type: 'wurfmeldung', litterId: 'w1', date: '2026-01-15', label: { de: 'Wurfmeldung – Wurf A', en: 'Litter Reg. – Litter A', ru: 'Регистрация – помёт A' } }
];

// Breed average COI (simplified, real values vary)
const BREED_AVG_COI = {
  'Golden Retriever': 7.1,
  'Labrador Retriever': 6.5,
  'Deutscher Schäferhund': 5.8,
  'Deutsch Kurzhaar': 6.2
};

// Demo state (mutable)
const STATE = {
  currentTab: 'overview',
  currentDog: null,
  currentLitter: null,
  currentPDF: null,
  lang: 'de'
};
