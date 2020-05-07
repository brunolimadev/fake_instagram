const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const moment = require('moment')
const {Publication, User, Comment} = require('../models')

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

        const db = new Sequelize(dbConfig)

        const user = await User.findOne({
            where: {email}
        })
      

        if(!user || !bcrypt.compareSync(senha, user.password)){
            return res.render('auth/login', {msgError: 'Usuário ou senha inválidos'})
        }

        const posts = await Publication.findAll({
            include: [{
                model: User,
                as: 'users',
                required: true
            },
            {
                model: Comment,
                as: 'comments',
                include: {
                    model: User,
                    as: 'user'
                }
            },
            {
                association: 'likes'
                // attributes: [[Sequelize.fn('COUNT',Sequelize.col('likes.id')), 'total']]
                // group: ['likes.id']
            }
            ],
            order:[
                ['create_ate','DESC']
            ]
        })

        posts.forEach(post => {
            post.like = Object.keys(post.likes).length
        })

        const userSession = req.session.user = {
            id: user.id,
            username: user.username,
            name: user.name
        }

        // res.send(posts)
        return res.render('index', {user: userSession, posts, moment})

    }
}

module.exports = AuthController