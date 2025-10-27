// pages/Prepare.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Prepare = () => {
  const [activeTab, setActiveTab] = useState('career-guidance');

  const careerGuidanceContent = [
    {
      title: "Career Path Planning",
      description: "Discover your ideal career path with our comprehensive assessment tools",
      icon: "🎯",
      features: ["Skills Assessment", "Career Interest Test", "Industry Analysis", "Goal Setting"]
    },
    {
      title: "Industry Insights",
      description: "Stay updated with the latest trends and requirements in your field",
      icon: "📊",
      features: ["Market Reports", "Salary Benchmarks", "Skill Demands", "Future Outlook"]
    },
    {
      title: "Professional Development",
      description: "Enhance your skills with our curated learning resources",
      icon: "📚",
      features: ["Online Courses", "Certification Programs", "Skill Workshops", "Mentorship"]
    }
  ];

  const expertSpeakContent = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Engineer at Neo Organization",
      topic: "Breaking into Tech: A Complete Guide",
      duration: "45 min",
      date: "Jan 25, 2024",
      description: "Learn from our senior engineer about the essential skills and mindset needed to succeed in the tech industry."
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Neo Organization",
      topic: "Product Management Career Path",
      duration: "60 min",
      date: "Feb 2, 2024",
      description: "Discover the role of a product manager and how to transition into this exciting career."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Data Science Director at Neo Organization",
      topic: "Data Science in 2024: Trends & Opportunities",
      duration: "50 min",
      date: "Feb 10, 2024",
      description: "Explore the latest trends in data science and machine learning that are shaping the industry."
    }
  ];

  const resumeMakerFeatures = [
    "Professional Templates",
    "ATS Optimization",
    "Skills Matching",
    "Industry-Specific Formats",
    "Real-time Feedback",
    "Download in Multiple Formats"
  ];

  const interviewExperiences = [
    {
      role: "Software Engineer",
      candidate: "Alex M.",
      experience: "The technical interview was challenging but fair. They focused on problem-solving approach rather than just getting the right answer.",
      rating: 5,
      tips: ["Practice coding problems daily", "Understand system design basics", "Be ready to explain your thought process"]
    },
    {
      role: "Product Manager",
      candidate: "Jessica L.",
      experience: "Great experience! The case study was realistic and the interviewers were very supportive throughout the process.",
      rating: 5,
      tips: ["Prepare case studies", "Practice stakeholder communication", "Know the company's products well"]
    },
    {
      role: "Data Scientist",
      candidate: "David K.",
      experience: "The data analysis challenge was interesting. They provided real datasets and asked for insights and recommendations.",
      rating: 4,
      tips: ["Brush up on statistics", "Practice with real datasets", "Prepare to explain your methodology"]
    }
  ];

  const personalizedQA = [
    {
      question: "What are the most important skills for a software engineer at Neo Organization?",
      answer: "We value problem-solving skills, clean code practices, collaboration, and continuous learning. Technical skills in React, Node.js, and cloud technologies are important, but soft skills are equally crucial."
    },
    {
      question: "How does the interview process work?",
      answer: "Our process includes: 1) Initial screening call, 2) Technical assessment, 3) Team interview, 4) Final interview with leadership. The entire process typically takes 2-3 weeks."
    },
    {
      question: "What growth opportunities are available?",
      answer: "We offer mentorship programs, conference attendance, learning budgets, internal mobility, and clear promotion paths. We invest heavily in our team's professional development."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prepare for Your Career Success
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Get ready to excel with our comprehensive preparation resources
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: 'career-guidance', label: 'Career Guidance' },
              { id: 'expert-speak', label: 'Expert Speak' },
              { id: 'resume-maker', label: 'Resume Maker' },
              { id: 'interview-exp', label: 'Interview Experiences' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Career Guidance */}
          {activeTab === 'career-guidance' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Career Guidance & Development
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {careerGuidanceContent.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Speak */}
          {activeTab === 'expert-speak' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Expert Speak & Webinars
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {expertSpeakContent.map((expert, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-xl">👨‍💼</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.role}</p>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{expert.topic}</h4>
                    <p className="text-gray-600 mb-4">{expert.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>📅 {expert.date}</span>
                      <span>⏱️ {expert.duration}</span>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resume Maker */}
          {activeTab === 'resume-maker' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                AI-Powered Resume Maker
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Create Your Perfect Resume</h3>
                    <div className="space-y-4">
                      {resumeMakerFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-green-600 text-sm">✓</span>
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-8 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                      Start Building Resume
                    </button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Resume Preview</h4>
                    <div className="bg-white p-4 rounded border">
                      <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500">Resume Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interview Experiences */}
          {activeTab === 'interview-exp' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Interview Experiences & Tips
              </h2>
              
              {/* Personalised Q&A */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Personalised Interview Q&A</h3>
                <div className="space-y-6">
                  {personalizedQA.map((qa, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                      <h4 className="font-semibold text-lg mb-3 text-purple-600">Q: {qa.question}</h4>
                      <p className="text-gray-700">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Experiences */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Real Interview Experiences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {interviewExperiences.map((exp, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-semibold">{exp.candidate.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{exp.candidate}</h4>
                          <p className="text-sm text-gray-600">{exp.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < exp.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">"{exp.experience}"</p>
                      <div>
                        <h5 className="font-semibold mb-2">Tips:</h5>
                        <ul className="space-y-1">
                          {exp.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Prepare;