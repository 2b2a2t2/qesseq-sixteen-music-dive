/* ==========================================================
   WipidiM — QESSEQ 16 · site behaviour
   ========================================================== */

/* ----------------------------------------------------------
   ⚠️  EDIT THIS: the email address order requests go to.
   ---------------------------------------------------------- */
const CONFIG = {
  orderEmail: 'contact@wipidim.com',
  productName: 'QESSEQ 16'
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- sticky header ---------- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- overlay menu ---------- */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  toggle.classList.toggle('is-open', open);
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('is-locked', open);
  toggle.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
}

toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- reveal on scroll ---------- */
const revealables = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  revealables.forEach(el => io.observe(el));
} else {
  revealables.forEach(el => el.classList.add('is-in'));
}

/* ==========================================================
   01 · STEP GRID  (one 16-step line, per track — like the
   hardware: change channel and the line changes with it)
   ========================================================== */
(function stepGrid() {
  const host = document.getElementById('stepRows');
  const counter = document.getElementById('stepCount');
  const speedOut = document.getElementById('speedCount');
  const trackLabel = document.getElementById('stepTrack');
  const chanBar = document.getElementById('stepChans');
  const voiceBar = document.getElementById('stepVoices');
  const gridCard = document.getElementById('stepgrid');
  if (!host || !chanBar || !voiceBar) return;

  // the three mode pads tint the card: ENC purple, KEY teal, SEQ keeps the
  // per-track colours the sequencer actually lights
  const modePads = [...document.querySelectorAll('#stepgrid .panel__mode')];
  const seqScreen = document.querySelector('.scr--seq');
  const encScreen = document.querySelector('.scr--enc');
  const keyScreen = document.querySelector('.scr--key');
  const rowScreen = document.querySelector('.scr--row');
  const rowHead = document.querySelector('[data-scr="row-head"]');
  const rowNote = document.querySelector('[data-scr="row-note"]');
  const encHead = document.querySelector('[data-scr="enc-head"]');
  const rowModes = [...document.querySelectorAll('.scr--row .scr-modes span')];
  const rowCells = [...document.querySelectorAll('.scr--row .scr-grid .scr-cell')]
    .map(cell => ({ b: cell.querySelector('b'), s: cell.querySelector('span') }));
  const keyOct = document.querySelector('[data-scr="key-oct"]');
  const keyScale = document.querySelector('[data-scr="key-scale"]');
  const keyRoot = document.querySelector('[data-scr="key-root"]');
  // the screen reads back whatever the card is doing, the way the panel does
  const scr = {
    head: document.querySelector('[data-scr="head"]'),
    headLeft: document.querySelector('[data-scr="head-left"]'),
    octave: document.querySelector('[data-scr="octave"]'),
    listen: document.querySelector('[data-scr="listen"]'),
    overdub: document.querySelector('[data-scr="overdub"]'),
    play: document.querySelector('[data-scr="play"]'),
    gate: document.querySelector('[data-scr="gate"]'),
    gateTag: document.querySelector('[data-scr="gate-tag"]'),
    velTag: document.querySelector('[data-scr="vel-tag"]'),
    accent: document.querySelector('[data-scr="accent"]'),
    velocity: document.querySelector('[data-scr="velocity"]'),
    probability: document.querySelector('[data-scr="probability"]')
  };
  let mode = 'seq';
  // M1 arms the sequencer page's step-edit row; without it the record knobs
  // (LISTEN / PLAY / OVERDUB) are idle labels that do not turn
  let stepEdit = false;

  // CH 1 is one DRUM track: the kit voices each keep their own 16-step line.
  // CH 2 POLY, CH 3 POLY SKANK following CH 2's progression, CH 4 MONO bass.
  // the panel's scale list (Chords.cpp kScaleName) and its twelve roots:
  // every channel keeps its own pair, like the firmware's per-channel memory
  const SCALES = ['Chr', 'Major', 'Minor', 'HarmMin', 'MelMin', 'Dorian', 'Phryg',
    'Lydian', 'Mixoly', 'Locrian', 'MajPent', 'MinPent', 'Blues', 'WhoTone',
    'DimHW', 'DimWH', 'DbHarm', 'PhrDom', 'HunMin', 'Mishbrk', 'LydDom',
    'Altered', 'BebopD', 'BebopM', 'LydAug', 'Mixb6', 'LocN2', 'Dor#4',
    'Lyd#2', 'Ultra', 'Persian', 'NeaMin', 'NeaMaj', 'Augmnt', 'Promth',
    'Enigm', 'Insen', 'Yo', 'Hirajo', 'HarmMaj', 'Mesia3', 'Mesia4', 'Mesia5',
    'Mesia6', 'Mesia7', 'Span8', 'Saba', 'Iwato', 'Kumoi', 'PelogS', 'PelogT',
    'Rast', 'Bayati', 'Hijaz'];
  const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // the matching 12-bit patterns (Chords.cpp kScaleMask), bit 0 = C, so a note
  // belongs to the scale when bit (note - root) is set
  const SCALE_MASK = [
    0xFFF, 0xAB5, 0x5AD, 0x9AD, 0xAAD, 0x6AD, 0x5AB, 0xAD5, 0x6B5, 0x56B,
    0x295, 0x4A9, 0x4E9, 0x555, 0x6DB, 0xB6D, 0x9B3, 0x5B3, 0x9CD, 0x5CD,
    0x6D5, 0x55B, 0xEB5, 0xBB5, 0xB55, 0x5B5, 0x56D, 0x6CD, 0xAD9, 0x2DB,
    0x973, 0x9AB, 0xAAB, 0x999, 0x655, 0xD53, 0x4A3, 0x4A9, 0x1A3, 0x9B5,
    0xDDD, 0x9E7, 0x8E3, 0xD75, 0xBEF, 0x57B, 0x5DB, 0x463, 0x28D, 0x18B,
    0x18D, 0x6AD, 0x6AB, 0x5B3
  ];
  const panelKeys = [...document.querySelectorAll('#stepgrid .panel__key[data-note]')];
  const stepEditArm = document.getElementById('stepEditArm');
  const editLegend = document.querySelector('[data-scr="edit-legend"]');
  const targetButtons = [...document.querySelectorAll('#stepgrid [data-target]')];
  const pagePad = document.getElementById('pagePad');
  const pageLegend = document.querySelector('[data-scr="page-legend"]');
  const seqCells = [...document.querySelectorAll('.scr--seq:not(.scr--row) .scr-grid .scr-cell')]
    .map(cell => ({ b: cell.querySelector('b'), s: cell.querySelector('span') }));
  const baseLabels = seqCells.map(c => (c.b ? c.b.textContent : ''));

  const TRACKS = [
    { ch: 1, type: 'DRUM', scale: 0, root: 0, oct: 1, listen: 'CHORD', play: 'GATE', overdub: 'OFF',
      gate: 100, vel: 90, acc: 101, prob: 100,
      page: { genre: 0, var: 0, fill: 60, mot: 20, lines: [0, 0, 0, 0] },
      color: 'var(--led-red)', voices: [
      { name: 'KICK',  color: 'var(--led-red)',    pattern: 'x...x...x...x..x' },
      { name: 'SNARE', color: 'var(--led-white)',  pattern: '....x.......x...' },
      { name: 'HAT',   color: 'var(--led-cyan)',   pattern: '..x...x...x...xx' },
      { name: 'PERC',  color: 'var(--led-violet)', pattern: '.....x..x..x....' }
    ] },
    { ch: 2, type: 'POLY', name: 'CHORDS', scale: 1, root: 0, oct: 4, listen: 'CHORD', play: 'GATE', overdub: 'OFF',
      gate: 100, vel: 90, acc: 101, prob: 100,
      page: { hits: 0 },
      color: 'var(--led-blue)',  pattern: 'x.......x...x...' },
    { ch: 3, type: 'POLY', name: 'SKANK',  scale: 5, root: 2, oct: 4, listen: 'CHORD', play: 'GATE', overdub: 'OFF',
      gate: 100, vel: 90, acc: 101, prob: 100,
      page: { tes: 0, mot: 50, shp: 0, thn: 0, ext: 0, sub: 0, tesr: 0, notr: 0 },
      color: 'var(--led-green)', follow: 'CH 2', pattern: '..x.x..x..x.x..x' },
    { ch: 4, type: 'MONO', name: 'BASS',   scale: 2, root: 9, oct: 2, listen: 'CHORD', play: 'GATE', overdub: 'OFF',
      gate: 100, vel: 90, acc: 101, prob: 100,
      page: { fill: 50, acc: 30, glide: 20, tie: 10 },
      color: 'var(--led-teal)',  pattern: 'x..x..x...x.x...' }
  ];

  const voicesOf = t => t.voices || [{ name: t.name, color: t.color, pattern: t.pattern }];
  // the row the higher variants show, per track (SEQMODE3/4, KEYMODE2/3/4)
  TRACKS.forEach(t => {
    t.row = {
      len: 16, follow: t.follow ? 1 : 0, speed: 2, inch: 0, track: t.ch,
      swing: 0, amt: 50,
      genre: 0, mood: 50, tens: 50, motion: 50, cad: 0, cpx: 50, phrase: 0, surp: 50
    };
  });
  // a pattern runs to 64 steps, because SEQMODE3's LEN is 0..64.  The 16-pad
  // line is the bar window over it (the firmware's C D E F window, driven by
  // the clock here), and a track longer than its 16-step string repeats it
  const STEPS_MAX = 64;
  const state = TRACKS.map(t => voicesOf(t).map(v =>
    Array.from({ length: STEPS_MAX }, (_, i) => v.pattern[i % 16] === 'x')));
  // per-step attributes, the ones the M1 edit row's F keys select: a bitmask
  // per step, so a step can carry TIE and ACCENT at once (Events.cpp stepAttrs)
  const ATTR_BIT = [0, 1, 2, 4, 8];                    // 1 TIE, 2 GLIDE, 4 ACC, 8 PROB
  const ATTR_NAME = [null, 'TIE', 'GLIDE', 'ACCENT', 'PROBABILITY'];
  const attrs = TRACKS.map(t => voicesOf(t).map(() => new Uint8Array(STEPS_MAX)));

  // SEQMODE3's LEN is the loop length of the track in front of you
  const lenOf = t => clamp(Math.round(t.row.len), 1, STEPS_MAX);
  const winOf = t => {
    const len = lenOf(t);
    if (len <= 16) return 0;
    return clamp(Math.floor(step / 16) * 16, 0, (Math.ceil(len / 16) - 1) * 16);
  };
  // 1/16 is one 16th note: 60000 / BPM / 4, the rest scale off it
  const SPEED_DEN = [64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
  let retimeWalk = null;
  let editTarget = 0;                                  // 0 = STEPS, 1..4 = F keys
  let pageOpen = false;                                // the M2 page of this track
  const variant = { enc: 1, seq: 1, key: 1 };          // ENC/SEQ/KEY 1..4
  const clock = { bpm: 120 };                          // SEQMODE3's BPM is global
  const tabs = [];
  const voiceTabs = [];
  let cells = [];
  let current = 0;
  let voice = 0;
  let step = 0;
  let pinned = false;

  TRACKS.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'stepgrid__chan';
    b.style.setProperty('--pad', t.color);
    b.innerHTML = '<b>CH ' + t.ch + '</b><small>' + t.type + (t.follow ? ' ← ' + t.follow : '') + '</small>';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Channel ' + t.ch + ' — ' + t.type + ' track');
    b.addEventListener('click', () => { pinned = true; selectTrack(i, 0); });
    chanBar.appendChild(b);
    tabs[i] = b;
  });

  function renderVoices() {
    voiceBar.innerHTML = '';
    voiceTabs.length = 0;
    const list = voicesOf(TRACKS[current]);
    voiceBar.hidden = list.length < 2;
    if (list.length < 2) return;
    list.forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'stepgrid__chan is-voice';
      b.style.setProperty('--pad', v.color);
      b.textContent = v.name;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', v.name + ' voice, channel ' + TRACKS[current].ch);
      b.addEventListener('click', () => { pinned = true; selectVoice(i); });
      voiceBar.appendChild(b);
      voiceTabs[i] = b;
    });
  }

  function markVoice() {
    voiceTabs.forEach((b, n) => {
      b.dataset.on = n === voice ? '1' : '0';
      b.setAttribute('aria-selected', String(n === voice));
    });
  }

  function lineColor() {
    return mode === 'seq' ? voicesOf(TRACKS[current])[voice].color : 'var(--mode-' + mode + ')';
  }

  function applyMode(m) {
    mode = m;
    pageOpen = false;      // the page only lives on the sequencer screen
    if (gridCard) gridCard.dataset.mode = m;
    // the display shows the page that belongs to the mode and variant: dials
    // in ENC (one CC bank each), the keyboard screen in KEY 1, the sequencer
    // screen in SEQ 1/2, and the variant row everywhere above that
    const pages = { enc: encScreen, key: keyScreen, seq: seqScreen };
    const show = rowKey() !== null ? rowScreen : pages[m];
    [encScreen, keyScreen, seqScreen, rowScreen].forEach(el => {
      if (el) el.hidden = el !== show;
    });
    if (encHead) encHead.textContent = 'ENCODER' + (variant.enc > 1 ? ' ' + variant.enc : '');
    if (m === 'enc') {
      encVals = encBanks[variant.enc - 1];
      encVals.forEach((v, i) => setCc(i, v));
    }
    renderRow();
    host.style.setProperty('--pad', lineColor());
    modePads.forEach(b => {
      const on = b.dataset.mode === m;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    // the knobs move to the page's own values when the page changes
    refreshKnobs();
  }

  modePads.forEach(b => {
          b.addEventListener('click', () => {
        pinned = true;
        // a second click on the mode you are already in steps its variant
        const m = b.dataset.mode;
        variant[m] = mode === m ? variant[m] % 4 + 1 : 1;
        applyMode(m);
        paint();
      });
  });

  if (stepEditArm) {
    stepEditArm.addEventListener('click', () => {
      stepEdit = !stepEdit;
      pinned = true;
      stepEditArm.setAttribute('aria-pressed', String(stepEdit));
      paint();
    });
  }

  // ENC page: each knob turns the CC its encoder is bound to, and the dial
  // under it in the display follows — drag, scroll, click or arrow keys.
  const encKnobs = [...document.querySelectorAll('#stepgrid .panel__enc')];
  const encDials = [...document.querySelectorAll('.scr--enc .scr-dial')];
  // ENC 1..4 are one CC row over four banks, so each variant keeps its own
  // values on the same CC17..CC4 labels (Bindings.cpp ENC_ENC..ENC_ENC4)
  const encBanks = [
    [64, 32, 96, 40, 72, 20, 108, 56],
    [0, 0, 0, 0, 64, 64, 64, 64],
    [0, 0, 0, 0, 64, 64, 64, 64],
    [0, 0, 0, 0, 64, 64, 64, 64]
  ];
  let encVals = encBanks[0];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // What a knob turns depends on the page the panel is on, cell by cell: the
  // CC numbers on the encoder page, the eight cells on the sequencer page,
  // OCT / SCALE / KEY on the keyboard page.  The sequencer row is the panel's
  // own table (Bindings.cpp encLabels[ENC_SEQ], Display.cpp for the values),
  // and a DRUM track has no record options, so LISTEN / PLAY / OVERDUB are
  // blank there and their three knobs stay dead.
  const recOnly = t => stepEdit && t.type !== 'DRUM';
  // the M1 step-edit radio arms the row; GATE and VELOCITY keep the labels the
  // MONO row gives them even though they turn on every channel here
  const armOnly = () => stepEdit;
  const SEQ_KNOBS = [
    { key: 'oct',     min: 0, max: 7 },                                // OCT
    { key: 'listen',  options: ['CHORD', 'NOTE'], only: recOnly },     // LISTEN
    { key: 'play',    options: ['GATE', 'RECORDED'], only: recOnly },  // PLAY
    { key: 'overdub', options: ['OFF', 'ON'], only: recOnly },         // OVERDUB
    { key: 'gate',    min: 10, max: 100, only: armOnly },              // GATE
    { key: 'vel',     min: 1, max: 127, only: armOnly },               // VEL
    { key: 'acc',     min: 1, max: 127, only: armOnly },               // ACC
    { key: 'prob',    min: 0, max: 100, only: armOnly }                // PROB
  ];
  const KEY_KNOBS = ['oct', 'scale', 'root'];

  // M2 opens the page the edit track carries: the firmware binds a page to the
  // track's TYPE, and while it is up the same eight knobs take that page's
  // parameters (Events.h genPage/compPage/skankPage/drumPage).  The rows and
  // ranges are the firmware's own: Gen.cpp's 50/30/20/10 defaults, Drum.cpp's
  // 18 genres, three var depths, three line states and 60/20 fill/mot, the
  // Skank.h knob order, and COMP's HITS 0..8.
  const DRUM_GENRES = ['HOUSE', 'TECHNO', 'BREAKS', 'HIPHOP', 'TRAP', 'JUNGLE',
    'FUNK', 'ROCK', 'JAZZ', 'LATIN', 'AFRO', 'ELECTRO', 'DNB', 'GARAGE', 'PUNK',
    'SKA', 'DISCO', 'REGGAE'];
  const DRUM_VARS = ['off', 'fill4', 'fill8'];
  const DRUM_LINES = ['A', 'B', 'OFF'];
  const pctOf = v => v + '%';
  const PAGE_ROWS = {
    gen: [
      { label: 'OCT', min: 0, max: 7, get: t => t.oct, set: (t, v) => { t.oct = v; } },
      { label: 'FILL%', min: 0, max: 100, get: t => t.page.fill, set: (t, v) => { t.page.fill = v; }, fmt: pctOf },
      { label: 'ACC%', min: 0, max: 100, get: t => t.page.acc, set: (t, v) => { t.page.acc = v; }, fmt: pctOf },
      { label: 'GLIDE%', min: 0, max: 100, get: t => t.page.glide, set: (t, v) => { t.page.glide = v; }, fmt: pctOf },
      { label: 'GATE', min: 10, max: 100, get: t => t.gate, set: (t, v) => { t.gate = v; }, fmt: pctOf },
      { label: 'VEL', min: 1, max: 127, get: t => t.vel, set: (t, v) => { t.vel = v; } },
      { label: 'TIE%', min: 0, max: 100, get: t => t.page.tie, set: (t, v) => { t.page.tie = v; }, fmt: pctOf },
      { label: 'PROB', min: 0, max: 100, get: t => t.prob, set: (t, v) => { t.prob = v; }, fmt: pctOf }
    ],
    comp: [
      { label: 'HITS', min: 0, max: 8, get: t => t.page.hits, set: (t, v) => { t.page.hits = v; } },
      { label: '—', idle: true }, { label: '—', idle: true }, { label: '—', idle: true },
      { label: '—', idle: true }, { label: '—', idle: true }, { label: '—', idle: true },
      { label: '—', idle: true }
    ],
    skank: [
      { label: 'TES', min: 0, max: 100, get: t => t.page.tes, set: (t, v) => { t.page.tes = v; }, fmt: pctOf },
      { label: 'MOT', min: 0, max: 100, get: t => t.page.mot, set: (t, v) => { t.page.mot = v; }, fmt: pctOf },
      { label: 'SHP', min: 0, max: 100, get: t => t.page.shp, set: (t, v) => { t.page.shp = v; }, fmt: pctOf },
      { label: 'THN', min: 0, max: 100, get: t => t.page.thn, set: (t, v) => { t.page.thn = v; }, fmt: pctOf },
      { label: 'EXT', min: 0, max: 100, get: t => t.page.ext, set: (t, v) => { t.page.ext = v; }, fmt: pctOf },
      { label: 'SUB', min: 0, max: 100, get: t => t.page.sub, set: (t, v) => { t.page.sub = v; }, fmt: pctOf },
      { label: 'TES%', min: 0, max: 100, get: t => t.page.tesr, set: (t, v) => { t.page.tesr = v; }, fmt: pctOf },
      { label: 'NOT%', min: 0, max: 100, get: t => t.page.notr, set: (t, v) => { t.page.notr = v; }, fmt: pctOf }
    ],
    drum: [
      { label: 'GENRE', min: 0, max: DRUM_GENRES.length - 1, get: t => t.page.genre, set: (t, v) => { t.page.genre = v; }, fmt: v => DRUM_GENRES[v] },
      { label: 'VAR', min: 0, max: 2, get: t => t.page.var, set: (t, v) => { t.page.var = v; }, fmt: v => DRUM_VARS[v] },
      { label: 'FILL%', min: 0, max: 100, get: t => t.page.fill, set: (t, v) => { t.page.fill = v; }, fmt: pctOf },
      { label: 'MOT%', min: 0, max: 100, get: t => t.page.mot, set: (t, v) => { t.page.mot = v; }, fmt: pctOf },
      ...['KICK', 'SNARE', 'HAT', 'PERC'].map((label, l) => ({
        label, min: 0, max: 2,
        get: t => t.page.lines[l],
        set: (t, v) => { t.page.lines[l] = v; },
        fmt: v => DRUM_LINES[v]
      }))
    ]
  };
  const PAGE_HEAD = { drum: 'DRUM PATTERN', gen: 'GENERATOR' };
  const pageOf = t => t.type === 'DRUM' ? 'drum'
    : t.type === 'MONO' ? 'gen'
    : t.name === 'SKANK' ? 'skank'
    : t.name === 'CHORDS' ? 'comp' : null;

  // the higher variants' rows, in the firmware's own label order (Bindings.cpp
  // encLabels): SEQMODE3 = OCT LEN FOLLOW SPEED INCH TRACK TYPE BPM, SEQMODE4 =
  // SWING AMT EXT IN SRC GATE VEL ACC PROB, KEYMODE2/3/4 as their rows read.
  // SPEED is seqSpeedName's nine names, SWING is SeqSwingStyle's nine, INCH is
  // the firmware's INPUT CHANNEL, and KEYMODE4's genre list is genre_data.h.
  const SPEEDS = ['1/64', '1/32', '1/16', '1/8', '1/4', '1/2', '1', '2', '4'];
  const SWINGS = ['OFF', 'MPC60', 'MPC3K', 'SP1200', 'LINN', '808', '909', 'SHUF', 'TRIP'];
  const KEY_GENRES = ['POP', 'ROCK', 'JAZZ', 'CLASSICAL', 'FOLK', 'COUNTRY',
    'BLUES', 'RNB', 'FUNK', 'METAL', 'HIPHOP', 'ELECTRONIC', 'REGGAE',
    'DUBTECHNO', 'GOSPEL', 'LATIN', 'CINEMATIC', 'MODAL'];
  const MOODS = ['DARK', 'COOL', 'MIXED', 'WARM', 'LIGHT'];
  const CADENCES = ['AUTH', 'PLAG', 'DECP', 'HALF'];
  const TRACK_TYPES = ['DRUM', 'POLY', 'MONO'];
  const blank = { label: '—', dash: true };
  const octRow = { label: 'OCT', min: 0, max: 7, get: t => t.oct, set: (t, v) => { t.oct = v; } };
  const scaleRow = { label: 'SCALE', min: 0, max: SCALES.length - 1, get: t => t.scale, set: (t, v) => { t.scale = v; }, fmt: v => SCALES[v] };
  const keyRow = { label: 'KEY', min: 0, max: ROOTS.length - 1, get: t => t.root, set: (t, v) => { t.root = v; }, fmt: v => ROOTS[v] };
  const pctRow = (label, k) => ({
    label, min: 0, max: 100,
    get: t => t.row[k], set: (t, v) => { t.row[k] = v; }, fmt: pctOf
  });
  const ROW_SPECS = {
    seq3: [
      octRow,
      { label: 'LEN', min: 1, max: 64, get: t => t.row.len, set: (t, v) => { t.row.len = v; } },
      { label: 'FOLLOW', min: 0, max: 1, get: t => t.row.follow, set: (t, v) => { t.row.follow = v; }, fmt: v => (v ? 'ON' : 'OFF') },
      { label: 'SPEED', min: 0, max: SPEEDS.length - 1, get: t => t.row.speed, set: (t, v) => { t.row.speed = v; }, fmt: v => SPEEDS[v] },
      { label: 'INCH', min: 0, max: 16, get: t => t.row.inch, set: (t, v) => { t.row.inch = v; }, fmt: v => (v ? 'CH ' + v : 'OFF') },
      { label: 'TRACK', min: 1, max: 16, get: t => t.row.track, set: (t, v) => { t.row.track = v; }, fmt: v => 'CH ' + v },
      { label: 'TYPE', min: 0, max: 2, ro: true, get: t => TRACK_TYPES.indexOf(t.type), fmt: v => TRACK_TYPES[v] },
      { label: 'BPM', min: 20, max: 300, get: () => clock.bpm, set: (t, v) => { clock.bpm = v; } }
    ],
    seq4: [
      { label: 'SWING', min: 0, max: SWINGS.length - 1, get: t => t.row.swing, set: (t, v) => { t.row.swing = v; }, fmt: v => SWINGS[v] },
      { label: 'AMT', min: 0, max: 100, get: t => t.row.amt, set: (t, v) => { t.row.amt = v; }, fmt: pctOf },
      // the firmware's own cells, kept with their labels even where the card
      // has no state behind them yet
      { label: 'EXT IN', dash: true },
      { label: 'SRC', dash: true },
      { label: 'GATE', min: 10, max: 100, get: t => t.gate, set: (t, v) => { t.gate = v; }, fmt: pctOf },
      { label: 'VEL', min: 1, max: 127, get: t => t.vel, set: (t, v) => { t.vel = v; } },
      { label: 'ACC', min: 1, max: 127, get: t => t.acc, set: (t, v) => { t.acc = v; } },
      { label: 'PROB', min: 0, max: 100, get: t => t.prob, set: (t, v) => { t.prob = v; }, fmt: pctOf }
    ],
    key2: [octRow, scaleRow, keyRow,
      { label: 'FSCALE', dash: true }, { label: 'BASS', dash: true },
      { label: 'SPRD', dash: true }, { label: 'DENS', dash: true },
      { label: 'LATCH', dash: true }],
    key3: [octRow, scaleRow,
      { label: 'ENCOD', dash: true }, { label: 'KBOARD', dash: true },
      blank, blank, blank, blank],
    key4: [
      { label: 'GENRE', min: 0, max: KEY_GENRES.length - 1, get: t => t.row.genre, set: (t, v) => { t.row.genre = v; }, fmt: v => KEY_GENRES[v] },
      { label: 'MOOD', min: 0, max: 100, get: t => t.row.mood, set: (t, v) => { t.row.mood = v; }, fmt: v => MOODS[clamp(Math.floor(v / 20), 0, 4)] },
      pctRow('TENS', 'tens'),
      pctRow('MOTION', 'motion'),
      { label: 'CAD', min: 0, max: 3, get: t => t.row.cad, set: (t, v) => { t.row.cad = v; }, fmt: v => CADENCES[v] },
      pctRow('CPX', 'cpx'),
      { label: 'PHRASE', min: 0, max: 4, get: t => t.row.phrase, set: (t, v) => { t.row.phrase = v; } },
      pctRow('SURP', 'surp')
    ]
  };

  // the mode's own variant: SEQ 1/2 share the base row, KEY 1 is the keyboard
  // screen, everything above 2 gets the variant row
  function rowKey() {
    if (mode === 'seq' && variant.seq >= 3) return 'seq' + variant.seq;
    if (mode === 'key' && variant.key >= 2) return 'key' + variant.key;
    return null;
  }

  function renderRow() {
    const key = rowKey();
    if (!key || !rowScreen) return;
    const t = TRACKS[current];
    const specs = ROW_SPECS[key];
    rowCells.forEach((cell, i) => {
      const sp = specs[i] || blank;
      if (cell.b) cell.b.textContent = sp.label;
      if (cell.s) cell.s.textContent = sp.dash ? '—'
        : sp.fmt ? sp.fmt(sp.get(t)) : String(sp.get(t));
    });
    if (rowHead) {
      rowHead.textContent = (mode === 'seq' ? 'SEQUENCER ' : 'KEYBOARD ') +
        (mode === 'seq' ? variant.seq : variant.key);
    }
    if (rowNote) rowNote.textContent = 'CH ' + t.ch + ' ' + t.type;
    rowModes.forEach((el, i) => el.classList.toggle('is-on', i === (mode === 'seq' ? 1 : 2)));
  }

  const paramPos = (v, min, max) => clamp(Math.round(((v - min) / (max - min)) * 127), 0, 127);

  function knobPos(i) {
    const t = TRACKS[current];
    if (mode === 'enc') return encVals[i];
    const rk = rowKey();
    if (rk) {
      const sp = (ROW_SPECS[rk] || [])[i];
      if (!sp || sp.dash) return 0;
      return paramPos(sp.get(t), sp.min, sp.max);
    }
    if (mode === 'key') {
      const k = KEY_KNOBS[i];
      if (k === 'oct') return paramPos(t.oct, 0, 7);
      if (k === 'scale') return paramPos(t.scale, 0, SCALES.length - 1);
      if (k === 'root') return paramPos(t.root, 0, ROOTS.length - 1);
      return 0;
    }
    if (pageOpen) {
      const row = (PAGE_ROWS[pageOf(t)] || [])[i];
      if (!row || row.idle) return 0;
      return paramPos(row.get(t), row.min, row.max);
    }
    const spec = SEQ_KNOBS[i];
    if (!spec || (spec.only && !spec.only(t))) return 0;
    if (spec.options) return paramPos(spec.options.indexOf(t[spec.key]), 0, spec.options.length - 1);
    return paramPos(t[spec.key], spec.min, spec.max);
  }

  // the CC side of a knob: only the encoder page has dials to show it
  function setCc(i, val) {
    const v = clamp(Math.round(val), 0, 127);
    encVals[i] = v;
    const dial = encDials[i];
    if (!dial) return;
    dial.style.setProperty('--v', v);
    const out = dial.querySelector('em');
    if (out) out.textContent = v;
  }

  function refreshKnobs() {
    encKnobs.forEach((k, i) => k.style.setProperty('--v', knobPos(i)));
  }

  // the F keys pick the edit-row target; only a MONO track can edit TIE and
  // GLIDE (Events.cpp stepEditActive: MONO 1..4, POLY and DRUM 3..4)
  const targetAllowed = (n, t) => n >= 3 || t.type === 'MONO';

  function markTargets(t) {
    const track = t || TRACKS[current];
    targetButtons.forEach(b => {
      const n = Number(b.dataset.target);
      const on = n === editTarget;
      const ok = targetAllowed(n, track);
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-off', !ok);
    });
  }

  // M2: the page of the track in front of you.  It and the edit row are
  // mutually exclusive, and a channel or mode switch drops it, as the
  // firmware's composite page check does
  if (pagePad) {
    pagePad.addEventListener('click', () => {
      // SEQMODE3 is the pattern-setup screen and carries no page on the device
      if (mode === 'seq' && variant.seq === 3) return;
      if (!pageOf(TRACKS[current])) return;      // this track carries no page
      pinned = true;
      pageOpen = !pageOpen;
      if (pageOpen && stepEdit) {
        stepEdit = false;
        stepEditArm.setAttribute('aria-pressed', 'false');
      }
      paint();
    });
  }

  targetButtons.forEach(b => {
    b.addEventListener('click', () => {
      const n = Number(b.dataset.target);
      pinned = true;
      editTarget = editTarget === n ? 0 : n;
      paint();
    });
  });

  // One detent of a knob, in that page's own units: CC counts on the encoder
  // page, one step of the cell under it on the other two — an octave, a scale,
  // a root, a 5% gate step, one velocity.  So a click, a wheel notch, an arrow
  // key and 12px of drag all move exactly one meaningful step.
  function nudge(i, steps) {
    if (mode === 'enc') {
      setCc(i, encVals[i] + steps * 4);
      refreshKnobs();
      updateScreen();
      return;
    }
    const t = TRACKS[current];
    const rk = rowKey();
    if (rk) {
      const sp = (ROW_SPECS[rk] || [])[i];
      if (!sp || sp.dash || sp.ro || !sp.set) return;
      sp.set(t, clamp(sp.get(t) + steps, sp.min, sp.max));
      updateScreen();
      refreshKnobs();
      if (retimeWalk) retimeWalk();       // LEN/SPEED/BPM move the clock itself
      return;
    }
    if (mode === 'key') {
      const k = KEY_KNOBS[i];
      if (k === 'oct') t.oct = clamp(t.oct + steps, 0, 7);
      else if (k === 'scale') t.scale = (t.scale + steps + SCALES.length) % SCALES.length;
      else if (k === 'root') t.root = (t.root + steps + ROOTS.length) % ROOTS.length;
      else return;
    } else {
      if (pageOpen) {
        // the open page owns the row: TIE% moves in 1s, HITS in whole stabs
        const row = (PAGE_ROWS[pageOf(t)] || [])[i];
        if (!row || row.idle) return;
        row.set(t, clamp(row.get(t) + steps, row.min, row.max));
        updateScreen();
        refreshKnobs();
        return;
      }
      const spec = SEQ_KNOBS[i];
      if (!spec || (spec.only && !spec.only(t))) return;
      if (spec.options) {
        // the firmware clamps these states, it does not wrap them
        t[spec.key] = spec.options[clamp(spec.options.indexOf(t[spec.key]) + steps, 0, spec.options.length - 1)];
      } else {
        const stp = spec.step || 1;
        t[spec.key] = clamp(t[spec.key] + steps * stp, spec.min, spec.max);
      }
    }
    updateScreen();
    refreshKnobs();
  }

  encKnobs.forEach((k, i) => {
    let drag = null;
    let moved = false;

    k.addEventListener('click', () => {
      if (moved) { moved = false; return; }
      pinned = true;
      nudge(i, mode === 'enc' ? 2 : 1);
    });
    k.addEventListener('wheel', e => {
      e.preventDefault(); pinned = true;
      nudge(i, e.deltaY < 0 ? 1 : -1);
    }, { passive: false });
    k.addEventListener('keydown', e => {
      const dir = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1
        : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault(); pinned = true; nudge(i, dir);
    });
    k.addEventListener('pointerdown', e => {
      drag = { y: e.clientY, cc: encVals[i], acc: 0 }; moved = false; pinned = true;
      k.setPointerCapture(e.pointerId);
    });
    k.addEventListener('pointermove', e => {
      if (!drag) return;
      if (mode === 'enc') {
        const d = (drag.y - e.clientY) * 1.2;
        if (Math.abs(d) > 2) moved = true;
        setCc(i, drag.cc + d);
        k.style.setProperty('--v', encVals[i]);
        updateScreen();
        return;
      }
      drag.acc += (drag.y - e.clientY) * 1.2;
      const steps = Math.trunc(drag.acc / 12);
      if (!steps) return;
      drag.acc -= steps * 12;
      moved = true;
      nudge(i, steps);
    });
    const end = () => { drag = null; };
    k.addEventListener('pointerup', end);
    k.addEventListener('pointercancel', end);
  });

  refreshKnobs();

  function buildLine() {
    const t = TRACKS[current];
    const v = voicesOf(t)[voice];
    host.innerHTML = '';
    host.style.setProperty('--pad', lineColor());
    host.setAttribute('aria-label', v.name + ' 16 steps');
    cells = [];
    const win = winOf(t);
    for (let c = 0; c < 16; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'stepgrid__cell' + ((win + c) % 4 === 0 ? ' is-beat' : '');
      b.setAttribute('aria-label', v.name + ' step ' + (win + c + 1));
      b.addEventListener('click', () => {
        pinned = true;
        // the window moves with the playhead, so resolve the step on click
        const at = winOf(TRACKS[current]) + c;
        // with an attribute armed the pads edit that flag instead of the note
        if (mode === 'seq' && stepEdit && editTarget &&
            targetAllowed(editTarget, TRACKS[current])) {
          attrs[current][voice][at] ^= ATTR_BIT[editTarget];
        } else {
          state[current][voice][at] = !state[current][voice][at];
        }
        paint();
      });
      host.appendChild(b);
      cells[c] = b;
    }
  }

  function selectVoice(i) {
    voice = i;
    buildLine();
    markVoice();
    paint();
  }

  function selectTrack(i, v) {
    current = i;
    voice = v || 0;
    pageOpen = false;      // the page belongs to the track, so it dies with it
    renderVoices();
    buildLine();
    tabs.forEach((b, n) => {
      b.dataset.on = n === i ? '1' : '0';
      b.setAttribute('aria-selected', String(n === i));
    });
    markVoice();
    paint();
  }

  function updateScreen() {
    const t = TRACKS[current];
    const v = voicesOf(t)[voice];
    if (scr.head) scr.head.textContent = 'CH ' + t.ch + ' ' + t.type + ' · ' + v.name;
    // an armed attribute target takes the header's left slot, as on the panel
    const page = pageOpen ? pageOf(t) : null;
    if (scr.headLeft) {
      const shown = stepEdit && editTarget && targetAllowed(editTarget, t);
      scr.headLeft.textContent = page ? (PAGE_HEAD[page] || 'SEQUENCER')
        : shown ? ATTR_NAME[editTarget]
        : variant.seq > 1 ? 'SEQUENCER ' + variant.seq : 'SEQUENCER';
    }
    if (scr.octave) scr.octave.textContent = String(t.oct);
    if (keyOct) keyOct.textContent = String(t.oct);
    if (keyScale) {
      const name = SCALES[t.scale] || SCALES[0];
      keyScale.textContent = name;
      keyScale.setAttribute('aria-label', 'Scale ' + name + ', click to change');
    }
    if (keyRoot) {
      const root = ROOTS[t.root] || ROOTS[0];
      keyRoot.textContent = root;
      keyRoot.setAttribute('aria-label', 'Key ' + root + ', click to change');
    }
    // the same scale lights the panel keys: the notes it holds, root brightest
    const mask = SCALE_MASK[t.scale] === undefined ? 0xFFF : SCALE_MASK[t.scale];
    panelKeys.forEach(k => {
      const n = Number(k.dataset.note);
      const inScale = ((mask >> ((n - t.root + 12) % 12)) & 1) === 1;
      k.classList.toggle('is-scale', inScale);
      k.classList.toggle('is-out', !inScale);
      k.classList.toggle('is-root', inScale && n === t.root);
    });
    // LISTEN, PLAY and OVERDUB are the M1 step-edit row: they read blank until
    // M1 arms it, and a DRUM track has no record options at all
    const idle = !stepEdit || t.type === 'DRUM';
    if (scr.listen) scr.listen.textContent = idle ? '—' : t.listen;
    if (scr.play) scr.play.textContent = idle ? '—' : t.play;
    if (scr.overdub) scr.overdub.textContent = idle ? '—' : t.overdub;
    if (editLegend) editLegend.classList.toggle('is-on', stepEdit);
    if (scr.gate) scr.gate.textContent = stepEdit ? t.gate + '%' : '—';
    if (scr.velocity) scr.velocity.textContent = stepEdit ? String(t.vel) : '—';
    // only a MONO track carries GATE and VELOCITY on the base row: on the
    // others they are the M1 edit row's knobs, so the cells say so
    const fromMenu = t.type !== 'MONO';
    if (scr.gateTag) scr.gateTag.hidden = page !== null || !fromMenu;
    if (scr.velTag) scr.velTag.hidden = page !== null || !fromMenu;
    if (scr.accent) scr.accent.textContent = stepEdit ? String(t.acc) : '—';
    if (scr.probability) scr.probability.textContent = stepEdit ? t.prob + '%' : '—';
    // an open page owns the row: its labels and values replace the base ones
    const rows = page ? PAGE_ROWS[page] : null;
    seqCells.forEach((cell, i) => {
      const row = rows ? rows[i] : null;
      if (cell.b) cell.b.textContent = row ? row.label : baseLabels[i];
      if (row && !row.idle && cell.s) {
        const val = row.get(t);
        cell.s.textContent = row.fmt ? row.fmt(val) : String(val);
      }
    });
    if (pageLegend) pageLegend.classList.toggle('is-on', page !== null);
    renderRow();
    if (pagePad) {
      pagePad.classList.toggle('is-off', !pageOf(t));
      pagePad.setAttribute('aria-pressed', String(page !== null));
    }
  }

  function paint() {
    const t = TRACKS[current];
    const v = voicesOf(t)[voice];
    const editing = mode === 'seq' && stepEdit && editTarget !== 0 &&
      targetAllowed(editTarget, t);
    const bit = editing ? ATTR_BIT[editTarget] : 0;
    host.dataset.edit = editing ? '1' : '0';
    const win = winOf(t);
    const len = lenOf(t);
    cells.forEach((b, c) => {
      const n = win + c;
      const on = state[current][voice][n];
      b.dataset.on = on ? '1' : '0';
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-hit', on && n === step);
      // past the loop length the pad still holds its step, it just isn't played
      b.classList.toggle('is-out', n >= len);
      const has = bit !== 0 && (attrs[current][voice][n] & bit) !== 0;
      b.dataset.attr = has ? '1' : '0';
      b.setAttribute('aria-label', v.name + ' step ' + (n + 1) +
        (editing ? ' ' + ATTR_NAME[editTarget] + (has ? ' on' : ' off')
          : on ? ' on' : ' off'));
    });
    markTargets(t);
    counter.textContent = String(step + 1).padStart(2, '0') + ' / ' +
      String(len).padStart(2, '0');
    if (speedOut) speedOut.textContent = SPEEDS[clamp(t.row.speed, 0, SPEEDS.length - 1)];
    const label = 'CH ' + t.ch + ' · ' + t.type + ' · ' + v.name +
      (t.follow ? ' ← ' + t.follow : '');
    trackLabel.textContent = label;
    updateScreen();
    refreshKnobs();
  }

  // the panel walks the tracks; CH 1 stops on each kit voice on the way
  function nextTrack() {
    const list = voicesOf(TRACKS[current]);
    if (voice + 1 < list.length) selectVoice(voice + 1);
    else selectTrack((current + 1) % TRACKS.length, 0);
  }

  // KEY page: SCALE and KEY are the keys' ENC2/ENC3 on the panel, and every
  // channel keeps its own pair — step them with a click, the wheel or arrows
  const stepSetting = (el, key, list) => {
    if (!el) return;
    const turn = dir => {
      const t = TRACKS[current];
      t[key] = (t[key] + dir + list.length) % list.length;
      pinned = true;
      updateScreen();
    };
    el.addEventListener('click', e => turn(e.shiftKey ? -1 : 1));
    el.addEventListener('wheel', e => {
      e.preventDefault();
      turn(e.deltaY < 0 ? 1 : -1);
    }, { passive: false });
    el.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); turn(1); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); turn(-1); }
    });
  };
  stepSetting(keyScale, 'scale', SCALES);
  stepSetting(keyRoot, 'root', ROOTS);

  if (gridCard) gridCard.dataset.mode = mode;
  selectTrack(0, 0);

  // show the "swipe" hint only when the pads overflow their card
  const scrollBox = document.querySelector('.stepgrid__scroll');
  const card = document.getElementById('stepgrid');
  const checkFit = () => {
    if (!scrollBox || !card) return;
    card.classList.toggle('is-scrollable', scrollBox.scrollWidth > scrollBox.clientWidth + 4);
  };
  checkFit();
  window.addEventListener('resize', checkFit, { passive: true });

  if (!reduceMotion) {
    let timer = null;
    // one step is SPEED's own note value at BPM, so the row drives the walk
    const stepMs = () => {
      const t = TRACKS[current];
      const den = SPEED_DEN[clamp(t.row.speed, 0, SPEED_DEN.length - 1)];
      return Math.max(30, Math.round((60000 / clock.bpm) * (4 / den)));
    };
    const tick = () => {
      step = (step + 1) % lenOf(TRACKS[current]);
      // the line follows the track, the way the panel does
      if (step === 0 && !pinned) nextTrack();
      paint();
      timer = setTimeout(tick, stepMs());
    };
    // a speed or BPM change lands on the step after this one, not the bar after
    retimeWalk = () => {
      if (!timer) return;
      clearTimeout(timer);
      timer = setTimeout(tick, stepMs());
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !timer) timer = setTimeout(tick, stepMs());
        else if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
      });
    }, { threshold: 0.15 });
    io.observe(card || document.body);
  }
})();

