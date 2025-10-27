-- Neo Career Nest Database Schema
-- This script creates all necessary tables for the career portal

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS neo_career_nest;
USE neo_career_nest;

-- Drop tables if they exist (in correct order to handle foreign key constraints)
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS contests;
DROP TABLE IF EXISTS career_guides;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('JOB_SEEKER', 'HR', 'ADMIN') NOT NULL,
    phone_number VARCHAR(20),
    resume_url VARCHAR(255),
    profile_picture_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    vacancies INT NOT NULL,
    salary_min DECIMAL(10,2) NOT NULL,
    salary_max DECIMAL(10,2) NOT NULL,
    employment_type VARCHAR(20) NOT NULL,
    experience_level VARCHAR(20) NOT NULL,
    skills_required TEXT,
    benefits TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    application_deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create internships table
CREATE TABLE internships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    vacancies INT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL,
    stipend_amount DECIMAL(10,2),
    skills_required TEXT,
    learning_objectives TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    application_deadline TIMESTAMP,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create applications table
CREATE TABLE applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    job_id BIGINT,
    internship_id BIGINT,
    cover_letter TEXT NOT NULL,
    resume_url VARCHAR(255),
    status ENUM('PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'SELECTED') DEFAULT 'PENDING',
    notes TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT chk_application_type CHECK (
        (job_id IS NOT NULL AND internship_id IS NULL) OR 
        (job_id IS NULL AND internship_id IS NOT NULL)
    )
);

-- Create contests table
CREATE TABLE contests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL,
    duration_minutes INT,
    max_participants INT,
    prize_amount DECIMAL(10,2),
    rules TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    registration_deadline TIMESTAMP,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create career_guides table
