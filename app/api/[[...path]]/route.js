import { NextResponse } from 'next/server';
import connectToDatabase, { DB_NAME, NODE_ENV } from '../../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

// Logging helper - uses the same pattern as lib/mongodb.js
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [api/[[...path]]] ${message}`;
  
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

// GET handler - API info
export async function GET(request) {
  log('info', 'API info endpoint accessed');
  
  return NextResponse.json({
    message: 'BugZero Cyber Solutions API',
    version: '1.0.0',
    environment: NODE_ENV,
    database: DB_NAME,
    endpoints: {
      contact: 'POST /api/contact',
      upload: 'POST /api/upload'
    }
  });
}

// POST handler - routing
export async function POST(request) {
  const startTime = Date.now();
  const url = new URL(request.url);
  const path = url.pathname;

  log('info', `POST request received`, { path, method: 'POST' });

  try {
    // Contact form submission
    if (path === '/api/contact') {
      log('info', 'Processing contact form submission');
      
      const data = await request.json();
      
      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        log('warn', 'Contact form validation failed - missing fields', { 
          hasName: !!data.name, 
          hasEmail: !!data.email,
          hasSubject: !!data.subject,
          hasMessage: !!data.message 
        });
        
        return NextResponse.json(
          { error: 'Missing required fields: name, email, subject, and message are required' },
          { status: 400 }
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        log('warn', 'Contact form validation failed - invalid email', { email: data.email });
        
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      // Use unified database connection from lib/mongodb.js
      const mongoose = await connectToDatabase();
      const db = mongoose.connection.db;
      
      const contact = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: new Date().toISOString(),
        status: 'new'
      };

      await db.collection('contacts').insertOne(contact);

      log('info', `Contact form submitted successfully`, { 
        contactId: contact.id,
        email: data.email,
        processingTime: Date.now() - startTime 
      });

      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
        id: contact.id
      });
    }

    // Logo upload
    if (path === '/api/upload') {
      log('info', 'Processing logo upload');
      
      const formData = await request.formData();
      const logo = formData.get('logo');
      const email = formData.get('email');

      if (!logo) {
        log('warn', 'Upload validation failed - no file provided');
        
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(logo.type)) {
        log('warn', 'Upload validation failed - invalid file type', { 
          fileType: logo.type,
          allowedTypes 
        });
        
        return NextResponse.json(
          { error: 'Invalid file type. Only PNG, JPG, and WEBP are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (logo.size > maxSize) {
        log('warn', 'Upload validation failed - file too large', { 
          fileSize: logo.size,
          maxSize 
        });
        
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB' },
          { status: 400 }
        );
      }

      // Convert file to buffer and store in database
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Use unified database connection from lib/mongodb.js
      const mongoose = await connectToDatabase();
      const db = mongoose.connection.db;

      const upload = {
        id: uuidv4(),
        email: email || 'unknown',
        filename: logo.name,
        contentType: logo.type,
        size: logo.size,
        data: buffer.toString('base64'), // Store as base64
        createdAt: new Date().toISOString()
      };

      await db.collection('uploads').insertOne(upload);

      log('info', `Logo uploaded successfully`, { 
        uploadId: upload.id,
        filename: logo.name,
        size: logo.size,
        processingTime: Date.now() - startTime 
      });

      return NextResponse.json({
        success: true,
        message: 'Logo uploaded successfully',
        id: upload.id,
        filename: logo.name
      });
    }

    // Endpoint not found
    log('warn', `Endpoint not found`, { path, method: 'POST' });
    
    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );

  } catch (error) {
    // Log detailed error information
    log('error', 'API Error', { 
      error: error.message,
      code: error.code,
      path,
      method: 'POST',
      processingTime: Date.now() - startTime
    });

    // Return appropriate error response based on error type
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

    // Generic error response - don't expose internal error details to client
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS preflight requests for CORS
export async function OPTIONS(request) {
  log('info', 'OPTIONS preflight request received');
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
      'Access-Control-Max-Age': '86400',
    },
  });
}
