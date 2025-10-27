// pages/Participate.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Participate = () => {
  const [activeTab, setActiveTab] = useState('contests');

  const contests = [
    {
      id: 1,
      title: "Neo Coding Challenge 2024",
      description: "Test your programming skills in our annual coding competition",
      type: "Coding Contest",
      duration: "3 hours",
      participants: 1250,
      prize: "$5,000",
      status: "Ongoing",
      difficulty: "Medium",
      skills: ["JavaScript", "Python", "Data Structures", "Algorithms"],
      startDate: "Feb 15, 2024",
      endDate: "Feb 15, 2024",
      rules: [
        "Individual participation only",
        "No external help allowed",
        "Submit solutions within time limit",
        "Plagiarism will result in disqualification"
      ]
    },
    {
      id: 2,
      title: "Data Science Mastery Contest",
      description: "Analyze real-world datasets and build predictive models",
      type: "Data Science",
      duration: "48 hours",
      participants: 890,
      prize: "$3,000",
      status: "Upcoming",
      difficulty: "Hard",
      skills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
      startDate: "Mar 1, 2024",
      endDate: "Mar 3, 2024",
      rules: [
        "Team of 2-3 members allowed",
        "Use provided datasets only",
        "Submit code and report",
        "Present findings to judges"
      ]
    },
    {
      id: 3,
      title: "UI/UX Design Sprint",
      description: "Design innovative solutions for real business problems",
      type: "Design Contest",
      duration: "24 hours",
      participants: 650,
      prize: "$2,500",
      status: "Completed",
      difficulty: "Medium",
      skills: ["Figma", "User Research", "Prototyping", "Design Thinking"],
      startDate: "Jan 20, 2024",
      endDate: "Jan 21, 2024",
      rules: [
        "Individual or team participation",
        "Present design process",
        "Create interactive prototypes",
        "Focus on user experience"
      ]
    }
  ];

  const mockTests = [
    {
      id: 1,
      title: "Software Engineering Mock Test",
      description: "Comprehensive test covering all aspects of software development",
      duration: "90 minutes",
      questions: 50,
      difficulty: "Mixed",
      topics: ["Programming", "System Design", "Database", "Networking", "OS"],
      attempts: 2340,
      averageScore: 78,
      passingScore: 70,
      certificate: true
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      description: "Test your problem-solving skills with coding challenges",
      duration: "60 minutes",
      questions: 30,
      difficulty: "Hard",
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
      attempts: 1890,
      averageScore: 65,
      passingScore: 60,
      certificate: true
    },
    {
      id: 3,
      title: "Product Management Assessment",
      description: "Evaluate your product thinking and strategic skills",
      duration: "75 minutes",
      questions: 40,
      difficulty: "Medium",
      topics: ["Product Strategy", "User Research", "Analytics", "Business Acumen"],
      attempts: 1560,
      averageScore: 72,
      passingScore: 65,
      certificate: true
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      description: "Test your knowledge in statistics, ML, and data analysis",
      duration: "80 minutes",
      questions: 45,
      difficulty: "Medium",
      topics: ["Statistics", "Machine Learning", "Python", "SQL", "Visualization"],
      attempts: 2100,
      averageScore: 74,
      passingScore: 70,
      certificate: true
    }
  ];

  const hackathons = [
    {
      id: 1,
      title: "Neo Innovation Hackathon 2024",
      description: "Build innovative solutions for the future of work",
      theme: "Future of Work",
      duration: "48 hours",
      participants: 150,
      prize: "$10,000",
      status: "Upcoming",
      startDate: "Mar 15, 2024",
      endDate: "Mar 17, 2024",
      location: "Neo Organization HQ, New York",
      requirements: [
        "Team of 2-4 members",
        "Working prototype required",
        "5-minute presentation",
        "Code repository submission"
      ],
      judges: ["CTO - Neo Organization", "VP Engineering - Google", "Senior PM - Microsoft"],
      sponsors: ["Neo Organization", "AWS", "GitHub", "Figma"]
    },
    {
      id: 2,
      title: "GreenTech Hackathon",
      description: "Develop sustainable technology solutions for environmental challenges",
      theme: "Sustainability",
      duration: "36 hours",
      participants: 120,
      prize: "$7,500",
      status: "Ongoing",
      startDate: "Feb 10, 2024",
      endDate: "Feb 11, 2024",
      location: "Virtual Event",
      requirements: [
        "Individual or team participation",
        "Environmental impact focus",
        "Demo video submission",
        "Open source preferred"
      ],
      judges: ["Environmental Scientist", "Tech Lead - Tesla", "Sustainability Director"],
      sponsors: ["Neo Organization", "Tesla", "Greenpeace", "Climate Tech VC"]
    },
    {
      id: 3,
      title: "FinTech Innovation Challenge",
      description: "Create next-generation financial technology solutions",
      theme: "Financial Technology",
      duration: "24 hours",
      participants: 200,
      prize: "$15,000",
      status: "Completed",
      startDate: "Jan 5, 2024",
      endDate: "Jan 6, 2024",
      location: "San Francisco, CA",
      requirements: [
        "Team of 3-5 members",
        "Financial compliance awareness",
        "Security considerations",
        "Scalability demonstration"
      ],
      judges: ["CFO - Neo Organization", "VP - Stripe", "FinTech Expert"],
      sponsors: ["Neo Organization", "Stripe", "Visa", "Goldman Sachs"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Participate & Compete
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8">
              Showcase your skills, learn, and win amazing prizes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-orange-500 px-4 py-2 rounded-full">
                {contests.length} Contests
              </span>
              <span className="bg-orange-500 px-4 py-2 rounded-full">
                {mockTests.length} Mock Tests
              </span>
              <span className="bg-orange-500 px-4 py-2 rounded-full">
                {hackathons.length} Hackathons
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: 'contests', label: 'Contests' },
              { id: 'mock-tests', label: 'Mock Tests' },
              { id: 'hackathons', label: 'Hackathons' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white'
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
          
          {/* Contests */}
          {activeTab === 'contests' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Coding & Skill Contests
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {contests.map(contest => (
                  <div key={contest.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contest.status)}`}>
                        {contest.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(contest.difficulty)}`}>
                        {contest.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{contest.title}</h3>
                    <p className="text-gray-600 mb-4">{contest.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{contest.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{contest.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-medium">{contest.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Prize:</span>
                        <span className="font-medium text-green-600">{contest.prize}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">{contest.startDate}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Skills Required:</h4>
                      <div className="flex flex-wrap gap-2">
                        {contest.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                      {contest.status === 'Completed' ? 'View Results' : 'Join Contest'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mock Tests */}
          {activeTab === 'mock-tests' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Mock Tests & Assessments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockTests.map(test => (
                  <div key={test.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                    <p className="text-gray-600 mb-4">{test.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{test.duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{test.questions}</div>
                        <div className="text-sm text-gray-500">Questions</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(test.difficulty)}`}>
                          {test.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Attempts:</span>
                        <span className="font-medium">{test.attempts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Average Score:</span>
                        <span className="font-medium">{test.averageScore}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Passing Score:</span>
                        <span className="font-medium">{test.passingScore}%</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {test.topics.map((topic, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        {test.certificate && <span className="mr-2">🏆</span>}
                        {test.certificate ? 'Certificate Available' : 'No Certificate'}
                      </div>
                      <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                        Start Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hackathons */}
          {activeTab === 'hackathons' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Hackathons & Innovation Challenges
              </h2>
              <div className="space-y-8">
                {hackathons.map(hackathon => (
                  <div key={hackathon.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{hackathon.title}</h3>
                        <p className="text-gray-600 text-lg">{hackathon.description}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(hackathon.status)}`}>
                        {hackathon.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{hackathon.duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{hackathon.participants}</div>
                        <div className="text-sm text-gray-500">Participants</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{hackathon.prize}</div>
                        <div className="text-sm text-gray-500">Prize Pool</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{hackathon.theme}</div>
                        <div className="text-sm text-gray-500">Theme</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3">Event Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Start Date:</span>
                            <span className="font-medium">{hackathon.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">End Date:</span>
                            <span className="font-medium">{hackathon.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span className="font-medium">{hackathon.location}</span>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-3 mt-6">Requirements</h4>
                        <ul className="space-y-1 text-sm">
                          {hackathon.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Judges</h4>
                        <ul className="space-y-1 text-sm mb-6">
                          {hackathon.judges.map((judge, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                              {judge}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-semibold mb-3">Sponsors</h4>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.sponsors.map((sponsor, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              {sponsor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors">
                        {hackathon.status === 'Completed' ? 'View Results' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Participate;