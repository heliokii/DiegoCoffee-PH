const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const reservations = sequelize.define(
    'reservations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

email: {
        type: DataTypes.TEXT,
      
      

      },

phone: {
        type: DataTypes.TEXT,
      
      

      },

message: {
        type: DataTypes.TEXT,
      
      

      },

reservation_start: {
        type: DataTypes.DATE,
      
      

      },

reservation_end: {
        type: DataTypes.DATE,
      
      

      },

party_size: {
        type: DataTypes.INTEGER,
      
      

      },

status: {
        type: DataTypes.ENUM,
      
      

        values: [

"pending",


"confirmed",


"cancelled",


"completed"

        ],

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

  reservations.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.reservations.belongsTo(db.locations, {
      as: 'location',
      foreignKey: {
        name: 'locationId',
      },
      constraints: false,
    });




    db.reservations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.reservations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return reservations;
};


