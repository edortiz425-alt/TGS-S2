# 🧩 OVA — Tipos de Sistemas | Teoría General de Sistemas (TGS)

> **Objeto Virtual de Aprendizaje** desarrollado como proyecto final de corte para la asignatura **Teoría General de Sistemas** — Universidad Simón Bolívar, Cúcuta · 2025-2026.

---

## 📌 Descripción General

Esta OVA es una página web interactiva que enseña y evalúa los **tipos de sistemas** definidos en la Teoría General de Sistemas: dinámicos, estáticos, adaptativos, abiertos, cerrados, deterministas, probabilísticos y complejos.

Fue desarrollada íntegramente en **HTML5, CSS3 y JavaScript puro** (sin frameworks ni dependencias externas), con diseño responsive y paleta visual azul-verde-negro.

---

## 🎯 Objetivos

### General
Diseñar e implementar una OVA funcional, accesible y didáctica que permita comprender y enseñar los tipos de sistemas de la Teoría General de Sistemas.

### Específicos
- Investigar y sintetizar el marco conceptual de los tipos de sistemas a partir de fuentes académicas confiables.
- Aplicar principios de diseño instruccional y experiencia de usuario (UX).
- Desarrollar contenidos interactivos: juegos, ejercicios y quiz con retroalimentación automática.
- Publicar la OVA en una plataforma web pública.
- Sustentar oralmente el proyecto demostrando dominio del tema.

---

## 🗂️ Estructura del Proyecto

```
ova-tipos-sistemas/
│
├── index.html          # Página principal — toda la estructura de la OVA
├── styles.css          # Estilos: paleta, layout, animaciones, responsive
├── scripts.js          # Lógica: juegos, ejercicios, quiz interactivo
└── README.md           # Este archivo
```

---

## 📚 Contenido de la OVA

| # | Sección | Descripción |
|---|---------|-------------|
| 01 | **Hero / Portada** | Presentación animada con etiquetas de los 7 tipos de sistemas |
| 02 | **Contextualización** | Justificación e importancia de clasificar los sistemas (Bertalanffy) |
| 03 | **Marco Conceptual** | 8 tipos de sistemas con definición, fórmulas y referencias |
| 04 | **Tabla Comparativa** | Comparación por 6 criterios: cambio temporal, intercambio, predecibilidad, etc. |
| 05 | **Ejemplos Prácticos** | 8 casos reales: clima, IA, empresa, mercado, robótica, colonia de hormigas… |
| 06 | **Ejercicios** | 3 ejercicios de selección múltiple con retroalimentación inmediata |
| 07 | **Juego 1 — Crucigrama** | Crucigrama 10×9 con 7 términos clave de TGS |
| 08 | **Juego 2 — Une con Líneas** | Conectar tipos de sistemas con sus descripciones (SVG) |
| 09 | **Juego 3 — Ahorcado** | 10 palabras del vocabulario TGS con pistas conceptuales |
| 10 | **Videos** | 5 videos verificados en YouTube sobre TGS y tipos de sistemas |
| 11 | **Quiz Final** | 10 preguntas con puntaje automático (aprobación ≥ 7/10) |
| 12 | **Créditos / Referencias** | Autoría y 7 referencias bibliográficas en formato APA |

---

## 🎮 Juegos Interactivos

### 🧩 Juego 1 — Crucigrama de Sistemas
Crucigrama interactivo de 10 filas × 9 columnas con las palabras:
`DINAMICO` · `ESTATICO` · `ADAPTATIVO` · `ABIERTO` · `CERRADO` · `ENTROPIA` · `EMERGENCIA`

Incluye botones para **verificar**, **limpiar** y **ver solución**.

### 🔗 Juego 2 — Une con Líneas
Relaciona 6 tipos de sistemas (columna izquierda) con su descripción correcta (columna derecha). Al acertar, se traza una **línea SVG curva de color** entre los dos elementos.

### 🎯 Juego 3 — Ahorcado Temático TGS
Adivina términos del vocabulario TGS antes de agotar los 7 intentos. El muñeco se dibuja progresivamente con **SVG**. Palabras incluidas:

`ADAPTATIVO` · `ENTROPIA` · `EMERGENCIA` · `HOMEOSTASIS` · `RETROALIMENTACION` · `DETERMINISTICO` · `NEGUENTROPIA` · `PROBABILISTICO` · `SINERGIA` · `BERTALANFFY`

---

## 🎥 Videos Incluidos

