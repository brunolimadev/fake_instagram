'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('publications_like', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull:false 
         },
         users_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE' 
        },
        publications_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {model: 'publications', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE' 
        }
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('publications_like');
  }
};
