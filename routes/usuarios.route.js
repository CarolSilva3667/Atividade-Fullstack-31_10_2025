const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");

router.get("/usuarios", usuariosController.listar);
router.get("/usuario/:id", usuariosController.buscar);
router.post("/usuario", usuariosController.cadastrarusuario);
router.post("/usuario",usuariosController.Login);
router.put("/usuario",usuariosController.atualizar);
router.delete("/usuario/:id", usuariosController.apagar);

module.exports = router;
