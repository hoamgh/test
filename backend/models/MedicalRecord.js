const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
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
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medications: {
    type: DataTypes.TEXT
  },
  notes: {
    type: DataTypes.TEXT
  },
  followUpDate: {
    type: DataTypes.DATE
  },
  veterinarian: {
    type: DataTypes.STRING,
    defaultValue: 'Dr. PetCarx'
  }
}, {
  timestamps: true
});

module.exports = MedicalRecord;