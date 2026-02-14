#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

/**
 * Database Connection Test Script
 * Tests connection to Neon PostgreSQL database
 */
async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

  try {
    // Test 1: Basic connection
    console.log('Test 1: Attempting to connect to database...');
    await prisma.$connect();
    console.log('✅ Successfully connected to database\n');

    // Test 2: Execute a simple query
    console.log('Test 2: Executing test query...');
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as db_version`;
    console.log('✅ Query executed successfully:');
    console.log(result);
    console.log('');

    // Test 3: Check database schema
    console.log('Test 3: Checking database tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log('✅ Tables in database:');
    console.log(tables);
    console.log('');

    // Test 4: Test Prisma models (if schema is pushed)
    console.log('Test 4: Testing Prisma models...');
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User model accessible. Current count: ${userCount}`);
    } catch (error) {
      console.log('⚠️  User model not accessible yet (schema not pushed)');
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    console.log('\n✅ All connection tests passed!');
    console.log('🎉 Your database is ready to use');

  } catch (error) {
    console.error('\n❌ Connection test failed:');
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`);
      console.error(`   Name: ${error.name}`);
    }
    console.error('\n🔧 Troubleshooting tips:');
    console.error('   1. Check DATABASE_URL in .env file');
    console.error('   2. Ensure sslmode=require is in the connection string');
    console.error('   3. Verify database is running in Neon dashboard');
    console.error('   4. Check network/firewall settings');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection();
