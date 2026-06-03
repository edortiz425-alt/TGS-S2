// ==========================================
// BANCO DE PREGUNTAS CENTRALIZADO (EVALUACIÓN)
// ==========================================
const bancoPreguntas = [
    {
        pregunta: "¿Cuál es la principal diferencia entre un sistema caótico y uno puramente aleatorio?",
        optA: "A) El sistema caótico no tiene leyes y se mueve por el puro azar.",
        optB: "B) El sistema caótico es determinista (tiene reglas fijas), pero impredecible.",
        correcta: "B",
        feedbackCorrecto: "¡Exacto! El caos tiene reglas estructuradas (ecuaciones), mientras que la aleatoriedad depende del puro azar.",
        feedbackIncorrecto: "Inténtalo de nuevo. Recuerda que el caos en la TGS no es aleatoriedad pura; posee leyes estrictas."
    },
    {
        pregunta: "¿Qué propiedad de la TGS provoca el famoso 'Efecto Mariposa'?",
        optA: "A) La extrema sensibilidad a las condiciones iniciales en sistemas no lineales.",
        optB: "B) La falta de retroalimentación o inputs dentro del entorno del sistema.",
        correcta: "A",
        feedbackCorrecto: "¡Correcto! En sistemas no lineales, un cambio microscópico en el input inicial altera exponencialmente el output.",
        feedbackIncorrecto: "Incorrecto. El Efecto Mariposa ocurre porque el sistema es altamente sensible a cómo empieza (condiciones iniciales)."
    },
    {
        pregunta: "¿Cómo se le conoce al patrón u orden oculto que dibujan los sistemas caóticos en el espacio?",
        optA: "A) Equilibrio Homeostático Estático.",
        optB: "B) Atractor Extraño.",
        correcta: "B",
        feedbackCorrecto: "¡Brillante! Los atractores extraños (como el de Lorenz) demuestran geométricamente que el caos tiene fronteras y organización.",
        feedbackIncorrecto: "No es correcto. La estructura geométrica fractal que limita el caos se denomina Atractor Extraño."
    },
    {
        pregunta: "¿Qué experimenta un sistema dinámico al llegar a un punto de 'Bifurcación'?",
        optA: "A) Se ve forzado a elegir entre dos o más rutas de evolución debido a una inestabilidad crítica.",
        optB: "B) Entra en una parálisis permanente y detiene todos sus ciclos de retroalimentación.",
        correcta: "A",
        feedbackCorrecto: "¡Extraordinario! Las bifurcaciones marcan las transiciones de fase donde el sistema cambia súbitamente su estructura y organización.",
        feedbackIncorrecto: "Incorrecto. Una bifurcación no detiene el sistema; abre nuevas bifurcaciones o caminos hacia estados caóticos u ordenados."
    },
    {
        pregunta: "Desde el enfoque de la TGS, ¿por qué el caos invalida el método de investigación reduccionista?",
        optA: "A) Porque fragmentar el sistema en partes aisladas destruye las relaciones no lineales que causan el caos.",
        optB: "B) Porque el reduccionismo solo se puede aplicar a problemas de las ciencias sociales.",
        correcta: "A",
        feedbackCorrecto: "¡Excelente análisis! Al desarmar un sistema caótico para estudiarlo por partes, se eliminan los bucles de feedback que generan su comportamiento emergente.",
        feedbackIncorrecto: "No es correcto. El reduccionismo falla aquí porque asume que el todo es simplemente la suma lineal de sus partes aisladas."
    }
];

// Variables globales de estado
let indicePreguntaActual = 0;
let puntaje = 0;
let instanciaGrafico = null;

// ==========================================
// CONTROLADOR DE CARGA INICIAL (DOM)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el gráfico científico del Módulo 3
    inicializarGrafico();

    // Configurar listener para el Slider del simulador
    const slider = document.getElementById("slider");
    const sliderValue = document.getElementById("slider-value");
    if(slider && sliderValue) {
        slider.addEventListener("input", function() {
            let valA = parseFloat(slider.value);
            sliderValue.textContent = valA.toFixed(3);
            actualizarSimulacionCaos(valA);
        });
        // Ejecución inicial por defecto
        actualizarSimulacionCaos(parseFloat(slider.value));
    }
    
    // Cargar los datos del Quiz y Juego 2
    cargarPregunta();
    cargarJuego2();
});

