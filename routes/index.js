const express = require('express');
const router = express.Router();
const {check, validationResult, body } = require('express-validator')
const bcrypt = require('bcrypt')


/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('auth/login');
});

router.get('/registro', function(req, res, next) {
  res.render('auth/register');
});


router.post('/registro', [

  check('email').isEmail().withMessage('Email invalido'),
  check('nomeCompleto').isLength({min: 3}).withMessage('Nome invalido'),
  check('nomeUsuario').isLength({min: 3}).withMessage('Nome de usuário invalido'),
  check('senha').isLength({min: 6}).withMessage('Senha invalida. D|eve ter no mínimo 6 caractéres'),

] ,(req, res) => {



  const {email, nomeCompleto, nomeUsuario, senha } = req.body
  const senhaCripto = bcrypt.hashSync(senha, 10) 

  const erro = validationResult(req)

  if(erro.isEmpty())
  {
    console.log(erro)
  }
})


router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
