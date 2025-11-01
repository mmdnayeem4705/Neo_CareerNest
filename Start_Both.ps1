# PowerShell script to start both Backend and Frontend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Neo CareerNest Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to start Backend
function Start-Backend {
    Write-Host "Starting Backend Server..." -ForegroundColor Green
    Set-Location "C:\Users\SINGAPORE\Desktop\Neo_Careernest\careernestbackend"
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.8"
    $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\SINGAPORE\Desktop\Neo_Careernest\careernestbackend'; `$env:JAVA_HOME='C:\Program Files\Java\jdk-21.0.8'; `$env:PATH=`"`$env:JAVA_HOME\bin;`$env:PATH`"; .\mvnw.cmd spring-boot:run"
}

# Function to start Frontend
function Start-Frontend {
    Write-Host "Starting Frontend Server..." -ForegroundColor Green
    Set-Location "C:\Users\SINGAPORE\Desktop\Neo_Careernest\careernest-frontend"
    $env:PATH = "C:\Program Files\nodejs;$env:PATH"
    Start-Sleep -Seconds 5  # Wait for backend to initialize
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\SINGAPORE\Desktop\Neo_Careernest\careernest-frontend'; `$env:PATH='C:\Program Files\nodejs;'+`$env:PATH; npm run dev"
}

# Start both servers
Start-Backend
Start-Frontend

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Both servers are starting!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

