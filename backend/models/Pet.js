const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Chó', 'Mèo', 'Chim', 'Thỏ', 'Khác']]
    }
  },
  breed: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerEmail: {
    type: DataTypes.STRING
  },
  medicalHistory: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  vaccinations: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  timestamps: true
});

module.exports = Pet;