
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Basic .env parser
const envPath = path.resolve(__dirname, '.env');
const envConfig = fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .reduce((acc, line) => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            acc[match[1].trim()] = match[2].trim();
        }
        return acc;
    }, {});

const databaseUri = envConfig.DATABASE_URI;

if (!databaseUri) {
    console.error('Error: DATABASE_URI not found in .env file');
    process.exit(1);
}

async function dropTables() {
    const client = new Client({
        connectionString: databaseUri,
    });

    try {
        await client.connect();
        console.log('Connected to database. Dropping preferences and user tables to resolve type mismatch...');

        // Drop tables with CASCADE to handle foreign key dependencies
        await client.query('DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;');
        await client.query('DROP TABLE IF EXISTS "payload_preferences" CASCADE;');
        await client.query('DROP TABLE IF EXISTS "users_accounts" CASCADE;');
        await client.query('DROP TABLE IF EXISTS "users_sessions" CASCADE;');
        await client.query('DROP TABLE IF EXISTS "users" CASCADE;');

        console.log('Tables dropped successfully. You can now restart the dev server.');
    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        await client.end();
    }
}

dropTables();
