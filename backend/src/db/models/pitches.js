const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pitches = sequelize.define(
    'pitches',
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

pitch_type: {
        type: DataTypes.ENUM,
      
      

        values: [

"event",


"collaboration",


"sponsorship",


"other"

        ],

      },

message: {
        type: DataTypes.TEXT,
      
      

      },

submitted_at: {
        type: DataTypes.DATE,
      
      

      },

notified: {
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

  pitches.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop






    db.pitches.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pitches.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return pitches;
};


