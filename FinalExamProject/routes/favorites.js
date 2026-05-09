const express = require('express');
const router = express.Router();
const FavoriteStation = require('../models/FavoriteStation');

// GET /favorites — list all saved favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteStation.find().sort({ addedAt: -1 });
    const error = req.query.error || null;
    res.render('favorites', { favorites, error });
  } catch (err) {
    res.status(500).render('error', { message: 'Could not load favorites.' });
  }
});

// POST /favorites — save a new favorite station
router.post('/', async (req, res) => {
  const { stationName, stopId, transitType, lines } = req.body;
  try {
    await FavoriteStation.create({
      stationName,
      stopId,
      transitType,
      lines: lines ? lines.split(',').map(l => l.trim()).filter(Boolean) : []
    });
    res.redirect('/favorites');
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key — station already saved
      res.redirect('/favorites?error=duplicate');
    } else {
      res.status(500).render('error', { message: 'Could not save favorite.' });
    }
  }
});

// DELETE /favorites/:id — remove a favorite (called via fetch() from client)
router.delete('/:id', async (req, res) => {
  try {
    await FavoriteStation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
