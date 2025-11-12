# PowerShell API test script

$BASE_URL = "http://localhost:8080"

Write-Host "🧪 Testing Tantrik AI Service" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Test 1: Health check
Write-Host "`n1️⃣ Testing /health endpoint..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$BASE_URL/health" -Method Get
$response | ConvertTo-Json

# Test 2: List spirits
Write-Host "`n2️⃣ Testing /spirits endpoint..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$BASE_URL/spirits" -Method Get
$response | ConvertTo-Json

# Test 3: Chat with Dracula
Write-Host "`n3️⃣ Testing /chat endpoint (Dracula)..." -ForegroundColor Yellow
$body = @{
    spirit_id = "dracula"
    messages = @(
        @{
            role = "user"
            content = "Who are you?"
        }
    )
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$BASE_URL/chat" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json

Write-Host "`n✅ Tests complete!" -ForegroundColor Green
