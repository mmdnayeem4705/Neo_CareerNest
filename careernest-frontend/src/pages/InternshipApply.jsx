// pages/InternshipApply.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const InternshipApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [application, setApplication] = useState({
    resume: null,
    coverLetter: '',
    availability: '',
    portfolio: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternship();
  }, [id]);

  const fetchInternship = async () => {
    try {
      setLoading(true);
      // Mock the internship details based on the id for demo purposes
      setTimeout(() => {
        const mock = {
          id: parseInt(id),
          title: 'Software Development Intern',
          company: 'Neo Organization',
          location: 'Remote / New York, NY',
          duration: '3 months',
          type: 'Paid Internship',
          stipend: '$3,000/month',
          description:
            'Work on real projects using modern technologies. Learn from experienced developers and contribute to our platform.',
          requirements: ['JavaScript', 'React', 'Node.js', 'Git', 'Currently enrolled in CS/IT'],
          postedDate: '2024-01-15',
          openings: 5,
          department: 'Engineering',
          startDate: 'June 2024',
        };
        setInternship(mock);
        setLoading(false);
      }, 600);
    } catch (e) {
      setError('Failed to load internship details');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // Simulate submit for demo
      await new Promise((r) => setTimeout(r, 1500));
      alert('Internship application submitted successfully!');
      navigate('/internships');
    } catch (e) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader />
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Not Found</h2>
            <p className="text-gray-600 mb-4">The internship you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/internships')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Browse Internships
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Internship Details Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{internship.company}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>📍 {internship.location}</span>
                <span>🕒 {internship.duration}</span>
                <span>💰 {internship.stipend}</span>
                <span>👥 {internship.openings} openings</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {internship.department}
              </span>
              <p className="text-sm text-gray-500 mt-2">Posted {internship.postedDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About this Internship</h3>
              <p className="text-gray-700 mb-6">{internship.description}</p>

              <h3 className="text-lg font-semibold mb-4">Requirements</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {internship.requirements.map((req, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Details</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Start Date: {internship.startDate}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Type: {internship.type}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Internship</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume/CV *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="resume" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              {application.resume && (
                <p className="mt-2 text-sm text-green-600">✓ {application.resume.name} selected</p>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Tell us why you're interested and a great fit..."
                value={application.coverLetter}
                onChange={handleChange}
                required
              />
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={application.availability}
                onChange={handleChange}
              >
                <option value="">Select availability</option>
                <option value="immediate">Immediate</option>
                <option value="2weeks">2 weeks notice</option>
                <option value="1month">1 month notice</option>
                <option value="2months">2+ months notice</option>
              </select>
            </div>

            {/* Portfolio */}
            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio/Website (Optional)
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="https://yourportfolio.com"
                value={application.portfolio}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/internships')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternshipApply;


