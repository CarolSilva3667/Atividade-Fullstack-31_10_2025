const express = require("express");
const router = express.Router();

const pacientesController = require("../controllers/pacientes.controller");

router.get("/pacientes", pacientesController.listar);
router.get("/pacientes/:id", pacientesController.buscar);
router.post("/paciente", pacientesController.cadastrarpacientes);
router.post("/paciente",pacientesController.Login);
router.delete("/paciente/:id", pacientesController.apagar);
router.put("/paciente",pacientesController.atualizar);

module.exports = router;
