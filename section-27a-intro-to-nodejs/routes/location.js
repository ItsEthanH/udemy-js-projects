const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: [],
};

router.post('/add-location', (req, res, next) => {
  // validation would take place here. this assumes perfect data

  const id = Math.random();

  locationStorage.locations.push({
    id,
    address: req.body.address,
    coordinates: { lat: req.body.lat, lng: req.body.lng },
  });

  res.json({ message: 'Stored location successfully!', locId: id });
});

router.get('/location/:lid', (req, res, next) => {
  const locationId = +req.params.lid;
  const location = locationStorage.locations.find((loc) => (loc.id = locationId));

  if (!location) {
    res.status(404).json({ message: 'Not found!' });
  }

  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
