const express = require('express');
const router = express.Router();
const { getArrivals } = require('../services/mtaService');
const { getStationByStopId } = require('../services/stationData');

// GET /arrivals/:type?stopId=XXX
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const { stopId } = req.query;

  if (!stopId) {
    return res.redirect('/');
  }
  if (type !== 'subway' && type !== 'lirr') {
    return res.status(400).render('error', { message: 'Invalid transit type. Use "subway" or "lirr".' });
  }

  try {
    const arrivals = await getArrivals(type, stopId);
    const station = getStationByStopId(stopId, type);
    res.render('arrivals', { arrivals, station, stopId, type });
  } catch (err) {
    console.error('MTA API error:', err.message);
    res.status(500).render('error', {
      message: 'Could not fetch arrival data from MTA. The feed may be temporarily unavailable. Please try again.'
    });
  }
});

module.exports = router;
