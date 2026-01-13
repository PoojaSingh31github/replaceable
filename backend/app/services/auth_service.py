from datetime import datetime
from typing import Optional
from ..database import get_users_collection
from ..utils.security import hash_password, verify_password, create_access_token
from ..schemas.user import UserCreate, UserResponse

class AuthService:
    @staticmethod
    async def create_user(user_data: UserCreate) -> dict:
        """Create a new user."""
        users = get_users_collection()
        
        # Check if user exists
        existing = await users.find_one({"email": user_data.email})
        if existing:
            raise ValueError("User with this email already exists")
        
        user_doc = {
            "email": user_data.email,
            "hashed_password": hash_password(user_data.password),
            "full_name": user_data.full_name,
            "role": "admin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await users.insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        return user_doc

    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[dict]:
        """Authenticate a user and return the user document if valid."""
        users = get_users_collection()
        user = await users.find_one({"email": email})
        
        if not user:
            return None
        
        if not verify_password(password, user["hashed_password"]):
            return None
        
        if not user.get("is_active", True):
            return None
        
        return user

    @staticmethod
    def create_token(user: dict) -> str:
        """Create JWT token for user."""
        token_data = {
            "sub": user["email"],
            "role": user.get("role", "admin")
        }
        return create_access_token(token_data)

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[dict]:
        """Get user by email."""
        users = get_users_collection()
        return await users.find_one({"email": email})

    @staticmethod
    async def ensure_admin_exists():
        """Ensure at least one admin user exists."""
        from ..config import settings
        
        try:
            users = get_users_collection()
            if users is None:
                print("Database not connected, skipping admin user creation")
                return
            
            admin = await users.find_one({"email": settings.ADMIN_EMAIL})
            
            if not admin:
                user_doc = {
                    "email": settings.ADMIN_EMAIL,
                    "hashed_password": hash_password(settings.ADMIN_PASSWORD),
                    "full_name": "Admin User",
                    "role": "admin",
                    "is_active": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
                await users.insert_one(user_doc)
                print(f"Created default admin user: {settings.ADMIN_EMAIL}")
        except Exception as e:
            print(f"Warning: Could not ensure admin user: {e}")