CREATE TABLE career_guides (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(20) NOT NULL,
    author VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample data

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, role, phone_number, is_active, is_verified, created_at, updated_at) VALUES
('John', 'Doe', 'john.doe@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'JOB_SEEKER', '+1234567890', TRUE, TRUE, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'JOB_SEEKER', '+1234567891', TRUE, TRUE, NOW(), NOW()),
('HR', 'Manager', 'hr@neoorganization.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HR', '+1234567892', TRUE, TRUE, NOW(), NOW()),
('Admin', 'User', 'admin@neoorganization.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', '+1234567893', TRUE, TRUE, NOW(), NOW());

-- Insert sample jobs
INSERT INTO jobs (title, description, department, location, vacancies, salary_min, salary_max, employment_type, experience_level, skills_required, benefits, is_active, application_deadline, created_at, updated_at, created_by) VALUES
('Software Engineer', 'We are looking for a talented Software Engineer to join our development team. You will be responsible for designing, developing, and maintaining software applications.', 'Engineering', 'San Francisco, CA', 3, 80000.00, 120000.00, 'FULL_TIME', 'MID', 'Java, Spring Boot, React, MySQL', 'Health insurance, 401k, flexible hours', TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW(), 3),
('Data Scientist', 'Join our data team to analyze complex datasets and build machine learning models. Experience with Python, R, and statistical analysis required.', 'Data Science', 'New York, NY', 2, 90000.00, 140000.00, 'FULL_TIME', 'SENIOR', 'Python, R, Machine Learning, Statistics', 'Health insurance, 401k, remote work', TRUE, DATE_ADD(NOW(), INTERVAL 45 DAY), NOW(), NOW(), 3),
('Product Manager', 'Lead product development initiatives and work with cross-functional teams to deliver exceptional products to our customers.', 'Product', 'Seattle, WA', 1, 100000.00, 150000.00, 'FULL_TIME', 'SENIOR', 'Product Management, Agile, Analytics', 'Health insurance, 401k, stock options', TRUE, DATE_ADD(NOW(), INTERVAL 60 DAY), NOW(), NOW(), 3),
('UX Designer', 'Create intuitive and engaging user experiences for our digital products. Work closely with product and engineering teams.', 'Design', 'Austin, TX', 2, 70000.00, 100000.00, 'FULL_TIME', 'MID', 'Figma, Adobe Creative Suite, User Research', 'Health insurance, 401k, creative freedom', TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW(), 3),
('DevOps Engineer', 'Manage our cloud infrastructure and deployment pipelines. Experience with AWS, Docker, and Kubernetes required.', 'Engineering', 'Remote', 1, 85000.00, 130000.00, 'FULL_TIME', 'MID', 'AWS, Docker, Kubernetes, CI/CD', 'Health insurance, 401k, remote work', TRUE, DATE_ADD(NOW(), INTERVAL 40 DAY), NOW(), NOW(), 3),
('Marketing Specialist', 'Develop and execute marketing campaigns to drive user acquisition and engagement. Experience with digital marketing tools preferred.', 'Marketing', 'Chicago, IL', 2, 50000.00, 75000.00, 'FULL_TIME', 'ENTRY', 'Digital Marketing, Social Media, Analytics', 'Health insurance, 401k, professional development', TRUE, DATE_ADD(NOW(), INTERVAL 25 DAY), NOW(), NOW(), 3),
('Sales Representative', 'Build relationships with clients and drive revenue growth. Strong communication skills and sales experience required.', 'Sales', 'Los Angeles, CA', 3, 45000.00, 80000.00, 'FULL_TIME', 'ENTRY', 'Sales, CRM, Communication', 'Health insurance, 401k, commission', TRUE, DATE_ADD(NOW(), INTERVAL 35 DAY), NOW(), NOW(), 3),
('Business Analyst', 'Analyze business processes and requirements to help improve operational efficiency. Experience with data analysis and process improvement.', 'Business', 'Boston, MA', 1, 60000.00, 90000.00, 'FULL_TIME', 'MID', 'Data Analysis, Process Improvement, SQL', 'Health insurance, 401k, career growth', TRUE, DATE_ADD(NOW(), INTERVAL 50 DAY), NOW(), NOW(), 3);

-- Insert sample internships
INSERT INTO internships (title, description, department, location, vacancies, duration, type, stipend_amount, skills_required, learning_objectives, is_active, application_deadline, start_date, end_date, created_at, updated_at, created_by) VALUES
('Software Development Intern', 'Gain hands-on experience in software development working on real projects with our engineering team.', 'Engineering', 'San Francisco, CA', 4, '6 months', 'PAID', 3000.00, 'Java, Python, Git, Basic algorithms', 'Learn full-stack development, work in agile environment, build real applications', TRUE, DATE_ADD(NOW(), INTERVAL 20 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 210 DAY), NOW(), NOW(), 3),
('Data Science Intern', 'Work with our data team to analyze datasets and build machine learning models for real business problems.', 'Data Science', 'New York, NY', 2, '3 months', 'PAID', 2500.00, 'Python, R, Statistics, Machine Learning basics', 'Learn data analysis, build ML models, work with big data', TRUE, DATE_ADD(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 25 DAY), DATE_ADD(NOW(), INTERVAL 115 DAY), NOW(), NOW(), 3),
('Product Management Intern', 'Assist product managers in gathering requirements, analyzing user feedback, and planning product features.', 'Product', 'Seattle, WA', 2, '4 months', 'PAID', 2000.00, 'Analytics, User Research, Communication', 'Learn product strategy, user research, agile methodologies', TRUE, DATE_ADD(NOW(), INTERVAL 25 DAY), DATE_ADD(NOW(), INTERVAL 35 DAY), DATE_ADD(NOW(), INTERVAL 155 DAY), NOW(), NOW(), 3),
('UX Design Intern', 'Create user interfaces and experiences for our digital products under the guidance of senior designers.', 'Design', 'Austin, TX', 3, '5 months', 'PAID', 2200.00, 'Figma, Adobe Creative Suite, User Research', 'Learn design thinking, create wireframes and prototypes, conduct user testing', TRUE, DATE_ADD(NOW(), INTERVAL 18 DAY), DATE_ADD(NOW(), INTERVAL 28 DAY), DATE_ADD(NOW(), INTERVAL 178 DAY), NOW(), NOW(), 3),
('Marketing Intern', 'Support marketing campaigns and learn digital marketing strategies in a fast-paced environment.', 'Marketing', 'Chicago, IL', 3, '3 months', 'STIPEND', 1500.00, 'Social Media, Content Creation, Analytics', 'Learn digital marketing, content strategy, campaign management', TRUE, DATE_ADD(NOW(), INTERVAL 22 DAY), DATE_ADD(NOW(), INTERVAL 32 DAY), DATE_ADD(NOW(), INTERVAL 122 DAY), NOW(), NOW(), 3),
('Business Analysis Intern', 'Work with business analysts to understand processes and help improve operational efficiency.', 'Business', 'Boston, MA', 2, '4 months', 'STIPEND', 1800.00, 'Excel, Data Analysis, Communication', 'Learn business analysis, process improvement, data visualization', TRUE, DATE_ADD(NOW(), INTERVAL 28 DAY), DATE_ADD(NOW(), INTERVAL 38 DAY), DATE_ADD(NOW(), INTERVAL 158 DAY), NOW(), NOW(), 3);

-- Insert sample contests
INSERT INTO contests (title, description, type, difficulty_level, duration_minutes, max_participants, prize_amount, rules, is_active, registration_deadline, start_time, end_time, created_at, updated_at, created_by) VALUES
('Coding Challenge #1', 'Solve algorithmic problems using any programming language. Perfect for beginners to intermediate coders.', 'CODING', 'MEDIUM', 120, 100, 500.00, 'No external help allowed. Use any programming language. Submit solutions within time limit.', TRUE, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY, 2 HOUR), NOW(), NOW(), 3),
('Mock Technical Interview', 'Practice technical interview questions with our experienced engineers. Get feedback on your performance.', 'MOCK_TEST', 'HARD', 60, 50, 200.00, 'Answer technical questions. Get real-time feedback. Dress professionally.', TRUE, DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 5 DAY, 1 HOUR), NOW(), NOW(), 3),
('Hackathon 2024', 'Build innovative solutions for real-world problems. Work in teams of 2-4 people.', 'HACKATHON', 'HARD', 480, 200, 2000.00, 'Teams of 2-4 people. Build working prototype. Present to judges. No external code allowed.', TRUE, DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_ADD(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 15 DAY, 8 HOUR), NOW(), NOW(), 3),
('Quick Quiz Challenge', 'Test your general knowledge about technology, programming, and software development.', 'QUIZ', 'EASY', 30, 500, 100.00, 'Answer multiple choice questions. No external help. Highest score wins.', TRUE, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY, 30 MINUTE), NOW(), NOW(), 3);

