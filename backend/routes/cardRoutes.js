const express = require('express');
const router = express.Router();
const Card = require('../models/Card');


// Create a card
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const card = new Card({ title, description });
    await card.save();

    res.status(201).json(card);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Card with this title already exists' 
    });
    }
    next(error);
  }
});

// Get all cards
router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

// Get a specific card by title
router.get('/:title', async (req, res, next) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
});

module.exports = router;