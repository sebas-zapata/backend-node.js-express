const db = require('../config/db'); // Importamos la conexión

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(results[0]);
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { name, apellido, telefono, email } = req.body;
    db.query('INSERT INTO users (name, apellido, telefono, email) VALUES (?, ?, ?, ?)', [name, apellido, telefono, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuario creado", id: result.insertId });
    });
};

// Actualizar un usuario por ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, apellido, telefono, email } = req.body;
    db.query('UPDATE users SET name = ?, apellido = ?, telefono = ?, email = ? WHERE id = ?', [name, apellido, telefono, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario actualizado" });
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
    });
};
