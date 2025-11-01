✅ BACKEND BUGS HAVE BEEN FIXED!
See FIXES_APPLIED.md and README_QUICK_START.md for details

🚀 QUICK START OPTIONS:
1. PowerShell: .\Start_Both.ps1 (Opens both in separate windows)
2. Separate: Start_Backend.bat and Start_Frontend.bat
3. Manual (below)

Just select the vscode terminal into Command Prompt terminal, then


🎯 Frontend (React)
cd careernest-frontend
set PATH=C:\Program Files\nodejs;%PATH%
npm run dev  


🎯 Backend (Spring Boot)
cd careernestbackend
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.8
set PATH=%JAVA_HOME%\bin;%PATH%
mvnw.cmd spring-boot:run

