import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await userService.getProfile();
        if (data?.data) setProfile(data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    // If we already have a user from auth context, no need to fetch immediately
    if (!user) load();
  }, [user]);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {profile ? (
        <div className="bg-white border rounded-md p-4 shadow-sm">
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber || '—'}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Verified:</strong> {profile.isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Active:</strong> {profile.isActive ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <div>No profile available.</div>
      )}
    </div>
  );
};

export default Profile;
