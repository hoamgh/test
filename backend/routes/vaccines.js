const express = require('express');
const router = express.Router();
const Vaccine = require('../models/Vaccine');

// GET all vaccines
router.get('/', async (req, res) => {
  try {
    const vaccines = await Vaccine.findAll({ order: [['createdAt', 'DESC']] });
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new vaccine
router.post('/', async (req, res) => {
  try {
    const newVaccine = await Vaccine.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      dosage: req.body.dosage,
      schedule: req.body.schedule
    });
    res.status(201).json(newVaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET vaccine by ID
router.get('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.json(vaccine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update vaccine
router.put('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    await vaccine.update({
      name: req.body.name !== undefined ? req.body.name : vaccine.name,
      type: req.body.type !== undefined ? req.body.type : vaccine.type,
      price: req.body.price !== undefined ? req.body.price : vaccine.price,
      stock: req.body.stock !== undefined ? req.body.stock : vaccine.stock,
      description: req.body.description !== undefined ? req.body.description : vaccine.description,
      dosage: req.body.dosage !== undefined ? req.body.dosage : vaccine.dosage,
      schedule: req.body.schedule !== undefined ? req.body.schedule : vaccine.schedule
    });

    res.json(vaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE vaccine
router.delete('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    await vaccine.destroy();
    res.json({ message: 'Vaccine deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;