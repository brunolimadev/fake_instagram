const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const publicationController = require('../controllers/publicationController');
const {check, validationResult, body } = require('express-validator');
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware')

/* GET home page. */

router.get('/', authController.create);
router.post('/', [
  check('email').isEmail(),
  check('senha').isLength({min: 3})
] ,authController.store);


router.get('/home', authMiddleware, publicationController.index);
router.post('/home', authMiddleware, publicationController.createComment);

router.get('/registro', userController.create);
router.post('/registro', [
  check('email').isEmail().withMessage('Email invalido'),
  check('nomeCompleto').isLength({min: 3}).withMessage('Nome invalido'),
  check('nomeUsuario').isLength({min: 3}).withMessage('Nome de usuário invalido'),
  check('senha').isLength({min: 6}).withMessage('Senha invalida. D|eve ter no mínimo 6 caractéres'),
], userController.store); 


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','img','upload','publications'))
  },
  filename: function (req, file, cb) {
    cb(null, 'publication' + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

router.get('/publicacao', authMiddleware, publicationController.create)
router.post('/publicacao', upload.any(), publicationController.store)


router.get('/like', authMiddleware, publicationController.addLike)

module.exports = router;
