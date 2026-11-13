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
  let mode = 'seq';

  // CH 1 is one DRUM track: the kit voices each keep their own 16-step line.
  // CH 2 POLY, CH 3 POLY SKANK following CH 2's progression, CH 4 MONO bass.
  const TRACKS = [
    { ch: 1, type: 'DRUM', color: 'var(--led-red)', voices: [
      { name: 'KICK',  color: 'var(--led-red)',    pattern: 'x...x...x...x..x' },
      { name: 'SNARE', color: 'var(--led-white)',  pattern: '....x.......x...' },
      { name: 'HAT',   color: 'var(--led-cyan)',   pattern: '..x...x...x...xx' },
      { name: 'PERC',  color: 'var(--led-violet)', pattern: '.....x..x..x....' }
    ] },
    { ch: 2, type: 'POLY', name: 'CHORDS', color: 'var(--led-blue)',  pattern: 'x.......x...x...' },
    { ch: 3, type: 'POLY', name: 'SKANK',  color: 'var(--led-green)', follow: 'CH 2', pattern: '..x.x..x..x.x..x' },
    { ch: 4, type: 'MONO', name: 'BASS',   color: 'var(--led-teal)',  pattern: 'x..x..x...x.x...' }
  ];

  const voicesOf = t => t.voices || [{ name: t.name, color: t.color, pattern: t.pattern }];
  const state = TRACKS.map(t => voicesOf(t).map(v => v.pattern.split('').map(c => c === 'x')));
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
    if (gridCard) gridCard.dataset.mode = m;
    // the display shows the page that belongs to the mode: dials in ENC
    if (seqScreen && encScreen) {
      const isEnc = m === 'enc';
      encScreen.hidden = !isEnc;
      seqScreen.hidden = isEnc;
    }
    host.style.setProperty('--pad', lineColor());
    modePads.forEach(b => {
      const on = b.dataset.mode === m;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  modePads.forEach(b => {
    b.addEventListener('click', () => { pinned = true; applyMode(b.dataset.mode); });
  });

  function buildLine() {
    const t = TRACKS[current];
    const v = voicesOf(t)[voice];
    host.innerHTML = '';
    host.style.setProperty('--pad', lineColor());
    host.setAttribute('aria-label', v.name + ' 16 steps');
    cells = [];
    for (let c = 0; c < 16; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'stepgrid__cell' + (c % 4 === 0 ? ' is-beat' : '');
      b.setAttribute('aria-label', v.name + ' step ' + (c + 1));
      b.addEventListener('click', () => {
        pinned = true;
        state[current][voice][c] = !state[current][voice][c];
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
    renderVoices();
    buildLine();
    tabs.forEach((b, n) => {
      b.dataset.on = n === i ? '1' : '0';
      b.setAttribute('aria-selected', String(n === i));
    });
    markVoice();
    paint();
  }

  function paint() {
    const t = TRACKS[current];
    const v = voicesOf(t)[voice];
    cells.forEach((b, c) => {
      b.dataset.on = state[current][voice][c] ? '1' : '0';
      b.setAttribute('aria-pressed', String(state[current][voice][c]));
      b.classList.toggle('is-hit', state[current][voice][c] && c === step);
    });
    counter.textContent = String(step + 1).padStart(2, '0') + ' / 16';
    const label = 'CH ' + t.ch + ' · ' + t.type + ' · ' + v.name +
      (t.follow ? ' ← ' + t.follow : '');
    trackLabel.textContent = label;
  }

  // the panel walks the tracks; CH 1 stops on each kit voice on the way
  function nextTrack() {
    const list = voicesOf(TRACKS[current]);
    if (voice + 1 < list.length) selectVoice(voice + 1);
    else selectTrack((current + 1) % TRACKS.length, 0);
  }

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
    const tick = () => {
      step = (step + 1) % 16;
      // the line follows the track, the way the panel does
      if (step === 0 && !pinned) nextTrack();
      paint();
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !timer) timer = setInterval(tick, 140);
        else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
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
