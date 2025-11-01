@echo off
echo ========================================
echo Starting Neo CareerNest Backend
echo ========================================
echo.

cd careernestbackend
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.8
set PATH=%JAVA_HOME%\bin;%PATH%

echo Compiling and starting Spring Boot backend...
echo Backend will run on: http://localhost:8080
echo.

call mvnw.cmd spring-boot:run

