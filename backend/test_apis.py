"""
Test script for all backend APIs
Run this after starting the server to verify all endpoints work
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def print_response(title, response):
    """Pretty print API response"""
    print(f"\n{'='*60}")
    print(f"{title}")
    print(f"{'='*60}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")

def test_health():
    """Test health endpoint"""
    response = requests.get("http://localhost:8000/health")
    print_response("Health Check", response)
    return response.status_code == 200

def test_register():
    """Test user registration"""
    data = {
        "email": "test@example.com",
        "password": "test123456",
        "full_name": "Test User"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    print_response("Register User", response)
    return response.status_code in [200, 201, 400]  # 400 if already exists

def test_login():
    """Test user login"""
    data = {
        "email": "admin@replaceable.ai",
        "password": "admin123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print_response("Login", response)
    
    if response.status_code == 200:
        token = response.json().get("access_token")
        return token
    return None

def test_protected_routes(token):
    """Test protected routes with token"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test /auth/me
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print_response("Get Current User (/auth/me)", response)
    
    # Test /admin/me
    response = requests.get(f"{BASE_URL}/admin/me", headers=headers)
    print_response("Get Admin User (/admin/me)", response)
    
    # Test /admin/dashboard
    response = requests.get(f"{BASE_URL}/admin/dashboard", headers=headers)
    print_response("Get Dashboard Stats", response)

def test_reports_api(token):
    """Test reports endpoints"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get all reports
    response = requests.get(f"{BASE_URL}/reports", headers=headers)
    print_response("Get All Reports", response)
    
    # Create a report with all required fields
    report_data = {
        "title": "Test Report",
        "subtitle": "A Test Subtitle",
        "slug": "test-report-001",
        "report_type": "horizon-scan",
        "status": "draft"
    }
    response = requests.post(f"{BASE_URL}/reports", json=report_data, headers=headers)
    print_response("Create Report", response)

def test_consultations_api():
    """Test consultations endpoints"""
    
    # Submit consultation request - use /submit endpoint
    consultation_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "company": "Test Corp",
        "industry_sector": "Technology",
        "message": "I would like to schedule a consultation"
    }
    response = requests.post(f"{BASE_URL}/consultations/submit", json=consultation_data)
    print_response("Submit Consultation", response)

def run_all_tests():
    """Run all API tests"""
    print("\n" + "="*60)
    print("STARTING API TESTS")
    print("="*60)
    
    # Test 1: Health check
    print("\n1. Testing Health Check...")
    if not test_health():
        print("❌ Health check failed!")
        return
    print("✅ Health check passed!")
    
    # Test 2: Registration
    print("\n2. Testing Registration...")
    test_register()
    
    # Test 3: Login
    print("\n3. Testing Login...")
    token = test_login()
    if not token:
        print("❌ Login failed! Cannot proceed with protected route tests.")
        print("\n⚠️  MongoDB connection required for authentication!")
        return
    print("✅ Login successful!")
    
    # Test 4: Protected routes
    print("\n4. Testing Protected Routes...")
    test_protected_routes(token)
    
    # Test 5: Reports API
    print("\n5. Testing Reports API...")
    test_reports_api(token)
    
    # Test 6: Consultations API
    print("\n6. Testing Consultations API...")
    test_consultations_api()
    
    print("\n" + "="*60)
    print("API TESTS COMPLETED")
    print("="*60)

if __name__ == "__main__":
    run_all_tests()
