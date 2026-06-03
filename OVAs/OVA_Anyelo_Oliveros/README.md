# OVA - Teoría General de Sistemas (TGS)

## Descripción

**Objeto Virtual de Aprendizaje (OVA)** completo e interactivo sobre **Teoría General de Sistemas** diseñado para estudiantes universitarios.

Plataforma educativa moderna, responsive y profesional que implementa conceptos clave de TGS a través de una experiencia visual atractiva e interactiva.

---

## Características Principales

### Diseño Moderno
- **Glassmorphism**: Efectos visuales modernos con transparencias
- **Tema Oscuro/Claro**: Toggle de tema persistente (localStorage)
- **Responsivo**: Funciona perfectamente en móviles, tablets y PC
- **Animaciones Suaves**: Transiciones CSS3 fluidas y naturales
- **Colores Tecnológicos**: Azul oscuro, cian, morado y blanco

### Contenido Educativo
- **13 Conceptos Fundamentales** explicados de forma clara y visual
- **6 Ejemplos Reales** de sistemas aplicados (Netflix, Hospital, Universidad, etc.)
- **2 Juegos Interactivos** para aprender jugando
- **Quiz Evaluativo** con 10 preguntas y temporizador
- **Videos Multimedia** de YouTube embebidos
- **Referencias Bibliográficas** académicas

### Interactividad
1. **Juego 1 - Matching de Conceptos**
   - Relaciona conceptos con definiciones
   - Sistema de puntuación
   - Feedback visual instantáneo

2. **Juego 2 - Clasificación de Sistemas**
   - Clasifica sistemas en abiertos o cerrados
   - Drag and drop interactivo
   - Temporizador

3. **Quiz Interactivo**
   - 10 preguntas de opción múltiple
   - Temporizador de 5 minutos
   - Retroalimentación instantánea
   - Pantalla de resultados detallada
   - Cálculo de porcentaje y tiempo

---

## Estructura del Proyecto

```
OVA/
├── index.html           # Archivo HTML principal
├── css/
│   └── styles.css       # Estilos completos (CSS3 moderno)
├── js/
│   └── script.js        # Lógica interactiva (JavaScript Vanilla)
├── assets/              # Carpeta para recursos futuros
└── README.md           # Este archivo
```

---

## Cómo Usar

### Opción 1: Abrir directamente en el navegador
```bash
# En Windows
start index.html

# En macOS
open index.html

# En Linux
xdg-open index.html
```

### Opción 2: Usar un servidor local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server

# Luego abre en el navegador: http://localhost:8000
```

### Opción 3: Live Server en VS Code
1. Instala la extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## Características Visuales

### Colores Principales
- **Color Primario**: `#0f3460` (Azul oscuro)
- **Color Secundario**: `#00d4ff` (Cian)
- **Color Accent**: `#a855f7` (Morado)
- **Color Fondo Claro**: `#f5f5f5`
- **Color Blanco**: `#ffffff`

### Tipografía
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Weights**: Regular (400), Semibold (600), Bold (700), ExtraBold (800)

### Efectos
- **Glassmorphism**: Fondos semi-transparentes con blur
- **Sombras**: Suaves y naturales (sm, md, lg)
- **Bordes Redondeados**: 10-15px
- **Transiciones**: Cubic-bezier suave (0.3s)

---

## 📱 Responsividad

### Breakpoints
- **Tablets/Móvil**: 768px
- **Móviles pequeños**: 480px

### Características Responsive
- Navbar colapsable en móviles
- Grid adaptativo
- Texto escalable con `clamp()`
- Botones redimensionados
- Videos responsive con aspect ratio 16:9

---

## Contenido Educativo

### Conceptos Explicados
1. ¿Qué es un Sistema?
2. Entrada (Input)
3. Proceso
4. Salida (Output)
5. Retroalimentación
6. Entorno
7. Límites del Sistema
8. Sistemas Abiertos/Cerrados
9. Subsistemas
10. Entropía
11. Homeostasis
12. Sinergia

### Ejemplos Reales Analizados
- **Netflix**: Sistema de recomendación
- **Hospital**: Sistema de salud
- **Universidad**: Sistema educativo
- **Empresa**: Sistema organizacional
- **Computador**: Sistema técnico
- **Cuerpo Humano**: Sistema biológico

---

## Guía de Juegos

### Juego 1: Matching
**Objetivo**: Asociar cada concepto con su definición correcta

**Instrucciones**:
1. Haz clic en un concepto (lado izquierdo)
2. Haz clic en su definición (lado derecho)
3. Si es correcta: Punto sumado
4. Si es incorrecta: Intenta de nuevo
5. Completa los 6 pares

