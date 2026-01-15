from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId

class Consultation(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    
    # Contact Info
    first_name: str
    last_name: str
    email: str
    company: str
    role_title: Optional[str] = None
    industry_sector: str
    
    # Consultation Details
    preferred_month: Optional[str] = None
    preferred_week: Optional[str] = None
    preferred_time: Optional[str] = None
    
    # Package Interest
    packages: List[str] = []  # ["report", "workshop", "immersion", "unsure"]
    
    # Additional Info
    message: Optional[str] = None
    
    # Status tracking
    status: str = "new"  # "new", "contacted", "scheduled", "completed", "cancelled"
    notes: Optional[str] = None  # Admin notes
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
