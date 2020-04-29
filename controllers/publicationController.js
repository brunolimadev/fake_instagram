const bcrypt = require('bcrypt');
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const {Publications} = require('../models')

const PublicationController = {
    create: (req, res) => {
        res.render('form-publication', {user: req.session.user})
    },
    store: async (req, res) => {
        const file = req.files[0].filename
        const db = new Sequelize(dbConfig)
        const {id} = req.session.user

        const posts = await Publications.findAll()

        const insert = await db.query('INSERT INTO publications(image, `like`, create_ate, update_at, users_id) values(:image, :like, :create_ate, :update_at, :users_id)', {
            replacements: {
             image: file,
             like: 0,
             create_ate: new Date(),
             update_at: new Date(),
             users_id: id,
            },
            type: Sequelize.QueryTypes.INSERT
        })

        if(!insert){
            return res.render('form-publicacao', {msgError: 'Erro ao inserir publicação!'})
        }

        return res.redirect("/")

    }
}

module.exports = PublicationController