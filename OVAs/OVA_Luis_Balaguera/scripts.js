// ═══════════════════════════════════════════════════════════════
//  OVA · Tipos de Sistemas · TGS  —  scripts.js
// ═══════════════════════════════════════════════════════════════

// ── EJERCICIOS CON RETROALIMENTACIÓN ────────────────────────────
const exAnswers = {
  1: {
    ans: 'b',
    fb_ok: '✅ ¡Correcto! El termostato es un sistema dinámico de control: usa retroalimentación negativa para comparar el estado actual con el deseado (set-point) y actuar en consecuencia. Este es el principio de los bucles de control en ingeniería (PID controllers).',
    fb_bad: '❌ Incorrecto. El termostato cambia su estado (encendido/apagado) en función del tiempo y la temperatura medida. Eso lo hace dinámico. La retroalimentación negativa busca reducir el error entre el estado real y el deseado.'
  },
  2: {
    ans: 'c',
    fb_ok: '✅ ¡Exacto! Un sistema determinista permite calcular el estado futuro con precisión absoluta a partir del estado inicial. Newton demostró esto para el sistema solar: las posiciones de los planetas se calculan para años o siglos con márgenes de error muy pequeños.',
    fb_bad: '❌ Incorrecto. En un sistema determinista, las leyes físicas exactas (segunda ley de Newton, gravitación universal) permiten predecir el estado futuro con precisión, sin recurrir a probabilidades ni estimaciones estadísticas.'
  },
  3: {
    ans: 'a',
    fb_ok: '✅ ¡Correcto! Bertalanffy distingue: los sistemas abiertos intercambian materia, energía e información con el entorno (como los organismos vivos), mientras que los cerrados son modelos teóricos que no intercambian materia. La 2.ª Ley de Termodinámica aplica estrictamente a sistemas aislados.',
    fb_bad: '❌ Incorrecto. La diferencia esencial es el intercambio con el entorno. Sistemas abiertos: intercambian materia + energía + información. Cerrados: no intercambian materia (modelo teórico). Esto es fundamental en termodinámica y biología según Bertalanffy (1968).'
  }
};

function checkEx(n, chosen) {
  const container = document.getElementById('ex' + n);
  const opts = container.querySelectorAll('.opt');
  const fb = document.getElementById('fb' + n);
  const correct = exAnswers[n].ans;
  opts.forEach(o => o.classList.add('disabled'));
  const letters = ['a', 'b', 'c', 'd'];
  opts.forEach((o, i) => {
    if (letters[i] === correct) o.classList.add('correct');
    else if (letters[i] === chosen) o.classList.add('wrong');
  });
  if (chosen === correct) {
    fb.className = 'feedback show ok';
    fb.textContent = exAnswers[n].fb_ok;
  } else {
    fb.className = 'feedback show bad';
    fb.textContent = exAnswers[n].fb_bad;
  }
}


// ═══════════════════════════════════════════════════════════════
//  JUEGO 1 · CRUCIGRAMA INTERACTIVO
// ═══════════════════════════════════════════════════════════════
/*
  Grid 9×9. Palabras:
  DINAMICO   → fila 0, col 0, horizontal  (8 letras)
  ESTATICO   → fila 2, col 0, horizontal  (8 letras)
  ADAPTATIVO → col 4, fila 0, vertical    (10 letras) — columnas 0-9
  ABIERTO    → fila 4, col 0, horizontal  (7 letras)
  CERRADO    → fila 6, col 0, horizontal  (7 letras)
  ENTROPIA   → col 7, fila 0, vertical    (8 letras)
  EMERGENCIA → fila 8, col 0, horizontal  (9 letras)

  GRID 10 filas × 9 cols
  Coordenadas (fila, col):
  DINAMICO:   f0 c0-c7  H
  ADAPTATIVO: f0-f9 c4  V
  ESTATICO:   f2 c0-c7  H
  ABIERTO:    f4 c1-c7  H
  CERRADO:    f6 c1-c7  H
  ENTROPIA:   f0-f7 c8  V  — but col 8 exists only if grid is 9 cols wide
  EMERGENCIA: f9 c0-c8  H

  Let's simplify to a clean 10×9 layout:
*/

const CW_ROWS = 10, CW_COLS = 9;

