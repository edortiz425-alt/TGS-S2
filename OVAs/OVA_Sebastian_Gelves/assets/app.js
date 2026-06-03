const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const quizQuestions = [
  {
    question: "Que propiedad indica que el sistema debe entenderse como una totalidad organizada?",
    options: ["Totalidad", "Entropia", "Multifinalidad", "Ruido"],
    answer: "Totalidad",
    feedback: "Totalidad: el comportamiento global depende de la organizacion del conjunto."
  },
  {
    question: "Cuando la salida de un proceso regresa como informacion para corregir o amplificar el comportamiento, hablamos de:",
    options: ["Retroalimentacion", "Limite", "Jerarquia", "Frontera cerrada"],
    answer: "Retroalimentacion",
    feedback: "La retroalimentacion conecta resultados con nuevas decisiones del sistema."
  },
  {
    question: "La sinergia se observa cuando:",
    options: ["El todo produce mas o algo distinto que las partes aisladas", "El sistema se cierra totalmente al entorno", "Todas las partes hacen exactamente lo mismo", "No hay relaciones entre elementos"],
    answer: "El todo produce mas o algo distinto que las partes aisladas",
    feedback: "La sinergia aparece por la coordinacion entre elementos."
  },
  {
    question: "Que propiedad explica que una ciudad tenga patrones de trafico no decididos por un conductor individual?",
    options: ["Emergencia", "Homeostasis", "Entrada", "Salida"],
    answer: "Emergencia",
    feedback: "La emergencia nace de muchas interacciones locales."
  },
  {
    question: "Que representa el limite de un sistema?",
    options: ["La frontera conceptual que distingue sistema y entorno", "La meta final obligatoria", "El numero de elementos", "La eliminacion de relaciones"],
    answer: "La frontera conceptual que distingue sistema y entorno",
    feedback: "Los limites permiten decidir que se analiza como sistema y que queda como entorno."
  },
  {
    question: "La equifinalidad significa que:",
    options: ["Distintas rutas pueden llegar al mismo resultado", "Todo sistema se destruye rapidamente", "Solo existe un camino correcto", "Los subsistemas no importan"],
    answer: "Distintas rutas pueden llegar al mismo resultado",
    feedback: "En sistemas abiertos puede haber varios caminos viables hacia un mismo fin."
  },
  {
    question: "La entropia se relaciona con:",
    options: ["Tendencia al desorden o perdida de organizacion", "Aumento automatico de aprendizaje", "Ausencia de entorno", "Reduccion de fronteras"],
    answer: "Tendencia al desorden o perdida de organizacion",
    feedback: "La entropia aumenta si el sistema no renueva informacion, energia u organizacion."
  },
  {
    question: "Un sistema compuesto por subsistemas y parte de un suprasistema evidencia:",
    options: ["Jerarquia", "Azar puro", "Aislamiento", "Equilibrio permanente"],
    answer: "Jerarquia",
    feedback: "La jerarquia organiza niveles: elemento, subsistema, sistema y suprasistema."
  },
  {
    question: "Un sistema abierto se caracteriza por:",
    options: ["Intercambiar energia, materia o informacion con el entorno", "No recibir influencias externas", "No tener limites", "Carecer de proposito"],
    answer: "Intercambiar energia, materia o informacion con el entorno",
    feedback: "Los sistemas abiertos mantienen relacion constante con su entorno."
  },
  {
    question: "Cual accion fortalece la neguentropia en una organizacion?",
    options: ["Aprender de datos y reorganizar procesos", "Ignorar errores repetidos", "Aislar areas completamente", "Eliminar canales de comunicacion"],
    answer: "Aprender de datos y reorganizar procesos",
    feedback: "La neguentropia reduce desorden mediante informacion util, aprendizaje y organizacion."
  }
];

const loopScenarios = [
  {
    text: "Mientras mas estudiantes recomiendan una plataforma, mas usuarios llegan y mas recomendaciones aparecen.",
    answer: "reforzador",
    feedback: "Es un bucle reforzador: el crecimiento alimenta mas crecimiento."
  },
  {
    text: "Cuando baja el inventario, el sistema ordena mas productos hasta recuperar un nivel meta.",
    answer: "balanceador",
    feedback: "Es un bucle balanceador: corrige una desviacion frente a una meta."
  },
  {
    text: "Una politica mejora indicadores, pero sus efectos reales aparecen semanas despues.",
    answer: "retardo",
    feedback: "Hay retardo: la respuesta del sistema no es inmediata."
  },
  {
    text: "Mas capacitacion reduce errores; menos errores libera tiempo para seguir capacitando.",
    answer: "reforzador",
    feedback: "Es reforzador: la mejora inicial crea condiciones para mas mejora."
  },
  {
    text: "Si una sala se calienta, el aire acondicionado se activa hasta volver a la temperatura deseada.",
    answer: "balanceador",
    feedback: "Es balanceador: busca estabilidad alrededor de un objetivo."
  }
];

