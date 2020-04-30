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

    Publication.associate = (listModels) => {
        Publication.belongsTo(listModels.User, {
            foreignKey: 'users_id', 
            as: 'users'
        })
    }

    return Publication
}