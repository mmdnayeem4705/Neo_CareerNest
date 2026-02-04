// pages/HRDashboard.jsx - HR-focused ATS-style dashboard
import React, { useState, useEffect } from 'react';
import { hrService } from '../services/hrService';
import { jobService } from '../services/jobService';
import { internshipService } from '../services/internshipService';
import { applicationService } from '../services/applicationService';
import { API_BASE } from '../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'SELECTED'];
const STATUS_LABELS = {
  PENDING: 'Pending',
  REVIEWED: 'Under Review',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
  SELECTED: 'Accepted'
};
const STATUS_COLORS = {
  PENDING: 'bg-amber-100 text-amber-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  SELECTED: 'bg-emerald-100 text-emerald-800'
};

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [stats, setStats] = useState({ totalJobs: 0, totalInternships: 0, totalApplications: 0, pendingApplications: 0 });
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingInternship, setEditingInternship] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    department: 'Engineering',
    location: '',
    vacancies: 1,
    salaryMin: '',
    salaryMax: '',
    employmentType: 'FULL_TIME',
    experienceLevel: 'ENTRY',
    skillsRequired: '',
    benefits: '',
    applicationDeadline: ''
  });

  const [internshipForm, setInternshipForm] = useState({
    title: '',
    description: '',
    department: 'Engineering',
    location: '',
    vacancies: 1,
    duration: '3 months',
    type: 'PAID',
    stipendAmount: '',
    skillsRequired: '',
    learningObjectives: '',
    applicationDeadline: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, appsRes, jobsRes, internsRes] = await Promise.all([
        hrService.getDashboard().catch(() => ({ data: { data: {} } })),
        applicationService.getHRApplications().catch(() => ({ data: { data: [] } })),
        jobService.getMyJobs().catch(() => ({ data: { data: [] } })),
        internshipService.getMyInternships().catch(() => ({ data: { data: [] } }))
      ]);
      const dash = dashboardRes?.data?.data || {};
      setStats({
        totalJobs: dash.myJobsCount ?? (jobsRes?.data?.data?.length || 0),
        totalInternships: dash.myInternshipsCount ?? (internsRes?.data?.data?.length || 0),
        totalApplications: (appsRes?.data?.data || []).length,
        pendingApplications: (appsRes?.data?.data || []).filter(a => a.status === 'PENDING').length
      });
      setApplications(appsRes?.data?.data || []);
      setJobs(jobsRes?.data?.data || []);
      setInternships(internsRes?.data?.data || []);
    } catch (err) {
      toast.error('Failed to load HR data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...jobForm,
        vacancies: parseInt(jobForm.vacancies) || 1,
        salaryMin: parseFloat(jobForm.salaryMin) || 0,
        salaryMax: parseFloat(jobForm.salaryMax) || 0,
        applicationDeadline: jobForm.applicationDeadline || null
      };
      if (editingJob) {
        await jobService.updateJob(editingJob.id, payload);
        toast.success('Job updated');
      } else {
        await jobService.createJob(payload);
        toast.success('Job created');
      }
      setShowJobForm(false);
      setEditingJob(null);
      resetJobForm();
      fetchHRData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save job');
    }
  };

  const handleInternshipSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...internshipForm,
        vacancies: parseInt(internshipForm.vacancies) || 1,
        stipendAmount: internshipForm.stipendAmount ? parseFloat(internshipForm.stipendAmount) : null,
        applicationDeadline: internshipForm.applicationDeadline || null,
        startDate: internshipForm.startDate || null,
        endDate: internshipForm.endDate || null
      };
      if (editingInternship) {
        await internshipService.updateInternship(editingInternship.id, payload);
        toast.success('Internship updated');
      } else {
        await internshipService.createInternship(payload);
        toast.success('Internship created');
      }
      setShowInternshipForm(false);
      setEditingInternship(null);
      resetInternshipForm();
      fetchHRData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save internship');
    }
  };

  const resetJobForm = () => {
    setJobForm({
      title: '', description: '', department: 'Engineering', location: '',
      vacancies: 1, salaryMin: '', salaryMax: '', employmentType: 'FULL_TIME',
      experienceLevel: 'ENTRY', skillsRequired: '', benefits: '', applicationDeadline: ''
    });
  };

  const resetInternshipForm = () => {
    setInternshipForm({
      title: '', description: '', department: 'Engineering', location: '',
      vacancies: 1, duration: '3 months', type: 'PAID', stipendAmount: '',
      skillsRequired: '', learningObjectives: '', applicationDeadline: '', startDate: '', endDate: ''
    });
  };

  const updateApplicationStatus = async (id, status, notes = '') => {
    try {
      await applicationService.updateApplicationStatus(id, status, notes);
      toast.success('Status updated');
      setSelectedApp(null);
      fetchHRData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await jobService.deleteJob(id);
      toast.success('Job deleted');
      fetchHRData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    }
  };

  const deleteInternship = async (id) => {
    if (!window.confirm('Delete this internship?')) return;
    try {
      await internshipService.deleteInternship(id);
      toast.success('Internship deleted');
      fetchHRData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    }
  };

  const openResume = (app) => {
    const url = app.resumeUrl || app.user?.resumeUrl;
    if (!url) {
      toast.error('No resume attached');
      return;
    }
    const full = url.startsWith('http') ? url : `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
    window.open(full, '_blank');
  };

  const getPositionTitle = (app) => {
    if (app.job) return app.job.title;
    if (app.internship) return app.internship.title;
    return '—';
  };

  const getApplicantName = (app) => {
    const u = app.user;
    if (!u) return '—';
    return [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email;
  };

  const filteredApps = filterStatus
    ? applications.filter(a => a.status === filterStatus)
    : applications;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">HR Portal</h1>
          <p className="text-slate-600 mt-1">Create hiring slots, review applications, view resumes and ATS scores</p>
        </div>

        <nav className="flex gap-6 border-b border-slate-200 mb-8">
          {[
            { id: 'applications', label: 'Applications', icon: '📋' },
            { id: 'jobs', label: 'Job Slots', icon: '💼' },
            { id: 'internships', label: 'Internship Slots', icon: '🎓' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === t.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border border-slate-100">
            <p className="text-sm text-slate-500">Job Slots</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.totalJobs}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-slate-100">
            <p className="text-sm text-slate-500">Internship Slots</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.totalInternships}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-slate-100">
            <p className="text-sm text-slate-500">Total Applications</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.totalApplications}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-slate-100">
            <p className="text-sm text-slate-500">Pending Review</p>
            <p className="text-2xl font-semibold text-amber-600">{stats.pendingApplications}</p>
          </div>
        </div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">All Applications</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border-slate-300 text-sm"
              >
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">ATS Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApps.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No applications yet</td></tr>
                  ) : (
                    filteredApps.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">{getApplicantName(app)}</p>
                            <p className="text-sm text-slate-500">{app.user?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{getPositionTitle(app)}</td>
                        <td className="px-6 py-4">
                          {app.atsScore != null ? (
                            <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                              app.atsScore >= 70 ? 'bg-emerald-100 text-emerald-800' :
                              app.atsScore >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {app.atsScore}%
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[app.status] || 'bg-slate-100 text-slate-700'}`}>
                            {STATUS_LABELS[app.status] || app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => openResume(app)}
                              className="text-slate-600 hover:text-slate-800 text-sm"
                            >
                              Resume
                            </button>
                            {app.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => updateApplicationStatus(app.id, 'SELECTED')}
                                  className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Job Slots (Hiring Openings)</h2>
              <button
                onClick={() => { setEditingJob(null); resetJobForm(); setShowJobForm(true); }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
              >
                + Create Job Slot
              </button>
            </div>
            <div className="grid gap-4">
              {jobs.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">No jobs yet. Create your first slot.</div>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-xl shadow border border-slate-200 p-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.department} • {job.location}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        ${job.salaryMin?.toLocaleString()} – ${job.salaryMax?.toLocaleString()} • {job.vacancies} opening(s)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditingJob(job); setJobForm({
                          title: job.title, description: job.description, department: job.department, location: job.location,
                          vacancies: job.vacancies, salaryMin: job.salaryMin, salaryMax: job.salaryMax,
                          employmentType: job.employmentType, experienceLevel: job.experienceLevel,
                          skillsRequired: job.skillsRequired || '', benefits: job.benefits || '',
                          applicationDeadline: job.applicationDeadline ? job.applicationDeadline.slice(0, 16) : ''
                        }); setShowJobForm(true); }}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Internship Slots</h2>
              <button
                onClick={() => { setEditingInternship(null); resetInternshipForm(); setShowInternshipForm(true); }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm font-medium"
              >
                + Create Internship Slot
              </button>
            </div>
            <div className="grid gap-4">
              {internships.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">No internships yet. Create your first slot.</div>
              ) : (
                internships.map(intern => (
                  <div key={intern.id} className="bg-white rounded-xl shadow border border-slate-200 p-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{intern.title}</h3>
                      <p className="text-sm text-slate-600">{intern.department} • {intern.location}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {intern.duration} • ${intern.stipendAmount || 0}/mo • {intern.vacancies} opening(s)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditingInternship(intern); setInternshipForm({
                          title: intern.title, description: intern.description, department: intern.department, location: intern.location,
                          vacancies: intern.vacancies, duration: intern.duration, type: intern.type, stipendAmount: intern.stipendAmount || '',
                          skillsRequired: intern.skillsRequired || '', learningObjectives: intern.learningObjectives || '',
                          applicationDeadline: intern.applicationDeadline ? intern.applicationDeadline.slice(0, 16) : '',
                          startDate: intern.startDate ? intern.startDate.slice(0, 10) : '',
                          endDate: intern.endDate ? intern.endDate.slice(0, 10) : ''
                        }); setShowInternshipForm(true); }}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteInternship(intern.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{getApplicantName(selectedApp)}</h3>
                  <p className="text-slate-600">{getPositionTitle(selectedApp)}</p>
                  <p className="text-sm text-slate-500">{selectedApp.user?.email}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  {selectedApp.atsScore != null && (
                    <div>
                      <span className="text-sm text-slate-500">ATS Score</span>
                      <p className={`text-2xl font-bold ${selectedApp.atsScore >= 70 ? 'text-emerald-600' : selectedApp.atsScore >= 40 ? 'text-amber-600' : 'text-slate-600'}`}>
                        {selectedApp.atsScore}%
                      </p>
                    </div>
                  )}
                  <a
                    href={(selectedApp.resumeUrl || selectedApp.user?.resumeUrl) ? `${API_BASE}${(selectedApp.resumeUrl || selectedApp.user?.resumeUrl).startsWith('/') ? '' : '/'}${selectedApp.resumeUrl || selectedApp.user?.resumeUrl}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Resume →
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Cover Letter</p>
                  <p className="text-slate-600 mt-1 whitespace-pre-wrap">{selectedApp.coverLetter || '—'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Status</p>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => updateApplicationStatus(selectedApp.id, e.target.value)}
                    className="mt-1 rounded-lg border-slate-300"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => updateApplicationStatus(selectedApp.id, 'SELECTED')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApp.id, 'REJECTED')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full my-8">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold">{editingJob ? 'Edit Job Slot' : 'Create Job Slot'}</h3>
              </div>
              <form onSubmit={handleJobSubmit} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={jobForm.description}
                  onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  rows={3}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Location" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} className="px-3 py-2 border rounded-lg" required />
                  <select value={jobForm.department} onChange={e => setJobForm({ ...jobForm, department: e.target.value })} className="px-3 py-2 border rounded-lg">
                    {['Engineering', 'Data Science', 'Product', 'Design', 'Marketing', 'Sales'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Min Salary" value={jobForm.salaryMin} onChange={e => setJobForm({ ...jobForm, salaryMin: e.target.value })} className="px-3 py-2 border rounded-lg" required />
                  <input type="number" placeholder="Max Salary" value={jobForm.salaryMax} onChange={e => setJobForm({ ...jobForm, salaryMax: e.target.value })} className="px-3 py-2 border rounded-lg" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select value={jobForm.employmentType} onChange={e => setJobForm({ ...jobForm, employmentType: e.target.value })} className="px-3 py-2 border rounded-lg">
                    <option value="FULL_TIME">Full-time</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="CONTRACT">Contract</option>
                  </select>
                  <select value={jobForm.experienceLevel} onChange={e => setJobForm({ ...jobForm, experienceLevel: e.target.value })} className="px-3 py-2 border rounded-lg">
                    <option value="ENTRY">Entry</option>
                    <option value="MID">Mid</option>
                    <option value="SENIOR">Senior</option>
                  </select>
                </div>
                <input type="number" placeholder="Vacancies" value={jobForm.vacancies} onChange={e => setJobForm({ ...jobForm, vacancies: e.target.value })} min={1} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="text" placeholder="Skills (comma-separated)" value={jobForm.skillsRequired} onChange={e => setJobForm({ ...jobForm, skillsRequired: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Benefits" value={jobForm.benefits} onChange={e => setJobForm({ ...jobForm, benefits: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="datetime-local" placeholder="Application Deadline" value={jobForm.applicationDeadline} onChange={e => setJobForm({ ...jobForm, applicationDeadline: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <div className="flex gap-2 justify-end pt-4">
                  <button type="button" onClick={() => { setShowJobForm(false); setEditingJob(null); }} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{editingJob ? 'Update' : 'Create'} Job</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Internship Form Modal */}
        {showInternshipForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full my-8">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold">{editingInternship ? 'Edit Internship Slot' : 'Create Internship Slot'}</h3>
              </div>
              <form onSubmit={handleInternshipSubmit} className="p-6 space-y-4">
                <input type="text" placeholder="Title" value={internshipForm.title} onChange={e => setInternshipForm({ ...internshipForm, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <textarea placeholder="Description" value={internshipForm.description} onChange={e => setInternshipForm({ ...internshipForm, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Location" value={internshipForm.location} onChange={e => setInternshipForm({ ...internshipForm, location: e.target.value })} className="px-3 py-2 border rounded-lg" required />
                  <select value={internshipForm.department} onChange={e => setInternshipForm({ ...internshipForm, department: e.target.value })} className="px-3 py-2 border rounded-lg">
                    {['Engineering', 'Data Science', 'Product', 'Design', 'Marketing'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select value={internshipForm.duration} onChange={e => setInternshipForm({ ...internshipForm, duration: e.target.value })} className="px-3 py-2 border rounded-lg">
                    {['1 month', '2 months', '3 months', '4 months', '6 months'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select value={internshipForm.type} onChange={e => setInternshipForm({ ...internshipForm, type: e.target.value })} className="px-3 py-2 border rounded-lg">
                    <option value="PAID">Paid</option>
                    <option value="STIPEND">Stipend</option>
                    <option value="UNPAID">Unpaid</option>
                  </select>
                </div>
                <input type="number" placeholder="Stipend amount (optional)" value={internshipForm.stipendAmount} onChange={e => setInternshipForm({ ...internshipForm, stipendAmount: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="number" placeholder="Vacancies" value={internshipForm.vacancies} onChange={e => setInternshipForm({ ...internshipForm, vacancies: e.target.value })} min={1} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="text" placeholder="Skills (comma-separated)" value={internshipForm.skillsRequired} onChange={e => setInternshipForm({ ...internshipForm, skillsRequired: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Learning objectives" value={internshipForm.learningObjectives} onChange={e => setInternshipForm({ ...internshipForm, learningObjectives: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" placeholder="Start Date" value={internshipForm.startDate} onChange={e => setInternshipForm({ ...internshipForm, startDate: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <input type="date" placeholder="End Date" value={internshipForm.endDate} onChange={e => setInternshipForm({ ...internshipForm, endDate: e.target.value })} className="px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button type="button" onClick={() => { setShowInternshipForm(false); setEditingInternship(null); }} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">{editingInternship ? 'Update' : 'Create'} Internship</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
