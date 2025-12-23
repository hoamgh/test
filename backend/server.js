const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.log('Database connection error:', err));

// Routes
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/medical-records', require('./routes/medicalRecords'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/search', require('./routes/search'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/vaccines', require('./routes/vaccines'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});