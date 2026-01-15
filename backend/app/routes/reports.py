from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ..schemas.report import ReportCreate, ReportUpdate, ReportResponse, ReportListResponse
from ..services.report_service import ReportService
from ..dependencies import get_admin_user

router = APIRouter(prefix="/reports", tags=["Reports"])

def format_report_response(report: dict) -> dict:
    """Format report document for response."""
    return {
        "id": str(report["_id"]),
        "slug": report["slug"],
        "title": report["title"],
        "subtitle": report["subtitle"],
        "report_type": report.get("report_type", "horizon-scan"),
        "cover": report.get("cover", {}),
        "nav_links": report.get("nav_links", []),
        "executive_summary": report.get("executive_summary", {}),
        "prologue": report.get("prologue"),
        "methodology": report.get("methodology", {}),
        "roles": report.get("roles", []),
        "charts": report.get("charts"),
        "scenarios": report.get("scenarios", []),
        "implications": report.get("implications", {}),
        "cta": report.get("cta"),
        "status": report.get("status", "draft"),
        "featured": report.get("featured", False),
        "image_url": report.get("image_url"),
        "target_year": report.get("target_year"),
        "region": report.get("region"),
        "industry": report.get("industry"),
        "created_at": report["created_at"],
        "updated_at": report["updated_at"],
        "published_at": report.get("published_at")
    }

def format_report_list_response(report: dict) -> dict:
    """Format report for list response."""
    return {
        "id": str(report["_id"]),
        "slug": report["slug"],
        "title": report["title"],
        "subtitle": report["subtitle"],
        "report_type": report.get("report_type", "horizon-scan"),
        "status": report.get("status", "draft"),
        "featured": report.get("featured", False),
        "image_url": report.get("image_url"),
        "target_year": report.get("target_year"),
        "region": report.get("region"),
        "industry": report.get("industry"),
        "created_at": report["created_at"]
    }

# Public endpoints
@router.get("/public", response_model=List[ReportListResponse])
async def get_published_reports():
    """Get all published reports (public endpoint)."""
    reports = await ReportService.get_published_reports()
    return [format_report_list_response(r) for r in reports]

@router.get("/public/{slug}", response_model=ReportResponse)
async def get_published_report_by_slug(slug: str):
    """Get a published report by slug (public endpoint)."""
    report = await ReportService.get_report_by_slug(slug)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    if report.get("status") != "published":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    return format_report_response(report)

# Admin endpoints
@router.get("/", response_model=List[ReportListResponse])
async def get_all_reports(
    status: Optional[str] = Query(None, description="Filter by status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    admin: dict = Depends(get_admin_user)
):
    """Get all reports (admin only)."""
    reports = await ReportService.get_all_reports(status=status, skip=skip, limit=limit)
    return [format_report_list_response(r) for r in reports]

@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: str, admin: dict = Depends(get_admin_user)):
    """Get a report by ID (admin only)."""
    report = await ReportService.get_report_by_id(report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    return format_report_response(report)

@router.post("/", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(report_data: ReportCreate, admin: dict = Depends(get_admin_user)):
    """Create a new report (admin only)."""
    try:
        report = await ReportService.create_report(report_data)
        return format_report_response(report)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/{report_id}", response_model=ReportResponse)
async def update_report(report_id: str, report_data: ReportUpdate, admin: dict = Depends(get_admin_user)):
    """Update a report (admin only)."""
    report = await ReportService.update_report(report_id, report_data)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    return format_report_response(report)

@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(report_id: str, admin: dict = Depends(get_admin_user)):
    """Delete a report (admin only)."""
    deleted = await ReportService.delete_report(report_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )

@router.post("/{report_id}/publish", response_model=ReportResponse)
async def publish_report(report_id: str, admin: dict = Depends(get_admin_user)):
    """Publish a report (admin only)."""
    report = await ReportService.publish_report(report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    return format_report_response(report)

@router.post("/{report_id}/unpublish", response_model=ReportResponse)
async def unpublish_report(report_id: str, admin: dict = Depends(get_admin_user)):
    """Unpublish a report (admin only)."""
    report = await ReportService.unpublish_report(report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    return format_report_response(report)
