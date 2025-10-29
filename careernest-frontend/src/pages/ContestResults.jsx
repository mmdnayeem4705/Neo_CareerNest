// pages/ContestResults.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ContestResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sampleResults = [
    { rank: 1, name: 'Alice', score: 98 },
    { rank: 2, name: 'Bob', score: 95 },
    { rank: 3, name: 'Carol', score: 93 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contest Results</h1>
        <p className="text-gray-600 mb-6">Results for contest #{id}</p>
        <div className="bg-white rounded-xl border border-gray-100 shadow">
          <div className="p-4 border-b font-semibold">Top Performers</div>
          <ul className="divide-y">
            {sampleResults.map((r) => (
              <li key={r.rank} className="p-4 flex justify-between">
                <span>#{r.rank} {r.name}</span>
                <span className="font-medium">{r.score}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => navigate('/participate')} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Back to Contests</button>
        </div>
      </div>
    </div>
  );
}


