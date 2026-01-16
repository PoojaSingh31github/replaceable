from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from bson import ObjectId

class RoleAnalysis(BaseModel):
    role_number: str
    title: str
    emergence_period: str
    origin: str
    confidence: str  # "High", "Moderate", "Speculative"
    narrative: str
    rpi_score: float
    tasks: List[Dict[str, Any]] = []  # APS, W, HRF, HRA_t for each task
    gauge_info: Optional[Dict[str, str]] = None
    causal_chain: Optional[List[str]] = None
    skills: Optional[Dict[str, List[str]]] = None
    
    # Additional editable fields for admin control
    key_responsibilities: Optional[List[str]] = None
    required_qualifications: Optional[List[str]] = None
    career_progression: Optional[str] = None
    salary_range: Optional[Dict[str, Any]] = None

class Scenario(BaseModel):
    type: str  # "acceleration", "baseline", "disruption"
    title: str
    description: str
    outcome: str
    indicators: Dict[str, str]

class ChartData(BaseModel):
    rpi_radar: Optional[Dict[str, Any]] = None
    composition_chart: Optional[Dict[str, Any]] = None
    timeline_chart: Optional[Dict[str, Any]] = None

class Report(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    
    # Basic Info
    slug: str  # URL-friendly identifier (e.g., "goa-hospitality-2064")
    title: str
    subtitle: str
    report_type: str  # "horizon-scan", "industry-report", etc.
    
    # Cover Section
    cover: Dict[str, Any] = {}  # report_meta, stats, etc.
    
    # Navigation
    nav_links: List[Dict[str, str]] = []
    
    # Executive Summary
    executive_summary: Dict[str, Any] = {}
    
    # Prologue (Narrative)
    prologue: Optional[str] = None
    
    # Methodology
    methodology: Dict[str, Any] = {}
    
    # Future Roles
    roles: List[RoleAnalysis] = []
    
    # Charts Data
    charts: Optional[ChartData] = None
    
    # Scenarios
    scenarios: List[Scenario] = []
    
    # Implications/Recommendations
    implications: Dict[str, List[Dict[str, str]]] = {}
    
    # CTA Section
    cta: Optional[Dict[str, str]] = None
    
    # Metadata
    status: str = "draft"  # "draft", "published"
    featured: bool = False
    image_url: Optional[str] = None
    target_year: Optional[int] = None
    region: Optional[str] = None
    industry: Optional[str] = None
    
    # Tags for filtering
    tags: List[str] = []  # List of tag slugs
    
    # Landing page card display settings
    card_category: Optional[str] = None  # Category shown on card
    card_rpi: Optional[int] = None  # RPI score for card
    card_augment: Optional[int] = None  # Augmentation % for card
    card_roles_count: Optional[int] = None  # Roles count for card
    card_summary: Optional[str] = None  # Short summary for card
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    published_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
