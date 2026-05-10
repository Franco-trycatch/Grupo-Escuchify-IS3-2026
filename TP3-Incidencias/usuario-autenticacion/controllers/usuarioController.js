const bcrypt = require("bcrypt");
const db = require("../config/database");

const registro = async (req, res) => {
    try {
        const { email, password, nombre, apellido } = req.body;

        const [existentes] = await db.query("SELECT id_usuario FROM Usuario WHERE email = ?", [email]);
        if (existentes.length > 0) {
            return res.status(409).json({ error: "EMAIL_DUPLICADO", message: "El email ya está registrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const [result] = await db.query(
            "INSERT INTO Usuario (email, password_hash, nombre, apellido) VALUES (?, ?, ?, ?)",
            [email, password_hash, nombre, apellido]
        );

        res.status(201).json({ id_usuario: result.insertId, email });
    } catch (error) {
        res.status(500).json({ error: "ERROR_INTERNO", message: "Error al registrar usuario" });
    }
};

module.exports = { registro };
