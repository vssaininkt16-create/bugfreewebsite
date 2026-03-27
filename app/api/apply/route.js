import { NextResponse } from 'next/server';
import connectToDatabase, { DB_NAME, NODE_ENV } from '../../../lib/mongodb';

// Logging helper
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [api/apply] ${message}`;
  
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

export async function POST(request) {
  const startTime = Date.now();
  
  log('info', 'Processing job application');

  try {
    const body = await request.json();

    // Basic validation
    const { fullName, email, domain } = body;

    if (!fullName || !email || !domain) {
      log('warn', 'Application validation failed - missing fields', { 
        hasFullName: !!fullName, 
        hasEmail: !!email,
        hasDomain: !!domain 
      });
      
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, and domain are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      log('warn', 'Application validation failed - invalid email', { email });
      
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Valid domains
    const validDomains = ['Web Development', 'Cybersecurity', 'AI/ML'];
    if (!validDomains.includes(domain)) {
      log('warn', 'Application validation failed - invalid domain', { domain, validDomains });
      
      return NextResponse.json(
        { error: 'Invalid domain selected. Please choose from: Web Development, Cybersecurity, AI/ML' },
        { status: 400 }
      );
    }

    // Use unified database connection from lib/mongodb.js
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    
    const application = {
      fullName,
      email,
      domain,
      submittedAt: new Date().toISOString()
    };
    
    await db.collection('applications').insertOne(application);

    log('info', `Application submitted successfully`, { 
      email,
      domain,
      processingTime: Date.now() - startTime 
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    log('error', 'Error processing application', { 
      error: error.message,
      code: error.code,
      processingTime: Date.now() - startTime
    });

    // Return appropriate error response
    if (error.message.includes('MONGODB_URI environment variable')) {
      return NextResponse.json(
        { error: 'Database configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    if (error.message.includes('validation failed') || error.message.includes('Invalid')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
