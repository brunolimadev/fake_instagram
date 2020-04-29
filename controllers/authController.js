const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const moment = require('moment')

const AuthController = {
    create: async (req, res) => {
        const {Publication} = require('../models')
        const user = req.session.user
        if(!user){
            return res.render('auth/login')
        }

        const posts = await Publication.findAll()

        return res.render('index', {user, posts: posts})

    },
    store: async (req, res) => {

        const {email, senha} = req.body
        const {Publication} = require('../models')

        const db = new Sequelize(dbConfig)
        const [user] = await db.query('SELECT * FROM users where email = :email limit 1', {
            replacements: {
                email: email
            },
            type: Sequelize.QueryTypes.SELECT
        })

        if(!user || !bcrypt.compareSync(senha, user.password)){
            return res.render('auth/login', {msgError: 'Usuário ou senha inválidos'})
        }

        const posts = await Publication.findAll()

        const userSession = req.session.user = {
            id: user.id,
            username: user.username,
            name: user.name
        }

        // res.send(posts)

        return res.render('index', {user: userSession, posts, moment: moment})

    }
}

module.exports = AuthController