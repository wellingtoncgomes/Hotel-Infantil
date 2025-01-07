const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // Certifique-se de que o dotenv esteja instalado

// Configuração do pool para PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/hotelInfantil',
});

// Exportação do pool
module.exports = pool;
