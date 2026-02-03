# Dashboard de Frutería 🍎

Proyecto web desarrollado con React + Vite + TypeScript y Ant Design para la gestión de inventario de una frutería.

---

## 🚀 Tecnologías utilizadas
- React
- Vite
- TypeScript
- Ant Design v5.29.2
- JSON Server

---

## 📋 Funcionalidades
- Gestión de productos (agregar, editar y eliminar)
- Control de stock en tiempo real
- Registro de entradas (incremento automático del stock)
- Registro de salidas (validación para evitar stock negativo)
- Control de caducidad con indicadores visuales
- Dashboard con estadísticas generales

---

## ⚙️ Requisitos
- Node.js v18 o superior
- npm

---

## 📦 Instalación y ejecución

### 1 Clonar el repositorio
```bash
git clone https://github.com/Mar6vaz/Fruterias.git

### 2 Entrar a la carpeta del proyecto
cd fruteria-dashboard

### 3 Instalar las dependencias
npm install

### ▶️ Ejecución del proyecto
### Iniciar la base de datos (JSON Server)
npx json-server --watch db.json --port 3001
### Iniciar la aplicación web
npm run dev
### Abrir en el navegador:
http://localhost:5173




