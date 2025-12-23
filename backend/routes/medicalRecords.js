const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');

// GET all medical records
router.get('/', async (req, res) => {
  try {
    const records = await MedicalRecord.findAll({ order: [['createdAt', 'DESC']] });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new medical record
router.post('/', async (req, res) => {
  try {
    const newRecord = await MedicalRecord.create({
      petName: req.body.petName,
      ownerName: req.body.ownerName,
      symptoms: req.body.symptoms,
      diagnosis: req.body.diagnosis,
      treatment: req.body.treatment,
      medications: req.body.medications,
      notes: req.body.notes,
      followUpDate: req.body.followUpDate,
      veterinarian: req.body.veterinarian
    });
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET medical record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update medical record
router.put('/:id', async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    await record.update({
      petName: req.body.petName !== undefined ? req.body.petName : record.petName,
      ownerName: req.body.ownerName !== undefined ? req.body.ownerName : record.ownerName,
      symptoms: req.body.symptoms !== undefined ? req.body.symptoms : record.symptoms,
      diagnosis: req.body.diagnosis !== undefined ? req.body.diagnosis : record.diagnosis,
      treatment: req.body.treatment !== undefined ? req.body.treatment : record.treatment,
      medications: req.body.medications !== undefined ? req.body.medications : record.medications,
      notes: req.body.notes !== undefined ? req.body.notes : record.notes,
      followUpDate: req.body.followUpDate !== undefined ? req.body.followUpDate : record.followUpDate,
      veterinarian: req.body.veterinarian !== undefined ? req.body.veterinarian : record.veterinarian
    });

    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE medical record
router.delete('/:id', async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    await record.destroy();
    res.json({ message: 'Medical record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;