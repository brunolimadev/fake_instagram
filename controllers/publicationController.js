const bcrypt = require('bcrypt');
const moment = require('moment')
const {check, validationResult, body } = require('express-validator');
const Sequelize = require('sequelize')
const dbConfig = require('../configs/Database')
const {Publication, User, Comment, PublicationLike} = require('../models')

const PublicationController = {
    index: async (req, res) => {
        const posts = await Publication.findAll({
            // attributes:['Publication.*'],
            include: [
            {
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
            },],
            order:[
                ['create_ate','DESC']
            ]
        })

        posts.forEach(post => {
            post.like = Object.keys(post.likes).length
        })

        // res.json(`${posts}`)
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

    },
    createComment: async (req, res) => {
        const {description, publicationId} = req.body;
        const {id} = req.session.user

        const comments = await Comment.create({
            description,
            create_at: new Date(),
            update_at: new Date(),
            publications_id: publicationId,
            users_id: id
        })

        res.redirect('/home')
    },
    addLike: async (req, res) => {
        const {user, id} = req.query
        let valida = false

        const like = await PublicationLike.findOne({
            where: {
                users_id: user,
                publications_id: id
            }
        })

        if(!like){
            await PublicationLike.create({
                users_id: user,
                publications_id: id
            })
            res.redirect('/')
        }else{
            await PublicationLike.destroy({
                where: {
                    users_id: user,
                    publications_id: id
                }
            })
            res.redirect('/')
        }
    }
}

module.exports = PublicationController