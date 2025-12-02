const db = require("../data/conection");

const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const listar = async (req, res) => {
   const lista = await db.query("SELECT * FROM usuarios");
   res.json(lista[0]).end();
};

const buscar = async (req, res) => {
    const idUusario = req.params.id;
    const usuario = await db.query("SELECT * FROM usuarios WHERE id = " + idUusario);
    res.json(usuario[0][0]).end();
}

const cadastrarusuario = async (req, res) => {
    const {email, nome, senha, cargo} = req.body;

  const novasenha = crypto.createHash("md5").update(senha).digest("hex").toString();

  const novousuario = await db.query("INSERT INTO usuarios VALUES (DEFAULT, ?, ?, ?, ?)", [email, novasenha, nome, cargo]);

    res.send({
        id: novousuario[0].insertId,
        email: email,
        senha: senha,
        nome: nome,
        cargo: cargo
    }).end();
    
};

const Login = async (req, res) => {
    const { user, psw } = req.body;
    
    try {
        const senhahash = crypto.createHash("MD5").update(psw).digest("hex").toString();

        const usuario = await db.query("SELECT * FROM usuario WHERE email = ? AND senha = ?)", [user, senhahash])

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
    const idUsuario = req.params.id;

    try{
        const delUsu = await db.query("DELETE FROM usuarios WHERE id = ?", [idUsuario]);
        
        const info = {msg:""};

        if(delUsu[0].affectedRows == 1) {
            info.msg = "Excluido com Sucesso";
        }
        else if(delUsu[0].affectedRows == 0) {
            info.msg = "Usuario não encontrada"
        }

        res.status(200).json(info).end();

    }catch(error){
        const info = {msg:""};

        if(error.errno === 1451){
            info.msg = "Usuario registrado";
        }

        res.status(500).json(info).end();
        
    }
};

const atualizar = async (req, res) => {
    const {id, nome, email} = req.body;

    try{
    const atualiza = await db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome, email, id]);

    const info = {msg:""};

    if(atualiza[0].affectedRows === 0) {
        info.msg = "Nenhum Usuario encontrado";
    }
    else if(atualiza[0].affectedRows ===1){
        info.msg = "Usuario atualizado com sucesso";
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
    cadastrarusuario,
    Login,
    apagar,
    atualizar
}
