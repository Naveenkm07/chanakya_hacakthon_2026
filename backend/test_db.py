from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

if not mongo_uri or "username:password" in mongo_uri:
    print("❌ Please update your MONGO_URI in backend/.env with your real credentials.")
    exit(1)

try:
    print(f"🔄 Connecting to MongoDB...")
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    # Trigger connection
    client.server_info()
    
    db = client["chant_db"]
    users_collection = db["users"]
    
    # Insert test user
    test_user = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "hashed_password_placeholder"
    }
    
    print("🔄 Inserting test user...")
    users_collection.insert_one(test_user)
    print("✅ Connection successful and test user inserted!")
    
    # Cleanup (optional, just to keep it clean)
    users_collection.delete_one({"email": "test@example.com"})
    print("🧹 Test user cleaned up.")
    
except Exception as e:
    print(f"❌ Connection failed: {e}")