// NAVEGACIÓN ENTRE PESTAÑAS (TABS) - CORREGIDA Y CON DIAGNÓSTICO
function cambiarModulo(idModulo, botonActivo) {
    document.querySelectorAll('.tab-content').forEach(mod => mod.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const objetivo = document.getElementById(idModulo);
    
    if (objetivo) {
        objetivo.classList.add('active');
    } else {
        // Este mensaje te dirá en la consola F12 qué ID escribiste mal en los botones del HTML
        console.error(`❌ Error de Naming: Intentaste cargar el módulo con ID "${idModulo}", pero ese ID no existe en tu archivo HTML.`);
    }
    
    if (botonActivo) botonActivo.classList.add('active');
}s

// CONTROL DE ACORDEONES (MÓDULO 2)
function toggleAccordion(header) {
    const body = header.nextElementSibling;
    body.classList.toggle('open');
}

// VISIBILIDAD DE CASOS PRÁCTICOS (MÓDULO 4) - EFECTO PERSIANA FLUIDO
function toggleRetroalimentacion(id) {
    const caja = document.getElementById(id);
    if (!caja) return;

    // 1. Inyectamos las propiedades base para que la animación funcione sí o sí
    caja.style.display = "block"; // Mantenemos el bloque activo en el layout
    caja.style.overflow = "hidden"; // Evita que el texto se desborde mientras se encoge
    caja.style.transition = "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out";

    const estaAbierto = caja.getAttribute('data-abierto') === 'true';

    if (estaAbierto) {
        // ACCIÓN: CERRAR PERSIANA (Se desliza hacia arriba hasta llegar a 0)
        caja.style.maxHeight = "0px";
        caja.style.opacity = "0";
        caja.setAttribute('data-abierto', 'false');
    } else {
        // ACCIÓN: ABRIR PERSIANA (Se desliza hacia abajo calculando los píxeles exactos)
        // scrollHeight lee el tamaño real que necesita el texto para mostrarse completo
        caja.style.maxHeight = caja.scrollHeight + "px";
        caja.style.opacity = "1";
        caja.setAttribute('data-abierto', 'true');
    }
}
// ==========================================
// MÓDULO 3: MATEMÁTICA DEL SIMULADOR GRÁFICO
// ==========================================
function inicializarGrafico() {
    const canv = document.getElementById('graficoCaos');
    if (!canv) return;
    
    const ctx = canv.getContext('2d');
    instanciaGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [
                {
                    label: 'Sistema Original (X₀)',
                    borderColor: '#22d3ee', 
                    backgroundColor: 'rgba(34, 211, 238, 0.05)',
                    data: [],
                    borderWidth: 2,
                    tension: 0.15
                },
                {
                    label: 'Sistema Perturbado (X₀ + 0.0001)',
                    borderColor: '#f87171', 
                    backgroundColor: 'rgba(248, 113, 113, 0.05)',
                    data: [],
                    borderWidth: 2,
                    borderDash: [4, 4], 
                    tension: 0.15
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#e2e8f0' } } },
            scales: {
                x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' }, min: 0, max: 1 }
            }
        }
    });
}

function actualizarSimulacionCaos(x0) {
    if (!instanciaGrafico) return;
    
    let xA = x0;
    let xB = x0 + 0.0001; // Perturbación infinitesimal
    const r = 3.92;       // Parámetro de caos severo
    
    let arrA = [xA];
    let arrB = [xB];
    let labels = ["0"];
    
    for (let i = 1; i <= 16; i++) {
        xA = r * xA * (1 - xA);
        xB = r * xB * (1 - xB);
        arrA.push(xA);
        arrB.push(xB);
        labels.push(i.toString());
    }
    
    instanciaGrafico.data.labels = labels;
    instanciaGrafico.data.datasets[0].data = arrA;
    instanciaGrafico.data.datasets[1].data = arrB;
    instanciaGrafico.update();
}

// ==========================================
// MÓDULO 3: MECÁNICAS DE LOS 3 JUEGOS INTERACTIVOS
// ==========================================

// --- DATOS GLOBALES JUEGO 2 (Autoprotegidos en función) ---
var catalogosGame2 = [
    { texto: "El goteo de una llave de agua vieja que cambia de velocidad sin que nadie la toque y jamás repite el mismo ritmo.", tipo: "Caótico" },
    { texto: "La transmisión automática de datos fijos binarios a través de un cable de fibra óptica simétrico.", tipo: "Lineal" },
    { texto: "La fluctuación del ruido estático blanco de un canal de televisión analógica sin sintonía.", tipo: "Aleatorio" }
];
var indexG2 = 0;

