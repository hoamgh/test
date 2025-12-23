const sequelize = require('../config/database');
const Pet = require('../models/Pet');
const Customer = require('../models/Customer');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');
const Sale = require('../models/Sale');
const Invoice = require('../models/Invoice');
const Vaccine = require('../models/Vaccine');
const Product = require('../models/Product');

async function initDatabase() {
  try {
    console.log('Connecting to PostgreSQL...');
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    console.log('Creating tables...');
    await sequelize.sync({ force: true }); // force: true will drop existing tables
    console.log('All tables created successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
