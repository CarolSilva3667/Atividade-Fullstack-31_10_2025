const db = require("../data/conection");

const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const listar = async (req, res) => {
   const lista = await db.query("SELECT * FROM consultas");
   res.json(lista[0]).end();
};

const buscar = async (req, res) => {
    const idPaciente = req.params.id;
    const consulta = await db.query("SELECT * FROM consultas WHERE id = " + idPaciente);
    res.json(consulta[0][0]).end();
};

const cadastrarconsultas = async (req, res) => {
    const 	{id, usuario_id, paciente_id, data, hora, status} = req.body;

    const novasenha = crypto.createHash("md5").update(senha).digest("hex").toString();

    const novofuncionario = await db.query("INSERT INTO consultas VALUES (DEFAULT, ?, ?, ?, ?)", [usuario_id, paciente_id, data, hora, status, novasenha, id]);

    res.send({
        id: novofuncionario[0].insertId,
        usuario_id: usuario_id,
        paciente_id: paciente_id,
        data: data,
        hora: hora,
        status: status
    }).end();
};

const Login = async (req, res) => {
    const { user, psw } = req.body;
    
    try {
        const senhahash = crypto.createHash("MD5").update(psw).digest("hex").toString();

        const usuario = await db.query("SELECT * FROM usuario WHERE email = ? AND senha = ?;", [user, senhahash])

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
    const idConsulta = req.params.id;

    try{
        const delCons = await db.query("DELETE FROM consultas WHERE id = ?", [idConsulta]);
        
        const info = {msg:""};

        if(delCons[0].affectedRows == 1) {
            info.msg = "Excluido com Sucesso";
        }
        else if(delCons[0].affectedRows == 0) {
            info.msg = "Consulta não encontrada"
        }

        res.status(200).json(info).end();

    }catch(error){
        const info = {msg:""};

        if(error.errno === 1451){
            info.msg = "Consulta registrada";
        }

        res.status(500).json(info).end();
        
    }
};

const atualizar = async (req, res) => {
    const {idPaciente, nome} = req.body;

    try{
    const atualiza = await db.query("UPDATE consultas SET nome = ? WHERE idPaciente = ?", [nome, idPaciente]);

    const info = {msg:""};

    if(atualiza[0].affectedRows === 0) {
        info.msg = "Nenhuma Consulta encontrada";
    }
    else if(atualiza[0].affectedRows ===1){
        info.msg = "Consulta atualizada com sucesso";
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
    cadastrarconsultas,
    Login,
    apagar,
    atualizar
}
