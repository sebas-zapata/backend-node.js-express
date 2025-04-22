const mysql = require('mysql2'); // Requiere la librería mysql2
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Crear la conexión con la base de datos usando las variables de entorno
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // El host de la base de datos (definido en .env)
    user: process.env.DB_USER, // El usuario de la base de datos (definido en .env)
    password: process.env.DB_PASSWORD, // La contraseña de la base de datos (definido en .env)
    database: process.env.DB_NAME // El nombre de la base de datos (definido en .env)
});

// Establecer la conexión con MySQL
connection.connect((err) => {
    if (err) {
        console.error("Error al conectar a MySQL:", err); // Si ocurre un error, se muestra el mensaje de error
        return;
    }
    console.log("Conectado a la base de datos MySQL"); // Si la conexión es exitosa, se muestra este mensaje
});

// Exportar la conexión para poder usarla en otros archivos
module.exports = connection;
