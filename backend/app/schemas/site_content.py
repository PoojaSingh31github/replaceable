from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


# ============= Tag Schemas =============
class TagCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    color: Optional[str] = "#c41e3a"


class TagUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    color: Optional[str] = None


class TagResponse(BaseModel):
    id: str
    name: str
    slug: str
    color: str
    created_at: datetime


# ============= Hero Section Schemas =============
class HeroSectionSchema(BaseModel):
    badge: str = "Strategic Foresight Series"
    title: str = "The Horizon <em>Scanning</em> Series"
    subtitle: str = "Strategic foresight reports mapping the transformation of human work across the next century."
    stats: List[Dict[str, Any]] = []


# ============= Execution Section Schemas =============
class ExecutionSectionSchema(BaseModel):
    title: str = ""
    subtitle: str = ""
    items: List[Dict[str, Any]] = []


# ============= Analytics Section Schemas =============
class AnalyticsSectionSchema(BaseModel):
    title: str = "Analytics & Insights"
    subtitle: str = ""
    metrics: List[Dict[str, Any]] = []
    charts_enabled: bool = True


# ============= CTA Section Schemas =============
class CTASectionSchema(BaseModel):
    title: str = "Ready to map <em>your</em> future?"
    description: str = "Commission a custom Horizon Scan for your organization."
    button_text: str = "Commission a Report →"
    button_link: str = "/horizon"


# ============= Footer Section Schemas =============
class FooterSectionSchema(BaseModel):
    logo_text: str = "Replace<span class='accent'>able</span>.ai"
    copyright: str = "© 2026 Replaceable.ai · All rights reserved"
    links: List[Dict[str, str]] = []


# ============= Filter Config Schemas =============
class FilterConfigSchema(BaseModel):
    name: str
    key: str
    start_year: Optional[int] = None
    end_year: Optional[int] = None


# ============= Site Content Schemas =============
class SiteContentUpdate(BaseModel):
    hero: Optional[HeroSectionSchema] = None
    filters: Optional[List[FilterConfigSchema]] = None
    execution: Optional[ExecutionSectionSchema] = None
    analytics: Optional[AnalyticsSectionSchema] = None
    cta: Optional[CTASectionSchema] = None
    footer: Optional[FooterSectionSchema] = None
    nav_links: Optional[List[Dict[str, str]]] = None


class SiteContentResponse(BaseModel):
    id: Optional[str] = None
    hero: HeroSectionSchema
    filters: List[FilterConfigSchema]
    execution: ExecutionSectionSchema
    analytics: AnalyticsSectionSchema
    cta: CTASectionSchema
    footer: FooterSectionSchema
    nav_links: List[Dict[str, str]]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


# ============= Landing Page Card Schemas =============
class LandingPageCardCreate(BaseModel):
    year: int
    title: str
    category: str
    summary: str
    rpi: int = 0
    augment: int = 0
    roles: int = 0
    tags: List[str] = []
    linked_report_slug: Optional[str] = None
    featured: bool = False
    order: int = 0
    is_active: bool = True
    image_url: Optional[str] = None
    image_category: str = "technology"


class LandingPageCardUpdate(BaseModel):
    year: Optional[int] = None
    title: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    rpi: Optional[int] = None
    augment: Optional[int] = None
    roles: Optional[int] = None
    tags: Optional[List[str]] = None
    linked_report_slug: Optional[str] = None
    featured: Optional[bool] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None
    image_url: Optional[str] = None
    image_category: Optional[str] = None


class LandingPageCardResponse(BaseModel):
    id: str
    year: int
    title: str
    category: str
    summary: str
    rpi: int
    augment: int
    roles: int
    tags: List[str]
    linked_report_slug: Optional[str]
    featured: bool
    order: int
    is_active: bool
    image_url: Optional[str]
    image_category: str
    created_at: datetime
    updated_at: datetime
