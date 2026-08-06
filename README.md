# FAST BURGER - Catálogo React

Catálogo responsive para hamburguesas, broaster, salchipapas y bebidas.

## Requisitos
- Node.js 18 o superior
- npm

## Ejecutar

```bash
npm install
npm run dev
```

Luego abre la URL que indique Vite, normalmente http://localhost:5173

## Generar producción

```bash
npm run build
npm run preview
```

## Cambiar WhatsApp

Abre `src/App.jsx` y cambia:

```js
const WHATSAPP_NUMBER = "51992327662";
```

Coloca tu número con código de país, sin `+`, espacios ni guiones.

## Cambiar productos

Edita `src/data.js`. Ahí están las categorías y productos.

Las fotos de ejemplo son URLs externas. Para producción se recomienda guardar tus propias imágenes en `public/images` o utilizar un servicio de almacenamiento.

La configuración de Vite incluye `@vitejs/plugin-react` para procesar JSX correctamente.
