
// Loader removed: no full-page loading overlay anymore

const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙 Oscuro';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙 Oscuro' : '☀️ Claro';
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al clickear un link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.concept-card, .example-card, .game-box, .video-container, .credits-section').forEach(el => {
    observer.observe(el);
});

const matchingData = [
    { concept: 'Sistema', definition: 'Conjunto de elementos interconectados' },
    { concept: 'Entrada', definition: 'Recursos que ingresa al sistema' },
    { concept: 'Proceso', definition: 'Transformación de entradas' },
    { concept: 'Salida', definition: 'Resultado del proceso' },
    { concept: 'Retroalimentación', definition: 'Control del output para regular' },
    { concept: 'Entorno', definition: 'Contexto externo del sistema' }
];

let game1Matches = [];
let game1Selected = [];

function initGame1() {
    const game1Container = document.getElementById('game1');
    if (!game1Container) return;

    let lefts = matchingData.map((item, i) => ({ ...item, id: i, type: 'concept' }));
    let rights = matchingData.map((item, i) => ({ ...item, id: i, type: 'definition' })).sort(() => Math.random() - 0.5);

    const html = `
        <div class="match-grid">
            <div>
                ${lefts.map(item => `<div class="match-item" data-id="${item.id}" data-type="concept">${item.concept}</div>`).join('')}
            </div>
            <div>
                ${rights.map(item => `<div class="match-item" data-id="${item.id}" data-type="definition">${item.definition}</div>`).join('')}
            </div>
        </div>
        <div class="game-score">Aciertos: <span id="game1-score">0</span>/6</div>
        <div class="game-feedback" id="game1-feedback"></div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Reiniciar Juego</button>
    `;

    game1Container.innerHTML = html;
    setupGame1();
}

function setupGame1() {
    const items = document.querySelectorAll('#game1 .match-item');
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;

            const itemId = this.dataset.id;
            const itemType = this.dataset.type;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                game1Selected = game1Selected.filter(s => s !== this);
                return;
            }

            if (game1Selected.length === 2) {
                const [first, second] = game1Selected;
                const firstId = first.dataset.id;
                const secondId = second.dataset.id;

                if (firstId === secondId) {
                    first.classList.add('matched');
                    second.classList.add('matched');
                    game1Matches.push(firstId);
                    showFeedback('game1-feedback', '✅ ¡Correcto! Excelente asociación', 'success');
                    updateGame1Score();
                } else {
                    first.classList.add('error');
                    second.classList.add('error');
                    showFeedback('game1-feedback', '❌ Intenta de nuevo, no coinciden', 'error');
                    setTimeout(() => {
                        first.classList.remove('error', 'selected');
                        second.classList.remove('error', 'selected');
                    }, 800);
                }
                game1Selected = [];
                return;
            }

            this.classList.add('selected');
            game1Selected.push(this);
        });
    });

    document.querySelector('#game1 button').addEventListener('click', initGame1);
}

function updateGame1Score() {
    document.getElementById('game1-score').textContent = game1Matches.length;
    if (game1Matches.length === 6) {
        showFeedback('game1-feedback', '🎉 ¡JUEGO COMPLETADO! Demostraste excelente comprensión', 'success');
    }
}

// ===== JUEGO 2: CLASIFICACIÓN (ABIERTOS/CERRADOS) =====
const systemsData = [
    { name: 'Netflix', type: 'abierto' },
    { name: 'Universo', type: 'cerrado' },
    { name: 'Empresa', type: 'abierto' },
    { name: 'Botella cerrada', type: 'cerrado' },
    { name: 'Hospital', type: 'abierto' },
    { name: 'Motor hermético', type: 'cerrado' }
];

let game2Correct = 0;

function initGame2() {
    const game2Container = document.getElementById('game2');
    if (!game2Container) return;

    const shuffled = [...systemsData].sort(() => Math.random() - 0.5);

    const html = `
        <div class="classification-area">
            <div class="classification-box" data-target="abierto">
                <h4>🔓 SISTEMAS ABIERTOS</h4>
                <p style="font-size: 0.85rem; color: #888;">Intercambian energía y materia</p>
            </div>
            <div class="classification-box" data-target="cerrado">
                <h4>🔒 SISTEMAS CERRADOS</h4>
                <p style="font-size: 0.85rem; color: #888;">No intercambian con el entorno</p>
            </div>
        </div>
        <div style="margin: 20px 0; text-align: center;">
            ${shuffled.map((s, i) => `<div class="system-chip" draggable="true" data-system="${s.name}" data-type="${s.type}">${s.name}</div>`).join('')}
        </div>
        <div class="game-score">Clasificaciones correctas: <span id="game2-score">0</span>/${systemsData.length}</div>
        <div class="game-feedback" id="game2-feedback"></div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Reiniciar Clasificación</button>
    `;

    game2Container.innerHTML = html;
    setupGame2();
}