/* ==========================================================
   05 · ARPEGGIATOR  (nine walk orders over a spanned chord)
   ========================================================== */
(function arpeggiator() {
  const host = document.getElementById('arpTrack');
  if (!host) return;

  const MODES = ['UP', 'DOWN', 'UPDOWN', 'OUTIN', 'INOUT', 'CONV', 'DIV', 'RANDOM'];
  const CHORD = ['C4', 'E4', 'G4', 'B4'];

  function span(oct) {
    const out = [];
    for (let o = 0; o < oct; o++) {
      CHORD.forEach(n => out.push(n[0] + (Number(n[1]) + o)));
    }
    return out;
  }

  function walk(mode) {
    const full = span(2);                       // SPAN = 2 octaves
    switch (mode) {
      case 'DOWN':   return full.slice().reverse();
      case 'UPDOWN': return full.concat(full.slice(1, -1).reverse());
      case 'OUTIN': {
        const a = full.slice(), b = [], out = [];
        while (a.length) {
          out.push(a.shift());
          if (a.length) out.push(a.pop());
        }
        return out.concat(b);
      }
      case 'INOUT':  return walk('OUTIN').reverse();
      case 'CONV':   return pivotSort(full, 'in');
      case 'DIV':    return pivotSort(full, 'out');
      case 'RANDOM': {
        const a = full.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      default:       return full;              // UP
    }
  }

  // converge on / diverge from the pivot tone (G4) by distance
  function pivotSort(notes, dir) {
    const pivot = 5; // G in the first octave of the span
    const keyed = notes.map((n, i) => ({ n, d: Math.abs(i - pivot) }));
    keyed.sort((a, b) => dir === 'in' ? a.d - b.d : b.d - a.d);
    return keyed.map(k => k.n);
  }

  let modeIdx = 0;
  let seq = walk(MODES[modeIdx]);
  let pos = 0;

  function render() {
    host.innerHTML = '';
    seq.forEach((note, i) => {
      const li = document.createElement('li');
      li.className = 'arp__step' + (i === pos ? ' is-now' : '');
      li.innerHTML = '<b>' + note + '</b><i>' + String(i + 1).padStart(2, '0') + '</i>';
      host.appendChild(li);
    });
    document.getElementById('arpMode').textContent = MODES[modeIdx];
    document.getElementById('arpChord').textContent = CHORD.join(' · ');
    document.getElementById('arpSpan').textContent = '2 OCT';
  }
  render();

  if (reduceMotion) return;

  let timer = null;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !timer) {
        timer = setInterval(() => {
          pos++;
          if (pos >= seq.length) {
            pos = 0;
            modeIdx = (modeIdx + 1) % MODES.length;
            seq = walk(MODES[modeIdx]);
          }
          render();
        }, 460);
      } else if (!e.isIntersecting && timer) {
        clearInterval(timer); timer = null;
      }
    });
  }, { threshold: 0.2 });
  io.observe(document.getElementById('arp'));
})();

