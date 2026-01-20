const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
    console.log('--- DB Connection Test ---');
    console.log('URI:', process.env.DATABASE_URI ? 'Detected' : 'Missing');

    const client = new Client({
        connectionString: process.env.DATABASE_URI,
    });

    try {
        console.log('Attempting to connect...');
        await client.connect();
        console.log('✅ SUCCESS: Connected to Supabase!');
        const res = await client.query('SELECT NOW()');
        console.log('Server time:', res.rows[0].now);
    } catch (err) {
        console.error('❌ FAILED:');
        console.error(err.message);
        if (err.message.includes('Tenant or user not found')) {
            console.log('\nTip: Your username must be "postgres.[PROJECT_ID]" in the connection string.');
        }
    } finally {
        await client.end();
        console.log('--------------------------');
    }
}

testConnection();
