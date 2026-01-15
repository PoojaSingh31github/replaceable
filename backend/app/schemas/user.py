from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str

    @field_validator('email', mode='before')
    @classmethod
    def validate_organization_email(cls, v):
        """Ensure email is an organization email (not free/personal email providers)."""
        if not v:
            raise ValueError('Email is required')
        
        # List of free/personal email domains
        free_email_domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'yopmail.com',
            'mail.com', 'protonmail.com', 'icloud.com', 'gmx.com', 'yandex.com',
            'mail.ru', 'inbox.com', 'zoho.com', '163.com', 'qq.com'
        ]
        
        email_lower = v.lower()
        domain = email_lower.split('@')[1] if '@' in email_lower else ''
        
        if domain in free_email_domains:
            raise ValueError(f'Organization email required. {domain} is a personal email provider.')
        
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
