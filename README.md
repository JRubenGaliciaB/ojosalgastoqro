# Ojos al gasto Qro
Aplicación ciudadana para explorar el Presupuesto de Egresos de Querétaro 2021–2026. Next.js App Router, TypeScript, React 19, Recharts, Framer Motion y Lucide. CSS propio responsivo, sin frameworks adicionales de estilos.

## Desarrollo
Node 22 o superior. `npm ci`, `npm run dev`. Antes del primer desarrollo ejecutar `node scripts/prepare-data.mjs`.

## Actualizar datos
Reemplazar `public/data/dependencias.xlsx` y `public/data/distribucion.xlsx`, conservando encabezados. `npm run build` convierte los Excel a JSON, valida la distribución anual y genera el sitio estático en `out/`. SheetJS se utiliza únicamente durante prebuild y no se envía al navegador.

`lib/dataLoader.ts` contiene tipos, históricos, agregación y variaciones. El parser distingue totales y detalle; conserva celdas sin dato como null y produce un registro de diferencias entre subtotales y desglose. Los montos originales no se modifican. Los datos proporcionados no incluyen enlaces oficiales de procedencia y se identifican como archivos aportados; no se presentan como gasto ejercido ni como cifras ajustadas por inflación.

## Verificación
`npm run test` valida conciliación anual, igualdad del Sector Central entre archivos y conservación de valores ausentes. `npm run typecheck` valida TypeScript. No se ha medido Lighthouse; no se afirma una puntuación superior a 90.

## GitHub y Vercel
Subir este proyecto a un repositorio propio (sin `.openai/`, `node_modules/`, `.next/` ni `out/`). Importar el repositorio en Vercel, seleccionar Next.js y usar `npm run build`. No requiere secretos ni base de datos. El proyecto no crea automáticamente un repositorio público de GitHub ni un despliegue en una cuenta Vercel.

## Funcionalidad
Selector global 2021–2026 con reproducción; KPIs y tres principales rubros; dona con montos y porcentajes; históricos con datos faltantes; sectores y desglose; rankings absolutos y porcentuales con rango reversible; búsqueda, filtros, ordenamiento y exportación CSV/JSON de la tabla filtrada; descarga de los Excel y metodología con conciliación.

## Rendimiento y accesibilidad
Exportación estática, datos precalculados, iconos selectivos, sin imágenes pesadas, diseño móvil, foco visible, nombres accesibles y animaciones reducidas según preferencia del sistema. Verificar Lighthouse sobre el dominio final. La fuente externa tiene respaldo del sistema. Diagramas complementados por datos tabulares.
