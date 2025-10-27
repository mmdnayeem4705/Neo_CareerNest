// pages/Internships.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InternshipCard from '../components/InternshipCard';
import Loader from '../components/Loader';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call with 6 internships from Neo Organization
    setTimeout(() => {
      setInternships([
        {
          id: 1,
          title: 'Software Development Intern',
          company: 'Neo Organization',
          location: 'Remote / New York, NY',
          duration: '3 months',
          type: 'Paid Internship',
          stipend: '$3,000/month',
          description: 'Work on real projects using modern technologies. Learn from experienced developers and contribute to our platform.',
          requirements: ['JavaScript', 'React', 'Node.js', 'Git', 'Currently enrolled in CS/IT'],
          postedDate: '2024-01-15',
          openings: 5,
          department: 'Engineering',
          startDate: 'June 2024'
        },
        {
          id: 2,
          title: 'Data Science Intern',
          company: 'Neo Organization',
          location: 'San Francisco, CA',
          duration: '4 months',
          type: 'Paid Internship',
          stipend: '$3,500/month',
          description: 'Analyze data and build machine learning models. Work with our data science team on exciting projects.',
          requirements: ['Python', 'SQL', 'Statistics', 'Machine Learning basics', 'Currently enrolled in Data Science/CS'],
          postedDate: '2024-01-14',
          openings: 3,
          department: 'Data Science',
          startDate: 'May 2024'
        },
        {
          id: 3,
          title: 'UX/UI Design Intern',
          company: 'Neo Organization',
          location: 'Remote / Seattle, WA',
          duration: '3 months',
          type: 'Paid Internship',
          stipend: '$2,800/month',
          description: 'Create beautiful user interfaces and improve user experience. Work with our design team on various projects.',
          requirements: ['Figma', 'Adobe Creative Suite', 'Design thinking', 'Portfolio required', 'Currently enrolled in Design/CS'],
          postedDate: '2024-01-13',
          openings: 2,
          department: 'Design',
          startDate: 'July 2024'
        },
        {
          id: 4,
          title: 'Marketing Intern',
          company: 'Neo Organization',
          location: 'Los Angeles, CA',
          duration: '3 months',
          type: 'Paid Internship',
          stipend: '$2,500/month',
          description: 'Support marketing campaigns and content creation. Learn digital marketing strategies and tools.',
          requirements: ['Social Media', 'Content Creation', 'Analytics', 'Communication skills', 'Currently enrolled in Marketing/Business'],
          postedDate: '2024-01-12',
          openings: 4,
          department: 'Marketing',
          startDate: 'June 2024'
        },
        {
          id: 5,
          title: 'DevOps Intern',
          company: 'Neo Organization',
          location: 'Remote / Chicago, IL',
          duration: '4 months',
          type: 'Paid Internship',
          stipend: '$3,200/month',
          description: 'Learn cloud infrastructure and deployment processes. Work with our DevOps team on automation projects.',
          requirements: ['Linux', 'Docker basics', 'AWS/GCP basics', 'Scripting', 'Currently enrolled in CS/IT'],
          postedDate: '2024-01-11',
          openings: 2,
          department: 'Engineering',
          startDate: 'May 2024'
        },
        {
          id: 6,
          title: 'Product Management Intern',
          company: 'Neo Organization',
          location: 'Austin, TX',
          duration: '3 months',
          type: 'Paid Internship',
          stipend: '$3,000/month',
          description: 'Learn product strategy and roadmap planning. Work closely with product managers on feature development.',
          requirements: ['Analytical thinking', 'Communication', 'Project management basics', 'Currently enrolled in Business/CS'],
          postedDate: '2024-01-10',
          openings: 2,
          department: 'Product',
          startDate: 'June 2024'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredInternships = filter === 'all' ? internships : internships.filter(internship => internship.department.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Internship Programs at Neo Organization
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Gain real-world experience and kickstart your career
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-green-500 px-4 py-2 rounded-full">
                {internships.length} Internship Programs
              </span>
              <span className="bg-green-500 px-4 py-2 rounded-full">
                Paid Internships
              </span>
              <span className="bg-green-500 px-4 py-2 rounded-full">
                Remote & On-site
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Departments
            </button>
            {['Engineering', 'Data Science', 'Design', 'Marketing', 'Product'].map(dept => (
              <button
                key={dept}
                onClick={() => setFilter(dept.toLowerCase())}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === dept.toLowerCase()
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Internships Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
          
          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No internships found</h3>
              <p className="text-gray-500">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Internship Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Stipend</h3>
              <p className="text-gray-600">Earn while you learn with our competitive monthly stipends</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real Projects</h3>
              <p className="text-gray-600">Work on actual projects that impact our business</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
              <p className="text-gray-600">Learn from experienced professionals and industry experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internships;