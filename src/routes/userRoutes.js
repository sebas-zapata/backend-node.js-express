const express = require('express'); // Importa Express
const router = express.Router(); // Crea una nueva instancia del router de Express
const userController = require('../controllers/userController'); // Importa el controlador de usuarios

// Definir rutas
router.get('/', userController.getUsers); // Ruta para obtener todos los usuarios
router.get('/:id', userController.getUserById); // Ruta para obtener un usuario por ID
router.post('/', userController.createUser); // Ruta para crear un nuevo usuario
router.put('/:id', userController.updateUser); // Ruta para actualizar un usuario por ID
router.delete('/:id', userController.deleteUser); // Ruta para eliminar un usuario por ID

module.exports = router; // Exporta el router para que se pueda usar en otros archivos
