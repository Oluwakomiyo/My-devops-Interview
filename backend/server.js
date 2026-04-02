const express = require('express');
const cors = require('cors');

const messageRoute = require('./routes/message');

const app = express();
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api', messageRoute);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});