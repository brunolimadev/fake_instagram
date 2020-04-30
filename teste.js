const {Model, DataTypes} = require('sequelize')

class User extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING
        },{
            // Este parâmetro é a conexão
            sequelize
        })
    }
}

module.exports = User