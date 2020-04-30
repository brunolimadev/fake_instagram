const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const moment = require('moment')
const {Publication} = require('../models')

const AuthController = {
    create: async (req, res) => {

        const user = req.session.user
        if(user){
            return res.redirect('/home')
        }

        return res.render('auth/login')

    },
    store: async (req, res) => {

        const {email, senha} = req.body

        const {Publication, User} = require('../models')

        const db = new Sequelize(dbConfig)

        const user = await User.findOne({
            where: {email}
        })
      

        if(!user || !bcrypt.compareSync(senha, user.password)){
            return res.render('auth/login', {msgError: 'Usuário ou senha inválidos'})
        }

        const posts = await Publication.findAll({
            include: {
                model: User,
                as: 'users',
                required: true
            }   
        })

        const userSession = req.session.user = {
            id: user.id,
            username: user.username,
            name: user.name
        }

        // res.send(posts[0].users.username)

        return res.render('index', {user: userSession, posts, moment: moment})

    }
}

module.exports = AuthController