from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_database():
    """Connect to MongoDB on startup."""
    try:
        db.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000
        )
        # Test the connection
        await db.client.admin.command('ping')
        db.db = db.client[settings.DATABASE_NAME]
        print(f"Connected to MongoDB database: {settings.DATABASE_NAME}")
        
        # Create indexes
        await create_indexes()
    except Exception as e:
        print(f"Error: Could not connect to MongoDB: {e}")
        print("Please check your MONGODB_URL in the .env file")
        print("IMPORTANT: Update MongoDB credentials in .env file")
        # Don't raise, allow app to start for testing
        pass

async def close_database_connection():
    """Close MongoDB connection on shutdown."""
    if db.client:
        db.client.close()
        print("Closed MongoDB connection")

async def create_indexes():
    """Create database indexes for better performance."""
    # Users collection indexes
    await db.db.users.create_index("email", unique=True)
    
    # Reports collection indexes
    await db.db.reports.create_index("slug", unique=True)
    await db.db.reports.create_index("status")
    await db.db.reports.create_index("created_at")
    
    # Consultations collection indexes
    await db.db.consultations.create_index("email")
    await db.db.consultations.create_index("status")
    await db.db.consultations.create_index("created_at")

def get_database():
    """Get database instance."""
    return db.db

# Collection getters
def get_users_collection():
    if db.db is None:
        return None
    return db.db.users

def get_reports_collection():
    if db.db is None:
        return None
    return db.db.reports

def get_consultations_collection():
    if db.db is None:
        return None
    return db.db.consultations
