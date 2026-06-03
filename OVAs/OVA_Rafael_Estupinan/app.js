// ================================================================
//  OVA · PARÁMETROS DE LOS SISTEMAS
//  app.js — Lógica completa
// ================================================================

/* ──────────────────────────────────────────────────────────
   1. NAVEGACIÓN PRINCIPAL
────────────────────────────────────────────────────────── */
function goTab(tabId, btn) {
    // Ocultar todas las secciones
    document.querySelectorAll('.tab').forEach(s => s.classList.remove('tab--active'));
    // Desactivar todos los botones de nav
    document.querySelectorAll('.nbtn').forEach(b => b.classList.remove('active'));
    // Mostrar sección target
    const target = document.getElementById(tabId);
    if (target) target.classList.add('tab--active');
    // Activar botón correcto
    if (btn) btn.classList.add('active');
    else {
        const matched = document.querySelector(`.nbtn[data-tab="${tabId}"]`);
        if (matched) matched.classList.add('active');
    }
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
    // Scroll top suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ──────────────────────────────────────────────────────────
   2. MENÚ MÓVIL
────────────────────────────────────────────────────────── */
function toggleMenu() {
    const burger = document.getElementById('burger');
    const links  = document.getElementById('navLinks');
    burger.classList.toggle('open');
    links.classList.toggle('open');
}
function closeMobileMenu() {
    document.getElementById('burger')?.classList.remove('open');
    document.getElementById('navLinks')?.classList.remove('open');
}

/* ──────────────────────────────────────────────────────────
   3. NAV SCROLL SHADOW
────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 10);
});

/* ──────────────────────────────────────────────────────────
   4. SUB-NAVEGACIÓN DE JUEGOS
────────────────────────────────────────────────────────── */
function switchGame(gameId, btn) {
    document.querySelectorAll('.gpane').forEach(p => p.classList.remove('gpane--active'));
    document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active-gtab'));
    document.getElementById(gameId)?.classList.add('gpane--active');
    if (btn) btn.classList.add('active-gtab');
}

/* ──────────────────────────────────────────────────────────
   5. UTILIDADES GLOBALES
────────────────────────────────────────────────────────── */
function scoreHtml(correctas, totales) {
    const nota = ((correctas / totales) * 5).toFixed(1);
    const cls  = nota >= 4 ? 'nota-alta' : nota >= 3 ? 'nota-media' : 'nota-baja';
    return `
        <div class="score-board">
            <div class="score-stat">Correctas: <span class="text-success">${correctas}</span> &nbsp;|&nbsp; Incorrectas: <span class="text-danger">${totales - correctas}</span></div>
            <div class="score-final ${cls}">Calificación: ${nota} / 5.0</div>
        </div>`;
}

function progressHtml(current, total) {
    const pct = Math.round((current / total) * 100);
    return `<p class="prog-label">Pregunta ${current + 1} de ${total}</p>
            <div class="prog-wrap"><div class="prog-fill" style="width:${pct}%"></div></div>`;
}

function showFb(el, msg, type) {
    if (!el) return;
    el.innerHTML = msg;
    el.className = `fb ${type}`;
}

/* ──────────────────────────────────────────────────────────
   6. JUEGO 1 — EL INTRUSO SISTÉMICO
────────────────────────────────────────────────────────── */
const INTRUSOS = [
    {
        context: "SISTEMA: Cuerpo humano sano que mantiene su temperatura en 36.5 °C ante un entorno cambiante.",
        options: [
            { text: "Mecanismo de sudoración corporal",                isIntruso: false },
            { text: "Alcanzar la entropía máxima (cese total de flujos)", isIntruso: true  },
            { text: "Vasodilatación periférica al sentir calor",        isIntruso: false },
            { text: "Temblores musculares involuntarios ante el frío",   isIntruso: false }
        ],
        explanation: "La entropía máxima implica el cese total de funciones: es la muerte del sistema, no un mecanismo de regulación homeostática."
    },
    {
        context: "SISTEMA: Startup tecnológica que estabiliza su flujo de caja tras perder clientes clave.",
        options: [
            { text: "Inyección de capital externo de emergencia",                isIntruso: false },
            { text: "Reducción estratégica de gastos operativos",                isIntruso: false },
            { text: "Equilibrio estático absoluto (paralización total)",          isIntruso: true  },
            { text: "Reestructuración comercial basada en retroalimentación",     isIntruso: false }
        ],
        explanation: "El equilibrio estático implica parálisis: los sistemas abiertos no pueden sobrevivir sin flujos activos de entrada y salida."
    },
    {
        context: "SISTEMA: Servidor web universitario que procesa peticiones de matrícula de forma fluida.",
        options: [
            { text: "Balanceador de carga distribuyendo peticiones",             isIntruso: false },
            { text: "Saturación descontrolada de memoria RAM",                   isIntruso: true  },
            { text: "Autoescalado dinámico en infraestructura nube",             isIntruso: false },
            { text: "Cola de espera optimizada para peticiones entrantes",        isIntruso: false }
        ],
        explanation: "La saturación de RAM introduce entropía: desestabiliza el flujo de procesamiento en lugar de regularlo."
    },
    {
        context: "SISTEMA: Ecosistema de un lago que mantiene su biodiversidad estable año tras año.",
        options: [
            { text: "Cadena trófica que regula las poblaciones de peces",        isIntruso: false },
            { text: "Ciclo de nutrientes entre organismos y sedimentos",          isIntruso: false },
            { text: "Vertimiento masivo de residuos tóxicos al lago",            isIntruso: true  },
            { text: "Fotosíntesis de algas que oxigena el agua",                 isIntruso: false }
        ],
        explanation: "El vertimiento tóxico es una entrada entrópica externa que rompe el equilibrio dinámico del ecosistema."
    },
    {
        context: "SISTEMA: Planta de manufactura automotriz con producción diaria constante pese a rotación de turnos.",
        options: [
            { text: "Protocolo de inducción rápida para nuevos operarios",       isIntruso: false },
            { text: "Manuales de proceso estandarizados por estación",           isIntruso: false },
            { text: "Suspensión indefinida de la línea de ensamblaje",           isIntruso: true  },
            { text: "Sistema Kanban que controla el inventario en tiempo real",   isIntruso: false }
        ],
        explanation: "La suspensión indefinida convierte el sistema en cerrado/estático, destruyendo el estado estacionario productivo."
    },
    {
        context: "SISTEMA: Red neuronal de IA que mejora continuamente su precisión con nuevos datos.",
        options: [
            { text: "Mecanismo de backpropagation que ajusta los pesos",         isIntruso: false },
            { text: "Congelamiento permanente de los parámetros del modelo",      isIntruso: true  },
            { text: "Ingesta continua de nuevos lotes de entrenamiento",          isIntruso: false },
            { text: "Función de pérdida que mide la desviación del modelo",       isIntruso: false }
        ],
        explanation: "Congelar los parámetros impide la retroalimentación adaptativa: el sistema deja de corregir errores y se vuelve entrópicamente obsoleto."
    }
];

let intrusoIdx = 0, intrusoScore = 0, intrusoSel = 0;

function loadIntruso() {
    const qtxt = document.getElementById('intruso-question-text');
    const grid = document.getElementById('intruso-grid');
    const btn  = document.getElementById('btn-next-intruso');
    const fb   = document.getElementById('intruso-feedback');
    if (!qtxt || !grid) return;

    grid.innerHTML = '';
    intrusoSel = 0;
    if (fb) fb.className = 'fb';

    if (intrusoIdx >= INTRUSOS.length) {
        qtxt.innerHTML = '¡Misión completada!';
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center">
            <p style="color:var(--ink-3);margin-bottom:1rem">Has analizado todos los sistemas correctamente.</p>
            ${scoreHtml(intrusoScore, INTRUSOS.length)}
            <button class="btn btn--dark" onclick="resetIntruso()" style="margin-top:1.2rem">Reintentar</button>
        </div>`;
        if (btn) btn.style.display = 'none';
        return;
    }

    const q = INTRUSOS[intrusoIdx];
    qtxt.innerHTML = progressHtml(intrusoIdx, INTRUSOS.length) + `<strong>${q.context}</strong>`;
    if (btn) {
        btn.textContent = intrusoIdx === INTRUSOS.length - 1 ? 'Finalizar ✓' : 'Siguiente →';
        btn.style.display = 'none';
    }

    q.options.forEach(opt => {
        const b = document.createElement('button');
        b.className = 'gbtn';
        b.textContent = opt.text;
        b.onclick = () => pickIntruso(b, opt.isIntruso, q);
        grid.appendChild(b);
    });
}

function pickIntruso(selected, isIntruso, q) {
    const grid = document.getElementById('intruso-grid');
    const btn  = document.getElementById('btn-next-intruso');
    const fb   = document.getElementById('intruso-feedback');
    grid.querySelectorAll('.gbtn').forEach(b => { b.disabled = true; b.style.opacity = '.6'; });
    selected.style.opacity = '1';
    intrusoSel = isIntruso ? 1 : 0;

    if (isIntruso) {
        selected.classList.add('gbtn--correct');
        showFb(fb, `<strong>✓ ¡Correcto!</strong> Identificaste el intruso sistémico.<div class="answer-reveal"><strong>Explicación:</strong> ${q.explanation}</div>`, 'correct');
    } else {
        selected.classList.add('gbtn--incorrect');
        const correctTxt = q.options.find(o => o.isIntruso).text;
        showFb(fb, `<strong>✗ Incorrecto.</strong> Esa opción pertenece al funcionamiento normal del sistema.<div class="answer-reveal"><strong>El intruso era:</strong> "${correctTxt}" — ${q.explanation}</div>`, 'incorrect');
    }
    if (btn) btn.style.display = 'inline-flex';
}

function nextIntruso() {
    intrusoScore += intrusoSel;
    intrusoIdx++;
    loadIntruso();
}
function resetIntruso() {
    intrusoIdx = 0; intrusoScore = 0; intrusoSel = 0;
    loadIntruso();
}

/* ──────────────────────────────────────────────────────────
   7. JUEGO 2 — EMPAREJAMIENTO
────────────────────────────────────────────────────────── */
let matchConceptId = null, matchDefId = null, matchPairs = 0, matchErrors = 0;

const MATCH_DEFS = {
    1: "Acción correctora mediante retroalimentación negativa.",
    2: "Tendencia natural al desgaste, desorden y caos total.",
    3: "Equilibrio de sistemas abiertos con flujos constantes."
};

function selectMatchItem(type, id) {
    const fb = document.getElementById('match-feedback');
    if (fb) fb.className = 'fb';

    if (type === 'concept') {
        if (matchConceptId) document.getElementById(`concept-${matchConceptId}`)?.classList.remove('selected-item');
        matchConceptId = id;
        document.getElementById(`concept-${id}`)?.classList.add('selected-item');
    } else {
        if (matchDefId) document.getElementById(`def-${matchDefId}`)?.classList.remove('selected-item');
        matchDefId = id;
        document.getElementById(`def-${id}`)?.classList.add('selected-item');
    }

    if (matchConceptId !== null && matchDefId !== null) {
        if (matchConceptId === matchDefId) {
            document.getElementById(`concept-${matchConceptId}`).className = 'mbtn matched-pair';
            document.getElementById(`def-${matchDefId}`).className = 'mbtn matched-pair';
            matchPairs++;
            matchConceptId = null; matchDefId = null;
            if (matchPairs === 3) {
                const ok = Math.max(0, 3 - matchErrors);
                showFb(fb, `<strong>¡Completado!</strong> Emparejaste todos los conceptos de estabilidad sistémica.${scoreHtml(ok, 3)}<button class="btn btn--dark" onclick="resetMatch()" style="margin-top:1rem">Reintentar</button>`, 'correct');
            }
        } else {
            matchErrors++;
            document.getElementById(`concept-${matchConceptId}`)?.classList.remove('selected-item');
            document.getElementById(`def-${matchDefId}`)?.classList.remove('selected-item');
            showFb(fb, `<strong>Combinación incorrecta.</strong><div class="answer-reveal"><strong>Pista:</strong> La definición de ese concepto es: "${MATCH_DEFS[matchConceptId]}"</div>`, 'incorrect');
            matchConceptId = null; matchDefId = null;
        }
    }
}

function resetMatch() {
    matchConceptId = null; matchDefId = null; matchPairs = 0; matchErrors = 0;
    const fb = document.getElementById('match-feedback');
    if (fb) fb.className = 'fb';
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`concept-${i}`)?.setAttribute('class', 'mbtn');
        document.getElementById(`def-${i}`)?.setAttribute('class', 'mbtn');
    }
}

/* ──────────────────────────────────────────────────────────
   8. JUEGO 3 — EL DILEMA DEL INGENIERO
────────────────────────────────────────────────────────── */
const DILEMAS = [
    {
        scenario: "CRISIS 1 · Ataque DDoS. Un flujo atípico de peticiones satura el servidor de notas afectando los exámenes. ¿Qué implementas?",
        options: [
            { text: "Apagar los servidores indefinidamente para mitigar el ataque.", correct: false },
            { text: "Permitir todo el tráfico esperando el cese autónomo.",           correct: false },
            { text: "Activar balanceadores y reglas de bloqueo IP, preservando el tráfico legítimo (Homeostasis Adaptativa).", correct: true }
        ],
        explanation: "La homeostasis requiere un bucle corrector activo: filtrar el tráfico dañino mientras se preserva el flujo legítimo mantiene el estado estacionario del sistema."
    },
    {
        scenario: "CRISIS 2 · Fuga de datos. La BD reporta una conexión externa extrayendo registros históricos. ¿Qué decides?",
        options: [
            { text: "Desconectar toda la BD de producción del entorno.",              correct: false },
            { text: "Aislar la IP de origen, activar réplica de contingencia y auditar el log (Bucle corrector).", correct: true  },
            { text: "Ocultar el reporte para no alarmar a los usuarios.",             correct: false }
        ],
        explanation: "Aislar el origen, activar réplica y auditar es retroalimentación negativa clásica: se detecta la desviación y se actúa de forma proporcional para restaurar el equilibrio."
    },
    {
        scenario: "CRISIS 3 · Obsolescencia tecnológica. El stack del sistema académico ya no recibe parches de seguridad. ¿Tu plan?",
        options: [
            { text: "Migrar progresivamente los módulos críticos a microservicios modernos (Negentropía).", correct: true  },
            { text: "Mantener la estructura intacta: 'si funciona, no se toca'.",     correct: false },
            { text: "Adquirir hardware costoso para los mismos aplicativos viejos.",   correct: false }
        ],
        explanation: "La negentropía implica evolución activa contra el desgaste entrópico: migrar a microservicios modernos es el mecanismo homeostático de largo plazo."
    },
    {
        scenario: "CRISIS 4 · Rotación masiva. El 40% del equipo de ingeniería renuncia en un trimestre. ¿Cómo respondes?",
        options: [
            { text: "Cancelar todos los proyectos activos y declarar pausa indefinida.", correct: false },
            { text: "Documentar conocimiento tácito, contratar reemplazos y redistribuir cargas (Homeostasis Organizacional).", correct: true  },
            { text: "Ignorar las renuncias y continuar con el equipo reducido.",        correct: false }
        ],
        explanation: "Documentar, redistribuir y reclutar simultáneamente es un bucle homeostático: el sistema absorbe la perturbación y mantiene su output productivo estable."
    },
    {
        scenario: "CRISIS 5 · Proveedor cloud caído. Tu único proveedor cloud reporta caída global. ¿Qué ejecutas?",
        options: [
            { text: "Activar infraestructura redundante en otro proveedor y comunicar el SLA a usuarios (Resiliencia sistémica).", correct: true  },
            { text: "Esperar pasivamente el restablecimiento sin comunicar tiempos.",   correct: false },
            { text: "Apagar todos los sistemas propios para no agravar el problema.",   correct: false }
        ],
        explanation: "La redundancia activa es el mecanismo de equilibrio dinámico: permite mantener el estado estacionario del servicio aunque un componente falle."
    },
    {
        scenario: "CRISIS 6 · Feedback masivo. Tras el lanzamiento, el 70% reporta errores críticos en la nueva versión. ¿Qué decides?",
        options: [
            { text: "Ignorar los reportes y esperar que los usuarios se adapten.",     correct: false },
            { text: "Revertir a la versión estable anterior mientras se corrigen errores (Retroalimentación Negativa Correctiva).", correct: true  },
            { text: "Lanzar una nueva versión experimental sin pruebas.",               correct: false }
        ],
        explanation: "Revertir al estado estable es retroalimentación negativa pura: se neutraliza la desviación restaurando el equilibrio hasta que el sistema esté listo para avanzar."
    }
];

let dilemaIdx = 0, dilemaScore = 0, dilemaSel = 0;

function loadDilema() {
    const qtxt = document.getElementById('dilema-question-text');
    const box  = document.getElementById('dilema-box');
    const btn  = document.getElementById('btn-next-dilema');
    const fb   = document.getElementById('dilema-feedback');
    if (!qtxt || !box) return;

    box.innerHTML = '';
    dilemaSel = 0;
    if (fb) fb.className = 'fb';

    if (dilemaIdx >= DILEMAS.length) {
        qtxt.innerHTML = '¡Simulación completada!';
        box.innerHTML = `<div style="text-align:center">
            <p style="color:var(--ink-3);margin-bottom:1rem">Has tomado decisiones en todas las crisis sistémicas.</p>
            ${scoreHtml(dilemaScore, DILEMAS.length)}
            <button class="btn btn--dark" onclick="resetDilema()" style="margin-top:1.2rem">Reintentar</button>
        </div>`;
        if (btn) btn.style.display = 'none';
        return;
    }

    const q = DILEMAS[dilemaIdx];
    qtxt.innerHTML = progressHtml(dilemaIdx, DILEMAS.length) + `<strong>${q.scenario}</strong>`;
    if (btn) {
        btn.textContent = dilemaIdx === DILEMAS.length - 1 ? 'Finalizar ✓' : 'Siguiente →';
        btn.style.display = 'none';
    }

    q.options.forEach(opt => {
        const b = document.createElement('button');
        b.className = 'gbtn';
        b.textContent = opt.text;
        b.onclick = () => pickDilema(b, opt.correct, q);
        box.appendChild(b);
    });
}

function pickDilema(selected, isCorrect, q) {
    const box = document.getElementById('dilema-box');
    const btn = document.getElementById('btn-next-dilema');
    const fb  = document.getElementById('dilema-feedback');
    box.querySelectorAll('.gbtn').forEach(b => { b.disabled = true; b.style.opacity = '.6'; });
    selected.style.opacity = '1';
    dilemaSel = isCorrect ? 1 : 0;

    if (isCorrect) {
        selected.classList.add('gbtn--correct');
        showFb(fb, `<strong>✓ ¡Decisión correcta!</strong> Aplicaste el principio sistémico adecuado.<div class="answer-reveal"><strong>Fundamento:</strong> ${q.explanation}</div>`, 'correct');
    } else {
        selected.classList.add('gbtn--incorrect');
        const correctTxt = q.options.find(o => o.correct).text;
        showFb(fb, `<strong>✗ Decisión incorrecta.</strong> Esta acción no restaura el equilibrio.<div class="answer-reveal"><strong>La decisión correcta era:</strong> "${correctTxt}" — ${q.explanation}</div>`, 'incorrect');
    }
    if (btn) btn.style.display = 'inline-flex';
}

function nextDilema() {
    dilemaScore += dilemaSel;
    dilemaIdx++;
    loadDilema();
}
function resetDilema() {
    dilemaIdx = 0; dilemaScore = 0; dilemaSel = 0;
    loadDilema();
}

/* ──────────────────────────────────────────────────────────
   9. CASOS PRÁCTICOS
────────────────────────────────────────────────────────── */
function validateExercise() {
    const a1  = document.getElementById('ex1')?.value;
    const a2  = document.getElementById('ex2')?.value;
    const a3  = document.getElementById('ex3')?.value;
    const fb  = document.getElementById('ex-feedback');
    if (!fb) return;

    if (!a1 || !a2 || !a3) {
        showFb(fb, '<strong>Atención:</strong> Selecciona una opción en cada pregunta antes de verificar.', 'incorrect');
        return;
    }

    const checks = [
        { val: a1, correct: 'perturbacion',    ok: 'La pérdida de ingenieros es una <strong>perturbación entrópica</strong> que desequilibra el sistema.',        fail: 'La pérdida abrupta de talento es una <strong>entrada entrópica / perturbación</strong>, no un mecanismo interno.' },
        { val: a2, correct: 'retroalimentacion', ok: 'Contratar freelancers y bonificar es un <strong>bucle de retroalimentación negativa</strong> (homeostasis).', fail: 'Contratar y bonificar son <strong>acciones homeostáticas</strong>, no una salida del sistema.' },
        { val: a3, correct: 'estacionario',    ok: 'Recuperar el ritmo original con nuevo personal es el <strong>estado estacionario (equilibrio dinámico)</strong>.', fail: 'Mantener producción estable con componentes cambiantes define el <strong>estado estacionario</strong>.' }
    ];

    let correctas = 0;
    const rows = checks.map((c, i) => {
        const pass = c.val === c.correct;
        if (pass) correctas++;
        return `<div style="margin-bottom:.4rem">${pass ? '✓' : '✗'} <strong>Pregunta ${i+1}:</strong> ${pass ? c.ok : c.fail}</div>`;
    }).join('');

    const type = correctas === 3 ? 'correct' : 'incorrect';
    showFb(fb, `<strong>${correctas === 3 ? '¡Análisis perfecto!' : 'Revisión completada:'}</strong><br><br>${rows}${scoreHtml(correctas, 3)}`, type);
}

/* ──────────────────────────────────────────────────────────
   10. AUTOEVALUACIÓN — QUIZ
────────────────────────────────────────────────────────── */
const QUIZ = [
    {
        q: "¿Qué autor introdujo formalmente el concepto de 'Estado Estacionario' (Steady State) para los sistemas abiertos?",
        opts: ["Norbert Wiener", "Ludwig von Bertalanffy", "W. Ross Ashby"],
        ans: 1,
        exp: "Bertalanffy formuló la TGS y definió el Steady State: la capacidad de los sistemas abiertos de mantener sus propiedades con componentes en flujo continuo."
    },
    {
        q: "Cuando un sistema ejecuta bucles de retroalimentación negativa para neutralizar desviaciones, realiza un proceso de:",
        opts: ["Homeostasis", "Entropía Positiva", "Equilibrio Estático"],
        ans: 0,
        exp: "La homeostasis (Ashby, 1956) es el mecanismo de retroalimentación negativa: detecta la desviación y ejecuta una acción opuesta y proporcional para corregirla."
    },
    {
        q: "La paralización completa de un sistema por falta de intercambio energético con el entorno se asocia con:",
        opts: ["Homeostasis de Control", "Equilibrio Estático acoplado a Entropía Máxima", "Estado Estacionario Funcional"],
        ans: 1,
        exp: "Cuando un sistema se cierra al entorno, cae en equilibrio estático y la entropía máxima lleva al desorden y desintegración total."
    },
    {
        q: "¿Cuál es la diferencia fundamental entre Homeostasis y Estado Estacionario?",
        opts: [
            "Son el mismo concepto con diferente nombre",
            "La homeostasis es el mecanismo operativo; el estado estacionario es el resultado alcanzado",
            "El estado estacionario solo aplica a sistemas biológicos"
        ],
        ans: 1,
        exp: "La homeostasis son las acciones de ajuste (proceso); el estado estacionario es la condición resultante: el sistema en equilibrio dinámico."
    },
    {
        q: "Un termostato que detecta baja temperatura y activa la calefacción es un ejemplo de:",
        opts: ["Entropía organizacional positiva", "Equilibrio estático mecánico", "Retroalimentación negativa cibernética (Homeostasis)"],
        ans: 2,
        exp: "El termostato mide la desviación del valor deseado y corrige en sentido opuesto. Es el modelo canónico de retroalimentación negativa (Ashby, 1956)."
    },
    {
        q: "¿Qué caracteriza al equilibrio dinámico (Steady State) frente al equilibrio estático?",
        opts: [
            "Implica ausencia total de cambios internos o externos",
            "Mantiene propiedades estables mientras sus componentes se renuevan continuamente",
            "Solo existe en sistemas cerrados sin intercambio con el entorno"
        ],
        ans: 1,
        exp: "El estado estacionario permite renovar partes (personas, datos, energía) sin perder la forma o función global: es el equilibrio propio de los sistemas abiertos."
    }
];

let qIdx = 0, qScore = 0, qAttempted = 0;

function loadQuiz() {
    const qEl   = document.getElementById('question');
    const optsEl= document.getElementById('options-container');
    const fb    = document.getElementById('quiz-feedback');
    if (!qEl || !optsEl) return;

    optsEl.innerHTML = '';
    if (fb) fb.className = 'fb';

    if (qAttempted >= QUIZ.length) {
        qEl.innerHTML = 'Evaluación finalizada';
        showFb(fb, `<strong>Has completado la autoevaluación.</strong>${scoreHtml(qScore, QUIZ.length)}<button class="btn btn--dark" onclick="resetQuiz()" style="margin-top:1rem">Reintentar</button>`, 'correct');
        return;
    }

    const q = QUIZ[qIdx];
    qEl.innerHTML = progressHtml(qIdx, QUIZ.length) + `${qIdx + 1}. ${q.q}`;

    q.opts.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'gbtn';
        b.textContent = opt;
        b.onclick = () => answerQuiz(i, q, optsEl, fb);
        optsEl.appendChild(b);
    });
}

function answerQuiz(idx, q, optsEl, fb) {
    qAttempted++;
    optsEl.querySelectorAll('.gbtn').forEach((b, i) => {
        b.disabled = true;
        b.style.opacity = i === idx ? '1' : '.55';
    });
    optsEl.querySelectorAll('.gbtn')[idx].classList.add(idx === q.ans ? 'gbtn--correct' : 'gbtn--incorrect');

    if (idx === q.ans) {
        qScore++;
        showFb(fb, `<strong>✓ ¡Correcto!</strong><div class="answer-reveal">${q.exp}</div>`, 'correct');
    } else {
        showFb(fb, `<strong>✗ Incorrecto.</strong> La respuesta correcta era: <em>"${q.opts[q.ans]}"</em><div class="answer-reveal">${q.exp}</div>`, 'incorrect');
    }

    setTimeout(() => { qIdx++; loadQuiz(); }, 3200);
}

function resetQuiz() {
    qIdx = 0; qScore = 0; qAttempted = 0;
    loadQuiz();
}

/* ──────────────────────────────────────────────────────────
   11. INIT
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    loadIntruso();
    loadDilema();
    loadQuiz();
});