const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { validateRegistro } = require("../validators/usuarioValidator");

router.post("/registro", validateRegistro, usuarioController.registro);

module.exports = router;
