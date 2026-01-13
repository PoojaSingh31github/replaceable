from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

class ConsultationCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    company: str
    role_title: Optional[str] = None
    industry_sector: str
    preferred_month: Optional[str] = None
    preferred_week: Optional[str] = None
    preferred_time: Optional[str] = None
    packages: List[str] = []
    message: Optional[str] = None

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
