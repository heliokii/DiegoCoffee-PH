const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const locations = sequelize.define(
    'locations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

address: {
        type: DataTypes.TEXT,
      
      

      },

latitude: {
        type: DataTypes.DECIMAL,
      
      

      },

longitude: {
        type: DataTypes.DECIMAL,
      
      

      },

hours: {
        type: DataTypes.TEXT,
      
      

      },

phone: {
        type: DataTypes.TEXT,
      
      

      },

city: {
        type: DataTypes.ENUM,
      
      

        values: [

"Lucena",


"Lucban",


"Sariaya"

        ],

      },

is_open: {
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

  locations.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity








    db.locations.hasMany(db.reservations, {
      as: 'reservations_location',
      foreignKey: {
          name: 'locationId',
      },
      constraints: false,
    });








//end loop






    db.locations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.locations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return locations;
};


