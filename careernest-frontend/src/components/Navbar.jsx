// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SseNotifications from './SseNotifications';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClasses = (path) =>
    `hover:text-blue-600 ${
      location.pathname === path ? "text-blue-600 font-semibold" : ""
    }`;

  const initials = () => {
    if (!user) return "U";
    const first = user.firstName || "";
    const last = user.lastName || "";
    return (first.charAt(0) + (last.charAt(0) || "")).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

          {/* Auth / Account */}
          <div className="flex items-center gap-3">
            {/* Real-time notifications */}
            <SseNotifications />
            {!isAuthenticated ? (
              <>
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
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{initials()}</div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-500 mt-1">{user?.role}</p>
                    </div>

                    {user?.role === 'JOB_SEEKER' && (
                      <div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Personal Details</Link>
                        <Link to="/my-applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Application Status</Link>
                      </div>
                    )}

                    {user?.role === 'HR' && (
                      <div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Personal Details</Link>
                        <Link to="/hr/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Applications</Link>
                      </div>
                    )}

                    <div className="border-t mt-2 pt-2">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
