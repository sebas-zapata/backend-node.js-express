// Importa la configuración de Express desde el archivo 'app.js'.
const app = require('./app');

// Importa el paquete dotenv para manejar variables de entorno.
const dotenv = require('dotenv');

// Cargar las variables de entorno definidas en el archivo '.env'.
dotenv.config();

// Define el puerto en el que el servidor escuchará las solicitudes.
// Se toma el valor de la variable de entorno PORT o, si no está definida,
// usa el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Inicia el servidor en el puerto definido.
// El servidor escuchará las peticiones en el puerto especificado y
// al iniciar correctamente, se mostrará un mensaje en consola.
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
