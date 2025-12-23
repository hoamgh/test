const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll({ order: [['createdAt', 'DESC']] });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    });
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update customer
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.update({
      name: req.body.name !== undefined ? req.body.name : customer.name,
      phone: req.body.phone !== undefined ? req.body.phone : customer.phone,
      email: req.body.email !== undefined ? req.body.email : customer.email,
      address: req.body.address !== undefined ? req.body.address : customer.address
    });

    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.destroy();
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;