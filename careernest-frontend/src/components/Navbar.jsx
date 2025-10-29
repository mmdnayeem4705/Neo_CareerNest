// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `hover:text-blue-600 ${
      location.pathname === path ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-700 tracking-tight"
          >
            Neo<span className="text-gray-900">CareerNest</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/jobs" className={linkClasses("/jobs")}>
              Jobs
            </Link>
            <Link to="/prepare" className={linkClasses("/prepare")}>
              Prepare
            </Link>
            <Link to="/participate" className={linkClasses("/participate")}>
              Participate
            </Link>
            <Link to="/internships" className={linkClasses("/internships")}>
              Internships
            </Link>
            <Link to="/career-guidance" className={linkClasses("/career-guidance")}>
              Resources
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
