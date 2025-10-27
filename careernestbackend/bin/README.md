# Neo Career Nest - Backend

A Spring Boot backend application for the Neo Career Nest career portal, providing job and internship opportunities for Neo Organization.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Job Seeker, HR, Admin)
- **Job Management**: CRUD operations for job postings
- **Internship Management**: CRUD operations for internship programs
- **Application Management**: Job and internship application handling
- **Career Guidance**: Career guides and preparation resources
- **Contests & Participation**: Coding contests, mock tests, and hackathons
- **HR Dashboard**: Comprehensive dashboard for HR management

## Technology Stack

- **Java 21**
- **Spring Boot 3.4.10**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL** Database
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code

## Prerequisites

- Java 21 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Setup Instructions

### 1. Database Setup

1. Install MySQL on your system
2. Create a database named `neo_career_nest`:
   ```sql
   CREATE DATABASE neo_career_nest;
   ```

### 2. Configuration

1. Update `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. Update email configuration if needed:
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   ```

### 3. Running the Application

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd careernestbackend
   ```

3. Install dependencies:
   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify-auth` - Verify authentication

### Jobs
- `GET /api/jobs` - Get all jobs (with optional filters)
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create job (HR only)
- `PUT /api/jobs/{id}` - Update job (HR only)
- `DELETE /api/jobs/{id}` - Delete job (HR only)

### Internships
- `GET /api/internships` - Get all internships (with optional filters)
- `GET /api/internships/{id}` - Get internship by ID
- `POST /api/internships` - Create internship (HR only)
- `PUT /api/internships/{id}` - Update internship (HR only)
- `DELETE /api/internships/{id}` - Delete internship (HR only)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job/{jobId}` - Get job applications (HR only)
- `GET /api/applications/internship/{internshipId}` - Get internship applications (HR only)
- `PUT /api/applications/{id}/status` - Update application status (HR only)

### HR Dashboard
- `GET /api/hr/dashboard` - Get HR dashboard data
- `GET /api/hr/jobs` - Get HR's jobs
- `GET /api/hr/internships` - Get HR's internships

### Career Preparation
- `GET /api/prepare/career-guides` - Get career guides
- `GET /api/prepare/career-guides/featured` - Get featured guides
- `GET /api/prepare/career-guides/{id}` - Get guide by ID
- `GET /api/prepare/categories` - Get guide categories

### Contests & Participation
- `GET /api/participate/contests` - Get contests
- `GET /api/participate/contests/ongoing` - Get ongoing contests
- `GET /api/participate/contests/{id}` - Get contest by ID
- `GET /api/participate/types` - Get contest types
- `GET /api/participate/difficulty-levels` - Get difficulty levels

## Sample Data

The application includes sample data for testing:
- Sample users (Job Seekers, HR, Admin)
- Sample job postings
- Sample internship programs
- Sample career guides
- Sample contests

## Security

- JWT-based authentication
- Role-based authorization
- CORS configuration for frontend integration
- Password encryption using BCrypt

## Database Schema

The application uses the following main entities:
- `users` - User accounts with roles
- `jobs` - Job postings
- `internships` - Internship programs
- `applications` - Job/internship applications
- `contests` - Coding contests and events
- `career_guides` - Career guidance content

## Development

### Project Structure
```
src/main/java/com/neoorganization/careernestbackend/
├── config/          # Security and configuration classes
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── model/          # JPA entities
├── repository/     # Data access layer
└── service/        # Business logic layer
```

### Adding New Features

1. Create entity in `model/` package
2. Create repository in `repository/` package
3. Create service in `service/` package
4. Create controller in `controller/` package
5. Add DTOs in `dto/` package if needed

## Testing

Run tests using:
```bash
mvn test
```

## Deployment

1. Build the application:
   ```bash
   mvn clean package
   ```

2. Run the JAR file:
   ```bash
   java -jar target/careernestbackend-0.0.1-SNAPSHOT.jar
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to Neo Organization.