// --- VARIABLES GLOBALES JUEGO 1 ---
var g1Intervalo = null;
var g1Valor = 50;
var g1Tiempo = 15;

// --- VARIABLES GLOBALES JUEGO 3 (NUEVO) ---
var g3Score = 0;
var g3Tiempo = 30;
var g3IntervaloTiempo = null;
var g3IntervaloBug = null;
var g3PosicionActual = -1;
var g3BugGolpeado = false;

// CONTROLADOR UNIFICADO DE PERSIANAS (Para 3 Juegos)
function toggleJuego(idPanelTarget) {
    const p1 = document.getElementById('panel-juego1');
    const p2 = document.getElementById('panel-juego2');
    const p3 = document.getElementById('panel-juego3');
    const panel = document.getElementById(idPanelTarget);
    
    if (!panel) return;

    const estaAbierto = panel.getAttribute('data-abierto') === 'true';

    // 1. Cerramos todos los paneles abiertos para efecto acordeón limpio
    [p1, p2, p3].forEach(p => {
        if (p) {
            p.style.maxHeight = "0px";
            p.style.opacity = "0";
            p.setAttribute('data-abierto', 'false');
            
            // Apagado de seguridad de bucles activos al cerrar la persiana
            if (p.id === 'panel-juego1' && g1Intervalo !== null) {
                clearInterval(g1Intervalo);
                g1Intervalo = null;
            }
            if (p.id === 'panel-juego3') {
                detenerJuego3();
            }
        }
    });

    // 2. Si el panel objetivo estaba cerrado, lo desplegamos
    if (!estaAbierto) {
        if (idPanelTarget === 'panel-juego2') {
            cargarJuego2();
        }

        panel.setAttribute('data-abierto', 'true');
        
        setTimeout(() => {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.opacity = "1";
        }, 50);
    }
}

// --- LÓGICA JUEGO 1 ---
function iniciarJuego1() {
    if (g1Intervalo !== null) clearInterval(g1Intervalo);
    g1Valor = 50;
    g1Tiempo = 15;
    document.getElementById("g1-status").style.color = "#22d3ee";
    document.getElementById("g1-status").innerText = `Mantén el balance. Tiempo: ${g1Tiempo}s`;
    
    g1Intervalo = setInterval(() => {
        const caosExterno = (Math.random() - 0.5) * 10;
        const compensacionUsuario = parseFloat(document.getElementById("g1-slider").value);
        
        g1Valor = Math.round(g1Valor + caosExterno + compensacionUsuario);
        document.getElementById("g1-valor").innerText = g1Valor;
        
        if (g1Valor < 35 || g1Valor > 65) {
            clearInterval(g1Intervalo);
            g1Intervalo = null;
            document.getElementById("g1-status").innerText = "❌ Colapso por retroalimentación positiva. ¡Sube o baja el control!";
            document.getElementById("g1-status").style.color = "#f87171";
        } else {
            g1Tiempo--;
            document.getElementById("g1-status").innerText = `Estabilizando... Tiempo restante: ${g1Tiempo}s`;
            
            if (g1Tiempo <= 0) {
                clearInterval(g1Intervalo);
                g1Intervalo = null;
                document.getElementById("g1-status").innerText = "🏆 ¡Felicidades! Homeostasis inducida con éxito.";
                document.getElementById("g1-status").style.color = "#34d399";
                document.getElementById('panel-juego1').style.maxHeight = document.getElementById('panel-juego1').scrollHeight + "px";
            }
        }
    }, 1000);
}

