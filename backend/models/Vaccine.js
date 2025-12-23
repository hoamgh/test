const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vaccine = sequelize.define('Vaccine', {
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
      isIn: [['Bắt buộc', 'Khuyến nghị', 'Phòng ngừa']]
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT
  },
  dosage: {
    type: DataTypes.STRING
  },
  schedule: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Vaccine;