import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'bugzero_db';

export async function GET() {
  if (!MONGO_URL) {
    return NextResponse.json({
      success: false,
      error: 'MONGO_URL environment variable is not set'
    }, { status: 500 });
  }

  try {
    const client = new MongoClient(MONGO_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    await client.connect();
    const db = client.db(DB_NAME);
    await db.admin().ping();
    await client.close();
    return NextResponse.json({
      success: true,
      message: 'MONGO_URL database connected successfully',
      dbName: DB_NAME
    });
  } catch (error) {
    console.error('MONGO_URL Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: 'MONGO_URL database connection failed',
      details: error.message
    }, { status: 500 });
  }
}
