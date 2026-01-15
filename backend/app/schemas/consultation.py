from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, field_validator
import re

class ConsultationCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    company: str
    phone: str
    role_title: Optional[str] = None
    industry_sector: str
    preferred_month: Optional[str] = None
    preferred_week: Optional[str] = None
    preferred_time: Optional[str] = None
    packages: List[str] = []
    message: Optional[str] = None

    @field_validator('first_name', 'last_name', 'company', 'industry_sector', mode='before')
    @classmethod
    def validate_required_strings(cls, v):
        """Ensure required string fields are not empty."""
        if not v or (isinstance(v, str) and not v.strip()):
            raise ValueError('This field is required and cannot be empty')
        return v.strip() if isinstance(v, str) else v

    @field_validator('email', mode='before')
    @classmethod
    def validate_organization_email(cls, v):
        """Ensure email is an organization email (not free/personal email providers)."""
        if not v:
            raise ValueError('Email is required')
        
        # List of free/personal email domains
        free_email_domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',"yopmail.com",
            'mail.com', 'protonmail.com', 'icloud.com', 'gmx.com', 'yandex.com',
            'mail.ru', 'inbox.com', 'zoho.com', '163.com', 'qq.com'
        ]
        
        email_lower = v.lower()
        domain = email_lower.split('@')[1] if '@' in email_lower else ''
        
        if domain in free_email_domains:
            raise ValueError(f'Organization email required. {domain} is a personal email provider.')
        
        return v

    @field_validator('phone', mode='before')
    @classmethod
    def validate_phone(cls, v):
        """Ensure phone number has exactly 10 digits."""
        if not v or (isinstance(v, str) and not v.strip()):
            raise ValueError('Phone number is required')
        
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', str(v))
        
        if len(digits_only) != 10:
            raise ValueError('Phone number must contain exactly 10 digits')
        
        return v

class ConsultationUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    role_title: Optional[str] = None
    industry_sector: Optional[str] = None
    preferred_month: Optional[str] = None
    preferred_week: Optional[str] = None
    preferred_time: Optional[str] = None
    packages: Optional[List[str]] = None
    message: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class ConsultationResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    company: str
    role_title: Optional[str]
    industry_sector: str
    preferred_month: Optional[str]
    preferred_week: Optional[str]
    preferred_time: Optional[str]
    packages: List[str]
    message: Optional[str]
    status: str
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

class ConsultationListResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    company: str
    industry_sector: str
    status: str
    created_at: datetime
