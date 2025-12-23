const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.findAll({ order: [['createdAt', 'DESC']] });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new pet
router.post('/', async (req, res) => {
  try {
    const newPet = await Pet.create({
      name: req.body.name,
      type: req.body.type,
      breed: req.body.breed,
      age: req.body.age,
      weight: req.body.weight,
      ownerName: req.body.ownerName,
      ownerPhone: req.body.ownerPhone,
      ownerEmail: req.body.ownerEmail
    });
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update pet
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    await pet.update({
      name: req.body.name !== undefined ? req.body.name : pet.name,
      type: req.body.type !== undefined ? req.body.type : pet.type,
      breed: req.body.breed !== undefined ? req.body.breed : pet.breed,
      age: req.body.age !== undefined ? req.body.age : pet.age,
      weight: req.body.weight !== undefined ? req.body.weight : pet.weight,
      ownerName: req.body.ownerName !== undefined ? req.body.ownerName : pet.ownerName,
      ownerPhone: req.body.ownerPhone !== undefined ? req.body.ownerPhone : pet.ownerPhone,
      ownerEmail: req.body.ownerEmail !== undefined ? req.body.ownerEmail : pet.ownerEmail
    });

    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    await pet.destroy();
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;