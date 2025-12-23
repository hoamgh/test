const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ order: [['date', 'DESC']] });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = await Appointment.create({
      petName: req.body.petName,
      ownerName: req.body.ownerName,
      phone: req.body.phone,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.update({
      petName: req.body.petName !== undefined ? req.body.petName : appointment.petName,
      ownerName: req.body.ownerName !== undefined ? req.body.ownerName : appointment.ownerName,
      phone: req.body.phone !== undefined ? req.body.phone : appointment.phone,
      service: req.body.service !== undefined ? req.body.service : appointment.service,
      date: req.body.date !== undefined ? req.body.date : appointment.date,
      time: req.body.time !== undefined ? req.body.time : appointment.time,
      notes: req.body.notes !== undefined ? req.body.notes : appointment.notes,
      status: req.body.status !== undefined ? req.body.status : appointment.status
    });

    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;