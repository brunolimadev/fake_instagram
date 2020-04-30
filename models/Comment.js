module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING
        },
        create_at: {
            type:DataTypes.DATE
        },
        update_at: {
            type: DataTypes.DATE
        },
        publications_id: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'comments',
        timestamps: false
    })

    Comment.associate = (models) => {
        Comment.belongsTo(models.Publication, {
            foreignKey: 'publications_id',
            as: 'comments'
        })

        Comment.belongsTo(models.User, {
            foreignKey: 'users_id',
            as: 'user'
        })
    }

    return Comment;
}

