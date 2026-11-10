# WeMo — Atlas financiero

Next.js + React + TypeScript, GSAP/ScrollTrigger y Recharts. Template editorial en español con once capítulos con rutas propias.

## Desarrollo

```sh
npm install
npm run dev
```

## Validación y exportación

```sh
npm run build
```

La exportación estática se genera en `out/`.

## Contenido y datos

El sitio usa `data/workbook.json`, una extracción de la hoja integradora entregada. El Excel original no se publica.

- Líneas de negocio: hoja 1, filas 6 y 7. Los textos vacíos siguen pendientes.
- Costos directos: hoja 2, bloques por línea; cada registro conserva su rango de origen. Se calcula el consumo solo con unidades compatibles.
- Mano de obra y costos indirectos: hojas 3 y 4. La etiqueta y modalidad del último rol de la hoja 3 (B16 y C16) se conservan de la captura previa, pues el Excel las deja vacías.
- Equipamiento: hoja 5, filas 6 y 17–23. La maquinaria se calcula por unidad; los importes de mobiliario y equipo se toman como totales por partida.
- Administración: hoja 6, filas 7–11 y 23–29; I7:L8 contiene los porcentajes por año de los gastos recurrentes.
Ingresos, proyección e indicadores unitarios se mantienen pendientes. El filtro de línea se conserva al navegar entre capítulos durante la sesión.

## Animación

`Shell` centraliza las transiciones de rutas, entradas, ScrollTrigger y hover con GSAP. Respeta `prefers-reduced-motion`, limpia animaciones al cambiar de ruta y conserva navegación con teclado y enlaces con modificadores. Las transiciones entre secciones usan anclas; cada capítulo cuenta además con una página independiente.