const glossaryItems = [
  {
    term: "Totalidad",
    clue: "No se entiende el sistema mirando piezas sueltas.",
    question: "Que cambia en el conjunto si modifico una parte?"
  },
  {
    term: "Sinergia",
    clue: "La cooperacion produce un resultado superior o distinto.",
    question: "Que aparece gracias a la coordinacion entre elementos?"
  },
  {
    term: "Interdependencia",
    clue: "Cada elemento afecta y es afectado por otros.",
    question: "Que parte se altera si falla este componente?"
  },
  {
    term: "Limites",
    clue: "Distinguen sistema, subsistemas y entorno.",
    question: "Que queda dentro del analisis y que queda fuera?"
  },
  {
    term: "Retroalimentacion",
    clue: "La salida vuelve como informacion util.",
    question: "El resultado corrige, estabiliza o amplifica el proceso?"
  },
  {
    term: "Emergencia",
    clue: "Aparecen patrones que ninguna parte controla sola.",
    question: "Que comportamiento nace de la red de relaciones?"
  },
  {
    term: "Entropia",
    clue: "Tendencia al desorden si no entra informacion o energia util.",
    question: "Que senales muestran perdida de organizacion?"
  },
  {
    term: "Equifinalidad",
    clue: "Caminos diferentes pueden llegar al mismo resultado.",
    question: "Hay varias rutas validas para alcanzar la meta?"
  },
  {
    term: "Jerarquia",
    clue: "Sistemas dentro de sistemas mayores.",
    question: "Cuales son los subsistemas y el suprasistema?"
  },
  {
    term: "Resiliencia",
    clue: "Capacidad de adaptarse sin perder identidad funcional.",
    question: "Como responde el sistema ante una perturbacion?"
  }
];

const progressKeys = ["conceptos", "laboratorio", "mision", "ejercicios", "juegos", "videos", "quiz"];

const icebergCopy = {
  evento: "Evento: las quejas y retrasos son sintomas visibles. Son importantes, pero no explican por si solos la causa.",
  patron: "Patron: las fallas se repiten cada semana y se amplifican cuando cada area decide sin informacion comun.",
  estructura: "Estructura: hay canales de comunicacion debiles, limites confusos y reportes duplicados entre subsistemas.",
  mental: "Modelo mental: cada area cree que optimizar su tarea aislada mejora el todo, aunque el sistema necesita coordinacion."
};

let progressState = readJSON("ova-progress", {});
let lastQuizScore = readJSON("ova-quiz-score", null);

const palette = {
  teal: "#0f766e",
  blue: "#2563eb",
  rose: "#e11d48",
  amber: "#f59e0b",
  green: "#16a34a",
  ink: "#0f172a"
};

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function markProgress(key) {
  if (!progressKeys.includes(key)) return;
  progressState[key] = true;
  writeJSON("ova-progress", progressState);
  updateProgressDock();
}

function updateProgressDock() {
  const completed = progressKeys.filter((key) => progressState[key]).length;
  const percent = Math.round((completed / progressKeys.length) * 100);
  const progress = $("#overall-progress");
  const label = $("#progress-percent");
  const certificateProgress = $("#certificate-progress");
  const certificateQuiz = $("#certificate-quiz");

  if (progress) progress.value = percent;
  if (label) label.textContent = `${percent}%`;
  if (certificateProgress) certificateProgress.textContent = `${percent}%`;
  if (certificateQuiz) {
    certificateQuiz.textContent = lastQuizScore ? `${lastQuizScore.score}/${lastQuizScore.total}` : "Sin quiz";
  }
}

