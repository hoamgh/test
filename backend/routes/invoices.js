const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ order: [['createdAt', 'DESC']] });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new invoice
router.post('/', async (req, res) => {
  try {
    const newInvoice = await Invoice.create({
      invoiceNumber: req.body.invoiceNumber,
      customerName: req.body.customerName,
      phone: req.body.phone,
      date: req.body.date,
      items: req.body.items,
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      total: req.body.total,
      notes: req.body.notes
    });
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update invoice
router.put('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    await invoice.update({
      customerName: req.body.customerName !== undefined ? req.body.customerName : invoice.customerName,
      phone: req.body.phone !== undefined ? req.body.phone : invoice.phone,
      date: req.body.date !== undefined ? req.body.date : invoice.date,
      items: req.body.items !== undefined ? req.body.items : invoice.items,
      subtotal: req.body.subtotal !== undefined ? req.body.subtotal : invoice.subtotal,
      tax: req.body.tax !== undefined ? req.body.tax : invoice.tax,
      total: req.body.total !== undefined ? req.body.total : invoice.total,
      notes: req.body.notes !== undefined ? req.body.notes : invoice.notes,
      status: req.body.status !== undefined ? req.body.status : invoice.status
    });

    res.json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    await invoice.destroy();
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;