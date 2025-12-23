const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Customer = require('../models/Customer');
const Vaccine = require('../models/Vaccine');
const { Op } = require('sequelize');

// Search pets
router.get('/pets', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const pets = await Pet.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { type: { [Op.iLike]: `%${q}%` } },
          { ownerName: { [Op.iLike]: `%${q}%` } },
          { ownerPhone: { [Op.iLike]: `%${q}%` } }
        ]
      },
      limit: 20
    });

    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search customers
router.get('/customers', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { phone: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } }
        ]
      },
      limit: 20
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search vaccines
router.get('/vaccines', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const vaccines = await Vaccine.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { type: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } }
        ]
      },
      limit: 20
    });

    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// General search endpoint
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
      return res.json({ pets: [], customers: [], vaccines: [] });
    }

    let results = { pets: [], customers: [], vaccines: [] };

    if (!type || type === 'pets') {
      results.pets = await Pet.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } },
            { type: { [Op.iLike]: `%${q}%` } },
            { ownerName: { [Op.iLike]: `%${q}%` } }
          ]
        },
        limit: 10
      });
    }

    if (!type || type === 'customers') {
      results.customers = await Customer.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } },
            { phone: { [Op.iLike]: `%${q}%` } }
          ]
        },
        limit: 10
      });
    }

    if (!type || type === 'vaccines') {
      results.vaccines = await Vaccine.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } },
            { type: { [Op.iLike]: `%${q}%` } }
          ]
        },
        limit: 10
      });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;