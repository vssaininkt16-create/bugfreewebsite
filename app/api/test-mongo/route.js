import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'bugzero_db';

export async function GET() {
  if (!MONGODB_URI) {
    return NextResponse.json({
      success: false,
      error: 'MONGODB_URI environment variable is not set'
    }, { status: 500 });
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
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
      message: 'MONGODB_URI database connected successfully',
      dbName: DB_NAME
    });
  } catch (error) {
    console.error('MONGODB_URI Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: 'MONGODB_URI database connection failed',
      details: error.message
    }, { status: 500 });
  }
}
