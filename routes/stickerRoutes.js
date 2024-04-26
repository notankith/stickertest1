// routes/stickerRoutes.js
const express = require('express');
const router = express.Router();
const Sticker = require('../models/Sticker');

// Create a new sticker
router.post('/', async (req, res) => {
  try {
    const sticker = await Sticker.create(req.body);
    res.status(201).json(sticker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all stickers
router.get('/', async (req, res) => {
  try {
    const stickers = await Sticker.find();
    res.json(stickers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
