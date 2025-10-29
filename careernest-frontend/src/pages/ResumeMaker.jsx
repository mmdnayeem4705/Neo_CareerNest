// pages/ResumeMaker.jsx
import React, { useState } from 'react';

export default function ResumeMaker() {
  const [form, setForm] = useState({ name: '', email: '', summary: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Maker</h1>
        <p className="text-gray-600 mb-8">Create a professional resume quickly. Fill in your details and generate a clean layout.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Professional Summary</label>
              <textarea name="summary" rows={5} value={form.summary} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="A brief overview of your experience and strengths" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Generate PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}


