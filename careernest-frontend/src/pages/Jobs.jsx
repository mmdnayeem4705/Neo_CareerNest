// pages/Jobs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call with 8 job roles from Neo Organization
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: 'Neo Organization',
          location: 'Remote / New York, NY',
          type: 'Full-time',
          salary: '$120,000 - $160,000',
          description: 'Lead development of our core platform using modern technologies. Work with a talented team to build scalable solutions.',
          requirements: ['React', 'Node.js', 'TypeScript', 'AWS', '5+ years experience'],
          postedDate: '2024-01-15',
          openings: 3,
          department: 'Engineering'
        },
        {
          id: 2,
          title: 'Data Scientist',
          company: 'Neo Organization',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$110,000 - $150,000',
          description: 'Drive data-driven decisions across the organization. Build ML models and analytics solutions.',
          requirements: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', '3+ years experience'],
          postedDate: '2024-01-14',
          openings: 2,
          department: 'Data Science'
        },
        {
          id: 3,
          title: 'Product Manager',
          company: 'Neo Organization',
          location: 'Austin, TX',
          type: 'Full-time',
          salary: '$130,000 - $170,000',
          description: 'Own product strategy and roadmap. Collaborate with engineering and design teams to deliver exceptional user experiences.',
          requirements: ['Product Management', 'Agile', 'Analytics', 'Leadership', '4+ years experience'],
          postedDate: '2024-01-13',
          openings: 1,
          department: 'Product'
        },
        {
          id: 4,
          title: 'UX/UI Designer',
          company: 'Neo Organization',
          location: 'Remote / Seattle, WA',
          type: 'Full-time',
          salary: '$90,000 - $130,000',
          description: 'Create beautiful and intuitive user experiences. Work closely with product and engineering teams.',
          requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', '3+ years experience'],
          postedDate: '2024-01-12',
          openings: 2,
          department: 'Design'
        },
        {
          id: 5,
          title: 'DevOps Engineer',
          company: 'Neo Organization',
          location: 'Remote / Chicago, IL',
          type: 'Full-time',
          salary: '$100,000 - $140,000',
          description: 'Build and maintain our cloud infrastructure. Ensure high availability and performance of our systems.',
          requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', '3+ years experience'],
          postedDate: '2024-01-11',
          openings: 2,
          department: 'Engineering'
        },
        {
          id: 6,
          title: 'Marketing Manager',
          company: 'Neo Organization',
          location: 'Los Angeles, CA',
          type: 'Full-time',
          salary: '$85,000 - $125,000',
          description: 'Lead marketing initiatives and campaigns. Drive brand awareness and customer acquisition.',
          requirements: ['Digital Marketing', 'Content Strategy', 'Analytics', 'Social Media', '4+ years experience'],
          postedDate: '2024-01-10',
          openings: 1,
          department: 'Marketing'
        },
        {
          id: 7,
          title: 'Sales Representative',
          company: 'Neo Organization',
          location: 'Miami, FL',
          type: 'Full-time',
          salary: '$70,000 - $110,000 + Commission',
          description: 'Drive sales growth and build relationships with enterprise clients. Help expand our market presence.',
          requirements: ['Sales Experience', 'CRM', 'Communication', 'Negotiation', '2+ years experience'],
          postedDate: '2024-01-09',
          openings: 3,
          department: 'Sales'
        },
        {
          id: 8,
          title: 'HR Business Partner',
          company: 'Neo Organization',
          location: 'Remote / Boston, MA',
          type: 'Full-time',
          salary: '$80,000 - $120,000',
          description: 'Support our growing team with HR initiatives. Focus on talent acquisition and employee development.',
          requirements: ['HR Experience', 'Recruiting', 'Employee Relations', 'HRIS', '3+ years experience'],
          postedDate: '2024-01-08',
          openings: 1,
          department: 'Human Resources'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.department.toLowerCase() === filter);

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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Career Opportunities at Neo Organization
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join our team and help shape the future of technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-500 px-4 py-2 rounded-full">
                {jobs.length} Open Positions
              </span>
              <span className="bg-blue-500 px-4 py-2 rounded-full">
                Remote & On-site
              </span>
              <span className="bg-blue-500 px-4 py-2 rounded-full">
                Competitive Benefits
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Departments
            </button>
            {['Engineering', 'Data Science', 'Product', 'Design', 'Marketing', 'Sales', 'Human Resources'].map(dept => (
              <button
                key={dept}
                onClick={() => setFilter(dept.toLowerCase())}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === dept.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;