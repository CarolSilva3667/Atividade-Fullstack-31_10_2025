require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;

const pacientesRoutes = require('./src/routes/pacientes');
const consultasRoutes = require('./src/routes/consultas');
const usuariosRoutes = require('./src/routes/usuarios');

app.use(express.json());

app.use(pacientesRoutes);
app.use(consultasRoutes);
app.use(usuariosRoutes);

app.listen(port, () => {
    console.log('listening on ' + port);
});