
const express = require('express');
const router = express.Router();
const axios = require('axios');

const GOOGLE_PLACES_API_KEY = 'AIzaSyDQmKRoHtX5Azy7L9vqYBkN22gtFea7i_k';

router.get('/autocomplete', async (req, res) => {
  const input = req.query.input;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input,
        key: GOOGLE_PLACES_API_KEY,
        components: 'country:CA',

      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error proxying Google Places API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;