-- Insert sample career guides
INSERT INTO career_guides (title, content, category, author, is_featured, is_active, view_count, created_at, updated_at, created_by) VALUES
('How to Write a Perfect Resume', 'A comprehensive guide to creating a resume that stands out to employers. Learn about formatting, content, and keywords that get you noticed.', 'RESUME_TIPS', 'Sarah Johnson', TRUE, TRUE, 1250, NOW(), NOW(), 3),
('Ace Your Technical Interview', 'Master the art of technical interviews with our proven strategies and practice questions. Learn how to approach coding problems and system design questions.', 'INTERVIEW_PREP', 'Mike Chen', TRUE, TRUE, 980, NOW(), NOW(), 3),
('Career Growth in Tech', 'Navigate your career path in technology with insights from industry experts. Learn about different roles, skills, and growth opportunities.', 'CAREER_ADVICE', 'Emily Rodriguez', TRUE, TRUE, 756, NOW(), NOW(), 3),
('Essential Programming Skills for 2024', 'Stay ahead with the most in-demand programming skills and technologies. Learn what employers are looking for in 2024.', 'SKILL_DEVELOPMENT', 'David Kim', FALSE, TRUE, 432, NOW(), NOW(), 3),
('Building Your Professional Network', 'Learn how to build meaningful professional relationships that can advance your career. Tips for networking both online and offline.', 'CAREER_ADVICE', 'Lisa Wang', FALSE, TRUE, 321, NOW(), NOW(), 3),
('Remote Work Best Practices', 'Master the art of working remotely with productivity tips, communication strategies, and work-life balance techniques.', 'CAREER_ADVICE', 'Alex Thompson', FALSE, TRUE, 289, NOW(), NOW(), 3);

-- Insert sample applications
INSERT INTO applications (user_id, job_id, cover_letter, resume_url, status, applied_at) VALUES
(1, 1, 'I am excited to apply for the Software Engineer position. With my experience in Java and Spring Boot, I believe I would be a great fit for your team.', 'resumes/john_doe_resume.pdf', 'PENDING', NOW()),
(1, 2, 'I am passionate about data science and would love to contribute to your data team. My experience with Python and machine learning makes me an ideal candidate.', 'resumes/john_doe_resume.pdf', 'PENDING', NOW()),
(2, 3, 'As a product management enthusiast, I am excited about the opportunity to work with your product team and contribute to innovative solutions.', 'resumes/jane_smith_resume.pdf', 'PENDING', NOW()),
(2, 4, 'I am a creative UX designer with a passion for user-centered design. I would love to bring my skills to your design team.', 'resumes/jane_smith_resume.pdf', 'PENDING', NOW());

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_jobs_department ON jobs(department);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_employment_type ON jobs(employment_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_internships_department ON internships(department);
CREATE INDEX idx_internships_type ON internships(type);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_internship_id ON applications(internship_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_contests_type ON contests(type);
CREATE INDEX idx_contests_difficulty_level ON contests(difficulty_level);
CREATE INDEX idx_career_guides_category ON career_guides(category);
CREATE INDEX idx_career_guides_is_featured ON career_guides(is_featured);

-- Display success message
SELECT 'Neo Career Nest database setup completed successfully!' AS Status;
