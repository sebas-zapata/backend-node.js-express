const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); // Si hay un error, se responde con código 500 y el mensaje de error
        res.json(results); // Si no hay errores, se devuelve la lista de usuarios en formato JSON
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const { id } = req.params; // Extrae el id del usuario de los parámetros de la URL
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); // Si hay un error, responde con código 500 y mensaje de error
        if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" }); // Si no se encuentra al usuario, responde con código 404
        res.json(results[0]); // Si el usuario se encuentra, devuelve los datos del primer usuario encontrado
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { name, apellido, telefono, email } = req.body; // Extrae los datos del cuerpo de la solicitud
    db.query('INSERT INTO users (name, apellido, telefono, email) VALUES (?, ?, ?, ?)', [name, apellido, telefono, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message }); // Si hay un error, responde con código 500 y mensaje de error
        res.json({ message: "Usuario creado", id: result.insertId }); // Si el usuario se crea correctamente, devuelve el mensaje y el ID del nuevo usuario
    });
};

// Actualizar un usuario por ID
exports.updateUser = (req, res) => {
    const { id } = req.params; // Extrae el id del usuario de los parámetros de la URL
    const { name, apellido, telefono, email } = req.body; // Extrae los datos del cuerpo de la solicitud
    db.query('UPDATE users SET name = ?, apellido = ?, telefono = ?, email = ? WHERE id = ?', [name, apellido, telefono, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message }); // Si hay un error, responde con código 500 y mensaje de error
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" }); // Si no se actualiza ningún registro, responde con código 404
        res.json({ message: "Usuario actualizado" }); // Si la actualización es exitosa, responde con un mensaje de éxito
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
    const { id } = req.params; // Extrae el id del usuario de los parámetros de la URL
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message }); // Si hay un error, responde con código 500 y mensaje de error
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" }); // Si no se elimina ningún registro, responde con código 404
        res.json({ message: "Usuario eliminado" }); // Si la eliminación es exitosa, responde con un mensaje de éxito
    });
};
