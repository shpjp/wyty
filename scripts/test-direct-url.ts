#!/usr/bin/env tsx

import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function testDirectConnection() {
  console.log('🔍 Testing DIRECT_URL connection...\n');

  const connectionString = process.env.DIRECT_URL;
  
  if (!connectionString) {
    console.error('❌ DIRECT_URL not found in environment variables');
    process.exit(1);
  }

  console.log('Connection string:', connectionString.replace(/:[^:@]+@/, ':****@'));
  console.log('');

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    const result = await client.query('SELECT NOW() as current_time, version() as version');
    console.log('✅ Query result:');
    console.log(result.rows[0]);
    console.log('\n✅ DIRECT connection works!');

  } catch (error) {
    console.error('\n❌ Connection failed:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

testDirectConnection();
