/* ==========================================================
   WipidiM — QESSEQ 16 · site behaviour
   ========================================================== */

/* ----------------------------------------------------------
   ⚠️  EDIT THIS: the email address order requests go to.
   ---------------------------------------------------------- */
const CONFIG = {
  orderEmail: 'orders@wipidim.com',
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
   01 · STEP GRID  (16 tracks × 16 steps, live playhead)
   ========================================================== */
(function stepGrid() {
  const host = document.getElementById('stepRows');
  const counter = document.getElementById('stepCount');
  if (!host) return;

  const TRACKS = [
    { name: 'KICK',  color: 'var(--led-red)',    pattern: 'x...x...x...x..x' },
    { name: 'SNARE', color: 'var(--led-violet)', pattern: '....x.......x...' },
    { name: 'HAT',   color: 'var(--led-white)',  pattern: '..x...x...x...xx' },
    { name: 'BASS',  color: 'var(--led-blue)',   pattern: 'x..x..x...x.x...' },
    { name: 'CHORD', color: 'var(--led-green)',  pattern: 'x.......x...x...' },
    { name: 'LEAD',  color: 'var(--led-cyan)',   pattern: '..x.x....x.x..x.' }
  ];

  const state = TRACKS.map(t => t.pattern.split('').map(c => c === 'x'));
  const cells = [];

  TRACKS.forEach((t, r) => {
    const row = document.createElement('div');
    row.className = 'stepgrid__row';
    row.style.setProperty('--pad', t.color);

    const name = document.createElement('span');
    name.className = 'stepgrid__name';
    name.textContent = t.name;

    const grid = document.createElement('div');
    grid.className = 'stepgrid__cells';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', t.name + ' steps');

    cells[r] = [];
    for (let c = 0; c < 16; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'stepgrid__cell' + (c % 4 === 0 ? ' is-beat' : '');
      b.dataset.on = state[r][c] ? '1' : '0';
      b.setAttribute('aria-pressed', String(state[r][c]));
      b.setAttribute('aria-label', t.name + ' step ' + (c + 1));
      b.addEventListener('click', () => {
        state[r][c] = !state[r][c];
        b.dataset.on = state[r][c] ? '1' : '0';
        b.setAttribute('aria-pressed', String(state[r][c]));
      });
      grid.appendChild(b);
      cells[r][c] = b;
    }

    row.append(name, grid);
    host.appendChild(row);
  });

  let step = 0;
  function paint() {
    for (let r = 0; r < TRACKS.length; r++) {
      for (let c = 0; c < 16; c++) {
        cells[r][c].classList.toggle('is-hit', state[r][c] && c === step);
      }
    }
    counter.textContent = 'STEP ' + String(step + 1).padStart(2, '0') + ' / 16';
  }
  paint();

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
    const tick = () => { step = (step + 1) % 16; paint(); };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !timer) timer = setInterval(tick, 140);
        else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
      });
    }, { threshold: 0.15 });
    io.observe(document.getElementById('stepgrid'));
  }
})();

/* ==========================================================
   03 · ARPEGGIATOR  (nine walk orders over a spanned chord)
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
   04 · PROGRESSION ENGINE  (genre grammar → chord proposals)
   ========================================================== */
(function progressions() {
  const list = document.getElementById('progChords');
  if (!list) return;

  const GENRES = [
    { name: 'POP',       chords: ['I', 'V', 'vi', 'IV'],  cad: 'AUTHENTIC' },
    { name: 'ROCK',      chords: ['I', 'bVII', 'IV', 'I'], cad: 'PLAGAL' },
    { name: 'JAZZ',      chords: ['ii', 'V', 'I', 'vi'],  cad: 'AUTHENTIC' },
    { name: 'FUNK',      chords: ['I7', 'IV7', 'V7', 'I7'], cad: 'AUTHENTIC' },
    { name: 'REGGAE',    chords: ['I', 'IV', 'I', 'V'],   cad: 'PLAGAL' },
    { name: 'DUBTECHNO', chords: ['i', 'bVI', 'bIII', 'bVII'], cad: 'DECEPTIVE' },
    { name: 'BLUES',     chords: ['I7', 'IV7', 'I7', 'V7'], cad: 'HALF' },
    { name: 'MODAL',     chords: ['i7', 'i7', 'bVI7', 'bVII7'], cad: 'DECEPTIVE' },
    { name: 'HIPHOP',    chords: ['i', 'bVI', 'bVII', 'i'], cad: 'DECEPTIVE' },
    { name: 'LATIN',     chords: ['i', 'iv', 'V7', 'i'],   cad: 'AUTHENTIC' }
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
