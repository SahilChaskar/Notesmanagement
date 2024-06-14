const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
// require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/notesRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', noteRoutes);


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Sahil123',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});