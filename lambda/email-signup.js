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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email address is required' })
      };
    }

    const client = await pool.connect();
    
    // Check if email already exists
    const existingResult = await client.query(
      'SELECT * FROM email_signups WHERE email = $1',
      [email]
    );

    let result;
    let isNew = true;

    if (existingResult.rows.length > 0) {
      // Email already exists
      result = existingResult.rows[0];
      isNew = false;
    } else {
      // Insert new email
      const insertResult = await client.query(
        'INSERT INTO email_signups (email, created_at) VALUES ($1, NOW()) RETURNING *',
        [email]
      );
      result = insertResult.rows[0];
    }
    
    client.release();
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ signup: result, isNew })
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};