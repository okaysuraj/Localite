# start-dev.ps1

Write-Host "Starting Localite Backend in a new window..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd localite-backend; .\mvnw spring-boot:run"

Write-Host "Starting Localite Web App in a new window..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd localite-web; npm install; npm run dev"
