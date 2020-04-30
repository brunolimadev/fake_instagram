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
        User.hasMany(models.Publication, {as: 'publications', foreignKey: 'id'})
    }

    return User
}