function setupProgressTracker() {
  const sections = progressKeys
    .map((key) => document.getElementById(key))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) markProgress(entry.target.id);
    });
  }, { threshold: 0.45 });

  sections.forEach((section) => observer.observe(section));

  const modal = $("#certificate-modal");
  $("#certificate-button")?.addEventListener("click", () => {
    updateProgressDock();
    modal.hidden = false;
  });
  $("#certificate-close")?.addEventListener("click", () => {
    modal.hidden = true;
  });
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.hidden = true;
  });

  $("#reset-progress")?.addEventListener("click", () => {
    progressState = {};
    lastQuizScore = null;
    writeJSON("ova-progress", progressState);
    writeJSON("ova-quiz-score", lastQuizScore);
    updateProgressDock();
  });

  updateProgressDock();
}

function setupTheme() {
  const storedTheme = localStorage.getItem("ova-theme");
  if (storedTheme) document.documentElement.dataset.theme = storedTheme;

  $("#theme-toggle").addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("ova-theme", nextTheme);
  });
}

function setupExerciseCards() {
  $$(".exercise-card").forEach((card) => {
    const answer = card.dataset.answer;
    const feedback = $(".exercise-feedback", card);

    $$(".choice-row button", card).forEach((button) => {
      button.addEventListener("click", () => {
        markProgress("ejercicios");
        $$(".choice-row button", card).forEach((item) => item.classList.remove("is-correct", "is-wrong"));
        const isCorrect = button.dataset.choice === answer;
        button.classList.add(isCorrect ? "is-correct" : "is-wrong");
        feedback.textContent = isCorrect
          ? "Correcto. Identificaste la propiedad sistemica central del caso."
          : "Revisa el caso: busca si habla de informacion que vuelve, patrones emergentes o caminos alternativos.";
      });
    });
  });
}

function setupGlossary() {
  const list = $("#glossary-list");
  const search = $("#glossary-search");
  if (!list || !search) return;

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const filtered = glossaryItems.filter((item) => {
      return [item.term, item.clue, item.question].join(" ").toLowerCase().includes(query);
    });

    list.innerHTML = filtered.map((item) => `
      <article class="glossary-item">
        <strong>${item.term}</strong>
        <span>${item.clue}</span>
        <small>${item.question}</small>
      </article>
    `).join("");

    if (filtered.length === 0) {
      list.innerHTML = `<article class="glossary-item"><strong>Sin resultados</strong><span>Prueba con otro termino del tema.</span></article>`;
    }
  };

  search.addEventListener("input", () => {
    markProgress("conceptos");
    render();
  });
  render();
}

function drawNetwork(canvas, options = {}) {
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const nodes = [
    { x: .18, y: .22, label: "Limites", color: palette.blue },
    { x: .42, y: .18, label: "Entorno", color: palette.green },
    { x: .68, y: .22, label: "Feedback", color: palette.teal },
    { x: .82, y: .48, label: "Emergencia", color: palette.rose },
    { x: .62, y: .74, label: "Sinergia", color: palette.amber },
    { x: .30, y: .72, label: "Entropia", color: palette.rose },
    { x: .18, y: .48, label: "Jerarquia", color: palette.blue },
    { x: .50, y: .46, label: "Sistema", color: palette.teal, core: true }
  ];
  const links = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [0, 1], [2, 3], [4, 5], [6, 0], [1, 2]];
  const time = performance.now() / 1000;
  const pulse = options.pulse ?? 1;
  const noise = options.noise ?? 0.2;

  context.clearRect(0, 0, width, height);
  context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim() || "#fff";
  context.fillRect(0, 0, width, height);

  links.forEach(([from, to], index) => {
    const start = nodes[from];
    const end = nodes[to];
    const startX = start.x * width + Math.sin(time + index) * 8 * noise;
    const startY = start.y * height + Math.cos(time + index) * 8 * noise;
    const endX = end.x * width + Math.cos(time * .9 + index) * 8 * noise;
    const endY = end.y * height + Math.sin(time * .9 + index) * 8 * noise;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = `rgba(51, 65, 85, ${0.14 + pulse * 0.22})`;
    context.lineWidth = 2 + pulse * 2;
    context.stroke();
  });

  nodes.forEach((node, index) => {
    const x = node.x * width + Math.sin(time * 1.5 + index) * 10 * noise;
    const y = node.y * height + Math.cos(time * 1.2 + index) * 10 * noise;
    const radius = node.core ? 58 : 38;

    context.beginPath();
    context.arc(x, y, radius + 14 * pulse, 0, Math.PI * 2);
    context.fillStyle = `${node.color}24`;
    context.fill();

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = node.color;
    context.fill();

    context.fillStyle = "#ffffff";
    context.font = node.core ? "800 20px system-ui" : "800 14px system-ui";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(node.label, x, y);
  });
}