/* ==========================================================
   03 · PROGRESSION ENGINE  (genre grammar → chord proposals, Viterbi-scored)
   ========================================================== */
(function progressions() {
  const list = document.getElementById('progChords');
  if (!list) return;

  const GENRES = [
    { name: 'POP',        chords: ['I', 'V', 'vi', 'IV'],    cad: 'AUTHENTIC' },
    { name: 'ROCK',       chords: ['I', 'bVII', 'IV', 'I'],  cad: 'PLAGAL' },
    { name: 'JAZZ',       chords: ['ii', 'V', 'I', 'vi'],    cad: 'AUTHENTIC' },
    { name: 'CLASSICAL',  chords: ['I', 'IV', 'V', 'I'],     cad: 'AUTHENTIC' },
    { name: 'FOLK',       chords: ['I', 'IV', 'I', 'V'],     cad: 'PLAGAL' },
    { name: 'COUNTRY',    chords: ['I', 'V', 'vi', 'IV'],    cad: 'AUTHENTIC' },
    { name: 'BLUES',      chords: ['I7', 'IV7', 'I7', 'V7'], cad: 'HALF' },
    { name: 'RNB',        chords: ['ii7', 'V7', 'I7', 'vi7'], cad: 'AUTHENTIC' },
    { name: 'FUNK',       chords: ['I7', 'IV7', 'V7', 'I7'], cad: 'AUTHENTIC' },
    { name: 'METAL',      chords: ['i', 'bVI', 'bVII', 'i'], cad: 'DECEPTIVE' },
    { name: 'HIPHOP',     chords: ['i', 'bVI', 'bVII', 'i'], cad: 'DECEPTIVE' },
    { name: 'ELECTRONIC', chords: ['i', 'i', 'bVII', 'bVII'], cad: 'DECEPTIVE' },
    { name: 'REGGAE',     chords: ['I', 'IV', 'I', 'V'],     cad: 'PLAGAL' },
    { name: 'DUBTECHNO',  chords: ['i', 'bVI', 'bIII', 'bVII'], cad: 'DECEPTIVE' },
    { name: 'GOSPEL',     chords: ['I', 'I7', 'IV', 'iv'],   cad: 'AUTHENTIC' },
    { name: 'LATIN',      chords: ['i', 'iv', 'V7', 'i'],    cad: 'AUTHENTIC' },
    { name: 'CINEMATIC',  chords: ['i', 'bVI', 'iv', 'v'],   cad: 'DECEPTIVE' },
    { name: 'MODAL',      chords: ['i7', 'i7', 'bVI7', 'bVII7'], cad: 'DECEPTIVE' }
  ];

  const items = Array.from(list.querySelectorAll('button'));
  let g = 2, accepted = -1;

  function paint() {
    const genre = GENRES[g];
    items.forEach((btn, i) => {
      btn.textContent = genre.chords[i];
      btn.setAttribute('aria-label', 'Accept chord ' + genre.chords[i]);
      btn.classList.toggle('is-on', i === accepted);
      btn.setAttribute('aria-pressed', String(i === accepted));
    });
    document.getElementById('progGenre').textContent = genre.name;
    document.getElementById('progCad').textContent = genre.cad;
  }

  items.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      accepted = (accepted === i) ? -1 : i;
      paint();
    });
  });
  paint();

  if (reduceMotion) return;

  let timer = null;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !timer) {
        timer = setInterval(() => {
          g = (g + 1) % GENRES.length;
          accepted = -1;
          paint();
        }, 2600);
      } else if (!e.isIntersecting && timer) {
        clearInterval(timer); timer = null;
      }
    });
  }, { threshold: 0.25 });
  io.observe(document.getElementById('prog'));
})();

