module.exports = (sequelize, DataTypes) => {
    const PublicationLike = sequelize.define('PublicationLike', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false 
          },
          users_id: {
           type: DataTypes.INTEGER,
           allowNull:false
         },
         publications_id: {
           type: DataTypes.INTEGER,
           allowNull:false
         }
    },{
        tableName: 'publications_like'
    })

    // PublicationLike.associate = (models) => {
    //     PublicationLike.belongsTo(models.User, {
    //         foreignKey: 'users_id',
    //         as: 'user'
    //     })
    //     PublicationLike.belongsTo(models.Publication, {
    //         foreignKey: 'publications_id',
    //         as: 'publication'
    //     })
    // }

    return PublicationLike
}