function setupHeroCanvas() {
  const canvas = $("#system-canvas");
  if (!canvas) return;
  const animate = () => {
    drawNetwork(canvas, { pulse: .5 + Math.sin(performance.now() / 650) * .2, noise: .45 });
    requestAnimationFrame(animate);
  };
  animate();
}

function setupLab() {
  const canvas = $("#lab-canvas");
  if (!canvas) return;

  const controls = {
    coupling: $("#control-coupling"),
    feedback: $("#control-feedback"),
    noise: $("#control-noise")
  };

  const update = (shouldMark = false) => {
    if (shouldMark) markProgress("laboratorio");
    const coupling = Number(controls.coupling.value);
    const feedback = Number(controls.feedback.value);
    const noise = Number(controls.noise.value);
    const stability = Math.max(0, Math.min(100, Math.round((feedback * .55 + coupling * .35) - noise * .35)));
    const emergence = Math.max(0, Math.min(100, Math.round(coupling * .62 + feedback * .28 + noise * .12)));
    const entropy = Math.max(0, Math.min(100, Math.round(noise * .78 + (100 - feedback) * .22)));

    $("#metric-stability").textContent = `${stability}%`;
    $("#metric-emergence").textContent = `${emergence}%`;
    $("#metric-entropy").textContent = `${entropy}%`;

    const message = entropy > 65
      ? "El entorno esta introduciendo demasiado ruido: conviene mejorar informacion y coordinacion."
      : emergence > 70
        ? "La red muestra alta emergencia: observa patrones que no dependen de una sola parte."
        : "El sistema mantiene balance entre conectividad, feedback y ruido externo.";
    $("#lab-feedback").textContent = message;

    drawNetwork(canvas, { pulse: coupling / 100, noise: noise / 80 });
  };

  Object.values(controls).forEach((control) => control.addEventListener("input", () => update(true)));
  update();
}

function setupMatchGame() {
  const bank = $(".term-bank");
  const resetButton = $("#reset-match");
  const score = $("#match-score");
  let dragged = null;
  let selectedChip = null;

  function refreshScore() {
    const correct = $$(".drop-zone.correct").length;
    score.textContent = `Puntaje: ${correct}/4`;
  }

  function placeChip(chip, zone) {
    markProgress("juegos");
    zone.classList.remove("over", "correct", "wrong");
    zone.appendChild(chip);
    const isCorrect = chip.dataset.match === zone.dataset.answer;
    zone.classList.add(isCorrect ? "correct" : "wrong");
    chip.classList.remove("selected");
    selectedChip = null;
    refreshScore();
  }

  $$(".term-chip").forEach((chip) => {
    chip.addEventListener("dragstart", () => {
      dragged = chip;
    });

    chip.addEventListener("click", () => {
      $$(".term-chip").forEach((item) => item.classList.remove("selected"));
      selectedChip = selectedChip === chip ? null : chip;
      if (selectedChip) selectedChip.classList.add("selected");
    });
  });

  $$(".drop-zone").forEach((zone) => {
    zone.addEventListener("click", () => {
      if (selectedChip) placeChip(selectedChip, zone);
    });

    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("over");
    });

    zone.addEventListener("dragleave", () => zone.classList.remove("over"));

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      if (!dragged) return;
      placeChip(dragged, zone);
    });
  });

  resetButton.addEventListener("click", () => {
    $$(".drop-zone").forEach((zone) => zone.classList.remove("correct", "wrong", "over"));
    $$(".term-chip").forEach((chip) => {
      chip.classList.remove("selected");
      bank.appendChild(chip);
    });
    selectedChip = null;
    refreshScore();
  });
}

function setupLoopGame() {
  const scenario = $("#loop-scenario");
  const options = $("#loop-options");
  const feedback = $("#loop-feedback");
  const count = $("#loop-count");
  let index = 0;
  let score = 0;

  function render() {
    const current = loopScenarios[index];
    scenario.textContent = current.text;
    count.textContent = `${index + 1}/${loopScenarios.length}`;
    options.innerHTML = "";
    ["reforzador", "balanceador", "retardo"].forEach((type) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = type === "retardo" ? "Retardo" : `Bucle ${type}`;
      button.addEventListener("click", () => {
        markProgress("juegos");
        const isCorrect = type === current.answer;
        if (isCorrect) score += 1;
        feedback.textContent = `${isCorrect ? "Correcto." : "Casi."} ${current.feedback} Puntaje: ${score}/${loopScenarios.length}`;
        setTimeout(() => {
          index = (index + 1) % loopScenarios.length;
          if (index === 0) score = 0;
          render();
        }, 1600);
      });
      options.appendChild(button);
    });
  }

  render();
}

