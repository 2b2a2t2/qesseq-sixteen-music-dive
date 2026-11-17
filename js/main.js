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
  // ---- pitch ----------------------------------------------------------
  // The 12-bit mask says which semitones of the octave the scale holds, so the
  // scale's own tones are its set bits and degree d is the d-th of them.  A
  // chord is that scale's thirds stacked, which means the quality comes out of
  // the mode instead of being asserted, and the track's root and octave turn a
  // degree into a MIDI number (C4 = 60).
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  function scaleTones(t) {
    const mask = SCALE_MASK[t.scale] === undefined ? 0xFFF : SCALE_MASK[t.scale];
    const tones = [];
    for (let i = 0; i < 12; i++) if ((mask >> i) & 1) tones.push(i);
    return tones;
  }
  function degreeSemis(t, d) {
    const tones = scaleTones(t);
    const n = tones.length || 1;
    return tones[((d % n) + n) % n] + 12 * Math.floor(d / n);
  }
  const noteMidi = (t, d) => (t.oct + 1) * 12 + t.root + degreeSemis(t, d);
  const noteName = m => NOTE_NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
  // root, third, fifth — and the seventh and ninth once TENSION asks for them
  function voicingMidi(t, d) {
    const ext = t.row && t.row.tens >= 80 ? [0, 2, 4, 6, 8]
      : t.row && t.row.tens >= 60 ? [0, 2, 4, 6]
        : [0, 2, 4];
    return ext.map(o => noteMidi(t, d + o));
  }
  const voicingNames = (t, d) => voicingMidi(t, d).map(noteName);

  const panelKeys = [...document.querySelectorAll('#stepgrid .panel__key[data-note]')];
  const stepEditArm = document.getElementById('stepEditArm');
  const editLegend = document.querySelector('[data-scr="edit-legend"]');
  const targetButtons = [...document.querySelectorAll('#stepgrid [data-key]')];
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
      color: 'var(--led-green)', pattern: '..x.x..x..x.x..x' },
    { ch: 4, type: 'MONO', name: 'BASS',   scale: 2, root: 9, oct: 2, listen: 'CHORD', play: 'GATE', overdub: 'OFF',
      gate: 100, vel: 90, acc: 101, prob: 100,
      page: { fill: 50, acc: 30, glide: 20, tie: 10 },
      color: 'var(--led-teal)',  pattern: 'x..x..x...x.x...' }
  ];

  const voicesOf = t => t.voices || [{ name: t.name, color: t.color, pattern: t.pattern }];
  // the row the higher variants show, per track (SEQMODE3/4, KEYMODE2/3/4)
  TRACKS.forEach(t => {
    t.row = {
      len: 16, follow: 0, speed: 2, inch: t.ch, track: t.ch,
      swing: 0, amt: 50,
      genre: 0, mood: 50, tens: 50, motion: 50, cad: 0, cpx: 50, phrase: 0, surp: 50
    };
  });
  // INCH seeds to the track's own channel (boot state, so no track follows),
  // except CH 3: the skank is the one track wired to listen, and INCH is the
  // knob that says so
  TRACKS[2].row.inch = 2;
  // a pattern runs to 64 steps, because SEQMODE3's LEN is 0..64.  The 16-pad
  // line is the bar window over it (the firmware's C D E F window, driven by
  // the clock here), and a track longer than its 16-step string repeats it
  const STEPS_MAX = 64;
  const state = TRACKS.map(t => voicesOf(t).map(v =>
    Array.from({ length: STEPS_MAX }, (_, i) => v.pattern[i % 16] === 'x')));
  // per-step attributes, the ones the M1 edit row's keys stamp: a bitmask per
  // step, so a step can carry TIE and ACCENT at once (Events.cpp stepAttrs)
  const TIE = 1, GLIDE = 2, ACC = 4, PROB = 8, EMB = 16;
  const attrs = TRACKS.map(t => voicesOf(t).map(() => new Uint8Array(STEPS_MAX)));
  // the targets that carry a value rather than a bit: FX and TYPE per POLY step,
  // the RATCHET count per DRUM step (Drum.cpp / Events.cpp stepFxType, stepType
  // and stepRatchetStamp).  0 = the step inherits / plays a single hit
  const fxOf = TRACKS.map(t => voicesOf(t).map(() => new Uint8Array(STEPS_MAX)));
  const typeOf = TRACKS.map(t => voicesOf(t).map(() => new Uint8Array(STEPS_MAX)));
  const ratOf = TRACKS.map(t => voicesOf(t).map(() => new Uint8Array(STEPS_MAX)));
  // stepEditActive(): MONO arms 1..4, POLY arms 3,4 plus 5 FX / 6 TYPE / 7 EMB,
  // DRUM arms 3,4 plus 8 RATCHET.  The panel has four F keys, so the row is
  // relabelled per type: on POLY F1 is FX (a second tap walks on to EMB) and F2
  // is TYPE, while on a DRUM track F1 has no job at all and F2 is RATCHET
  const TARGETS = {
    1: { name: 'TIE', bit: TIE },
    2: { name: 'GLIDE', bit: GLIDE },
    3: { name: 'ACCENT', bit: ACC },
    4: { name: 'PROBABILITY', bit: PROB },
    5: { name: 'FX', vals: ['—', 'sus2', 'sus4', '6', 'm7', 'M7', '9', 'color'] },
    6: { name: 'TYPE', vals: ['INHERIT', 'STEP', 'STRUM', 'HAND'] },
    7: { name: 'EMB', bit: EMB },
    8: { name: 'RATCHET' }
  };
  const TARGET_KEY = { MONO: [1, 2, 3, 4], POLY: [5, 6, 3, 4], DRUM: [0, 8, 3, 4] };
  // POLY playback type (SeqClock.h SeqPolyType): STEP chords play as blocks,
  // STRUM rakes them, HAND leaves the chord on the keyboard to be played.  A
  // step's TYPE stamp overrides this; a step left on INHERIT falls back to the
  // track (Keyboard.cpp effStepType), which boots on STEP like the device
  const POLY_STEP = 0, POLY_STRUM = 1, POLY_HAND = 2;
  const polyType = TRACKS.map(() => POLY_STEP);
  // a HAND step's performed gesture: the note and the ms it was struck at, in
  // the order the player struck it (stepStrumDt + Keyboard.cpp's literal replay)
  const handGest = TRACKS.map(t => voicesOf(t).map(() =>
    Array.from({ length: STEPS_MAX }, () => [])));
  // a HAND chord that has arrived and is waiting on the keyboard
  let handBuf = null;
  // the type the step plays as: its own stamp, else the track's (effStepType)
  const typeOfStep = (i, vi, s) => {
    const v = typeOf[i][vi][s];          // 0 inherit, 1 STEP, 2 STRUM, 3 HAND
    return v ? v - 1 : polyType[i];
  };
  // what the value targets stamp, in the firmware's own vocabulary
  let fxArm = 1, typeArm = 1, ratArm = 2;              // sus2 / STEP / 2 repeats
  const keyTargetOf = (k, t) => (TARGET_KEY[t.type] || TARGET_KEY.MONO)[k];
  const armNameOf = n => (n === 5 ? TARGETS[5].vals[fxArm]
    : n === 6 ? TARGETS[6].vals[typeArm] : n === 8 ? '×' + ratArm : '');
  const valAt = (i, vi, s, target) => (target === 5 ? fxOf[i][vi][s]
    : target === 6 ? typeOf[i][vi][s] : target === 8 ? ratOf[i][vi][s] : 0);
  // the panel's white keys strum whatever chord a HAND step left in the
  // buffer, and that performance is what the step replays from then on
  function strikeHandKey(pc) {
    if (!handBuf) return false;
    const { i, vi, s, midi } = handBuf;
    // the key picks its string by pitch class: the chord sets the octave
    const note = midi.find(m => m % 12 === pc);
    if (note === undefined) return false;              // not a string of this chord
    const slot = handGest[i][vi][s];
    if (slot.some(g => g.m === note)) return false;    // each string once
    const at = Math.round(performance.now() - handBuf.at);
    if (at < 0 || at > 65535) return false;
    slot.push({ m: note, at });
    paint();
    return true;
  }

  function stampAt(i, vi, s, target) {
    if (target === 5) fxOf[i][vi][s] = fxOf[i][vi][s] === fxArm ? 0 : fxArm;
    else if (target === 6) typeOf[i][vi][s] = typeOf[i][vi][s] === typeArm ? 0 : typeArm;
    else if (target === 8) ratOf[i][vi][s] = ratOf[i][vi][s] === ratArm ? 0 : ratArm;
    else attrs[i][vi][s] ^= TARGETS[target].bit;
  }

  // SEQMODE3's LEN is the loop length of the track in front of you
  const lenOf = t => clamp(Math.round(t.row.len), 1, STEPS_MAX);
  const winOf = t => {
    const len = lenOf(t);
    if (len <= 16) return 0;
    return clamp(Math.floor(curPos() / 16) * 16, 0, (Math.ceil(len / 16) - 1) * 16);
  };
  // 1/16 is one 16th note: 60000 / BPM / 4, the rest scale off it
  const SPEED_DEN = [64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
  // SeqSwingStyle's nominal pair ratios (SeqClock.h): OFF then MPC60 75,
  // MPC3000 70, SP-1200 72, LinnDrum 62, 808 66, 909 64, shuffle 75, triplet 67.
  // AMT scales each toward 50 = straight, which is what seqSwingRatioOf reports
  const SWING_DEPTH = [50, 75, 70, 72, 62, 66, 64, 75, 67];

  // A follower reads its feeder's playhead: the feeder is the track of the
  // channel INCH points at, which the device seeds with the track's own channel
  // ("1-based, self unless remapped", Keyboard.cpp seqInCh).  Keyboard.cpp's
  // rule is the whole model: follow needs mode != 0, a track that is not DRUM,
  // and an input channel that is not itself.  ON takes the chord the feeder is
  // sounding and holds it through the feeder's rests; FREEZE latches the chord
  // it hears when it is entered, so the follower keeps stepping on a frozen
  // chord (followOn: 0 OFF, 1 ON, 2 FREEZE, boot OFF)
  const posOf = TRACKS.map(() => 0);
  const feederIdxOf = i => {
    const t = TRACKS[i];
    if (t.row.follow === 0 || t.type === 'DRUM') return -1;   // no mode / never a drum
    if (t.row.inch === t.ch) return -1;                       // INCH on itself
    const feeder = TRACKS.findIndex(x => x.ch === t.row.inch);
    return feeder;                                            // -1: not a track here
  };
  const followOn = t => feederIdxOf(TRACKS.indexOf(t)) >= 0;
  const followFrozen = t => followOn(t) && t.row.follow === 2;
  // What the transport does with a step is what the M1 flags are for: TIE holds
  // the previous note instead of re-striking, ACCENT takes the track's accent
  // velocity, GLIDE slides in from the last pitch, PROBABILITY can drop the
  // step, and GATE decides how long the hit lasts.  One event per voice per
  // step, resolved when the step arrives, so the flag has a consequence rather
  // than being a stored bit.
  const eventOf = TRACKS.map(t => voicesOf(t).map(() => null));
  function playEvent(i, vi, s, durMs) {
    const t = TRACKS[i];
    const bits = attrs[i][vi][s];
    const prev = eventOf[i][vi];
    const gate = clamp(t.gate, 10, 100) / 100;
    const silent = { strike: false, held: false, vel: 0, glide: false, lenMs: 0, hits: 0 };
    if (!state[i][vi][s]) return silent;
    // a TIE carries the note through this step instead of hitting it again
    if ((bits & TIE) && prev && (prev.strike || prev.held)) {
      return { strike: false, held: true, vel: prev.vel, glide: false,
        lenMs: prev.lenMs + durMs * gate, hits: 0 };
    }
    if ((bits & PROB) && Math.random() * 100 >= clamp(t.prob, 0, 100)) {
      return silent;
    }
    // RATCHET repeats the hit 2..4 times inside the step's own length, the way
    // stepRatchetStamp lays it on a drum voice
    const hits = ratOf[i][vi][s] || 1;
    const ev = {
      strike: true,
      held: false,
      vel: (bits & ACC) ? Math.max(t.vel, t.acc) : t.vel,
      glide: (bits & GLIDE) !== 0,
      lenMs: (durMs * gate) / hits,
      hits,
    };
    // POLY: the step's type decides how the chord is voiced.  STEP is the
    // block it always was; STRUM rakes it; HAND hands it to the player
    if (t.type === 'POLY') {
      const et = typeOfStep(i, vi, s);
      const midi = chordsOf[i][s] >= 0 ? voicingMidi(t, chordsOf[i][s]) : [];
      if (et === POLY_STRUM && midi.length > 1) {
        // half a note apart inside the step, clamped 8..40 ms so a slow step
        // still finishes the rake well before its boundary (Keyboard.cpp)
        const gap = Math.min(40, Math.max(8, durMs / (midi.length * 2)));
        ev.notes = midi.slice().sort((a, b) => a - b).map((m, k) => ({ m, at: Math.round(k * gap) }));
        ev.strumGap = Math.round(gap);
      } else if (et === POLY_HAND) {
        const gest = handGest[i][vi][s];
        if (gest.length) {
          // the recorded gesture replays literally: the order it was played in
          // and the real onsets, which may spill past the step's boundary
          ev.notes = gest.map(g => ({ m: g.m, at: g.at }));
          ev.handMs = gest[gest.length - 1].at;
          ev.lenMs = ev.handMs + (durMs * gate) / hits;
        } else {
          // no gesture yet: the chord is buffered for the keyboard, not played
          handBuf = { i, vi, s, midi, at: performance.now() };
          return { strike: false, held: false, vel: 0, glide: false, lenMs: 0,
            hits: 0, buffered: true };
        }
      }
    }
    return ev;
  }
  const trackStrikes = i => eventOf[i].some(e => !!e && e.strike);
  const voiceEvent = () => eventOf[current][voice] || null;
  // every track keeps its own playhead, because every track is playing
  const curPos = () => posOf[current];
  const curHolding = () => {
    const t = TRACKS[current];
    if (!followOn(t)) return false;
    if (followFrozen(t)) return true;                    // latched until FREEZE is left
    // a tie is not a new chord, so the follower holds through it too
    return !trackStrikes(feederIdxOf(current));
  };
  let retimeWalk = null;
  let editTarget = 0;                                  // 0 = STEPS, else 1..8 target
  let pageOpen = false;                                // the M2 page of this track
  const variant = { enc: 1, seq: 1, key: 1 };          // ENC/SEQ/KEY 1..4
  const clock = { bpm: 120 };                          // SEQMODE3's BPM is global
  const tabs = [];
  const voiceTabs = [];
  let cells = [];
  let current = 0;
  let voice = 0;

  TRACKS.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'stepgrid__chan';
    b.style.setProperty('--pad', t.color);
    b.innerHTML = '<b>CH ' + t.ch + '</b><small>' + t.type + '</small>';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Channel ' + t.ch + ' — ' + t.type + ' track');
    b.addEventListener('click', () => selectTrack(i, 0));
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
      b.addEventListener('click', () => selectVoice(i));
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
  // Drum.cpp's kGenre, verbatim: eighteen styles, the four lanes in the card's
  // own voice order (KICK, SNARE, HAT, PERC), two authored 16-step lines each.
  // '-' is a rest, 'a'..'g' a hit and 'A'..'G' a ghost that FILL% rolls.  The
  // device's kit puts several notes on one lane (clap and claves on the snare
  // lane, congas and toms on perc), so a lane's letters all land on that lane's
  // voice here instead of opening extra lines.
  const DRUM_TABLE = [
    [["a---a---a---a---","a---a---a-a-a-a-"], ["----a-------a---","----a---a-a-a---"], ["--b---b---b---b-","aAaAaAaAaAaAaAaA"], ["c-a---a---a---a-","ca-d--a--d-a--a-"]],
    [["a---a---a---a---","a---a---a-a---a-"], ["----a-------a---","----a---a-a-a---"], ["--b---b---b---b-","AaAaAaAaAaAaAaAa"], ["c--e-------f----","c-g---a---g---a-"]],
    [["a-----a---a-----","a--a--a---a--a--"], ["----a-------a---","----a-----a-a--a"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c---e---f---e---","--a-d--a--d-a---"]],
    [["a-----a-a-------","a--a--a---a--a--"], ["----a-------a---","----a--Aa-a-a--A"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c-------d---a---","---a--d----a--d-"]],
    [["a-----a---a--a--","a---a---a-a---a-"], ["----a-------a---","----a--a---a--a-"], ["aaaaaaaaaaaaaaaa","aAaAaAaAaAaAaAaA"], ["c--g----g---g---","--a-a--a--a-A--A"]],
    [["a-----a---a--a--","a--a-a----a-a---"], ["----a-------a---","----a--a-a--a-A-"], ["aAaAaAaAaAaAaAaA","aa-aa-aa-aa-aa--"], ["c-e---f---e---f-","--a-d--a--a-d--a"]],
    [["a-----a---a--a--","a--a--a---a-a-a-"], ["----a-------a---","----a--a-a--a--a"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c--d--a---d--a--","---a--d-a---a-d-"]],
    [["a-----a---a-----","a-----a---a--a-a"], ["----a-------a---","----a----a--a-a-"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c-----g-----g---","c--e--f--e--f---"]],
    [["a-------a-------","a------aa--a----"], ["---a-----a--A---","---a--a---a--a--"], ["a-A-a--aa-A-a--a","a-a-a-aa-a-a-a-a"], ["c-------e---f---","----e--f---e--f-"]],
    [["a--a--a---a--a--","a--a--a---a-a-a-"], ["c--c--c---c-c---","----b-------b---"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c--d--a---d--a--","--a-a--d--a-a--d"]],
    [["a-----a---a--a--","a--a--a---a-a---"], ["----a-------a---","----a-----a---a-"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c-a--d-a--a--d-a","--a-a--d--a-a--d"]],
    [["a-----a---a-----","a--a--a-a-a-----"], ["----b-------b---","----b--b---b--b-"], ["aAaAaAaAaAaAaAaA","--b---b---b---b-"], ["c------g---g----","--g--g---g--g---"]],
    [["a---------a-----","a--a------a--a--"], ["----a-------a---","----a--a---a--a-"], ["a-a-a-a-a-a-a-a-","AaAaAaAaAaAaAaAa"], ["c----------e--f-","--------e--f--e-"]],
    [["a---------a-----","a-----a---a---a-"], ["----a-------a---","----a--a----a--a"], ["a--aa--aa--aa--a","a-a-a-a-a-a-a-a-"], ["c---a---d---a---","--a--d-a--a--d-a"]],
    [["a-------a-------","a-----a-a-----a-"], ["----a-------a---","----a--a----a--a"], ["a-a-a-a-a-a-a-a-","AaAaAaAaAaAaAaAa"], ["c-----e-----f---","----e--f----e--f"]],
    [["a-------a-------","a---a---a---a---"], ["----a-------a---","----a---a---a-a-"], ["--a---a---a---a-","--b---b---b---b-"], ["c-g---g---g---g-","c-a-a--a-a--a-a-"]],
    [["a---a---a---a---","a---a---a-a-a-a-"], ["----b-------b---","----b---b---b--b"], ["--b---b---b---b-","aAaAaAaAaAaAaAaA"], ["c--a---a---a---a","---a-d-a---a-d-a"]],
    [["--------a-------","------a-a-----a-"], ["--------a-------","----c-------c---"], ["--a---a---a---a-","a-a-a-a-a-a-a-a-"], ["c-----g-----g---","--a-a--a--a-a--a"]],
  ];
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
  const FOLLOW_NAMES = ['OFF', 'ON', 'FREEZE'];          // Display.cpp folN
  const KEY_GENRES = ['POP', 'ROCK', 'JAZZ', 'CLASSICAL', 'FOLK', 'COUNTRY',
    'BLUES', 'RNB', 'FUNK', 'METAL', 'HIPHOP', 'ELECTRONIC', 'REGGAE',
    'DUBTECHNO', 'GOSPEL', 'LATIN', 'CINEMATIC', 'MODAL'];
  const MOODS = ['DARK', 'COOL', 'MIXED', 'WARM', 'LIGHT'];
  const CADENCES = ['AUTH', 'PLAG', 'DECP', 'HALF'];
  // Key4.cpp's short forms for the value column, and its phrase plan names
  const CADENCE_PAIRS = ['V-I', 'IV-I', 'V-vi', 'ii-V'];
  const PHRASE_NAMES = ['FREE', 'AABB', 'ABAB', 'ABAC', 'AABA'];
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
      { label: 'FOLLOW', min: 0, max: 2, get: t => t.row.follow, set: (t, v) => { t.row.follow = v; }, fmt: v => FOLLOW_NAMES[v] },
      { label: 'SPEED', min: 0, max: SPEEDS.length - 1, get: t => t.row.speed, set: (t, v) => { t.row.speed = v; }, fmt: v => SPEEDS[v] },
      { label: 'INCH', min: 1, max: 16, get: t => t.row.inch, set: (t, v) => { t.row.inch = v; }, fmt: v => 'CH ' + v },
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
      { label: 'CAD', min: 0, max: 3, get: t => t.row.cad, set: (t, v) => { t.row.cad = v; }, fmt: v => CADENCE_PAIRS[v] },
      pctRow('CPX', 'cpx'),
      { label: 'PHRASE', min: 0, max: 4, get: t => t.row.phrase, set: (t, v) => { t.row.phrase = v; }, fmt: v => PHRASE_NAMES[v] },
      pctRow('SURP', 'surp')
    ]
  };

  // ---- KEYMODE4: the chord engine -------------------------------------
  // The eight knobs of KEY 4 shape a progression that lands in CH 2's steps.
  // GENRE indexes genre_data.h's 7x7 degree transition matrix, MOOD tilts the
  // walk between the minor and major degrees, MOTION is how often a chord slot
  // actually moves, CPX how many distinct chords the bar may use, TENS adds the
  // 7th/9th to the name, CAD lands the bar's last slot on the cadence's degree,
  // PHRASE repeats slots in the plan's shape and SURP is the chance to ignore
  // the matrix for a random degree.  A bar is four chord slots of four steps,
  // so a 16-step pattern carries all four.
  const KEY_GENRE_MATRIX = [
    /* POP        */ [[50,6,4,14,17,7,2],[22,24,7,8,32,6,1],[20,10,27,15,5,16,7],[35,5,5,20,27,5,3],[40,6,3,14,30,6,1],[17,14,9,17,15,18,10],[36,2,20,8,5,9,20]],
    /* ROCK       */ [[26,9,4,29,16,14,2],[16,13,4,16,37,13,1],[9,16,9,14,6,38,8],[51,5,3,10,23,5,3],[56,5,1,13,12,12,1],[24,23,7,22,11,10,3],[27,4,17,24,7,14,7]],
    /* JAZZ       */ [[18,15,6,30,11,15,5],[8,15,2,2,68,3,2],[7,14,2,5,6,65,1],[35,6,11,13,6,16,13],[77,6,4,3,6,3,1],[7,63,4,3,9,11,3],[17,3,57,3,5,13,2]],
    /* CLASSICAL  */ [[22,12,1,13,46,3,3],[16,41,1,1,38,1,2],[9,10,19,7,2,52,1],[52,15,1,7,17,1,7],[70,4,1,1,20,3,1],[8,49,3,6,10,22,2],[58,5,4,2,14,0,17]],
    /* FOLK       */ [[27,10,2,24,29,6,2],[6,9,2,2,77,4,0],[7,10,5,16,7,39,16],[51,8,1,8,27,3,2],[73,5,1,5,11,5,0],[12,34,12,9,19,11,3],[44,0,25,3,7,12,9]],
    /* COUNTRY    */ [[35,7,4,23,21,7,3],[15,21,4,6,48,5,1],[15,10,19,12,5,33,6],[47,5,4,14,20,5,5],[57,5,2,9,21,5,1],[13,33,7,16,12,13,6],[40,2,21,6,4,8,19]],
    /* BLUES      */ [[39,5,2,24,22,5,3],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[47,4,4,12,26,4,3],[53,4,2,13,23,4,1],[18,26,7,12,17,14,6],[38,2,18,8,4,7,23]],
    /* RNB        */ [[42,9,4,16,18,9,2],[10,18,3,4,61,3,1],[15,10,18,12,5,34,6],[39,6,6,16,23,6,4],[60,5,2,8,19,5,1],[13,39,6,11,12,13,6],[40,2,24,7,5,9,13]],
    /* FUNK       */ [[48,6,3,19,16,6,2],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[46,5,4,17,20,5,3],[53,5,3,10,22,6,1],[15,28,8,13,14,15,7],[39,2,21,6,5,8,19]],
    /* METAL      */ [[42,6,3,19,16,10,4],[15,21,4,6,48,5,1],[16,11,20,13,5,26,9],[46,5,5,14,21,5,4],[60,5,2,8,19,5,1],[20,25,7,12,12,13,11],[44,2,20,6,4,13,11]],
    /* HIPHOP     */ [[49,6,3,14,16,9,3],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[37,5,5,15,29,5,4],[52,5,2,10,22,8,1],[20,23,6,15,11,19,6],[30,2,23,7,5,15,18]],
    /* ELECTRONIC */ [[40,6,3,18,25,6,2],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[55,4,4,12,18,4,3],[58,4,2,8,18,9,1],[13,24,6,22,11,18,6],[34,2,26,7,6,10,15]],
    /* REGGAE     */ [[44,6,3,22,16,6,3],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[47,5,4,13,24,4,3],[60,5,2,8,19,5,1],[15,28,8,13,14,15,7],[41,2,21,6,5,8,17]],
    /* DUBTECHNO  */ [[60,1,8,12,10,1,8],[45,15,8,12,10,5,5],[50,2,15,8,7,8,10],[55,2,5,20,8,5,5],[55,2,5,8,20,5,5],[45,2,15,8,7,15,8],[52,2,8,8,7,5,18]],
    /* GOSPEL     */ [[40,9,3,21,17,8,2],[12,16,3,4,60,4,1],[16,11,20,13,6,27,7],[49,5,4,13,20,5,4],[51,5,3,13,21,6,1],[14,36,7,12,12,13,6],[42,2,23,7,5,8,13]],
    /* LATIN      */ [[39,6,3,21,21,8,2],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[35,5,5,14,32,5,4],[62,4,2,8,17,6,1],[14,27,7,13,18,14,7],[40,2,24,7,5,9,13]],
    /* CINEMATIC  */ [[40,6,3,19,20,10,2],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[36,5,4,15,31,5,4],[52,5,2,10,22,8,1],[13,25,7,18,12,19,6],[33,2,25,7,6,12,15]],
    /* MODAL      */ [[57,5,2,14,15,5,2],[15,21,4,6,48,5,1],[16,11,20,13,6,27,7],[46,5,5,14,21,5,4],[60,5,2,8,19,5,1],[15,28,8,13,14,15,7],[42,2,20,6,6,8,16]],
  ];
  const DEGREES = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'];
  const PHRASE_PLANS = [[0, 1, 2, 3], [0, 0, 1, 1], [0, 1, 0, 1], [0, 1, 0, 2], [0, 0, 1, 0]];
  const CADENCE_LANDING = [0, 0, 5, 4];       // V-I, IV-I, V-vi, ii-V
  const MINOR_DEGREES = [1, 2, 5];
  const chordsOf = TRACKS.map(() => new Int8Array(STEPS_MAX).fill(-1));
  // what a following track is holding while its feeder rests
  const heldOf = TRACKS.map(() => null);
  // entering FREEZE latches the chord the feeder is sounding at that instant,
  // rather than the one its next hit happens to catch; leaving drops the latch
  function syncFollow() {
    const fi = followOn(TRACKS[current]) ? feederIdxOf(current) : -1;
    heldOf[current] = fi >= 0 && followFrozen(TRACKS[current])
      ? { degree: chordsOf[fi][posOf[fi]], notes: chordNotes(fi, posOf[fi]) }
      : null;
  }
  let chordRoll = 20260101;

  // imul keeps the roll inside 32 bits: plain multiplication overflowed the
  // double's 53-bit mantissa and degenerated into a short cycle
  const chordRand = () => {
    chordRoll = (Math.imul(chordRoll, 1664525) + 1013904223) >>> 0;
    return chordRoll / 4294967296;
  };

  // the degree a step carries, or -1 where the engine has not written one
  function chordName(trackIdx, s) {
    const d = chordsOf[trackIdx][s];
    if (d === undefined || d < 0) return '';
    const p = TRACKS[trackIdx].row;
    // tension only colours the chord once it is past the neutral midpoint
    const ext = p.tens >= 80 ? '9' : p.tens >= 60 ? '7' : '';
    return DEGREES[d] + ext;
  }

  // the notes a step's chord is voiced on, in that track's key and octave
  function chordNotes(trackIdx, s) {
    const d = chordsOf[trackIdx][s];
    if (d === undefined || d < 0) return [];
    return voicingNames(TRACKS[trackIdx], d);
  }

  function generateProgression(reseed) {
    if (reseed) chordRoll = (Date.now() & 0x7fffffff) || 1;   // M3 rolls fresh
    const p = TRACKS[1].row;
    const mat = KEY_GENRE_MATRIX[clamp(p.genre, 0, KEY_GENRE_MATRIX.length - 1)];
    const mood = (clamp(p.mood, 0, 100) - 50) / 50;      // -1 DARK .. +1 LIGHT
    const motion = clamp(p.motion, 0, 100);
    const surprise = clamp(p.surp, 0, 100);
    const plan = PHRASE_PLANS[clamp(p.phrase, 0, PHRASE_PLANS.length - 1)];
    const distinct = 1 + Math.round((clamp(p.cpx, 0, 100) / 100) * 3);   // 1..4 a bar

    // one move of the genre's walk, weighted by its row and tilted by mood
    const move = from => {
      if (chordRand() * 100 < surprise) return clamp(Math.floor(chordRand() * 7), 0, 6);
      // MOTION pushes the walk off the degree it is on, MOOD tilts it between
      // the minor and major ones
      const row = mat[from].map((w, i) => {
        // past halfway MOTION means leave: the degree you are on is off the menu
        if (i === from && motion >= 60) return 0;
        let weight = i === from ? w * (1 - motion / 100) : w;
        weight += (MINOR_DEGREES.indexOf(i) >= 0 ? -mood : mood) * 30;
        return Math.max(0.5, weight);
      });
      const total = row.reduce((a, b) => a + b, 0);
      let r = chordRand() * total;
      for (let i = 0; i < row.length; i++) { r -= row[i]; if (r <= 0) return i; }
      return 0;
    };

    const walk = [0];
    for (let i = 1; i < 4; i++) {
      const holds = chordRand() * 100 >= motion;           // MOTION: move or hold
      const next = holds ? walk[i - 1] : move(walk[i - 1]);
      walk[i] = i >= distinct ? walk[i - 1] : next;        // CPX caps distinct chords
    }
    const slots = plan.map(src => walk[src]);
    slots[3] = CADENCE_LANDING[clamp(p.cad, 0, 3)];         // the cadence lands the bar

    for (let s = 0; s < STEPS_MAX; s++) {
      chordsOf[1][s] = slots[Math.floor((s % 16) / 4)];
    }
    // the chord changes are the steps that sound; the track keeps its own hits
    const voice0 = state[1][0];
    for (let s = 0; s < STEPS_MAX; s++) if (s % 4 === 0) voice0[s] = true;
  }

  // --- DRUM PATTERN (Drum.cpp drumProduce) --------------------------------
  // One rolled 16-step cell: a lowercase hit always plays, FILL% rolls the
  // uppercase ghosts, MOT% rolls an accent onto each hit that landed, and VAR
  // opens the bar-end fill - a snare through the last beat or half bar, and the
  // two tom cells at 14 and 15.  The cell is rolled once and stamped over the
  // track's length, so a longer pattern keeps one bar instead of re-rolling.
  function drumCell(i) {
    const p = TRACKS[i].page;
    const genre = clamp(p.genre, 0, DRUM_TABLE.length - 1);
    const fill = clamp(p.fill, 0, 100);
    const mot = clamp(p.mot, 0, 100);
    const vStart = p.var === 2 ? 8 : p.var === 1 ? 12 : 16;   // fill8 / fill4 / off
    const cell = Array.from({ length: 16 }, () => ({ hits: [], acc: [] }));
    for (let c = 0; c < 16; c++) {
      for (let l = 0; l < 4; l++) {
        const line = p.lines[l];
        if (line > 1) continue;                               // lane OFF
        const str = DRUM_TABLE[genre][l][line];
        if (c >= str.length) continue;                        // short line
        const ch = str[c];
        if (ch === '-') continue;
        if (ch >= 'A' && ch <= 'Z' && chordRand() * 100 >= fill) continue;
        cell[c].hits.push(l);
        if (chordRand() * 100 < mot) cell[c].acc.push(l);
      }
      // the bar-end fill rolls whether or not the lane's line has a hit there
      if (c >= vStart) {
        if (p.lines[1] < 2 && chordRand() * 100 < fill) {
          cell[c].hits.push(1);
          if (chordRand() * 100 < mot) cell[c].acc.push(1);
        }
        // the tom run lands on the perc lane - the kit's A#1 / G#1 are its notes
        if (c >= 14 && p.lines[3] < 2 && chordRand() * 100 < fill) cell[c].hits.push(3);
      }
    }
    return cell;
  }

  // write it onto the DRUM track: notes per lane, and MOT's accents as each
  // step's ACCENT bit - the same flag the M1 row edits and the transport reads
  function drumProduce(i, reseed) {
    const t = TRACKS[i];
    if (!t || t.type !== 'DRUM') return 0;
    if (reseed) chordRoll = (Date.now() & 0x7fffffff) || 1;   // M3 rolls fresh
    const len = lenOf(t);
    const cell = drumCell(i);
    for (let s = 0; s < len; s++) {
      const c = cell[s % 16];
      for (let l = 0; l < 4; l++) {
        state[i][l][s] = c.hits.indexOf(l) >= 0;
        if (c.acc.indexOf(l) >= 0) attrs[i][l][s] |= ACC;
        else attrs[i][l][s] &= ~ACC;
      }
    }
    return len;
  }

  // the four slots of CH 2's bar, as the card shows them on the track line
  function chordLine() {
    const names = [0, 1, 2, 3].map(i => chordName(1, i * 4)).filter(Boolean);
    return names.length === 4 ? ' · ' + names.join('–') : '';
  }

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

  // a key can only arm a target its track type carries (stepEditActive).  EMB
  // has no key of its own: it is POLY's second tap on F1
  const targetAllowed = (n, t) => n > 0 && (n === 7 ? t.type === 'POLY'
    : (TARGET_KEY[t.type] || TARGET_KEY.MONO).indexOf(n) >= 0);

  function markTargets(t) {
    const track = t || TRACKS[current];
    targetButtons.forEach(b => {
      const k = Number(b.dataset.key);
      const n = keyTargetOf(k, track);
      const spec = TARGETS[n];
      const on = n !== 0 && n === editTarget;
      const arm = spec ? armNameOf(n) : '';
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-off', !spec);
      if (b.hasAttribute('data-legend')) {          // the legend names the target
        b.textContent = spec ? spec.name + (arm ? ' ' + arm : '') : '—';
      }
      b.setAttribute('aria-label', spec
        ? 'F' + (k + 1) + ', the ' + spec.name + (arm ? ' ' + arm : '') + ' edit target'
        : 'F' + (k + 1) + ', no edit target on this track type');
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
      const n = keyTargetOf(Number(b.dataset.key), TRACKS[current]);
      if (!n) return;                        // F1 on a DRUM track has no job
      // the armed key steps on, and POLY's F1 owns both of its states: the
      // firmware walks FX (5) -> EMB (7) -> steps (0), so EMB is still "F1"
      editTarget = editTarget === n ? (n === 5 ? 7 : 0)
        : (n === 5 && editTarget === 7 ? 0 : n);
      paint();
    });
  });

  // the seven white keys are the HAND strings: a HAND step's chord sits in the
  // buffer until they are struck, and the strikes become the step's replay
  panelKeys.filter(k => !k.classList.contains('panel__key--black')).forEach(k => {
    const play = () => strikeHandKey(Number(k.dataset.note));
    k.setAttribute('role', 'button');
    k.setAttribute('tabindex', '0');
    k.setAttribute('aria-label', k.textContent.trim() + ', strum the held chord');
    k.addEventListener('click', play);
    k.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
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
    // while a value target is armed, the encoder the firmware reads picks the
    // value it stamps: ENC7 for FX / TYPE / EMB, ENC6 for the RATCHET count
    const tg = stepEdit && targetAllowed(editTarget, t) ? editTarget : 0;
    if (tg === 5 && i === 6) { fxArm = 1 + (((fxArm - 1 + steps) % 7) + 7) % 7; paint(); return; }
    if (tg === 6 && i === 6) { typeArm = 1 + (((typeArm - 1 + steps) % 3) + 3) % 3; paint(); return; }
    if (tg === 8 && i === 5) { ratArm = 2 + (((ratArm - 2 + steps) % 3) + 3) % 3; paint(); return; }
    const rk = rowKey();
    if (rk) {
      const sp = (ROW_SPECS[rk] || [])[i];
      if (!sp || sp.dash || sp.ro || !sp.set) return;
      const wasFollow = t.row.follow;
      const wasInch = t.row.inch;
      sp.set(t, clamp(sp.get(t) + steps, sp.min, sp.max));
      // a new mode or a new feeder re-captures a FREEZE latch
      if (rk === 'seq3' && (t.row.follow !== wasFollow || t.row.inch !== wasInch)) syncFollow();
      updateScreen();
      refreshKnobs();
      if (retimeWalk) retimeWalk();       // LEN/SPEED/BPM move the clock itself
      if (rk === 'key4') { generateProgression(); paint(); }   // the row is live
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
        // every knob on the drum page rebuilds the pattern live
        if (pageOf(t) === 'drum') { drumProduce(current); paint(); }
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
      nudge(i, mode === 'enc' ? 2 : 1);
    });
    k.addEventListener('wheel', e => {
      e.preventDefault();
      nudge(i, e.deltaY < 0 ? 1 : -1);
    }, { passive: false });
    k.addEventListener('keydown', e => {
      const dir = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1
        : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault(); nudge(i, dir);
    });
    k.addEventListener('pointerdown', e => {
      drag = { y: e.clientY, cc: encVals[i], acc: 0 }; moved = false;
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
        // the window moves with the playhead, so resolve the step on click
        const at = winOf(TRACKS[current]) + c;
        // with an attribute armed the pads edit that flag instead of the note
        if (mode === 'seq' && stepEdit && editTarget &&
            targetAllowed(editTarget, TRACKS[current])) {
          stampAt(current, voice, at, editTarget);
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
        : shown ? TARGETS[editTarget].name
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
    const bit = editing && TARGETS[editTarget].bit ? TARGETS[editTarget].bit : 0;
    host.dataset.edit = editing ? '1' : '0';
    const win = winOf(t);
    const len = lenOf(t);
    const pos = curPos();
    const holding = curHolding();
    host.dataset.hold = holding ? '1' : '0';
    cells.forEach((b, c) => {
      const n = win + c;
      const on = state[current][voice][n];
      b.dataset.on = on ? '1' : '0';
      b.setAttribute('aria-pressed', String(on));
      const ev = n === pos ? voiceEvent() : null;
      b.classList.toggle('is-hit', !!ev && ev.strike);
      b.classList.toggle('is-sustain', !!ev && ev.held);
      b.dataset.play = ev ? (ev.strike ? 'strike' : ev.held ? 'tie' : 'rest') : '';
      b.dataset.glide = ev && ev.glide ? '1' : '0';
      if (ev && (ev.strike || ev.held)) b.dataset.vel = String(ev.vel);
      else delete b.dataset.vel;
      if (ev && ev.strike) b.style.setProperty('--hit-vel', (ev.vel / 127).toFixed(3));
      else b.style.removeProperty('--hit-vel');
      // past the loop length the pad still holds its step, it just isn't played
      b.classList.toggle('is-out', n >= len);
      const val = bit ? 0 : valAt(current, voice, n, editing ? editTarget : 0);
      const has = bit !== 0 ? (attrs[current][voice][n] & bit) !== 0 : val > 0;
      b.dataset.attr = has ? '1' : '0';
      const chord = current === 1 ? chordName(1, n) : '';
      const notes = current === 1 ? chordNotes(1, n) : [];
      const say = [];
      if (notes.length) say.push(notes.join(' '));
      if (ev && ev.notes) say.push((ev.strumGap ? 'strum ' : 'hand ') +
        ev.notes.map(n => n.at).join('·') + ' ms');
      if (ev && ev.buffered) say.push('HAND buffered - play the white keys');
      if (ev && (ev.strike || ev.held)) say.push('vel ' + ev.vel);
      if (ev && ev.strike) say.push(Math.round(ev.lenMs) + ' ms');
      if (ev && ev.strike && ev.hits > 1) say.push('×' + ev.hits + ' ratchet');
      if (ev && ev.glide) say.push('glide');
      if (ev && ev.held) say.push('tied');
      // what the step carries of the value targets, named in the firmware's terms
      const rat = ratOf[current][voice][n];
      if (rat) say.push('ratchet ×' + rat);
      const fxV = fxOf[current][voice][n];
      if (fxV) say.push('FX ' + TARGETS[5].vals[fxV]);
      const typeV = typeOf[current][voice][n];
      if (typeV) say.push('TYPE ' + TARGETS[6].vals[typeV]);
      b.title = say.join(' · ');
      b.setAttribute('aria-label', v.name + ' step ' + (n + 1) +
        (chord ? ' · ' + chord : '') +
        (notes.length ? ' (' + notes.join(' ') + ')' : '') +
        (editing ? ' ' + TARGETS[editTarget].name +
          (armNameOf(editTarget) ? ' ' + armNameOf(editTarget) : '') +
          (has ? ' on' : ' off')
          : on ? ' on' : ' off'));
    });
    markTargets(t);
    // every track is playing, so its tab lights while it sounds
    TRACKS.forEach((tab_t, i) => {
      const tab = tabs[i];
      if (!tab) return;
      tab.classList.toggle('is-hit', trackStrikes(i));
      // the tab names its feeder only while FOLLOW is running
      const small = tab.querySelector('small');
      if (small) small.textContent = tab_t.type + (followOn(tab_t) ? ' ← CH ' + tab_t.row.inch : '');
      tab.setAttribute('aria-label', 'Channel ' + tab_t.ch + ' — ' + tab_t.type + ' track' +
        (followOn(tab_t) ? ', following CH ' + tab_t.row.inch : ''));
    });
    counter.textContent = String(pos + 1).padStart(2, '0') + ' / ' +
      String(len).padStart(2, '0');
    if (speedOut) speedOut.textContent = SPEEDS[clamp(t.row.speed, 0, SPEEDS.length - 1)];
    const label = 'CH ' + t.ch + ' · ' + t.type + ' · ' + v.name +
      (followOn(t) ? ' ← CH ' + t.row.inch : '');      // the arrow is a running claim
    // the pitches, not just the degree: CH 2 names the chord it is sounding,
    // and a follower names what it is holding
    let extra = current === 1 ? chordLine() : '';
    if (current === 1) {
      const sound = chordNotes(1, pos);
      if (sound.length) extra += ' · ' + sound.join(' ');
    }
    if (holding) {
      const held = heldOf[current];
      extra += ' · ' + (followFrozen(t) ? 'FREEZE' : 'HOLD') +
        (held && held.notes.length ? ' ' + held.notes.join(' ') : '');
    }
    trackLabel.textContent = label + extra;
    updateScreen();
    refreshKnobs();
  }


  // KEY page: SCALE and KEY are the keys' ENC2/ENC3 on the panel, and every
  // channel keeps its own pair — step them with a click, the wheel or arrows
  const stepSetting = (el, key, list) => {
    if (!el) return;
    const turn = dir => {
      const t = TRACKS[current];
      t[key] = (t[key] + dir + list.length) % list.length;
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
  // M3 is the firmware's generate: on a DRUM track it re-rolls the pattern's
  // ghosts, accents and bar-end fill, everywhere else it re-rolls CH 2's chords
  const genPad = document.getElementById('genPad');
  if (genPad) {
    genPad.addEventListener('click', () => {
      if (TRACKS[current].type === 'DRUM') drumProduce(current, true);
      else generateProgression(true);
      paint();
    });
  }
  generateProgression();
  drumProduce(0);          // the page's knobs and CH 1's line agree from the off
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

  // The transport runs for everyone: a reduced-motion preference drops the
  // transitions and the glows in CSS, but a frozen sequencer is missing the
  // point of the card, so the clock is not behind that guard
  let timer = null;
  // Every track runs its own clock: its own SPEED, its own SWING and its own
  // LEN, all over the one BPM — which is what the four lines on the device do
  // at once.  A follower has no clock of its own: it steps when its feeder
  // sounds, so the feeder keeps running through the freeze.
  const stepMsOf = i => {
    const t = TRACKS[i];
    const den = SPEED_DEN[clamp(t.row.speed, 0, SPEED_DEN.length - 1)];
    return Math.max(30, Math.round((60000 / clock.bpm) * (4 / den)));
  };
  // SeqSwingStyle's ratio scaled by AMT: 50 is straight, so a groove's own
  // depth only reaches playback as far as AMT lets it
  const swingOf = i => {
    const p = TRACKS[i].row;
    const depth = SWING_DEPTH[clamp(p.swing, 0, SWING_DEPTH.length - 1)];
    return 50 + (depth - 50) * (clamp(p.amt, 0, 100) / 100);
  };
  // how long the step this track stands on holds: an even step hands over
  // late to its off-beat partner by the ratio, and the partner hands back early
  const durOf = (i, pos) => {
    const base = stepMsOf(i);
    const ratio = swingOf(i);
    if (ratio <= 50.001) return base;
    const pair = base * 2;
    return pos % 2 === 0 ? (pair * ratio) / 100 : (pair * (100 - ratio)) / 100;
  };

  const nextAt = TRACKS.map(() => 0);
  // who is driven by whom: -1 runs its own clock, otherwise the feeder's index
  const feeders = () => TRACKS.map((t, i) => (followOn(t) ? feederIdxOf(i) : -1));
  // the event each voice of a track resolves to at the step it stands on
  const resolve = (i, d) => {
    eventOf[i] = voicesOf(TRACKS[i]).map((_, vi) => playEvent(i, vi, posOf[i], d));
  };

  const tickAll = () => {
    const now = performance.now();
    const feeder = feeders();
    const moved = TRACKS.map((t, i) => {
      if (feeder[i] >= 0 || now < nextAt[i]) return false;   // a follower waits
      posOf[i] = (posOf[i] + 1) % lenOf(t);
      const d = durOf(i, posOf[i]);
      nextAt[i] += d;
      // a stall (an idle tab, a busy frame) skips the gap rather than firing a
      // burst of steps to catch up: the grid holds, the missed steps don't
      if (nextAt[i] <= now) nextAt[i] = now + d;
      resolve(i, d);
      return true;
    });
    // a follower steps on its feeder's hits and latches the chord it heard
    TRACKS.forEach((t, i) => {
      if (!moved[i] || !trackStrikes(i)) return;
      const s = posOf[i];
      TRACKS.forEach((f, j) => {
        if (feeder[j] !== i) return;
        posOf[j] = (posOf[j] + 1) % lenOf(f);
        // FREEZE keeps the chord it latched; ON takes each one live, and a
        // frozen follower with nothing latched catches the first one it hears
        if (!followFrozen(f)) heldOf[j] = { degree: chordsOf[i][s], notes: chordNotes(i, s) };
        else if (!heldOf[j]) heldOf[j] = { degree: chordsOf[i][s], notes: chordNotes(i, s) };
        resolve(j, durOf(j, posOf[j]));
        moved[j] = true;
      });
    });
    if (moved.some(Boolean)) paint();
  };

  const startWalk = () => {
    const now = performance.now();
    TRACKS.forEach((t, i) => {
      const d = durOf(i, posOf[i]);
      nextAt[i] = now + d;
      resolve(i, d);
    });
    timer = setInterval(tickAll, 15);
  };
  // a SPEED, BPM or SWING change lands on the next step, not the bar after
  retimeWalk = () => {
    if (!timer) return;
    const now = performance.now();
    const feeder = feeders();
    TRACKS.forEach((t, i) => {
      if (feeder[i] >= 0) return;
      nextAt[i] = Math.min(nextAt[i], now + durOf(i, posOf[i]));
    });
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !timer) startWalk();
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    });
  }, { threshold: 0.15 });
  io.observe(card || document.body);
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

  // The panel keeps one key (C) and takes the mode from the genre's own tonic
  // case, so a degree becomes pitches the same way the card's engine does it.
  // A flat degree is a semitone down in a major key; the minor modes already
  // hold the flats the table spells (bIII, bVI, bVII).
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const MAJOR = [0, 2, 4, 5, 7, 9, 11];
  const MINOR = [0, 2, 3, 5, 7, 8, 10];
  const ROMAN = { I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6 };
  // a minor key and a flat degree are spelled with flats, a major key with sharps
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const pcName = (m, flats) =>
    (flats ? FLAT_NAMES : NOTE_NAMES)[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);

  // one chord symbol → its notes: the degree and its thirds, a semitone lower
  // for a flat degree in a major key (a minor key already holds bIII/bVI/bVII)
  function chordVoicing(sym, tones, isMajor) {
    const m = /^(b?)([ivIV]+)(7?)$/.exec(sym) || ['', '', 'I', ''];
    const flats = !isMajor || m[1] === 'b';
    const flat = m[1] === 'b' && isMajor;
    const d = ROMAN[m[2].toUpperCase()] === undefined ? 0 : ROMAN[m[2].toUpperCase()];
    const ext = m[3] === '7' ? [0, 2, 4, 6] : [0, 2, 4];
    return ext.map(o => {
      const n = tones.length;
      const i = ((d + o) % n + n) % n;
      const semi = tones[i] + 12 * Math.floor((d + o) / n) - (flat ? 1 : 0);
      return pcName(60 + semi, flats);
    });
  }

  function paint() {
    const genre = GENRES[g];
    // a tonic in lower case means the genre is minor, so its table's b-degrees
    // are already the flat ones the scale holds
    const isMajor = !/^i7?$/.test(genre.chords[0]);
    const tones = isMajor ? MAJOR : MINOR;
    items.forEach((btn, i) => {
      const sym = genre.chords[i];
      const notes = chordVoicing(sym, tones, isMajor);
      btn.innerHTML = '<b></b><small></small>';
      btn.querySelector('b').textContent = sym;
      btn.querySelector('small').textContent = notes.join(' ');
      btn.setAttribute('aria-label', 'Accept chord ' + sym + ', ' + notes.join(' '));
      btn.classList.toggle('is-on', i === accepted);
      btn.setAttribute('aria-pressed', String(i === accepted));
    });
    document.getElementById('progGenre').textContent = genre.name;
    document.getElementById('progCad').textContent = genre.cad;
    const scale = document.getElementById('progScale');
    if (scale) scale.textContent = isMajor ? 'C MAJOR' : 'C MINOR';
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
