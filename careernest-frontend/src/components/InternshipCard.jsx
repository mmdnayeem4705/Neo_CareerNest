// src/components/InternshipCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, DollarSign, Calendar, GraduationCap } from "lucide-react";

export default function InternshipCard({ internship }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{internship.title}</h3>
            <p className="text-green-600 font-semibold">{internship.company}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {internship.department}
          </span>
        </div>

        {/* Internship Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{internship.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{internship.duration}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{internship.openings} opening{internship.openings > 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm">{internship.stipend}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-xs">Starts {internship.startDate}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {internship.description}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {internship.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {req}
              </span>
            ))}
            {internship.requirements.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{internship.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <Link
          to={`/internships/apply/${internship.id}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
        >
          Apply for Internship
        </Link>
      </div>
    </div>
  );
}
