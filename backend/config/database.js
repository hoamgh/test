const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      // Note: rejectUnauthorized is set to false for Neon compatibility
      // This is standard for Neon hosted PostgreSQL databases
      rejectUnauthorized: false
    }
  },
  logging: false
});

module.exports = sequelize;
