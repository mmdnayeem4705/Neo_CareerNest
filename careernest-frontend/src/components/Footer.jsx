// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Neo<span className="text-blue-400">CareerNest</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your gateway to career opportunities at Neo Organization. 
              Discover jobs, internships, and grow your career with us.
            </p>
            <p className="text-sm text-gray-400">
              Powered by Neo Organization
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/prepare" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Prepare
                </Link>
              </li>
              <li>
                <Link to="/participate" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Participate
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/prepare" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link to="/prepare" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Resume Maker
                </Link>
              </li>
              <li>
                <Link to="/prepare" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link to="/participate" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Mock Tests
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Email: careers@neoorg.com</p>
              <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Neo Organization. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
