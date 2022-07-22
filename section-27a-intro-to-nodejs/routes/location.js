const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: [],
};

router.post('/add-location', (req, res, next) => {
  // validation would take place here. this assumes perfect data
  locationStorage.locations.push({
    id: Math.random(),
    address: req.body.address,
    coordinates: { lat: req.body.lat, lng: req.body.lng },
  });

  res.json({ message: 'Stored location successfully!' });
});

router.get('/location', (req, res, next) => {});

module.exports = router;
