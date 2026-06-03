# OVA - Propiedades de los sistemas

Objeto Virtual de Aprendizaje para la asignatura Teoria General de Sistemas.

- **Tema:** 6. Propiedades de los sistemas
- **Autor:** Gelves Triana Sebastian
- **Formato:** pagina web HTML, CSS y JavaScript servida con Python
- **Ejecucion local:** localhost

## Como ejecutar

```powershell
python app.py
```

Abre en el navegador:

```text
http://127.0.0.1:8000
```

Si quieres que Python abra el navegador automaticamente:

```powershell
python app.py --open
```

## Requisitos de la rubrica cubiertos

- Contextualizacion del tema y justificacion de importancia.
- Explicacion conceptual y teorica con referencias academicas.
- Ejemplos practicos aplicados a casos reales.
- Ejercicios con retroalimentacion inmediata.
- Tres juegos interactivos: conecta la propiedad, caza bucles y arquitecto del sistema.
- Tres videos reales de YouTube curados y enlaces directos verificados.
- Mision integradora "Campus Vivo" con diagnostico y radar sistemico.
- Glosario buscable para apoyar la sustentacion.
- Pasaporte de progreso con credencial imprimible.
- Quiz interactivo con puntaje automatico y retroalimentacion.
- Diseno responsive para escritorio y movil.
- Pagina de creditos con autoria, herramientas y referencias.
- Ficha tecnica del proyecto en `docs/ficha_tecnica_ova.pdf`.

## Publicacion web

La OVA es compatible con GitHub Pages, Netlify o Vercel porque el contenido principal esta en `index.html`, `assets/styles.css`, `assets/app.js` y `assets/system-network.svg`.

Para GitHub Pages:

1. Sube el repositorio a GitHub.
2. Entra en **Settings > Pages**.
3. Selecciona la rama principal y la carpeta raiz.
4. Publica el enlace generado por GitHub Pages.

## Estructura

```text
.
|-- app.py
|-- index.html
|-- assets/
|   |-- app.js
|   |-- styles.css
|   `-- system-network.svg
|-- docs/
|   `-- ficha_tecnica_ova.pdf
`-- tools/
    `-- generate_ficha_pdf.py
```

## Referencias base

- von Bertalanffy, L. (1968). *General System Theory: Foundations, Development, Applications*. George Braziller.
- Meadows, D. H. (2008). *Thinking in Systems: A Primer*. Chelsea Green Publishing.
- Checkland, P. (1981). *Systems Thinking, Systems Practice*. John Wiley & Sons.
- Arnold, R. D., & Wade, J. P. (2015). A Definition of Systems Thinking: A Systems Approach. *Procedia Computer Science, 44*, 669-678. https://doi.org/10.1016/j.procs.2015.03.050

## Videos verificados

- In a World of Systems: https://www.youtube.com/watch?v=A_BtS008J0k
- Dana Meadows Sustainable Systems, parte 1: https://www.youtube.com/watch?v=HMmChiLZZHg
- Dana Meadows Sustainable Systems, parte 2: https://www.youtube.com/watch?v=HuIoego-xVc
- Recursos del Donella Meadows Project: https://donellameadows.org/systems-thinking-resources/
