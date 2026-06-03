# Frontend Taller Mecánico ERP

Frontend completo en React + TailwindCSS adaptado al backend Express/MongoDB incluido en el ZIP original.

## Backend analizado

- Puerto del backend: `4001`.
- Base API: `http://localhost:4001/api`.
- Autenticación: JWT guardado en cookie `token` con `withCredentials: true`.
- Perfil autenticado: `GET /api/users/mi-cuenta`.
- No se modificó el backend.

## Entidades detectadas

| Entidad | Modelo | Endpoints existentes | Operaciones soportadas por el backend |
|---|---|---|---|
| Usuario | `Usuario` | `/api/auth/*`, `/api/users/mi-cuenta` | registro, login, logout, ver perfil, editar perfil |
| Vehículo | `Vehiculo` | `/api/vehiculos` | listar, crear, eliminar |
| Cita | `Cita` | `/api/citas` | listar, crear, actualizar estado/costo/horas como admin |
| Servicio | `Servicio` | `/api/servicios` | listar, crear como admin |
| Marca | `Marca` | `/api/marcas` | listar, crear como admin |
| Modelo | `Modelo` | `/api/modelos` | listar, crear como admin |
| Motor | `Motor` | `/api/motores` | listar, crear como admin |

> Nota importante: el backend no expone `PUT`/`DELETE` para Servicios, Marcas, Modelos ni Motores, ni `DELETE` para Citas. El frontend respeta esa arquitectura y no inventa endpoints inexistentes.

## Estructura

```txt
src/
├── assets
├── components
│   ├── common
│   ├── forms
│   └── table
├── context
├── hooks
├── layouts
├── pages
├── routes
├── services
├── styles
└── utils
```

## Instalación

```bash
cd taller_frontend_completo
npm install
cp .env.example .env
npm run dev
```

## Variables de entorno

```env
VITE_API_URL=http://localhost:4001/api
```

## Requisitos para que funcione la sesión

En el `.env` del backend, asegúrate de que el frontend esté permitido por CORS:

```env
BASE_URL_FRONTEND=http://localhost:5173
BASE_URL_BACKEND=http://localhost:4001
ENVIRONMENT=local
```

Después inicia el backend:

```bash
cd backend
npm install
npm run dev
```

Y luego el frontend:

```bash
cd taller_frontend_completo
npm install
npm run dev
```
