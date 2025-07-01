const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const client = await pool.connect();
    
    if (event.path.includes('/featured')) {
      // Get featured testimonials
      const result = await client.query(
        'SELECT * FROM testimonials WHERE featured = true ORDER BY created_at DESC'
      );
      
      client.release();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.rows)
      };
    } else {
      // Get all testimonials
      const result = await client.query(
        'SELECT * FROM testimonials ORDER BY created_at DESC'
      );
      
      client.release();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.rows)
      };
    }
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};