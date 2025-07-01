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
    const data = JSON.parse(event.body);
    const {
      name, email, company, phone, businessType, industry,
      currentChallenges, techGoals, timeline, budget, employees,
      currentSystems, dataManagement, priorities, successMetrics,
      additionalInfo
    } = data;

    // Validate required fields
    if (!name || !email || !company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, and company are required' })
      };
    }

    const client = await pool.connect();
    
    const result = await client.query(
      `INSERT INTO client_intakes (
        name, email, company, phone, business_type, industry,
        current_challenges, tech_goals, timeline, budget, employees,
        current_systems, data_management, priorities, success_metrics,
        additional_info, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW()) RETURNING *`,
      [
        name, email, company, phone, businessType, industry,
        currentChallenges, techGoals, timeline, budget, employees,
        currentSystems, dataManagement, priorities, successMetrics,
        additionalInfo
      ]
    );
    
    client.release();
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(result.rows[0])
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