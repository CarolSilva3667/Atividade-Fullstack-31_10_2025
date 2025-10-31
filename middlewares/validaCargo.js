const validaAdministrador = (req, res, next) => {
    const cargo = req.headers['user'].cargo;

    if(cargo === "Administrador") {
        next();
    }
    else {
        res.status(401).send("Sem nivel de acesso").end();
    }
};

const validaMedico = (req, res, next) => {
    const cargo = req.headers['user'].cargo;

    if(cargo === 'Medico') {
        next();
    }
    else {
        res.status(401).send("Sem nivel de acesso").end();
    }
};

const validaAtendentes = (req, res, next) => {
    const cargo = req.headers['user'].cargo;

    if(cargo === 'Atendente') {
        next();
    }
    else {
        res.status(401).send("Sem nivel de acesso").end();
    }
};

module.exports = {
    validaAdministrador,
    validaMedico,
    validaAtendentes
};