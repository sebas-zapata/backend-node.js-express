const app = require('./app'); // Importar la configuración de Express
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
