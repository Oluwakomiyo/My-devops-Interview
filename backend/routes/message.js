const express = require('express');
const router = express.Router();

router.get('/message', (req, res) => {
  res.json({ message: "Automate all the things!",
             timestamp: Math.floor(Date.now() / 1000)
   });
});

router.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

module.exports = router;