import Link from 'next/link';

export default function ApplicationSubmitted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your interest in our internship program. We're excited to review your application!
          </p>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Profile Screening</h3>
                <p className="text-gray-600">Our team will review your application and qualifications</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shortlisting</h3>
                <p className="text-gray-600">Selected candidates will be shortlisted for further evaluation</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Confirmation Email</h3>
                <p className="text-gray-600">You'll receive an email with next steps within 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Internship Certificate Preview</h2>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white text-center">
            <div className="text-2xl font-bold mb-2">Internship Completion Certificate</div>
            <div className="text-lg opacity-90">Awarded to [Your Name]</div>
            <div className="text-sm opacity-75 mt-2">For outstanding performance in [Domain]</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Proceed to Verification
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
