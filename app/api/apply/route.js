import connectToDatabase from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    const { fullName, email, domain } = body;

    if (!fullName || !email || !domain) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Valid domains
    const validDomains = ['Web Development', 'Cybersecurity', 'AI/ML'];
    if (!validDomains.includes(domain)) {
      return Response.json(
        { error: 'Invalid domain selected' },
        { status: 400 }
      );
    }

    // Save to database
    const db = await connectToDatabase();
    const application = {
      fullName,
      email,
      domain,
      submittedAt: new Date().toISOString()
    };
    await db.collection('applications').insertOne(application);

    // Return success response
    return Response.json({
      success: true,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