function setupGame2() {
    const chips = document.querySelectorAll('#game2 .system-chip');
    const boxes = document.querySelectorAll('#game2 .classification-box');

    chips.forEach(chip => {
        chip.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', chip.innerHTML);
            chip.style.opacity = '0.7';
        });

        chip.addEventListener('dragend', (e) => {
            chip.style.opacity = '1';
        });
    });

    boxes.forEach(box => {
        box.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            box.classList.add('active');
        });

        box.addEventListener('dragleave', (e) => {
            box.classList.remove('active');
        });

        box.addEventListener('drop', (e) => {
            e.preventDefault();
            box.classList.remove('active');
            const chip = e.dataTransfer.getData('text');
            
            // Encontrar el chip original
            let draggedChip = null;
            document.querySelectorAll('#game2 .system-chip').forEach(c => {
                if (c.innerHTML === chip && !c.classList.contains('placed')) {
                    draggedChip = c;
                }
            });

            if (draggedChip) {
                const systemType = draggedChip.dataset.type;
                const targetType = box.dataset.target;
                const systemName = draggedChip.dataset.system;

                if (systemType === targetType) {
                    draggedChip.classList.add('placed');
                    box.appendChild(draggedChip);
                    draggedChip.style.margin = '5px 3px';
                    draggedChip.draggable = false;
                    showFeedback('game2-feedback', `✅ ¡${systemName} clasificado correctamente!`, 'success');
                    game2Correct++;
                    updateGame2Score();
                } else {
                    showFeedback('game2-feedback', `❌ ${systemName} no pertenece aquí. Intenta de nuevo`, 'error');
                }
            }
        });
    });

    document.querySelector('#game2 button').addEventListener('click', () => {
        game2Correct = 0;
        initGame2();
    });
}

function updateGame2Score() {
    document.getElementById('game2-score').textContent = game2Correct;
    if (game2Correct === systemsData.length) {
        showFeedback('game2-feedback', '🎉 ¡PERFECTO! Completaste la clasificación sin errores', 'success');
    }
}

function showFeedback(elementId, message, type) {
    const feedback = document.getElementById(elementId);
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `game-feedback show ${type}`;
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }
}

