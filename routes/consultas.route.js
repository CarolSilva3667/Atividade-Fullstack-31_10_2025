const express = require("express");
const router = express.Router();

const consultasController = require("../controllers/consultas.controller");

router.get("/consultas", consultasController.listar);
router.get("/consulta/:id", consultasController.buscar);
router.post("/consulta", consultasController.cadastrarFuncionarios);
router.post("/consulta",consultasController.Login);
router.put("/consulta",consultasController.atualizar);
router.delete("/consulta/:id", consultasController.apagar);

module.exports = router;