function setupBuilderGame() {
  const budgetNode = $("#builder-budget");
  const resilienceNode = $("#builder-resilience");
  const entropyNode = $("#builder-entropy");
  const feedback = $("#builder-feedback");
  let budget = 10;
  let resilience = 30;
  let entropy = 40;

  const actions = {
    feedback: { cost: 3, resilience: 22, entropy: -8, text: "La retroalimentacion permite corregir antes de que el problema crezca." },
    training: { cost: 2, resilience: 14, entropy: -5, text: "La capacitacion mejora coordinacion y reduce errores repetidos." },
    automation: { cost: 4, resilience: 18, entropy: 8, text: "La automatizacion aumenta capacidad, pero puede crear rigidez si no se gobierna." },
    rules: { cost: 2, resilience: 10, entropy: -10, text: "Reglas claras reducen ambiguedad y sostienen limites sanos." }
  };

  function update() {
    budgetNode.textContent = budget;
    resilienceNode.value = resilience;
    entropyNode.value = entropy;
    if (budget <= 0) {
      const status = resilience >= 70 && entropy <= 45
        ? "Excelente arquitectura: alta resiliencia y entropia controlada."
        : "Buen intento. Revisa el equilibrio entre mejoras rapidas y orden sostenible.";
      feedback.textContent = status;
    }
  }

  $$(".builder-actions button").forEach((button) => {
    button.addEventListener("click", () => {
      markProgress("juegos");
      const action = actions[button.dataset.action];
      if (budget < action.cost) {
        feedback.textContent = "No hay puntos suficientes para esa accion.";
        return;
      }
      budget -= action.cost;
      resilience = Math.max(0, Math.min(100, resilience + action.resilience));
      entropy = Math.max(0, Math.min(100, entropy + action.entropy));
      feedback.textContent = action.text;
      update();
    });
  });

  update();
}

