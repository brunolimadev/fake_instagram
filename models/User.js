module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE,
        }
    },{
        tableName: 'users',
        timestamps: false
    })

    User.associate = (models) => {
        User.hasMany(models.Publication, {as: 'publications', foreignKey: 'users_id'})
        User.hasMany(models.Comment, {as: 'user', foreignKey: 'users_id'})
        User.belongsToMany(models.Publication, {
            foreignKey: 'users_id',
            through: 'publications_like',
            as: 'user_likes'
        })
    }

    return User
}