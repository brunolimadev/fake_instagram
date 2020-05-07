module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like: {
            type: DataTypes.INTEGER,
        },
        create_ate: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE,
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'publications',
        timestamps: false,
    })

    Publication.associate = (models) => {
        Publication.belongsTo(models.User, {
            foreignKey: 'users_id', 
            as: 'users'
        })

        Publication.hasMany(models.Comment, {
            foreignKey: 'publications_id', 
            as: 'comments'
        })
        Publication.belongsToMany(models.User, {
            foreignKey: 'publications_id',
            through: 'publications_like',
            as: 'likes' 
        })


    }

    return Publication
}