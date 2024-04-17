const express = require('express');
require('dotenv').config();
const pool = require('./config/database'); // Sesuaikan path ke file database

const app = express();
app.use(express.json());

// Endpoint untuk mengambil semua data dari tabel 'dusun'
app.get('/dusun', (req, res) => {
  pool.query('SELECT * FROM dusun', (err, results) => {
    if (err) {
      console.error('Error when selecting from dusun:', err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
