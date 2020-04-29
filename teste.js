const path = require('path')
const {Publication} = require('./models')

async function ver(){
    const result = await Publication.findAll()
    console.log(result)

}

ver();
