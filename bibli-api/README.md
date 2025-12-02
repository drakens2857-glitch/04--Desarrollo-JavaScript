# Biblioteca - API CRUD (Node.js + Express + MongoDB)

Entrega: proyecto listo para ejecutar y un frontend sencillo (public/index.html).

## Pasos para ejecutar (local)

1. Asegúrate de tener Node.js (v16+) y MongoDB instalados y en ejecución.
2. Copia `.env.example` a `.env` y ajusta `MONGO_URI` si es necesario.
3. Instalación:
   ```bash
   npm install
   ```
4. En desarrollo (con nodemon si lo instalaste):
   ```bash
   npm run dev
   ```
   O en producción:
   ```bash
   npm start
   ```
5. Abre `http://localhost:3000` en tu navegador. El frontend está en `public/index.html`.
6. Endpoints:
   - GET /api/libros
   - POST /api/libros
   - GET /api/libros/:id
   - PUT /api/libros/:id
   - DELETE /api/libros/:id

Este proyecto fue creado mejorando la guía provista por el instructor (SENA).