| Tema | ID YouTube | Canal |
|------|-----------|-------|
| TGS de Bertalanffy — Resumen Animado | `QbBy20GPlqc` | Animaciones Académicas |
| Tipos de Sistemas: Abiertos, Cerrados y Aislados | `As-5aUhY7LY` | Física y Química |
| Sistemas Abiertos y Cerrados — Termodinámica | `8f7E6H171EI` | Termodinámica en Español |
| Equilibrio Estático y Dinámico | `FxwSsNcK0aA` | Física Aplicada |
| TGS Resumen Completo (Castellanos / UNAM) | `h8jfnNKVNtg` | UNAM |

---

## 🛠️ Tecnologías Usadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura y maquetación de todas las secciones |
| **CSS3** | Diseño visual, paleta de colores, animaciones y diseño responsive |
| **JavaScript ES6+** | Juegos interactivos, ejercicios y quiz con lógica dinámica |
| **CSS Grid / Flexbox** | Layout adaptable a escritorio, tablet y móvil |
| **SVG** | Dibujo del ahorcado y líneas del juego de conexión |
| **Google Fonts** | Tipografías: Orbitron, Exo 2, Fira Code |
| **YouTube oEmbed** | Miniaturas y enlaces a videos verificados |

> ⚠️ **Sin dependencias externas.** No se usan frameworks (React, Vue, Angular), ni librerías JS (jQuery, Bootstrap). Todo el código es nativo.

---

## 🎨 Diseño Visual

- **Paleta:** Azul `#0077FF` · Verde-azulado `#00C9A7` · Verde neón `#00FF9D` · Fondo oscuro `#050E1A`
- **Tipografía:** Orbitron (títulos) · Exo 2 (cuerpo) · Fira Code (etiquetas técnicas)
- **Estética:** Cyberpunk/tecnológica con grid de fondo, efectos glow y gradientes
- **Responsive:** Adaptable a cualquier tamaño de pantalla mediante CSS Grid y media queries

---

## 🚀 Cómo Usar / Ejecutar

### Opción 1 — Abrir localmente
```bash
# 1. Clona o descarga el repositorio
git clone https://github.com/TU-USUARIO/ova-tipos-sistemas.git

# 2. Entra a la carpeta
cd ova-tipos-sistemas

# 3. Abre index.html en tu navegador
# (doble clic en el archivo o arrástralo al navegador)
```

> No requiere servidor ni instalación de dependencias. Solo un navegador moderno.

### Opción 2 — Publicar en GitHub Pages
```bash
# 1. Sube el repositorio a GitHub
git init
git add .
git commit -m "OVA Tipos de Sistemas - TGS"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/ova-tipos-sistemas.git
git push -u origin main

# 2. En GitHub → Settings → Pages → Branch: main → Save
# 3. Tu OVA estará en: https://TU-USUARIO.github.io/ova-tipos-sistemas/
```

### Opción 3 — Publicar en Netlify (drag & drop)
1. Ve a [netlify.com](https://netlify.com) e inicia sesión.
2. Arrastra la carpeta del proyecto al panel de Netlify.
3. Obtendrás una URL pública en segundos.

---

## 📖 Referencias Bibliográficas

1. Bertalanffy, L. von (1968). *General System Theory: Foundations, Development, Applications.* George Braziller. Nueva York.
2. Ashby, W. R. (1956). *An Introduction to Cybernetics.* Chapman & Hall. Londres.
3. Holland, J. H. (1998). *Emergence: From Chaos to Order.* Addison-Wesley. Reading, MA.
4. Checkland, P. (1981). *Systems Thinking, Systems Practice.* John Wiley & Sons. Chichester.
5. Strogatz, S. H. (1994). *Nonlinear Dynamics and Chaos.* Perseus Books. Cambridge, MA.
6. García, R. (2006). *Sistemas complejos: conceptos, método y fundamentación epistemológica.* Gedisa. Barcelona.
7. Forrester, J. W. (1961). *Industrial Dynamics.* MIT Press. Cambridge, MA.

---

## 👤 Autor

| Campo | Detalle |
|-------|---------|
| **Estudiante** | *(Tu nombre aquí)* |
| **Programa** | Ingeniería de Sistemas |
| **Semestre** | Segundo (2.°) |
| **Asignatura** | Teoría General de Sistemas (TGS) |
| **Institución** | Universidad Simón Bolívar · Cúcuta, Colombia |
| **Año** | 2025 – 2026 |

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la Universidad Simón Bolívar Cúcuta. El contenido conceptual está basado en fuentes bibliográficas citadas. El código fuente puede reutilizarse libremente con fines educativos citando al autor.

---

<div align="center">

**⬡ OVA · Tipos de Sistemas · TGS · Universidad Simón Bolívar Cúcuta**

*Hecho con HTML · CSS · JavaScript*

</div>
