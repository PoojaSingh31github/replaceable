from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class RoleAnalysisSchema(BaseModel):
    role_number: str
    title: str
    emergence_period: str
    origin: str
    confidence: str
    narrative: str
    rpi_score: float
    tasks: List[Dict[str, Any]] = []
    gauge_info: Optional[Dict[str, str]] = None
    causal_chain: Optional[List[str]] = None
    skills: Optional[Dict[str, List[str]]] = None

class ScenarioSchema(BaseModel):
    type: str
    title: str
    description: str
    outcome: str
    indicators: Dict[str, str]

class ChartDataSchema(BaseModel):
    rpi_radar: Optional[Dict[str, Any]] = None
    composition_chart: Optional[Dict[str, Any]] = None
    timeline_chart: Optional[Dict[str, Any]] = None

class ReportCreate(BaseModel):
    slug: str
    title: str
    subtitle: str
    report_type: str = "horizon-scan"
    cover: Dict[str, Any] = {}
    nav_links: List[Dict[str, str]] = []
    executive_summary: Dict[str, Any] = {}
    prologue: Optional[str] = None
    methodology: Dict[str, Any] = {}
    roles: List[RoleAnalysisSchema] = []
    charts: Optional[ChartDataSchema] = None
    scenarios: List[ScenarioSchema] = []
    implications: Dict[str, List[Dict[str, str]]] = {}
    cta: Optional[Dict[str, str]] = None
    status: str = "draft"
    featured: bool = False
    image_url: Optional[str] = None
    target_year: Optional[int] = None
    region: Optional[str] = None
    industry: Optional[str] = None

class ReportUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    subtitle: Optional[str] = None
    report_type: Optional[str] = None
    cover: Optional[Dict[str, Any]] = None
    nav_links: Optional[List[Dict[str, str]]] = None
    executive_summary: Optional[Dict[str, Any]] = None
    prologue: Optional[str] = None
    methodology: Optional[Dict[str, Any]] = None
    roles: Optional[List[RoleAnalysisSchema]] = None
    charts: Optional[ChartDataSchema] = None
    scenarios: Optional[List[ScenarioSchema]] = None
    implications: Optional[Dict[str, List[Dict[str, str]]]] = None
    cta: Optional[Dict[str, str]] = None
    status: Optional[str] = None
    featured: Optional[bool] = None
    image_url: Optional[str] = None
    target_year: Optional[int] = None
    region: Optional[str] = None
    industry: Optional[str] = None

class ReportResponse(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: str
    report_type: str
    cover: Dict[str, Any]
    nav_links: List[Dict[str, str]]
    executive_summary: Dict[str, Any]
    prologue: Optional[str]
    methodology: Dict[str, Any]
    roles: List[RoleAnalysisSchema]
    charts: Optional[ChartDataSchema]
    scenarios: List[ScenarioSchema]
    implications: Dict[str, List[Dict[str, str]]]
    cta: Optional[Dict[str, str]]
    status: str
    featured: bool
    image_url: Optional[str]
    target_year: Optional[int]
    region: Optional[str]
    industry: Optional[str]
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime]

class ReportListResponse(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: str
    report_type: str
    status: str
    featured: bool
    image_url: Optional[str]
    target_year: Optional[int]
    region: Optional[str]
    industry: Optional[str]
    created_at: datetime
