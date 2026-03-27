import mongoose from 'mongoose';

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'bugzero_db';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, connectionAttempt: null };
}

// Logging helper
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [mongoose] ${message}`;
  
  if (NODE_ENV === 'production') {
    // In production, only log errors and warnings to reduce log volume
    if (level === 'error' || level === 'warn') {
      console.error(logMessage, data);
    } else if (level === 'info') {
      console.log(logMessage, data);
    }
  } else {
    // In development, log everything
    console.log(logMessage, data);
  }
}

export async function connectToDatabase() {
  const startTime = Date.now();
  
  // Check if MONGODB_URI is defined
  if (!MONGODB_URI) {
    log('error', 'MONGODB_URI environment variable is not defined');
    throw new Error(
      'Please define the MONGODB_URI environment variable in your production environment variables. ' +
      'Add MONGODB_URI to your .env.local file (development) or Vercel environment variables (production).'
    );
  }

  // Log connection attempt (mask URI for security)
  const maskedURI = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@');
  log('info', `Attempting to connect to MongoDB`, { 
    uri: maskedURI, 
    dbName: DB_NAME,
    env: NODE_ENV 
  });

  // If already connected, return cached connection
  if (cached.conn) {
    log('info', `Using existing MongoDB connection`, { 
      connectionTime: Date.now() - startTime 
    });
    return cached.conn;
  }

  // If connection in progress, wait for it
  if (cached.promise) {
    log('info', 'Waiting for existing connection to complete');
    return cached.promise;
  }

  // Create new connection
  const opts = {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    // SSL is required for MongoDB Atlas and most production environments
    ssl: true,
    // Retry writes for better reliability
    retryWrites: true,
    // Compression for better performance
    compressors: 'zlib',
  };

  log('info', 'Creating new MongoDB connection with options', opts);

  cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    log('info', 'MongoDB connection established successfully', { 
      connectionTime: Date.now() - startTime,
      mongooseVersion: mongoose.version
    });
    return mongoose;
  });

  try {
    cached.conn = await cached.promise;
    log('info', `MongoDB connected to database: ${DB_NAME}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    
    // Log detailed error information
    log('error', 'MongoDB connection failed', { 
      error: error.message,
      code: error.code,
      connectionTime: Date.now() - startTime,
      uri: maskedURI
    });
    
    // Provide helpful error messages based on error type
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      throw new Error(`Database connection failed: Unable to resolve MongoDB hostname. Please check your MONGODB_URI.`);
    }
    
    if (error.message.includes('Authentication failed')) {
      throw new Error(`Database connection failed: Authentication failed. Please check your username and password in MONGODB_URI.`);
    }
    
    if (error.message.includes('SSL')) {
      throw new Error(`Database connection failed: SSL/TLS error. Ensure your MONGODB_URI includes ssl=true or uses mongodb+srv:// protocol.`);
    }
    
    throw error;
  }
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  log('info', 'SIGINT received, closing MongoDB connection');
  if (cached.conn) {
    await cached.conn.close();
    log('info', 'MongoDB connection closed');
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  log('info', 'SIGTERM received, closing MongoDB connection');
  if (cached.conn) {
    await cached.conn.close();
    log('info', 'MongoDB connection closed');
  }
  process.exit(0);
});

// Export default
export default connectToDatabase;

// Export additional utilities
export { DB_NAME, NODE_ENV };
