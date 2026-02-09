#!/usr/bin/env python3
"""
Backend API Testing for BugZero Cyber Solutions
Tests all backend endpoints: GET /api, POST /api/contact, POST /api/upload
"""

import requests
import json
import os
import tempfile
from datetime import datetime
import time
from PIL import Image
import io

# Get base URL from environment
BASE_URL = "https://threat-shield-37.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'base_url': BASE_URL,
            'tests_run': 0,
            'tests_passed': 0,
            'tests_failed': 0,
            'test_results': []
        }
    
    def log_test(self, test_name, success, details="", error=None):
        """Log test result"""
        self.results['tests_run'] += 1
        if success:
            self.results['tests_passed'] += 1
            print(f"✅ {test_name}: PASSED - {details}")
        else:
            self.results['tests_failed'] += 1
            print(f"❌ {test_name}: FAILED - {details}")
            if error:
                print(f"   Error: {error}")
        
        self.results['test_results'].append({
            'test_name': test_name,
            'success': success,
            'details': details,
            'error': str(error) if error else None
        })
    
    def test_api_info(self):
        """Test GET /api endpoint for API information"""
        print("\n--- Testing GET /api endpoint ---")
        try:
            response = requests.get(API_URL, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ['message', 'version', 'endpoints']
                
                if all(field in data for field in expected_fields):
                    if 'BugZero' in data.get('message', ''):
                        self.log_test("GET /api", True, f"API info returned correctly: {data['message']}")
                        return True
                    else:
                        self.log_test("GET /api", False, "API message doesn't contain 'BugZero'")
                else:
                    self.log_test("GET /api", False, f"Missing expected fields in response: {data}")
            else:
                self.log_test("GET /api", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("GET /api", False, "Request failed", e)
        
        return False
    
    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        print("\n--- Testing POST /api/contact with valid data ---")
        
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Security Consultation",
            "message": "I need help securing my company's network infrastructure."
        }
        
        try:
            response = requests.post(
                f"{API_URL}/contact",
                json=contact_data,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'id' in data:
                    self.log_test("POST /api/contact (valid)", True, f"Contact saved with ID: {data['id']}")
                    return True
                else:
                    self.log_test("POST /api/contact (valid)", False, f"Unexpected response format: {data}")
            else:
                self.log_test("POST /api/contact (valid)", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST /api/contact (valid)", False, "Request failed", e)
        
        return False
    
    def test_contact_form_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        print("\n--- Testing POST /api/contact with missing fields ---")
        
        # Test missing email
        incomplete_data = {
            "name": "Jane Doe",
            "subject": "Test",
            "message": "Test message"
        }
        
        try:
            response = requests.post(
                f"{API_URL}/contact",
                json=incomplete_data,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'Missing required fields' in data['error']:
                    self.log_test("POST /api/contact (missing fields)", True, "Correctly returned 400 for missing fields")
                    return True
                else:
                    self.log_test("POST /api/contact (missing fields)", False, f"Wrong error message: {data}")
            else:
                self.log_test("POST /api/contact (missing fields)", False, f"Expected 400 but got {response.status_code}")
                
        except Exception as e:
            self.log_test("POST /api/contact (missing fields)", False, "Request failed", e)
        
        return False
    
    def create_test_image(self, format='PNG', size=(100, 100), file_size_mb=None):
        """Create a test image file"""
        img = Image.new('RGB', size, color='red')
        img_buffer = io.BytesIO()
        img.save(img_buffer, format=format)
        
        if file_size_mb:
            # Create larger file by padding
            target_size = int(file_size_mb * 1024 * 1024)
            current_size = img_buffer.tell()
            if target_size > current_size:
                padding = b'0' * (target_size - current_size)
                img_buffer.write(padding)
        
        img_buffer.seek(0)
        return img_buffer
    
    def test_upload_valid_file(self):
        """Test POST /api/upload with valid image file"""
        print("\n--- Testing POST /api/upload with valid image ---")
        
        try:
            # Create test image
            test_image = self.create_test_image('PNG', (200, 200))
            
            files = {
                'logo': ('test_logo.png', test_image, 'image/png')
            }
            data = {
                'email': 'test@bugzero.com'
            }
            
            response = requests.post(
                f"{API_URL}/upload",
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success') and 'id' in result:
                    self.log_test("POST /api/upload (valid)", True, f"File uploaded with ID: {result['id']}")
                    return True
                else:
                    self.log_test("POST /api/upload (valid)", False, f"Unexpected response: {result}")
            else:
                self.log_test("POST /api/upload (valid)", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("POST /api/upload (valid)", False, "Request failed", e)
        
        return False
    
    def test_upload_invalid_file_type(self):
        """Test POST /api/upload with invalid file type"""
        print("\n--- Testing POST /api/upload with invalid file type ---")
        
        try:
            # Create text file instead of image
            text_content = b"This is not an image file"
            
            files = {
                'logo': ('test.txt', io.BytesIO(text_content), 'text/plain')
            }
            data = {
                'email': 'test@bugzero.com'
            }
            
            response = requests.post(
                f"{API_URL}/upload",
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 400:
                result = response.json()
                if 'error' in result and 'Invalid file type' in result['error']:
                    self.log_test("POST /api/upload (invalid type)", True, "Correctly rejected invalid file type")
                    return True
                else:
                    self.log_test("POST /api/upload (invalid type)", False, f"Wrong error message: {result}")
            else:
                self.log_test("POST /api/upload (invalid type)", False, f"Expected 400 but got {response.status_code}")
                
        except Exception as e:
            self.log_test("POST /api/upload (invalid type)", False, "Request failed", e)
        
        return False
    
    def test_upload_oversized_file(self):
        """Test POST /api/upload with oversized file (>5MB)"""
        print("\n--- Testing POST /api/upload with oversized file ---")
        
        try:
            # Create 6MB file
            test_image = self.create_test_image('PNG', (100, 100), file_size_mb=6)
            
            files = {
                'logo': ('large_logo.png', test_image, 'image/png')
            }
            data = {
                'email': 'test@bugzero.com'
            }
            
            response = requests.post(
                f"{API_URL}/upload",
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 400:
                result = response.json()
                if 'error' in result and 'File too large' in result['error']:
                    self.log_test("POST /api/upload (oversized)", True, "Correctly rejected oversized file")
                    return True
                else:
                    self.log_test("POST /api/upload (oversized)", False, f"Wrong error message: {result}")
            else:
                self.log_test("POST /api/upload (oversized)", False, f"Expected 400 but got {response.status_code}")
                
        except Exception as e:
            self.log_test("POST /api/upload (oversized)", False, "Request failed", e)
        
        return False
    
    def test_upload_no_file(self):
        """Test POST /api/upload with no file provided"""
        print("\n--- Testing POST /api/upload with no file ---")
        
        try:
            data = {
                'email': 'test@bugzero.com'
            }
            
            response = requests.post(
                f"{API_URL}/upload",
                data=data,
                timeout=30
            )
            
            if response.status_code == 400:
                result = response.json()
                if 'error' in result and 'No file provided' in result['error']:
                    self.log_test("POST /api/upload (no file)", True, "Correctly rejected missing file")
                    return True
                else:
                    self.log_test("POST /api/upload (no file)", False, f"Wrong error message: {result}")
            else:
                self.log_test("POST /api/upload (no file)", False, f"Expected 400 but got {response.status_code}")
                
        except Exception as e:
            self.log_test("POST /api/upload (no file)", False, "Request failed", e)
        
        return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for BugZero Cyber Solutions")
        print(f"Base URL: {BASE_URL}")
        print(f"API URL: {API_URL}")
        print("=" * 80)
        
        # Run all tests
        test_methods = [
            self.test_api_info,
            self.test_contact_form_valid,
            self.test_contact_form_missing_fields,
            self.test_upload_valid_file,
            self.test_upload_invalid_file_type,
            self.test_upload_oversized_file,
            self.test_upload_no_file
        ]
        
        for test_method in test_methods:
            try:
                test_method()
                time.sleep(1)  # Brief pause between tests
            except Exception as e:
                test_name = test_method.__name__.replace('test_', '').replace('_', ' ').title()
                self.log_test(test_name, False, "Test execution failed", e)
        
        # Print summary
        print("\n" + "=" * 80)
        print("🎯 BACKEND API TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.results['tests_run']}")
        print(f"Passed: {self.results['tests_passed']} ✅")
        print(f"Failed: {self.results['tests_failed']} ❌")
        
        if self.results['tests_failed'] == 0:
            print("\n🎉 ALL BACKEND TESTS PASSED!")
        else:
            print(f"\n⚠️  {self.results['tests_failed']} tests failed. See details above.")
        
        return self.results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()