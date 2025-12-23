const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  petName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['grooming', 'vet', 'vaccination', 'medical']]
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['pending', 'confirmed', 'completed', 'cancelled']]
    },
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

module.exports = Appointment;