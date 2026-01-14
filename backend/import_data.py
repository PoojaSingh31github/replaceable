"""Script to import reports data from JSON to MongoDB"""
import json
import asyncio
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def import_reports():
    """Import reports from JSON file to MongoDB"""
    
    # Connect to MongoDB
    print("🔗 Connecting to MongoDB...")
    try:
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000
        )
        # Test connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        db = client[settings.DATABASE_NAME]
        
        # Load JSON data
        print("\n📂 Loading data from replaceable.reports.json...")
        import os
        json_file_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "frontend/src/assets/replaceable.reports.json"
        )
        
        with open(json_file_path, 'r', encoding='utf-8') as f:
            reports_data = json.load(f)
        
        print(f"📊 Found {len(reports_data)} reports to import")
        
        # Process and insert data
        reports_collection = db.reports
        
        # Convert MongoDB Extended JSON format to Python objects
        processed_reports = []
        for report in reports_data:
            processed_report = {
                "slug": report.get("slug", ""),
                "title": report.get("title", ""),
                "subtitle": report.get("subtitle", ""),
                "report_type": report.get("report_type", "horizon-scan"),
                "cover": report.get("cover", {}),
                "nav_links": report.get("nav_links", []),
                "executive_summary": report.get("executive_summary", {}),
                "prologue": report.get("prologue"),
                "methodology": report.get("methodology", {}),
                "roles": report.get("roles", []),
                "charts": report.get("charts"),
                "scenarios": report.get("scenarios", []),
                "implications": report.get("implications", {}),
                "cta": report.get("cta"),
                "status": report.get("status", "draft"),
                "featured": report.get("featured", False),
                "image_url": report.get("image_url"),
                "target_year": report.get("target_year"),
                "region": report.get("region"),
                "industry": report.get("industry"),
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
            processed_reports.append(processed_report)
        
        # Clear existing reports
        print("\n🗑️  Clearing existing reports collection...")
        await reports_collection.delete_many({})
        
        # Insert new reports
        print("📥 Inserting reports into MongoDB...")
        result = await reports_collection.insert_many(processed_reports)
        
        print(f"\n✅ Successfully imported {len(result.inserted_ids)} reports!")
        
        # Create indexes
        print("\n🔧 Creating indexes...")
        await reports_collection.create_index("slug", unique=True)
        await reports_collection.create_index("status")
        await reports_collection.create_index("created_at")
        print("✅ Indexes created successfully!")
        
        # Verify data
        print("\n📋 Verifying data...")
        count = await reports_collection.count_documents({})
        print(f"✅ Total reports in database: {count}")
        
        # Close connection
        client.close()
        print("\n✅ Data import completed successfully!")
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(import_reports())
    exit(0 if success else 1)
