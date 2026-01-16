from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from bson import ObjectId

class HeroSection(BaseModel):
    badge: str = "Strategic Foresight Series"
    title: str = "The Horizon <em>Scanning</em> Series"
    subtitle: str = "Strategic foresight reports mapping the transformation of human work across the next century."
    stats: List[Dict[str, Any]] = []  # [{label: "Reports", value: "24"}, ...]

class ExecutionSection(BaseModel):
    title: str = ""
    subtitle: str = ""
    items: List[Dict[str, Any]] = []  # [{title, description, icon, value}]

class AnalyticsSection(BaseModel):
    title: str = "Analytics & Insights"
    subtitle: str = ""
    metrics: List[Dict[str, Any]] = []  # [{label, value, change, changeType}]
    charts_enabled: bool = True

class CTASection(BaseModel):
    title: str = "Ready to map <em>your</em> future?"
    description: str = "Commission a custom Horizon Scan for your organization."
    button_text: str = "Commission a Report →"
    button_link: str = "/horizon"

class FooterSection(BaseModel):
    logo_text: str = "Replace<span class='accent'>able</span>.ai"
    copyright: str = "© 2026 Replaceable.ai · All rights reserved"
    links: List[Dict[str, str]] = []

class FilterConfig(BaseModel):
    name: str
    key: str
    start_year: Optional[int] = None
    end_year: Optional[int] = None

class SiteContent(BaseModel):
    """Model for managing all landing page content"""
    id: Optional[str] = Field(default=None, alias="_id")
    
    # Section: Hero
    hero: HeroSection = Field(default_factory=HeroSection)
    
    # Section: Filters/Eras
    filters: List[FilterConfig] = [
        FilterConfig(name="All Reports", key="all"),
        FilterConfig(name="Awakening", key="awakening", start_year=2026, end_year=2040),
        FilterConfig(name="Transformation", key="transformation", start_year=2041, end_year=2070),
        FilterConfig(name="Transcendence", key="transcendence", start_year=2071, end_year=2100),
        FilterConfig(name="Horizon", key="horizon", start_year=2101, end_year=2126),
    ]
    
    # Section: Execution
    execution: ExecutionSection = Field(default_factory=ExecutionSection)
    
    # Section: Analytics
    analytics: AnalyticsSection = Field(default_factory=AnalyticsSection)
    
    # Section: CTA
    cta: CTASection = Field(default_factory=CTASection)
    
    # Section: Footer
    footer: FooterSection = Field(default_factory=FooterSection)
    
    # Navigation Links
    nav_links: List[Dict[str, str]] = [
        {"label": "Intelligence", "url": "/horizon"},
        {"label": "Industries", "url": "/reports/goa-hospitality-2064"},
        {"label": "Research", "url": "/horizon"},
    ]
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Tag(BaseModel):
    """Model for report tags"""
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    slug: str  # URL-friendly version
    color: Optional[str] = "#c41e3a"  # Default crimson color
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class LandingPageCard(BaseModel):
    """Model for landing page cards (articles/reports)"""
    id: Optional[str] = Field(default=None, alias="_id")
    
    # Basic Info
    year: int
    title: str
    category: str
    summary: str
    
    # Metrics
    rpi: int = 0  # RPI Score
    augment: int = 0  # Augmentation percentage
    roles: int = 0  # Number of roles analyzed
    
    # Tags
    tags: List[str] = []  # List of tag slugs
    
    # Link (optional, if card links to a report)
    linked_report_slug: Optional[str] = None
    
    # Display settings
    featured: bool = False
    order: int = 0
    is_active: bool = True
    
    # Image
    image_url: Optional[str] = None
    image_category: str = "technology"  # Used to pick default image
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
