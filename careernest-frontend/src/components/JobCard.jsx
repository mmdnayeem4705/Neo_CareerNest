// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, DollarSign, Calendar } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-blue-600 font-semibold">{job.company}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {job.department}
          </span>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{job.type}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{job.openings} opening{job.openings > 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm">{job.salary}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-xs">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <Link
          to={`/jobs/apply/${job.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
