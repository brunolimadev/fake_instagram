const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')

const UserController = {

    create: (_req, res) => {
        res.render('auth/register')
    },

    store: async (req, res) => {

        const {email, nomeCompleto, nomeUsuario, senha } = req.body;
        const senhaCripto = bcrypt.hashSync(senha, 10) ;
        const db = new Sequelize(dbConfig)

        const erro = validationResult(req);

        if (erro.isEmpty()) {
            
           const insert = db.query(`INSERT INTO users(name, email, username, password, create_at, update_at) values(:name, :email, :username, :password, :create_at, :update_at)`, {
               replacements: {
                name: nomeCompleto,
                email: email,
                username: nomeUsuario,
                password: senhaCripto,
                create_at: new Date(),
                update_at: new Date()
               },
               type: Sequelize.QueryTypes.INSERT
           })

           if(!insert){
               return res.render('auth/register', {msgError: 'Erro ao cadastrar usuário'})
           }

           return res.render('auth/register', {msg: 'Cadastro efetuada com sucesso'})
        }else{
            return res.render('auth/register', {msgError: 'Erro ao cadastrar usuário'})
        }
    },
};

module.exports = UserController;