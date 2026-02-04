import React, { useEffect, useState } from 'react';
import { applicationService } from '../services/applicationService';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await applicationService.getMyApplications();
        setApplications(data?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load applications');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading applications...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className="bg-white border rounded-md p-4 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{app.job?.title || app.internship?.title || app.position || app.jobTitle || 'Application'}</p>
                  <p className="text-sm text-gray-500">Applied on: {new Date(app.appliedAt || app.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-sm">
                  <p className={`px-2 py-1 rounded-md ${app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {app.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
