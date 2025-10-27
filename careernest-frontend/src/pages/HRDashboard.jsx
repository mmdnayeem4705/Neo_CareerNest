// pages/HRDashboard.jsx
import React, { useState, useEffect } from 'react';
import { hrService } from '../services/hrService';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalJobs: 8,
    totalApplications: 156,
    pendingApplications: 23,
    hiredCandidates: 12,
    totalInternships: 6,
    activeInterns: 18
  });
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingInternship, setEditingInternship] = useState(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'Full-time',
    department: 'Engineering',
    openings: 1
  });

  const [internshipForm, setInternshipForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    stipend: '',
    duration: '3 months',
    department: 'Engineering',
    openings: 1,
    startDate: ''
  });

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    setLoading(true);
    try {
      // Simulate API calls with mock data
      setTimeout(() => {
        setApplications([
          {
            id: 1,
            jobTitle: 'Senior Software Engineer',
            applicantName: 'John Doe',
            email: 'john.doe@email.com',
            appliedDate: '2024-01-20',
            status: 'Pending',
            experience: '5 years',
            skills: ['React', 'Node.js', 'TypeScript']
          },
          {
            id: 2,
            jobTitle: 'Data Scientist',
            applicantName: 'Jane Smith',
            email: 'jane.smith@email.com',
            appliedDate: '2024-01-19',
            status: 'Under Review',
            experience: '3 years',
            skills: ['Python', 'Machine Learning', 'SQL']
          },
          {
            id: 3,
            jobTitle: 'Product Manager',
            applicantName: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            appliedDate: '2024-01-18',
            status: 'Interview Scheduled',
            experience: '4 years',
            skills: ['Product Strategy', 'Analytics', 'Leadership']
          }
        ]);

        setJobs([
          {
            id: 1,
            title: 'Senior Software Engineer',
            department: 'Engineering',
            location: 'Remote / New York, NY',
            type: 'Full-time',
            salary: '$120,000 - $160,000',
            openings: 3,
            postedDate: '2024-01-15',
            applications: 45,
            status: 'Active'
          },
          {
            id: 2,
            title: 'Data Scientist',
            department: 'Data Science',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$110,000 - $150,000',
            openings: 2,
            postedDate: '2024-01-14',
            applications: 32,
            status: 'Active'
          }
        ]);

        setInternships([
          {
            id: 1,
            title: 'Software Development Intern',
            department: 'Engineering',
            location: 'Remote / New York, NY',
            duration: '3 months',
            stipend: '$3,000/month',
            openings: 5,
            postedDate: '2024-01-15',
            applications: 28,
            status: 'Active'
          },
          {
            id: 2,
            title: 'Data Science Intern',
            department: 'Data Science',
            location: 'San Francisco, CA',
            duration: '4 months',
            stipend: '$3,500/month',
            openings: 3,
            postedDate: '2024-01-14',
            applications: 22,
            status: 'Active'
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching HR data:', error);
      setLoading(false);
    }
  };

  const handleJobFormChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value
    });
  };

  const handleInternshipFormChange = (e) => {
    setInternshipForm({
      ...internshipForm,
      [e.target.name]: e.target.value
    });
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    // Handle job creation/update
    console.log('Job form submitted:', jobForm);
    setShowJobForm(false);
    setEditingJob(null);
    setJobForm({
      title: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
      type: 'Full-time',
      department: 'Engineering',
      openings: 1
    });
  };

  const handleInternshipSubmit = (e) => {
    e.preventDefault();
    // Handle internship creation/update
    console.log('Internship form submitted:', internshipForm);
    setShowInternshipForm(false);
    setEditingInternship(null);
    setInternshipForm({
      title: '',
      description: '',
      requirements: '',
      location: '',
      stipend: '',
      duration: '3 months',
      department: 'Engineering',
      openings: 1,
      startDate: ''
    });
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const deleteInternship = (internshipId) => {
    setInternships(internships.filter(internship => internship.id !== internshipId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          <p className="text-gray-600">Manage jobs, internships, and applications for Neo Organization</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'applications', label: 'Applications' },
              { id: 'jobs', label: 'Jobs' },
              { id: 'internships', label: 'Internships' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingApplications}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Hired Candidates</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.hiredCandidates}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Internships</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalInternships}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Interns</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.activeInterns}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {applications.slice(0, 5).map(application => (
                  <div key={application.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{application.applicantName}</p>
                      <p className="text-sm text-gray-500">{application.jobTitle}</p>
                      <p className="text-xs text-gray-400">Applied on {application.appliedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map(application => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.jobTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.experience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            value={application.status}
                            onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Hired">Hired</option>
                          </select>
                          <button className="text-blue-600 hover:text-blue-900 text-xs">View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Job Postings</h3>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add New Job
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.department} • {job.location}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>💰 {job.salary}</span>
                        <span>👥 {job.openings} openings</span>
                        <span>📝 {job.applications} applications</span>
                        <span>📅 Posted {job.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                      <button
                        onClick={() => setEditingJob(job)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Internship Programs</h3>
              <button
                onClick={() => setShowInternshipForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add New Internship
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {internships.map(internship => (
                <div key={internship.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{internship.title}</h4>
                      <p className="text-sm text-gray-600">{internship.department} • {internship.location}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>💰 {internship.stipend}</span>
                        <span>⏱️ {internship.duration}</span>
                        <span>👥 {internship.openings} openings</span>
                        <span>📝 {internship.applications} applications</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        internship.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {internship.status}
                      </span>
                      <button
                        onClick={() => setEditingInternship(internship)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteInternship(internship.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h3>
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={jobForm.title}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Job Description"
                    value={jobForm.description}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    required
                  />
                  <input
                    type="text"
                    name="requirements"
                    placeholder="Requirements (comma separated)"
                    value={jobForm.requirements}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={jobForm.location}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="salary"
                    placeholder="Salary Range"
                    value={jobForm.salary}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <div className="flex space-x-4">
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleJobFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <select
                      name="department"
                      value={jobForm.department}
                      onChange={handleJobFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    name="openings"
                    placeholder="Number of Openings"
                    value={jobForm.openings}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowJobForm(false);
                        setEditingJob(null);
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {editingJob ? 'Update' : 'Create'} Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Internship Form Modal */}
        {showInternshipForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingInternship ? 'Edit Internship' : 'Add New Internship'}
                </h3>
                <form onSubmit={handleInternshipSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Internship Title"
                    value={internshipForm.title}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Internship Description"
                    value={internshipForm.description}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    required
                  />
                  <input
                    type="text"
                    name="requirements"
                    placeholder="Requirements (comma separated)"
                    value={internshipForm.requirements}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={internshipForm.location}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="stipend"
                    placeholder="Monthly Stipend"
                    value={internshipForm.stipend}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <div className="flex space-x-4">
                    <select
                      name="duration"
                      value={internshipForm.duration}
                      onChange={handleInternshipFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                      <option value="4 months">4 months</option>
                      <option value="6 months">6 months</option>
                    </select>
                    <select
                      name="department"
                      value={internshipForm.department}
                      onChange={handleInternshipFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    name="openings"
                    placeholder="Number of Openings"
                    value={internshipForm.openings}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={internshipForm.startDate}
                    onChange={handleInternshipFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowInternshipForm(false);
                        setEditingInternship(null);
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {editingInternship ? 'Update' : 'Create'} Internship
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;