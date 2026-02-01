const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

reference: {
        type: DataTypes.TEXT,
      
      

      },

total: {
        type: DataTypes.DECIMAL,
      
      

      },

status: {
        type: DataTypes.ENUM,
      
      

        values: [

"pending",


"paid",


"preparing",


"ready",


"completed",


"cancelled"

        ],

      },

pickup_time: {
        type: DataTypes.DATE,
      
      

      },

paid: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

stripe_charge: {
        type: DataTypes.TEXT,
      
      

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

  orders.associate = (db) => {

    db.orders.belongsToMany(db.menu_items, {
      as: 'items',
      foreignKey: {
        name: 'orders_itemsId',
      },
      constraints: false,
      through: 'ordersItemsMenu_items',
    });

    db.orders.belongsToMany(db.menu_items, {
      as: 'items_filter',
      foreignKey: {
        name: 'orders_itemsId',
      },
      constraints: false,
      through: 'ordersItemsMenu_items',
    });


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.orders.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });




    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return orders;
};