// letter[row][col]
const cwWords = [
  // word, startRow, startCol, direction, clue, number
  { w: 'DINAMICO',   r: 0, c: 0, d: 'H', n: 1, clue: 'Tipo de sistema cuyas variables cambian en el tiempo.' },
  { w: 'ADAPTATIVO', r: 0, c: 4, d: 'V', n: 2, clue: 'Sistema que modifica sus parámetros para sobrevivir.' },
  { w: 'ESTATICO',   r: 2, c: 0, d: 'H', n: 3, clue: 'Sus variables NO cambian con el tiempo.' },
  { w: 'ABIERTO',    r: 4, c: 1, d: 'H', n: 4, clue: 'Intercambia materia, energía e información con el entorno.' },
  { w: 'CERRADO',    r: 6, c: 1, d: 'H', n: 5, clue: 'No intercambia materia con el exterior (modelo teórico).' },
  { w: 'ENTROPIA',   r: 0, c: 8, d: 'V', n: 6, clue: 'Medida del desorden; crece en sistemas aislados.' },
  { w: 'EMERGENCIA', r: 9, c: 0, d: 'H', n: 7, clue: 'Propiedad: el todo es más que la suma de sus partes.' },
];

// Build solution grid
const cwSolution = Array.from({ length: CW_ROWS }, () => Array(CW_COLS).fill(null));
const cwNumbers  = Array.from({ length: CW_ROWS }, () => Array(CW_COLS).fill(null));

cwWords.forEach(({ w, r, c, d, n }) => {
  for (let i = 0; i < w.length; i++) {
    const row = d === 'H' ? r : r + i;
    const col = d === 'H' ? c + i : c;
    cwSolution[row][col] = w[i];
    if (i === 0) cwNumbers[row][col] = n;
  }
});

function buildCrossword() {
  const grid = document.getElementById('cwGrid');
  grid.style.gridTemplateColumns = `repeat(${CW_COLS}, 36px)`;
  grid.innerHTML = '';
  for (let r = 0; r < CW_ROWS; r++) {
    for (let c = 0; c < CW_COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cw-cell';
      cell.dataset.r = r; cell.dataset.c = c;
      if (cwSolution[r][c] === null) {
        cell.classList.add('black');
      } else {
        if (cwNumbers[r][c]) {
          const num = document.createElement('span');
          num.className = 'cw-num';
          num.textContent = cwNumbers[r][c];
          cell.appendChild(num);
        }
        const inp = document.createElement('input');
        inp.maxLength = 1;
        inp.setAttribute('autocomplete', 'off');
        inp.addEventListener('input', e => {
          e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
          moveFocusCW(r, c);
        });
        inp.addEventListener('keydown', e => {
          if (e.key === 'Backspace' && !inp.value) moveFocusCWBack(r, c);
        });
        inp.addEventListener('focus', () => highlightCWWord(r, c));
        cell.appendChild(inp);
      }
      grid.appendChild(cell);
    }
  }
}

function getCWCell(r, c) {
  return document.querySelector(`#cwGrid .cw-cell[data-r="${r}"][data-c="${c}"]`);
}

function moveFocusCW(r, c) {
  // try horizontal first, then vertical
  const right = getCWCell(r, c + 1);
  if (right && !right.classList.contains('black') && right.querySelector('input')) {
    right.querySelector('input').focus(); return;
  }
  const down = getCWCell(r + 1, c);
  if (down && !down.classList.contains('black') && down.querySelector('input')) {
    down.querySelector('input').focus();
  }
}

function moveFocusCWBack(r, c) {
  const left = getCWCell(r, c - 1);
  if (left && left.querySelector('input')) { left.querySelector('input').focus(); return; }
  const up = getCWCell(r - 1, c);
  if (up && up.querySelector('input')) up.querySelector('input').focus();
}

function highlightCWWord(r, c) {
  document.querySelectorAll('#cwGrid .cw-cell').forEach(el => el.style.background = '');
  // find which words pass through this cell
  cwWords.forEach(({ w, r: wr, c: wc, d, n }) => {
    let inWord = false;
    for (let i = 0; i < w.length; i++) {
      const row = d === 'H' ? wr : wr + i;
      const col = d === 'H' ? wc + i : wc;
      if (row === r && col === c) inWord = true;
    }
    if (inWord) {
      document.querySelectorAll(`.cw-clue[data-n="${n}"]`).forEach(el => {
        document.querySelectorAll('.cw-clue').forEach(x => x.classList.remove('active-clue'));
        el.classList.add('active-clue');
      });
      for (let i = 0; i < w.length; i++) {
        const row = d === 'H' ? wr : wr + i;
        const col = d === 'H' ? wc + i : wc;
        const cell = getCWCell(row, col);
        if (cell) cell.style.background = 'rgba(0,119,255,.18)';
      }
    }
  });
}

