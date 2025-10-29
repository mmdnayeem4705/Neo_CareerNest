// pages/ContestJoin.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ContestJoin() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Join Contest</h1>
        <p className="text-gray-600 mb-6">You're about to join contest #{id}. Review the rules and confirm your registration.</p>
        <div className="bg-white rounded-xl border border-gray-100 shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Contest Rules</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Follow the time limits and submission guidelines.</li>
            <li>Original work only; plagiarism is not allowed.</li>
            <li>Respect the community and be professional.</li>
          </ul>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-md">Cancel</button>
          <button onClick={() => { alert('Registered successfully!'); navigate('/participate'); }} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Confirm & Join</button>
        </div>
      </div>
    </div>
  );
}


