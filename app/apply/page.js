'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Apply() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    domain: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const domains = ['Web Development', 'Cybersecurity', 'AI/ML'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.domain) {
      newErrors.domain = 'Please select a domain';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/application-submitted');
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background depth layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Inner depth layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

        <div className="relative text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Apply for Internship</h1>
          <p className="text-gray-300 drop-shadow-sm">Join our team and start your career journey</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-2 drop-shadow-sm">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 ${
                errors.fullName ? 'border-red-400' : ''
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400 drop-shadow-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2 drop-shadow-sm">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 ${
                errors.email ? 'border-red-400' : ''
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400 drop-shadow-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-200 mb-2 drop-shadow-sm">
              Domain *
            </label>
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm text-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 ${
                errors.domain ? 'border-red-400' : ''
              }`}
            >
              <option value="" className="bg-slate-800 text-gray-400">Select a domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain} className="bg-slate-800 text-white">
                  {domain}
                </option>
              ))}
            </select>
            {errors.domain && (
              <p className="mt-1 text-sm text-red-400 drop-shadow-sm">{errors.domain}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