function checkCrossword() {
  let correct = 0, total = 0;
  for (let r = 0; r < CW_ROWS; r++) {
    for (let c = 0; c < CW_COLS; c++) {
      if (cwSolution[r][c] !== null) {
        total++;
        const cell = getCWCell(r, c);
        const inp = cell.querySelector('input');
        cell.classList.remove('correct-cell', 'wrong-cell');
        if (inp.value === cwSolution[r][c]) {
          cell.classList.add('correct-cell'); correct++;
        } else if (inp.value) {
          cell.classList.add('wrong-cell');
        }
      }
    }
  }
  document.getElementById('cwScore').textContent =
    `Letras correctas: ${correct} / ${total}${correct === total ? ' 🎉 ¡Crucigrama completo!' : ''}`;
}

function solveCrossword() {
  for (let r = 0; r < CW_ROWS; r++) {
    for (let c = 0; c < CW_COLS; c++) {
      if (cwSolution[r][c] !== null) {
        const cell = getCWCell(r, c);
        const inp = cell.querySelector('input');
        inp.value = cwSolution[r][c];
        cell.classList.add('correct-cell');
        cell.classList.remove('wrong-cell');
      }
    }
  }
  document.getElementById('cwScore').textContent = '✅ Solución mostrada.';
}

function resetCrossword() {
  document.querySelectorAll('#cwGrid .cw-cell').forEach(cell => {
    const inp = cell.querySelector('input');
    if (inp) { inp.value = ''; }
    cell.classList.remove('correct-cell', 'wrong-cell');
    cell.style.background = '';
  });
  document.getElementById('cwScore').textContent = '';
}


// ═══════════════════════════════════════════════════════════════
//  JUEGO 2 · UNE CON LÍNEAS (MATCH)
// ═══════════════════════════════════════════════════════════════

const matchPairs = [
  { id: 1, left: '⚡ Sistema Dinámico',    right: 'Sus variables de estado cambian con el tiempo.' },
  { id: 2, left: '🏛️ Sistema Estático',    right: 'Relación entrada-salida constante; dx/dt = 0.' },
  { id: 3, left: '🔄 Sistema Adaptativo',  right: 'Modifica su estructura ante cambios del entorno.' },
  { id: 4, left: '🌐 Sistema Abierto',     right: 'Intercambia materia, energía e información.' },
  { id: 5, left: '🔒 Sistema Cerrado',     right: 'No intercambia materia; entropía solo aumenta.' },
  { id: 6, left: '🎯 Sistema Determinista',right: 'El futuro puede calcularse con exactitud.' },
];

let matchSelected = null;
let matchDone = 0;

function buildMatch() {
  matchSelected = null;
  matchDone = 0;
  document.getElementById('match-result').textContent = '';

  const leftCol  = document.getElementById('matchLeft');
  const rightCol = document.getElementById('matchRight');
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  // Shuffle right side
  const rightShuffled = [...matchPairs].sort(() => Math.random() - .5);

  matchPairs.forEach(p => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.textContent = p.left;
    el.dataset.id = p.id;
    el.dataset.side = 'left';
    el.addEventListener('click', () => onMatchClick(el));
    leftCol.appendChild(el);
  });

  rightShuffled.forEach(p => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.textContent = p.right;
    el.dataset.id = p.id;
    el.dataset.side = 'right';
    el.addEventListener('click', () => onMatchClick(el));
    rightCol.appendChild(el);
  });

  // Clear SVG lines
  const svg = document.getElementById('match-svg-layer');
  svg.innerHTML = '';
}

function onMatchClick(el) {
  if (el.classList.contains('matched')) return;

  if (!matchSelected) {
    // First click
    document.querySelectorAll('.match-item.selected').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    matchSelected = el;
    return;
  }

  if (matchSelected === el) {
    el.classList.remove('selected');
    matchSelected = null;
    return;
  }

  // Both from same side → switch
  if (matchSelected.dataset.side === el.dataset.side) {
    matchSelected.classList.remove('selected');
    el.classList.add('selected');
    matchSelected = el;
    return;
  }

  // Different sides → check match
  if (matchSelected.dataset.id === el.dataset.id) {
    // Correct!
    drawLine(matchSelected, el);
    matchSelected.classList.remove('selected');
    matchSelected.classList.add('matched');
    el.classList.add('matched');
    matchSelected = null;
    matchDone++;
    if (matchDone === matchPairs.length) {
      document.getElementById('match-result').textContent = `🎉 ¡Todas las conexiones son correctas! (${matchDone}/${matchPairs.length})`;
    } else {
      document.getElementById('match-result').textContent = `Pares conectados: ${matchDone} / ${matchPairs.length}`;
    }
  } else {
    // Wrong
    [matchSelected, el].forEach(e => {
      e.classList.remove('selected');
      e.classList.add('wrong-flash');
      setTimeout(() => e.classList.remove('wrong-flash'), 450);
    });
    matchSelected = null;
  }
}