/* ==========================================================
   GALLERY  · screenshot switcher
   ========================================================== */
(function gallery() {
  const stage = document.getElementById('galleryStage');
  const figure = stage ? stage.parentElement : null;
  const thumbs = Array.from(document.querySelectorAll('.gallery__thumb'));
  if (!stage || !thumbs.length) return;

  function select(btn) {
    if (btn.classList.contains('is-active')) return;
    thumbs.forEach(t => {
      const on = t === btn;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    figure.classList.add('is-fading');
    const swap = () => {
      stage.src = btn.dataset.src;
      stage.alt = btn.dataset.alt;
      figure.classList.remove('is-fading');
    };
    reduceMotion ? swap() : setTimeout(swap, 180);
  }

  thumbs.forEach(t => t.addEventListener('click', () => select(t)));

  // on phones the thumbnails are the gallery: a swipe brings the next view to
  // the middle, and whichever view rests there becomes the selected one
  const strip = thumbs[0].parentElement;
  strip.addEventListener('scroll', () => {
    const box = strip.getBoundingClientRect();
    const mid = box.left + box.width / 2;
    let best = null;
    let bestDist = Infinity;
    thumbs.forEach(t => {
      const r = t.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) { bestDist = d; best = t; }
    });
    if (best && !best.classList.contains('is-active')) select(best);
  }, { passive: true });
})();

/* ==========================================================
   PRE-ORDER FORM  →  mailto
   ========================================================== */
(function orderForm() {
  const form = document.getElementById('orderForm');
  const errorBox = document.getElementById('formError');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fName');
    const email = document.getElementById('fEmail');
    const country = document.getElementById('fCountry').value.trim();
    const qty = document.getElementById('fQty').value;
    const message = document.getElementById('fMessage').value.trim();

    const nameOk = name.value.trim().length > 1;
    const emailOk = EMAIL_RE.test(email.value.trim());

    name.classList.toggle('is-invalid', !nameOk);
    email.classList.toggle('is-invalid', !emailOk);
    errorBox.hidden = nameOk && emailOk;

    if (!nameOk || !emailOk) {
      (nameOk ? email : name).focus();
      return;
    }

    const subject = `${CONFIG.productName} pre-order — ${name.value.trim()}`;
    const body = [
      `Product:  ${CONFIG.productName}`,
      `Name:     ${name.value.trim()}`,
      `Email:    ${email.value.trim()}`,
      `Country:  ${country || '—'}`,
      `Quantity: ${qty}`,
      '',
      'Message:',
      message || '—',
      '',
      '— Sent from the WipidiM website'
    ].join('\n');

    window.location.href =
      `mailto:${CONFIG.orderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();

/* ---------- footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
