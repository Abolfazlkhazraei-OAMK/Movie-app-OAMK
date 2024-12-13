import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    },
    jwtSecret: process.env.JWT_SECRET
});

// pool.connect()
//   .then(client => {
//     console.log('Connected to the database');
//     client.release();
//   })
//   .catch(err => {
//     console.error('Error connecting to database:', err.code, err.message);
//   });

pool.on('connect', () => {
  console.log('Connected to the database');
})

pool.on('error', (err) => {
  console.error('Error connecting to database:', err);
  process.exit(1);
});

export default pool;