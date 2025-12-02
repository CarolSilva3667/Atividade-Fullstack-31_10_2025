const db = require("../data/conection");

const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const listar = async (req, res) => {
    const lista = await db.query("SELECT * FROM pacientes");
    res.json(lista[0]).end();
}

const buscar = async (req, res) => {
    const idPaciente = req.params.id;
    const paciente = await db.query("SELECT * FROM pacientes WHERE id = " + idPaciente);
    res.json(paciente[0][0]).end();
}

const cadastrarpacientes = async (req, res) => {
    const {id, nome, telefone, endereco, data_nascimento} = req.body;

const novasenha = crypto.createHash("md5").update(senha).digest("hex").toString();

const novousuario = await db.query("INSERT INTO paciente VALUES (DEFAULT, ?, ?, ?, ?)", [id, nome, telefone, endereco, data_nascimento, novasenha]);

    res.send({
        id: novousuario[0].insertId,
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        data_nascimento: data_nascimento
    }).end();
    
};

const Login = async (req, res) => {
    const { user, psw } = req.body;
    
    try {
        const senhahash = crypto.createHash("MD5").update(psw).digest("hex").toString();

        const usuario = await db.query("SELECT * FROM usuario WHERE email = ? AND senha = ?", [user, senhahash])

        if(usuario[0].length == 0) res.status(401).send({message:'E-mail or Password incorrect !'});

        const token = jsonwebtoken.sign(
            {
                id: usuario[0][0].id,
                name: usuario[0][0].nome,
                email: usuario[0][0].email,
                cargo: usuario[0][0].cargo
            },
            process.env.SECRET_JWT,
            { expiresIn: "60min" }
        );

        res.status(200).json({ token : token }).end();
    }catch(err) {
        res.status(500).send(err).end();
    }
    
    res.status(200).end();
};

const apagar = async (req,res) => {
    const idPaciente = req.params.id;

    try{
        const delPac = await db.query("DELETE FROM pacientes WHERE id = ?", [idPaciente]);
        
        const info = {msg:""};

        if(delPac[0].affectedRows == 1) {
            info.msg = "Excluido com Sucesso";
        }
        else if(delpac[0].affectedRows == 0) {
            info.msg = "Paciente não encontrado"
        }

        res.status(200).json(info).end();

    }catch(error){
        const info = {msg:""};

        if(error.errno === 1451){
            info.msg = "Paciente com registro";
        }

        res.status(500).json(info).end();
        
    }
};

const atualizar = async (req, res) => {
    const {id, nome, email} = req.body;

    try{
    const atualiza = db.query("UPDATE FROM pacientes SET nome = ?, email = ? WHERE id = ?", [nome, email, id]);

    const info = {msg:""};

    if(atualiza[0].affectedRows === 0) {
        info.msg = "Nenhum paciente encontrado";
    }
    else if(atualiza[0].affectedRows ===1){
        info.msg = "Paciente atualizado com sucesso";
    }

    res.status(200).json(info).end();

    }catch(error){
        console.log(error);

        res.status(500).end();
    }
};

module.exports = {
    listar,
    buscar,
    cadastrarpacientes,
    Login,
    apagar,
    atualizar
};