// --- LÓGICA JUEGO 2 ---
function cargarJuego2() {
    if (typeof catalogosGame2 === 'undefined' || !catalogosGame2) {
        window.catalogosGame2 = [
            { texto: "El goteo de una llave de agua vieja que cambia de velocidad sin que nadie la toque y jamás repite el mismo ritmo.", tipo: "Caótico" },
            { texto: "La transmisión automática de datos fijos binarios a través de un cable de fibra óptica simétrico.", tipo: "Lineal" },
            { texto: "La fluctuación del ruido estático blanco de un canal de televisión analógica sin sintonía.", tipo: "Aleatorio" }
        ];
    }
    if (typeof indexG2 === 'undefined' || window.indexG2 === undefined) window.indexG2 = 0;

    const item = window.catalogosGame2[window.indexG2];
    const enunciado = document.getElementById("g2-enunciado");
    if (!enunciado) return;
    
    enunciado.innerText = `"${item.texto}"`;
    const boxOpciones = document.getElementById("g2-opciones");
    boxOpciones.innerHTML = "";
    
    ["Lineal", "Caótico", "Aleatorio"].forEach(tipo => {
        const btn = document.createElement("button");
        btn.innerText = `Sistema ${tipo}`;
        btn.className = "btn-action"; 
        btn.style.width = "100%";
        btn.onclick = () => verificarJuego2(tipo);
        boxOpciones.appendChild(btn);
    });
}

function verificarJuego2(seleccion) {
    const correcto = window.catalogosGame2[window.indexG2].tipo;
    const feed = document.getElementById("g2-feedback");
    
    if (seleccion === correcto) {
        feed.innerText = "¡Correcto! Interpretación de firma dinámica validada.";
        feed.style.color = "#34d399";
        setTimeout(() => {
            feed.innerText = "";
            window.indexG2 = (window.indexG2 + 1) % window.catalogosGame2.length;
            cargarJuego2();
            const panel2 = document.getElementById('panel-juego2');
            if(panel2) panel2.style.maxHeight = panel2.scrollHeight + "px";
        }, 1800);
    } else {
        feed.innerText = `Fallo. La firma correspondía a un comportamiento ${correcto}.`;
        feed.style.color = "#f87171";
    }
}

// --- LÓGICA JUEGO 3: BUG WHACKER ---
function iniciarJuego3() {
    detenerJuego3(); // Reseteo estructural completo antes de iniciar
    
    g3Score = 0;
    g3Tiempo = 30;
    g3PosicionActual = -1;
    g3BugGolpeado = false;
    
    document.getElementById("g3-score").innerText = g3Score;
    document.getElementById("g3-time").innerText = g3Tiempo + "s";
    
    // Bucle 1: Movimiento del bug rápido (cada 800ms cambia de casilla)
    g3IntervaloBug = setInterval(aparecerBug, 800);
    
    // Bucle 2: Cronómetro de fin de juego
    g3IntervaloTiempo = setInterval(() => {
        g3Tiempo--;
        document.getElementById("g3-time").innerText = g3Tiempo + "s";
        
        if (g3Tiempo <= 0) {
            detenerJuego3();
            alert(`💻 ¡Depuración Terminada! Lograste eliminar ${g3Score} bugs del sistema.`);
        }
    }, 1000);
    
    aparecerBug(); // Forzamos la primera aparición inmediata
}

function aparecerBug() {
    const hoyos = document.querySelectorAll(".grid-hole");
    hoyos.forEach(hoyo => hoyo.innerText = ""); // Limpiamos el tablero anterior
    
    g3BugGolpeado = false;
    
    // Elige una posición aleatoria de 0 a 8 que no sea idéntica a la anterior
    let nuevaPosicion;
    do {
        nuevaPosicion = Math.floor(Math.random() * 9);
    } while (nuevaPosicion === g3PosicionActual);
    
    g3PosicionActual = nuevaPosicion;
    hoyos[g3PosicionActual].innerText = "🐛";
}

function golpearBug(posicion) {
    if (posicion === g3PosicionActual && !g3BugGolpeado) {
        g3Score++;
        g3BugGolpeado = true;
        document.getElementById("g3-score").innerText = g3Score;
        
        // Retroalimentación visual inmediata tras el clic acertado
        const hoyos = document.querySelectorAll(".grid-hole");
        hoyos[posicion].innerText = "💥";
    }
}

