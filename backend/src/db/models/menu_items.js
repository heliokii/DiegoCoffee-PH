const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const menu_items = sequelize.define(
    'menu_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

title: {
        type: DataTypes.TEXT,
      
      

      },

description: {
        type: DataTypes.TEXT,
      
      

      },

price: {
        type: DataTypes.DECIMAL,
      
      

      },

item_type: {
        type: DataTypes.ENUM,
      
      

        values: [

"Coffee",


"Cocktail",


"Food",


"Frappes",


"Ice",


"Hot"

        ],

      },

ingredients: {
        type: DataTypes.TEXT,
      
      

      },

is_featured: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

is_available: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  menu_items.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.menu_items.belongsTo(db.categories, {
      as: 'category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });



    db.menu_items.hasMany(db.file, {
      as: 'photos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.menu_items.getTableName(),
        belongsToColumn: 'photos',
      },
    });


    db.menu_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.menu_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return menu_items;
};


