const bcrypt = require('bcrypt');
const moment = require('moment')
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const {Publication, User} = require('../models')



const PublicationController = {
    index: async (req, res) => {
        const posts = await Publication.findAll({
            include: {
                model: User,
                as: 'users',
                required: true
            }
        })
    
        res.render('index', {posts, moment})
    },
    create: (req, res) => {
        res.render('form-publication', {user: req.session.user})
    },
    store: async (req, res) => {

        const file = req.files[0].filename
        const db = new Sequelize(dbConfig)
        const {id} = req.session.user

        const insert = await Publication.create({
            image: file,
            like: 0,
            create_ate: new Date(),
            update_at: new Date(),
            users_id: id,
        }) 

        if(!insert){
            return res.render('form-publicacao', {msgError: 'Erro ao inserir publicação!'})
        }

        const user = req.session.user

        return res.redirect("/home")

    }
}

module.exports = PublicationController