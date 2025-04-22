// Importa el módulo Express para crear la aplicación web.
const express = require('express');

// Importa el módulo path para trabajar con rutas de archivos y directorios.
const path = require('path');

// Importa el paquete dotenv para cargar variables de entorno.
const dotenv = require('dotenv');

// Importa la configuración de la conexión a la base de datos.
const db = require('./src/config/db'); // Conexión a la base de datos

// Cargar las variables de entorno desde el archivo '.env'.
dotenv.config();

// Inicializar la aplicación Express.
const app = express();

// 📌 Middlewares
// Middleware para poder manejar solicitudes con cuerpos en formato JSON.
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'.
// Esto permite que archivos como imágenes, CSS y JavaScript se sirvan directamente desde esta carpeta.
app.use(express.static(path.join(__dirname, 'public')));

// 📌 Rutas
// Ruta principal que responde con el archivo 'index.html' ubicado en la carpeta 'public'.
// Esto generalmente se usa para servir la interfaz de usuario.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Servir la interfaz de usuario
});

// Importar las rutas relacionadas con los usuarios.
const userRoutes = require('./src/routes/userRoutes'); // Importar rutas de usuarios

// Definir el prefijo '/api/users' para todas las rutas de 'userRoutes'.
// Esto significa que cualquier ruta relacionada con usuarios comenzará con '/api/users'.
app.use('/api/users', userRoutes);

// Exportar la aplicación para que pueda ser utilizada por otros archivos.
module.exports = app; // Exportar la app
