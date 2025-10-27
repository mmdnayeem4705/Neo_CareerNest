// src/components/ContestCard.jsx
import React from "react";

export default function ContestCard({ contest }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{contest.name}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Type: <span className="font-medium">{contest.type}</span>
      </p>
      <p className="text-sm text-gray-600">
        Start Date: <span className="font-medium">{contest.startDate}</span>
      </p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {contest.description ||
          "Participate in exciting contests hosted by Neo Organization."}
      </p>
      <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        Register
      </button>
    </div>
  );
}
