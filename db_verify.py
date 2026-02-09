#!/usr/bin/env python3
"""
MongoDB Database Verification Script
Checks if data was properly saved to MongoDB collections
"""

import os
from pymongo import MongoClient
import json
from datetime import datetime

# MongoDB connection details
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'bugzero_db')

def verify_database():
    print(f"🔍 Verifying MongoDB Database: {DB_NAME}")
    print(f"MongoDB URL: {MONGO_URL}")
    print("=" * 60)
    
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URL)
        db = client[DB_NAME]
        
        # Check contacts collection
        contacts = list(db.contacts.find().sort('createdAt', -1).limit(5))
        print(f"📧 Contacts Collection: Found {len(contacts)} recent entries")
        
        for i, contact in enumerate(contacts, 1):
            contact['_id'] = str(contact['_id'])  # Convert ObjectId to string
            print(f"  {i}. ID: {contact.get('id', 'N/A')[:8]}... | Name: {contact.get('name')} | Email: {contact.get('email')}")
        
        # Check uploads collection
        uploads = list(db.uploads.find().sort('createdAt', -1).limit(5))
        print(f"\n📁 Uploads Collection: Found {len(uploads)} recent entries")
        
        for i, upload in enumerate(uploads, 1):
            upload['_id'] = str(upload['_id'])  # Convert ObjectId to string
            data_size = len(upload.get('data', '')) if upload.get('data') else 0
            print(f"  {i}. ID: {upload.get('id', 'N/A')[:8]}... | File: {upload.get('filename')} | Size: {upload.get('size')} bytes | Data: {data_size} chars")
        
        print("\n✅ Database verification completed successfully!")
        
        # Verify UUID format
        if contacts:
            sample_id = contacts[0].get('id', '')
            if len(sample_id) == 36 and sample_id.count('-') == 4:
                print("✅ IDs are using UUID format (not MongoDB ObjectID)")
            else:
                print("⚠️  IDs might not be using proper UUID format")
        
        return True
        
    except Exception as e:
        print(f"❌ Database verification failed: {e}")
        return False
    finally:
        try:
            client.close()
        except:
            pass

if __name__ == "__main__":
    verify_database()