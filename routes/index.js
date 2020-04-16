const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');
const {check, validationResult, body } = require('express-validator');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('auth/login');
});

router.post('/', LoginController.login);

router.get('/registro', function(req, res, next) {
  res.render('auth/register');
});

router.post('/registro', [
  check('email').isEmail().withMessage('Email invalido'),
  check('nomeCompleto').isLength({min: 3}).withMessage('Nome invalido'),
  check('nomeUsuario').isLength({min: 3}).withMessage('Nome de usuário invalido'),
  check('senha').isLength({min: 6}).withMessage('Senha invalida. D|eve ter no mínimo 6 caractéres'),
], LoginController.registro); 

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
