
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

# Connection string components
USER = "poojasingh12312000"
PASS = "YP2ugDvg3XXe1mpq"
CLUSTER = "cluster0.uvqenbg.mongodb.net"
DB_NAME = "replaceable"

# Construct URI
# Option 1: Standard
URI = f"mongodb+srv://{USER}:{PASS}@{CLUSTER}/{DB_NAME}?retryWrites=true&w=majority"

async def test_connect():
    print(f"Testing connection to: {URI.replace(PASS, '******')}")
    try:
        client = AsyncIOMotorClient(URI)
        await client.admin.command('ping')
        print("✅ Connection successful!")
        return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_connect())