function drawLine(el1, el2) {
  const svg = document.getElementById('match-svg-layer');
  const wrap = document.getElementById('matchWrap');
  const wRect = wrap.getBoundingClientRect();

  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();

  // Which is left/right?
  let leftEl = r1.left < r2.left ? el1 : el2;
  let rightEl = r1.left < r2.left ? el2 : el1;
  const lr = leftEl.getBoundingClientRect();
  const rr = rightEl.getBoundingClientRect();

  const x1 = lr.right - wRect.left;
  const y1 = lr.top + lr.height / 2 - wRect.top;
  const x2 = rr.left - wRect.left;
  const y2 = rr.top + rr.height / 2 - wRect.top;

  const colors = ['#00c9a7','#00e5ff','#0077ff','#00ff9d','#00ffc8','#7b61ff'];
  const color  = colors[matchDone % colors.length];

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const cx   = (x1 + x2) / 2;
  line.setAttribute('d', `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', '2.5');
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('opacity', '0.85');
  svg.appendChild(line);
}

function resetMatch() {
  buildMatch();
}


// ═══════════════════════════════════════════════════════════════
//  JUEGO 3 · AHORCADO TEMÁTICO
// ═══════════════════════════════════════════════════════════════

const hangmanWords = [
  { word: 'ADAPTATIVO',  hint: 'Tipo de sistema que cambia sus parámetros para sobrevivir en el entorno.' },
  { word: 'ENTROPIA',    hint: 'Medida del desorden de un sistema; aumenta en sistemas aislados.' },
  { word: 'EMERGENCIA',  hint: 'Propiedad donde el todo exhibe comportamientos que sus partes no tienen.' },
  { word: 'HOMEOSTASIS', hint: 'Capacidad de un sistema abierto de mantener su equilibrio interno.' },
  { word: 'RETROALIMENTACION', hint: 'Bucle donde la salida de un sistema regresa como entrada.' },
  { word: 'DETERMINISTICO', hint: 'Sistema cuyo estado futuro se puede calcular con exactitud.' },
  { word: 'NEGUENTROPIA', hint: 'Entropía negativa; propiedad de los sistemas que se organizan.' },
  { word: 'PROBABILISTICO', hint: 'Sistema cuyo futuro solo puede describirse con distribuciones.' },
  { word: 'SINERGIA',    hint: 'El resultado combinado es mayor que la suma de los resultados individuales.' },
  { word: 'BERTALANFFY', hint: 'Biólogo austríaco que formuló la Teoría General de Sistemas.' },
];

const HM_MAX = 7;
let hmWord = '', hmHint = '', hmGuessed = new Set(), hmErrors = 0, hmActive = false;

const hmParts = [
  // Each part is added as the errors increase
  // 0 = base, 1 = poste, 2 = brazo, 3 = cuerda, 4 = cabeza, 5 = cuerpo, 6 = brazos, 7 = piernas
];

function getHangmanSVG(errors) {
  const show = n => errors >= n ? '1' : '0';
  return `
  <svg width="160" height="200" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Base -->
    <line x1="10" y1="190" x2="150" y2="190" stroke="#0077ff" stroke-width="3" stroke-linecap="round" opacity="${show(0)}"/>
    <!-- Poste vertical -->
    <line x1="40" y1="190" x2="40" y2="20" stroke="#0077ff" stroke-width="3" stroke-linecap="round" opacity="${show(0)}"/>
    <!-- Brazo horizontal -->
    <line x1="40" y1="20" x2="110" y2="20" stroke="#0077ff" stroke-width="3" stroke-linecap="round" opacity="${show(0)}"/>
    <!-- Cuerda -->
    <line x1="110" y1="20" x2="110" y2="45" stroke="#00c9a7" stroke-width="2" opacity="${show(1)}"/>
    <!-- Cabeza -->
    <circle cx="110" cy="58" r="13" stroke="#00e5ff" stroke-width="2.5" fill="none" opacity="${show(2)}"/>
    <!-- Cuerpo -->
    <line x1="110" y1="71" x2="110" y2="120" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round" opacity="${show(3)}"/>
    <!-- Brazo izq -->
    <line x1="110" y1="80" x2="88" y2="105" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round" opacity="${show(4)}"/>
    <!-- Brazo der -->
    <line x1="110" y1="80" x2="132" y2="105" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round" opacity="${show(5)}"/>
    <!-- Pierna izq -->
    <line x1="110" y1="120" x2="88" y2="150" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round" opacity="${show(6)}"/>
    <!-- Pierna der -->
    <line x1="110" y1="120" x2="132" y2="150" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round" opacity="${show(7)}"/>
  </svg>`;
}

function startHangman() {
  const idx = Math.floor(Math.random() * hangmanWords.length);
  hmWord    = hangmanWords[idx].word;
  hmHint    = hangmanWords[idx].hint;
  hmGuessed = new Set();
  hmErrors  = 0;
  hmActive  = true;
  renderHangman();
  document.getElementById('hmStartBtn').style.display = 'none';
}

function renderHangman() {
  // SVG
  document.getElementById('hmSVG').innerHTML = getHangmanSVG(hmErrors);

  // Word display
  const wordDiv = document.getElementById('hmWord');
  wordDiv.innerHTML = '';
  for (const ch of hmWord) {
    const span = document.createElement('div');
    span.className = 'hw-letter';
    span.textContent = hmGuessed.has(ch) ? ch : '';
    wordDiv.appendChild(span);
  }

  // Hint
  document.getElementById('hmHint').textContent = `Pista: ${hmHint}`;
  document.getElementById('hmErrors').textContent = `Errores: ${hmErrors} / ${HM_MAX}`;

  // Keyboard
  const kb = document.getElementById('hmKeyboard');
  kb.innerHTML = '';
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'hkey';
    btn.textContent = ch;
    if (hmGuessed.has(ch)) {
      btn.classList.add(hmWord.includes(ch) ? 'used-correct' : 'used-wrong');
    }
    btn.addEventListener('click', () => guessHangman(ch));
    kb.appendChild(btn);
  });

  // Status
  const status = document.getElementById('hmStatus');
  const won = [...hmWord].every(c => hmGuessed.has(c));
  if (won) {
    status.textContent = '🎉 ¡Ganaste! La palabra era: ' + hmWord;
    status.className = 'hangman-status win';
    hmActive = false;
    document.getElementById('hmStartBtn').style.display = 'inline-block';
    document.getElementById('hmStartBtn').textContent = '↺ Nueva palabra';
  } else if (hmErrors >= HM_MAX) {
    status.textContent = '💀 Perdiste. La palabra era: ' + hmWord;
    status.className = 'hangman-status lose';
    hmActive = false;
    // reveal word
    for (const span of document.getElementById('hmWord').children) {
      if (!span.textContent) span.style.color = '#ff4d6d';
    }
    [...hmWord].forEach((ch, i) => {
      document.getElementById('hmWord').children[i].textContent = ch;
    });
    document.getElementById('hmStartBtn').style.display = 'inline-block';
    document.getElementById('hmStartBtn').textContent = '↺ Nueva palabra';
  } else {
    status.textContent = '';
    status.className = 'hangman-status';
  }
}

function guessHangman(ch) {
  if (!hmActive || hmGuessed.has(ch)) return;
  hmGuessed.add(ch);
  if (!hmWord.includes(ch)) hmErrors++;
  renderHangman();
}


// ═══════════════════════════════════════════════════════════════
//  QUIZ FINAL
// ═══════════════════════════════════════════════════════════════

const quizData = [
  { q: '¿Cuál fue el principal autor que formuló la Teoría General de Sistemas?', opts: ['Norbert Wiener', 'Ludwig von Bertalanffy', 'W. Ross Ashby', 'Jay Forrester'], ans: 1 },
  { q: 'Un sistema cuyo estado futuro solo puede describirse mediante distribuciones de probabilidad se llama:', opts: ['Determinista', 'Estático', 'Probabilístico', 'Adaptativo'], ans: 2 },
  { q: 'La propiedad de los sistemas complejos donde el comportamiento global no puede deducirse de las partes se llama:', opts: ['Retroalimentación', 'Entropía', 'Emergencia', 'Homeostasis'], ans: 2 },
  { q: '¿Qué tipo de sistema intercambia materia, energía e información con su entorno?', opts: ['Cerrado', 'Aislado', 'Abierto', 'Estático'], ans: 2 },
  { q: 'Un sistema que modifica su estructura interna para mantener su desempeño ante cambios del entorno es:', opts: ['Estático', 'Adaptativo', 'Cerrado', 'Determinista'], ans: 1 },
  { q: 'Las ecuaciones diferenciales son la herramienta matemática principal para modelar sistemas:', opts: ['Estáticos', 'Cerrados', 'Dinámicos', 'Probabilísticos'], ans: 2 },
  { q: 'El concepto de "negentropía" está asociado principalmente a sistemas:', opts: ['Cerrados', 'Deterministas', 'Abiertos', 'Estáticos'], ans: 2 },
  { q: '¿Cuál de estos es un ejemplo de sistema determinista?', opts: ['Mercado de acciones', 'Órbita de un satélite (mecánica newtoniana)', 'Colonia de hormigas', 'Epidemia viral'], ans: 1 },
  { q: 'El libro "An Introduction to Cybernetics" (1956), relevante para sistemas adaptativos, fue escrito por:', opts: ['Ludwig von Bertalanffy', 'Jay Forrester', 'W. Ross Ashby', 'John Holland'], ans: 2 },
  { q: 'Un puente bajo cargas estáticas constantes es un ejemplo de sistema:', opts: ['Dinámico', 'Adaptativo', 'Complejo', 'Estático'], ans: 3 },
];

let qCurrent = 0, qScore = 0, qAnswered = false;

function initQuiz() {
  const q = quizData[qCurrent];
  document.getElementById('qnum').textContent = `Pregunta ${qCurrent + 1} de ${quizData.length}`;
  document.getElementById('qbar').style.width = ((qCurrent + 1) / quizData.length * 100) + '%';
  document.getElementById('qtext').textContent = q.q;
  const opts = document.getElementById('qopts');
  opts.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.opts.forEach((o, i) => {
    const el = document.createElement('div');
    el.className = 'quiz-opt';
    el.innerHTML = `<span class="opt-letter">${letters[i]}</span>${o}`;
    el.onclick = () => selectQ(i, el);
    opts.appendChild(el);
  });
  document.getElementById('qnext').style.display = 'none';
  qAnswered = false;
}

function selectQ(idx, el) {
  if (qAnswered) return;
  qAnswered = true;
  const q = quizData[qCurrent];
  document.querySelectorAll('.quiz-opt').forEach(o => o.classList.add('disabled'));
  document.querySelectorAll('.quiz-opt')[q.ans].classList.add('correct');
  if (idx === q.ans) qScore++;
  else el.classList.add('incorrect');
  document.getElementById('qnext').style.display = 'inline-block';
}

function nextQ() {
  qCurrent++;
  if (qCurrent >= quizData.length) { showQuizResult(); return; }
  initQuiz();
}

function showQuizResult() {
  document.getElementById('quiz-container').style.display = 'none';
  const res = document.getElementById('quiz-result');
  res.style.display = 'block';
  document.getElementById('qrscore').textContent = `${qScore}/10`;
  const pct = qScore / 10;
  document.getElementById('qrstars').textContent =
    pct >= .9 ? '⭐⭐⭐⭐⭐' : pct >= .7 ? '⭐⭐⭐⭐' : pct >= .5 ? '⭐⭐⭐' : '⭐⭐';
  document.getElementById('qrmsg').textContent =
    pct >= .9 ? '¡Excelente! Dominas a fondo los tipos de sistemas.' :
    pct >= .7 ? '¡Muy bien! Aprobado. Tienes sólidos conocimientos.' :
    pct >= .5 ? 'Aprendizaje en progreso. Repasa y vuelve a intentarlo.' :
    'Necesitas reforzar los conceptos. Revisa el material.';
  document.getElementById('qrdetail').textContent =
    `Respondiste correctamente ${qScore} de 10 preguntas.${qScore >= 7 ? ' ✅ APROBADO' : ' ❌ No aprobado — inténtalo de nuevo'}`;
}

function resetQuiz() {
  qCurrent = 0; qScore = 0; qAnswered = false;
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';
  initQuiz();
}


// ═══════════════════════════════════════════════════════════════
//  INIT  — run when DOM is ready
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildCrossword();
  buildMatch();
  renderHangman(); // show gallows empty
  initQuiz();
});
