// require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const SECRET_KEY = process.env.SECRET_KEY || 'kL9zG0t3Jf1vM8bXyQ4eA2wN5cR6hP7';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Sahil123',
  port: 5432,
});

exports.register = async (req, res) => {
    const {firstName,lastName,email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, firstName, lastName, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, firstName, lastName, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
};