**Puntuación**: 10 puntos por acierto

### Juego 2: Clasificación
**Objetivo**: Clasificar sistemas como abiertos o cerrados

**Instrucciones**:
1. Se muestra un sistema
2. Tienes 30 segundos por tarjeta
3. Clickea "Sistema Abierto" o "Sistema Cerrado"
4. Obtén retroalimentación inmediata
5. Pasa al siguiente sistema

**Puntuación**: 10 puntos por clasificación correcta

### Quiz
**Objetivo**: Responder 10 preguntas sobre TGS

**Instrucciones**:
1. Haz clic en "Comenzar Quiz"
2. Tienes 60 segundos totales (5 minutos)
3. Lee la pregunta cuidadosamente
4. Selecciona una opción
5. Obtén retroalimentación
6. Pasa a la siguiente pregunta
7. Ver resultados finales

**Características**:
- Barra de progreso
- Temporizador en tiempo real
- Retroalimentación visual (verde/rojo)
- Pantalla de resultados con porcentaje
- Desglose de respuestas

---

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno y responsive
- **JavaScript Vanilla**: Interactividad sin frameworks
- **Font Awesome 6.4**: Iconografía moderna

### Características Técnicas
- LocalStorage para persistencia de tema
- Intersection Observer para scroll animations
- Event listeners optimizados
- Código modular y comentado
- Media queries para responsividad

---

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
    --color-primary: #0f3460;
    --color-secondary: #00d4ff;
    --color-accent: #a855f7;
    /* ... */
}
```

### Agregar Nuevas Preguntas al Quiz
En `js/script.js`, encuentra el array `quizData` y agrega objetos:
```javascript
{
    question: "¿Tu pregunta?",
    options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    correct: 0  // índice de la respuesta correcta
}
```

### Modificar Juegos
Los juegos usan datos que puedes modificar:
- `matchingData`: Conceptos y definiciones
- `systemsData`: Sistemas para clasificar

---

## Compatibilidad de Navegadores

| Navegador | Versión |Soporte|
|-----------|---------|-------|
| Chrome    | 90+     | Total |
| Firefox   | 88+     | Total |
| Safari    | 14+     | Total |
| Edge      | 90+     | Total |

---

## Competencias Desarrolladas

Después de completar esta OVA, podrás:

Comprender los conceptos sistémicos fundamentales  
Identificar sistemas en contextos reales  
Analizar relaciones input-process-output  
Diferenciar sistemas abiertos y cerrados  
Aplicar pensamiento sistémico  
Reconocer retroalimentación en procesos  

---

## Referencias Bibliográficas

1. Bertalanffy, L. V. (1968). "Teoría General de Sistemas"
2. Senge, P. (1990). "La Quinta Disciplina"
3. Morin, E. (1990). "Introducción al Pensamiento Complejo"
4. Jackson, M. C. (2003). "Systems Thinking: Creative Holism for Managers"
5. Stacey, R. D. (2001). "Complex Responsive Processes in Organizations"
6. Beer, S. (1974). "Designing Freedom"
7. Meadows, D. H. (2008). "Thinking in Systems: A Primer"
8. Laszlo, E. (1972). "The Systems View of the World"
9. Capra, F. (1982). "The Turning Point"
10. Checkland, P. (1981). "Systems Thinking, Systems Practice"

---

## Notas de Desarrollo

### Decisiones de Diseño
- **Sin Backend**: Toda la lógica es cliente-side (JavaScript)
- **Sin Base de Datos**: Datos almacenados en arrays JavaScript
- **LocalStorage**: Para persistencia de tema elegido
- **Responsive First**: Mobile-first approach
- **Accesibilidad**: Semántica HTML, labels, roles ARIA

### Optimizaciones
- CSS minificado conceptualmente (sin minifier)
- JavaScript modular con funciones específicas
- Lazy loading de imágenes de YouTube
- Intersection Observer para animaciones en scroll
- Event delegation donde es posible

---

## Mejoras Futuras

- [ ] Backend con Node.js/Express
- [ ] Base de datos MongoDB
- [ ] Autenticación de usuarios
- [ ] Sistema de seguimiento de progreso
- [ ] Certificación digital
- [ ] Multiplayer en juegos
- [ ] Más contenido multimedia
- [ ] Exportar resultados a PDF

---

## Autor

**ANYELO STEVEN OLIVEROS RIVERA**

- Universidad: Institución de Educación Superior
- Asignatura: Teoría General de Sistemas
- Año: 2026

---

## Licencia

Proyecto educativo. Libre para uso académico.
