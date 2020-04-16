const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');

const LoginController = {

    login: (req, res) => {
        console.log(req.body);
    },

    registro: (req, res) => {
        const {email, nomeCompleto, nomeUsuario, senha } = req.body;
        const senhaCripto = bcrypt.hashSync(senha, 10) ;

        const erro = validationResult(req);

        if (erro.isEmpty()) {
            console.log(erro);
        }
    },
};

module.exports = LoginController;