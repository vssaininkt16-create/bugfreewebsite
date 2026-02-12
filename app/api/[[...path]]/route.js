import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'bugzero_db'

let cachedClient = null

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined. Please set it in your production environment.')
  }

  if (cachedClient) {
    return cachedClient
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    await client.connect()
    cachedClient = client
    return client
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    throw new Error('Database connection failed. Please check your MONGODB_URI and MongoDB Atlas configuration.')
  }
}

// GET handler - API info
export async function GET(request) {
  return NextResponse.json({
    message: 'BugZero Cyber Solutions API',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      upload: 'POST /api/upload'
    }
  })
}

// POST handler - routing
export async function POST(request) {
  const url = new URL(request.url)
  const path = url.pathname

  try {
    // Contact form submission
    if (path === '/api/contact') {
      const data = await request.json()
      
      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }

      const client = await connectToDatabase()
      const db = client.db(DB_NAME)
      
      const contact = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: new Date().toISOString(),
        status: 'new'
      }

      await db.collection('contacts').insertOne(contact)

      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
        id: contact.id
      })
    }

    // Logo upload
    if (path === '/api/upload') {
      const formData = await request.formData()
      const logo = formData.get('logo')
      const email = formData.get('email')

      if (!logo) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        )
      }

      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      if (!allowedTypes.includes(logo.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PNG, JPG, and WEBP are allowed' },
          { status: 400 }
        )
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (logo.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB' },
          { status: 400 }
        )
      }

      // Convert file to buffer and store in database
      const bytes = await logo.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const client = await connectToDatabase()
      const db = client.db(DB_NAME)

      const upload = {
        id: uuidv4(),
        email: email || 'unknown',
        filename: logo.name,
        contentType: logo.type,
        size: logo.size,
        data: buffer.toString('base64'), // Store as base64
        createdAt: new Date().toISOString()
      }

      await db.collection('uploads').insertOne(upload)

      return NextResponse.json({
        success: true,
        message: 'Logo uploaded successfully',
        id: upload.id,
        filename: logo.name
      })
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    )

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
