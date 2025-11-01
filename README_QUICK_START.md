# Neo CareerNest - Quick Start Guide

## 🎉 Backend Errors Have Been Fixed!

### Issues That Were Fixed
The backend had critical bugs in the Job and Internship services where duplicate setter calls were preventing proper data storage:

1. **JobService.java** - Fixed 4 bugs:
   - ✅ Location field was not being saved
   - ✅ Maximum salary was not being saved
   - ✅ Both in create and update methods

2. **InternshipService.java** - Fixed 9 bugs:
   - ✅ Location field was not being saved
   - ✅ Duration field was not being saved
   - ✅ Type field was not being saved
   - ✅ End date was not being saved
   - ✅ Removed duplicate method causing errors
   - ✅ All in create and update methods

### ⚠️ Important: Restart Required
To see the fixes, you need to **restart the backend server** as it's currently running the old buggy code.

---

## 🚀 How to Start the Application

### STEP 1: Stop Currently Running Servers
If servers are running, close those terminal windows or press `Ctrl+C` to stop them.

### STEP 2: Ensure Prerequisites
1. ✅ MySQL is running on localhost:3306
2. ✅ Java JDK 21.0.8 is installed
3. ✅ Node.js is installed
4. ✅ Database `neo_career_nest` exists (will auto-create if not)

### STEP 3: Choose Your Starting Method

#### 🌟 Option A: Use PowerShell Script (Easiest - Recommended)
```powershell
# This will open two new windows - one for backend, one for frontend
.\Start_Both.ps1
```

#### 📦 Option B: Start Each Separately
**Terminal 1 - Backend:**
```batch
Start_Backend.bat
```
Wait for "Started CareernestbackendApplication" message

**Terminal 2 - Frontend:**
```batch
Start_Frontend.bat
```

#### ⚡ Option C: Manual Start (Most Control)
**Terminal 1 - Backend:**
```batch
cd careernestbackend
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.8
set PATH=%JAVA_HOME%\bin;%PATH%
mvnw.cmd spring-boot:run
```

**Terminal 2 - Frontend:**
```batch
cd careernest-frontend
set PATH=C:\Program Files\nodejs;%PATH%
npm run dev
```

---

## 🔗 Access the Application

Once both servers are running:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Test Endpoint:** http://localhost:8080/api/auth/test

---

## 📊 Database Setup

The application will automatically:
1. Create the database `neo_career_nest` if it doesn't exist
2. Create all required tables
3. Apply the schema using Hibernate

If you want to manually set up the database with sample data:
```sql
mysql -u root -p < careernestDB.sql
```

---

## 🧪 Testing the Fixes

After restarting, you can verify the fixes by:

1. **Register a user** (role: HR)
2. **Login** with that user
3. **Create a new job** - All fields including location and salary max will now save properly
4. **Create an internship** - All fields including location, duration, type, and end date will save
5. **View the listings** - Everything will display correctly

### Test API Endpoints:
```powershell
# Test authentication
curl http://localhost:8080/api/auth/test

# Get all jobs (after restart)
curl http://localhost:8080/api/jobs

# Get all internships (after restart)
curl http://localhost:8080/api/internships
```

---

## 📁 Project Structure

```
Neo_Careernest/
├── careernestbackend/          # Spring Boot backend
│   ├── src/main/java/          # Java source code
│   ├── src/main/resources/     # Configuration files
│   └── pom.xml                 # Maven dependencies
├── careernest-frontend/        # React frontend
│   ├── src/                    # React components
│   └── package.json            # npm dependencies
├── Start_Backend.bat           # Backend starter
├── Start_Frontend.bat          # Frontend starter
├── Start_Both.ps1              # Start both servers
├── Start_project.bat           # Original instructions
├── FIXES_APPLIED.md            # Detailed fix documentation
└── README_QUICK_START.md       # This file
```

---

## 🔐 Default Credentials (from data.sql)

If you run the data.sql script, these users will be available:

| Role       | Email                      | Password  |
|------------|---------------------------|-----------|
| Job Seeker | john.doe@example.com      | password  |
| Job Seeker | jane.smith@example.com    | password  |
| HR         | hr@neoorganization.com    | password  |
| Admin      | admin@neoorganization.com | password  |

*Note: Password is bcrypt hashed as `$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi`*

---

## 🛠️ Troubleshooting

### Backend won't start
- ✅ Check MySQL is running
- ✅ Verify database credentials in `careernestbackend/src/main/resources/application.properties`
- ✅ Ensure port 8080 is not in use
- ✅ Verify JAVA_HOME path is correct

### Frontend won't start
- ✅ Run `npm install` in careernest-frontend folder
- ✅ Ensure port 3000 is not in use
- ✅ Verify Node.js is in PATH

### 500 Internal Server Error
- ✅ Make sure you **restarted the backend** after the fixes
- ✅ Check database connection
- ✅ Verify MySQL has proper permissions

### Database Connection Failed
Edit `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/neo_career_nest?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## 📝 What Changed

### Before (Buggy Code):
```java
// JobService - createJob method
job.setDescription(jobRequest.getDescription());  // Line 37
job.setDescription(jobRequest.getDescription());  // Line 39 - DUPLICATE! Should be setLocation
job.setSalaryMin(jobRequest.getSalaryMin());      // Line 41
job.setSalaryMin(jobRequest.getSalaryMin());      // Line 42 - DUPLICATE! Should be setSalaryMax
```

### After (Fixed Code):
```java
// JobService - createJob method
job.setDescription(jobRequest.getDescription());  // Line 37
job.setLocation(jobRequest.getLocation());        // Line 39 - FIXED!
job.setSalaryMin(jobRequest.getSalaryMin());      // Line 41
job.setSalaryMax(jobRequest.getSalaryMax());      // Line 42 - FIXED!
```

Similar fixes were applied to:
- JobService.updateJob()
- InternshipService.createInternship()
- InternshipService.updateInternship()

---

## ✅ Verification Checklist

- [x] Backend compiles without errors
- [x] Code bugs fixed in JobService
- [x] Code bugs fixed in InternshipService
- [x] Startup scripts created
- [x] Documentation written
- [ ] **Backend restarted with fixed code** ← YOU NEED TO DO THIS!
- [ ] Frontend tested with backend
- [ ] Jobs can be created with all fields
- [ ] Internships can be created with all fields

---

## 🎯 Next Steps

1. **Stop the currently running backend** (if running)
2. **Start fresh using one of the methods above**
3. **Test creating a job with location and salary range**
4. **Test creating an internship with all fields**
5. **Enjoy your bug-free application!**

---

## 💡 Tips

- Keep both terminal windows open while developing
- Backend changes require restart
- Frontend changes hot-reload automatically
- Check console logs for detailed error messages
- Use browser DevTools Network tab to debug API calls

---

## 📞 Support

For issues:
1. Check the console output for error messages
2. Review `FIXES_APPLIED.md` for detailed fix information
3. Verify all prerequisites are met
4. Ensure MySQL database is accessible

---

**Last Updated:** November 1, 2025
**Status:** ✅ Ready to Run (Restart Required)
**Version:** 1.0 - All Backend Bugs Fixed