function drawRadar(selectedProperties = []) {
  const canvas = $("#radar-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 8;
  const radius = Math.min(width, height) * .34;
  const axes = [
    ["Conexion", "interdependencia"],
    ["Feedback", "retroalimentacion"],
    ["Orden", "entropia"],
    ["Frontera", "limites"],
    ["Niveles", "jerarquia"],
    ["Rutas", "equifinalidad"]
  ];
  const values = axes.map(([, key]) => {
    if (key === "entropia") return selectedProperties.includes(key) ? .82 : .24;
    return selectedProperties.includes(key) ? .86 : .28;
  });

  context.clearRect(0, 0, width, height);
  context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim() || "#fff";
  context.fillRect(0, 0, width, height);

  for (let level = 1; level <= 4; level += 1) {
    context.beginPath();
    axes.forEach((_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index / axes.length);
      const x = centerX + Math.cos(angle) * radius * level / 4;
      const y = centerY + Math.sin(angle) * radius * level / 4;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.strokeStyle = "rgba(100, 116, 139, .26)";
    context.lineWidth = 1;
    context.stroke();
  }

  axes.forEach(([label], index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index / axes.length);
    const x = centerX + Math.cos(angle) * (radius + 38);
    const y = centerY + Math.sin(angle) * (radius + 24);
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    context.strokeStyle = "rgba(51, 65, 85, .22)";
    context.stroke();
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#0f172a";
    context.font = "800 14px system-ui";
    context.textAlign = "center";
    context.fillText(label, x, y);
  });

  context.beginPath();
  values.forEach((value, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index / axes.length);
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.closePath();
  context.fillStyle = "rgba(15, 118, 110, .24)";
  context.strokeStyle = palette.teal;
  context.lineWidth = 3;
  context.fill();
  context.stroke();
}

function setupMission() {
  const options = $$(".mission-options button");
  const analyze = $("#analyze-mission");
  const result = $("#mission-result");
  const score = $("#mission-score");
  const caption = $("#radar-caption");
  const correctTotal = options.filter((button) => button.dataset.correct === "true").length;

  const selectedProperties = () => options
    .filter((button) => button.classList.contains("selected"))
    .map((button) => button.dataset.property);

  const updateMissionScore = () => {
    const selected = options.filter((button) => button.classList.contains("selected"));
    const correct = selected.filter((button) => button.dataset.correct === "true").length;
    const wrong = selected.filter((button) => button.dataset.correct !== "true").length;
    score.textContent = `${Math.max(0, correct - wrong)}/${correctTotal}`;
    drawRadar(selectedProperties());
  };

  options.forEach((button) => {
    button.addEventListener("click", () => {
      markProgress("mision");
      button.classList.toggle("selected");
      updateMissionScore();
    });
  });

  analyze.addEventListener("click", () => {
    markProgress("mision");
    const selected = options.filter((button) => button.classList.contains("selected"));
    const correct = selected.filter((button) => button.dataset.correct === "true").length;
    const wrong = selected.filter((button) => button.dataset.correct !== "true").length;
    const finalScore = Math.max(0, correct - wrong);
    const level = finalScore >= 4 ? "Diagnostico solido" : finalScore >= 2 ? "Diagnostico en progreso" : "Diagnostico incompleto";
    result.innerHTML = `
      <strong>${level}: ${finalScore}/${correctTotal}</strong>
      <p>Intervencion recomendada: crear un tablero comun de informacion, definir limites de responsabilidad, abrir ciclos cortos de retroalimentacion y reducir reportes duplicados para bajar entropia.</p>
      <p>Justificacion: el problema no esta en una persona aislada, sino en relaciones, flujos de informacion y coordinacion entre subsistemas.</p>
    `;
    caption.textContent = finalScore >= 4
      ? "El radar muestra una lectura consistente: detectaste relaciones, feedback, limites y entropia."
      : "El radar aun tiene huecos: vuelve al caso y busca relaciones entre areas, informacion y niveles.";
  });

  $$("#iceberg-layers button").forEach((button) => {
    button.addEventListener("click", () => {
      $$("#iceberg-layers button").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      $("#iceberg-text").textContent = icebergCopy[button.dataset.layer];
      markProgress("mision");
    });
  });

  updateMissionScore();
}

function setupQuiz() {
  const container = $("#quiz-questions");
  const form = $("#quiz-form");
  const result = $("#quiz-result");

  quizQuestions.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "question-card";
    const options = item.options.map((option) => `
      <label>
        <input type="radio" name="question-${index}" value="${option}">
        <span>${option}</span>
      </label>
    `).join("");
    card.innerHTML = `
      <fieldset>
        <legend>${index + 1}. ${item.question}</legend>
        ${options}
      </fieldset>
    `;
    container.appendChild(card);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const details = [];

    quizQuestions.forEach((item, index) => {
      const selected = $(`input[name="question-${index}"]:checked`);
      const isCorrect = selected?.value === item.answer;
      if (isCorrect) score += 1;
      details.push(`<li>${index + 1}. ${isCorrect ? "Correcta" : "Incorrecta"}: ${item.feedback}</li>`);
    });

    const percent = Math.round((score / quizQuestions.length) * 100);
    lastQuizScore = { score, total: quizQuestions.length, percent };
    writeJSON("ova-quiz-score", lastQuizScore);
    markProgress("quiz");
    const message = percent >= 80
      ? "Dominio alto. Estas listo para sustentar el tema con seguridad."
      : percent >= 60
        ? "Buen avance. Repasa emergencia, entropia y equifinalidad."
        : "Conviene volver a conceptos y juegos antes de presentar.";

    result.classList.add("show");
    result.innerHTML = `
      <h3>Resultado: ${score}/${quizQuestions.length} (${percent}%)</h3>
      <p>${message}</p>
      <ol>${details.join("")}</ol>
    `;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  $("#reset-quiz").addEventListener("click", () => {
    form.reset();
    result.classList.remove("show");
    result.innerHTML = "";
    lastQuizScore = null;
    writeJSON("ova-quiz-score", lastQuizScore);
    updateProgressDock();
  });
}

function setupMetadata() {
  $("#year").textContent = new Date().getFullYear();
  fetch("/api/metadata")
    .then((response) => response.ok ? response.json() : null)
    .then((metadata) => {
      if (metadata?.autor) {
        document.title = `${metadata.titulo} | ${metadata.autor}`;
      }
    })
    .catch(() => {});
}

function init() {
  setupProgressTracker();
  setupTheme();
  setupMetadata();
  setupHeroCanvas();
  setupLab();
  setupGlossary();
  setupExerciseCards();
  setupMatchGame();
  setupLoopGame();
  setupBuilderGame();
  setupMission();
  setupQuiz();
}

document.addEventListener("DOMContentLoaded", init);
