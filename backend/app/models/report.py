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
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    published_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
