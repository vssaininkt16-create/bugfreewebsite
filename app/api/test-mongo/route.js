import { NextResponse } from 'next/server';
import connectToDatabase, { DB_NAME, NODE_ENV } from '../../../lib/mongodb';

// Logging helper
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [api/test-mongo] ${message}`;
  
  if (NODE_ENV === 'production') {
    if (level === 'error' || level === 'warn') {
      console.error(logMessage, data);
    } else if (level === 'info') {
      console.log(logMessage, data);
    }
  } else {
    console.log(logMessage, data);
  }
}

export async function GET() {
  const startTime = Date.now();
  
  log('info', 'Testing MongoDB connection', { dbName: DB_NAME, env: NODE_ENV });

  try {
    // Use unified database connection from lib/mongodb.js
    const mongoose = await connectToDatabase();
    
    // Test the connection by pinging
    await mongoose.connection.db.admin().ping();
    
    const connectionTime = Date.now() - startTime;
    
    log('info', 'MongoDB connection test successful', { 
      connectionTime,
      dbName: DB_NAME,
      mongooseVersion: mongoose.version
    });

    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully',
      database: DB_NAME,
      environment: NODE_ENV,
      connectionTime: `${connectionTime}ms`
    });
    
  } catch (error) {
    log('error', 'MongoDB connection test failed', { 
      error: error.message,
      code: error.code,
      connectionTime: Date.now() - startTime
    });

    // Return appropriate error response
    if (error.message.includes('MONGODB_URI environment variable')) {
      return NextResponse.json({
        success: false,
        error: 'Database configuration error: MONGODB_URI is not defined',
        hint: 'Please set MONGODB_URI in your environment variables'
      }, { status: 500 });
    }

    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed: Unable to resolve hostname',
        hint: 'Check your MONGODB_URI - the hostname may be incorrect'
      }, { status: 500 });
    }

    if (error.message.includes('Authentication failed')) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed: Authentication failed',
        hint: 'Check your MongoDB username and password in MONGODB_URI'
      }, { status: 500 });
    }

    if (error.message.includes('SSL')) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed: SSL/TLS error',
        hint: 'Ensure MONGODB_URI uses mongodb+srv:// or includes ssl=true'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      hint: 'Check server logs for more details'
    }, { status: 500 });
  }
}
