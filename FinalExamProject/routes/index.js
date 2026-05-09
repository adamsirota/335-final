const express = require('express');
const router = express.Router();
const { getAllStations } = require('../services/stationData');

router.get('/', (req, res) => {
  res.render('index', { stations: getAllStations() });
});

module.exports = router;