function detenerJuego3() {
    if (g3IntervaloTiempo !== null) {
        clearInterval(g3IntervaloTiempo);
        g3IntervaloTiempo = null;
    }
    if (g3IntervaloBug !== null) {
        clearInterval(g3IntervaloBug);
        g3IntervaloBug = null;
    }
    const hoyos = document.querySelectorAll(".grid-hole");
    hoyos.forEach(hoyo => hoyo.innerText = "");
}
// ==========================================
// MÓDULO 6: LÓGICA BLINDADA DEL QUIZ AUTOMÁTICO
// ==========================================
function cargarPregunta() {
    const qActual = bancoPreguntas[indicePreguntaActual];
    
    const step = document.getElementById("quiz-step");
    const question = document.getElementById("quiz-question");
    const optA = document.getElementById("btn-opt-a");
    const optB = document.getElementById("btn-opt-b");
    
    if (step) step.textContent = `Pregunta ${indicePreguntaActual + 1} de ${bancoPreguntas.length}`;
    if (question) question.textContent = qActual.pregunta;
    if (optA) { optA.textContent = qActual.optA; optA.disabled = false; }
    if (optB) { optB.textContent = qActual.optB; optB.disabled = false; }
    
    const feed = document.getElementById("quiz-feedback");
    if (feed) feed.textContent = "";
    
    const nextBtn = document.getElementById("btn-next");
    if (nextBtn) nextBtn.style.display = "none";
}

function evaluarSeleccion(opcion) {
    const qActual = bancoPreguntas[indicePreguntaActual];
    const feed = document.getElementById("quiz-feedback");
    
    const optA = document.getElementById("btn-opt-a");
    const optB = document.getElementById("btn-opt-b");
    if (optA) optA.disabled = true;
    if (optB) optB.disabled = true;
    
    if (feed) {
        if (opcion === qActual.correcta) {
            feed.textContent = qActual.feedbackCorrecto;
            feed.style.color = "#34d399";
            puntaje++;
        } else {
            feed.textContent = qActual.feedbackIncorrecto;
            feed.style.color = "#f87171";
        }
    }
    
    const nextBtn = document.getElementById("btn-next");
    if (nextBtn) nextBtn.style.display = "block";
}

function siguientePregunta() {
    indicePreguntaActual++;
    
    if (indicePreguntaActual < bancoPreguntas.length) {
        cargarPregunta();
    } else {
        // PROCESAMIENTO SEGURO DEL FINAL DEL QUIZ (DEFENSA CONTRA ELEMENTOS NULOS)
        const step = document.getElementById("quiz-step");
        const question = document.getElementById("quiz-question");
        if (step) step.textContent = "Evaluación Concluida";
        if (question) question.textContent = "Resultados consolidados de la sesión:";
        
        const registerBox = document.getElementById("quiz-welcome");
        if (registerBox) registerBox.style.display = "none";
        
        // Recolección y saneamiento de nombre de usuario de forma segura
        const inputDom = document.getElementById("student-name");
        const stringLimpio = inputDom ? inputDom.value.trim() : "";
        
        // CONTROL RETOMADO: Cambio del valor fallback por defecto a "Usuario"
        const nombreFinal = stringLimpio ? stringLimpio : "Usuario";
        
        const areaEvaluacion = document.querySelector(".quiz-container");
        if (areaEvaluacion) {
            areaEvaluacion.innerHTML = `
                <div style="text-align: center; margin: 15px 0; padding: 20px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px;">
                    <p style="font-size: 1.2rem; color: #f8fafc;">Puntuación de <strong>${nombreFinal}</strong>: <span style="color: #22d3ee;">${puntaje} de ${bancoPreguntas.length}</span> correctas.</p>
                    <p style="color: #34d399; font-weight: bold; font-size: 1.1rem; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${puntaje >= 4 ? "🏆 Rango: Analista de Sistemas Caóticos" : "🔄 Rango: Explorador de Sistemas Dinámicos"}
                    </p>
                </div>
            `;
        }
        
        const feed = document.getElementById("quiz-feedback");
        if (feed) {
            feed.textContent = "Objeto Virtual de Aprendizaje (OVA) completado satisfactoriamente.";
            feed.style.color = "#34d399";
        }
        
        const nextBtn = document.getElementById("btn-next");
        if (nextBtn) nextBtn.style.display = "none";
    }
}
// CONTROL INTERNO DE VIDEOS EN MÓDULO 1
function switchVideo(videoNum, clickedButton) {
    // 1. Ocultar todos los sub-paneles de video del módulo 1
    document.querySelectorAll('.video-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // 2. Quitar el estado activo de los botones selectores de video
    document.querySelectorAll('.vid-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 3. Activar el panel y el botón que el usuario presionó
    document.getElementById(`video-panel-${videoNum}`).classList.add('active');
    clickedButton.classList.add('active');
}