// ===== QUIZ INTERACTIVO =====
const quizData = [
    {
        question: "¿Cuál es la definición principal de un sistema según TGS?",
        options: [
            "Un conjunto desordenado de elementos",
            "Un conjunto de elementos interconectados e interdependientes que funcionan como una unidad",
            "Un único elemento aislado",
            "Una máquina computacional"
        ],
        correct: 1
    },
    {
        question: "¿Qué es la retroalimentación en un sistema?",
        options: [
            "La eliminación de información",
            "El proceso que devuelve la salida para monitorear y regular el funcionamiento",
            "Un error del sistema",
            "La entrada inicial"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es la diferencia clave entre sistemas abiertos y cerrados?",
        options: [
            "Los abiertos tienen más elementos",
            "Los abiertos intercambian energía y materia con el entorno, los cerrados no",
            "Los cerrados son más eficientes",
            "No hay diferencia"
        ],
        correct: 1
    },
    {
        question: "¿Qué es la entropía en sistemas?",
        options: [
            "La temperatura del sistema",
            "La cantidad de energía entrada",
            "La tendencia del sistema al desorden y la pérdida de energía",
            "El número de elementos"
        ],
        correct: 2
    },
    {
        question: "¿Cuál es un ejemplo de subsistema?",
        options: [
            "El universo completo",
            "El departamento de ventas dentro de una empresa",
            "Una partícula aislada",
            "La luz"
        ],
        correct: 1
    },
    {
        question: "¿Qué representa la homeostasis en un sistema?",
        options: [
            "El caos total del sistema",
            "La capacidad del sistema para mantener equilibrio a pesar de cambios externos",
            "La entrada de energía",
            "La muerte del sistema"
        ],
        correct: 1
    },
    {
        question: "¿Qué es la sinergia?",
        options: [
            "La suma matemática de partes",
            "El efecto donde el todo es mayor que la suma de sus partes",
            "Un tipo de energía",
            "Un software"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es el propósito del límite de un sistema?",
        options: [
            "Detener el funcionamiento",
            "Definir qué pertenece al sistema y qué al entorno",
            "Almacenar energía",
            "Crear confusión"
        ],
        correct: 1
    },
    {
        question: "¿Qué es el entorno de un sistema?",
        options: [
            "El interior del sistema",
            "Todo aquello que rodea al sistema pero no hace parte de él",
            "Un tipo de energía",
            "Un componente del sistema"
        ],
        correct: 1
    },
    {
        question: "¿Una empresa es un ejemplo de qué tipo de sistema?",
        options: [
            "Sistema cerrado",
            "Sistema aislado",
            "Sistema abierto",
            "Sistema muerto"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizAnswers = [];
let quizStartTime = null;

function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    currentQuestion = 0;
    quizScore = 0;
    quizAnswers = [];
    quizStartTime = Date.now();

    showQuizQuestion();
}

function showQuizQuestion() {
    const quiz = document.querySelector('.quiz-container');
    const data = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;

    const remainingTime = Math.floor((300 - (Date.now() - quizStartTime) / 1000));
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const html = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="quiz-header">
            <span class="quiz-question-number">Pregunta ${currentQuestion + 1} de ${quizData.length}</span>
            <div class="quiz-timer">⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}</div>
        </div>

        <h3 class="quiz-question">${data.question}</h3>

        <div class="quiz-options">
            ${data.options.map((option, index) => `
                <div class="quiz-option" data-index="${index}">
                    ${option}
                </div>
            `).join('')}
        </div>

        <div class="quiz-results" id="quiz-results">
            <div class="results-score" id="final-score">0/10</div>
            <div class="results-message" id="results-message"></div>
            <div class="results-breakdown">
                <p><strong>Preguntas correctas:</strong> <span id="correct-count">0</span></p>
                <p><strong>Preguntas incorrectas:</strong> <span id="incorrect-count">0</span></p>
                <p><strong>Porcentaje:</strong> <span id="percentage">0</span>%</p>
                <p><strong>Tiempo total:</strong> <span id="total-time">0</span>s</p>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="initQuiz()">Reiniciar Quiz</button>
        </div>
    `;

    quiz.innerHTML = html;

    const timerInterval = setInterval(() => {
        const remaining = Math.floor((300 - (Date.now() - quizStartTime) / 1000));
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        const timerElement = document.querySelector('.quiz-timer');
        if (timerElement) {
            timerElement.textContent = `⏱️ ${m}:${s.toString().padStart(2, '0')}`;
        }
        if (remaining <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            if (document.querySelector('.quiz-option.selected')) return;

            const selectedIndex = parseInt(this.dataset.index);
            const isCorrect = selectedIndex === data.correct;

            this.classList.add('selected');
            this.classList.add(isCorrect ? 'correct' : 'incorrect');

            quizAnswers.push({
                question: currentQuestion,
                selected: selectedIndex,
                correct: data.correct,
                isCorrect: isCorrect
            });

            if (isCorrect) {
                quizScore++;
            }

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    clearInterval(timerInterval);
                    showQuizQuestion();
                } else {
                    clearInterval(timerInterval);
                    finishQuiz();
                }
            }, 800);
        });
    });
}

function finishQuiz() {
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
    const percentage = Math.round((quizScore / quizData.length) * 100);
    const incorrectCount = quizData.length - quizScore;

    let resultMessage = '';
    if (percentage === 100) {
        resultMessage = ' ¡PERFECTO! Eres un maestro en TGS';
    } else if (percentage >= 80) {
        resultMessage = ' ¡EXCELENTE! Dominas muy bien los conceptos';
    } else if (percentage >= 60) {
        resultMessage = ' ¡BUENO! Tienes buena comprensión de TGS';
    } else {
        resultMessage = ' Sigue estudiando, ¡lo lograrás!';
    }

    document.getElementById('quiz-results').classList.add('show');
    document.getElementById('final-score').textContent = `${quizScore}/${quizData.length}`;
    document.getElementById('results-message').textContent = resultMessage;
    document.getElementById('correct-count').textContent = quizScore;
    document.getElementById('incorrect-count').textContent = incorrectCount;
    document.getElementById('percentage').textContent = percentage;
    document.getElementById('total-time').textContent = totalTime;

    document.querySelectorAll('.quiz-question, .quiz-options, .progress-bar, .quiz-header').forEach(el => {
        el.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initGame1();
    initGame2();
    initQuiz();

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// beforeunload loader handling removed

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('🎮 ¡Encontraste el easter egg! Tu curiosidad es propia de un buen sistemas-pensador. 🚀');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('%c🌐 Teoría General de Sistemas - OVA v1.0', 'color: #00d4ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.5);');
console.log('%cUn proyecto creado para comprender cómo funcionan los sistemas del universo.', 'color: #a855f7; font-size: 13px;');
