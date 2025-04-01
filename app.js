const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./src/config/db'); // Conexión a la base de datos

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// 📌 Middlewares
app.use(express.json()); // Soporte para JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// 📌 Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Servir la interfaz de usuario
});

const userRoutes = require('./src/routes/userRoutes'); // Importar rutas de usuarios
app.use('/api/users', userRoutes);

module.exports = app; // Exportar la app
