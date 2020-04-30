const auth = (req, res, next) => {
    const {user} = req.session

    if(!user){
       return  res.redirect('/')
    }

    res.locals.user = user

    return next()
}

module.exports = auth