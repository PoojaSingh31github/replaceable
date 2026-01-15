from fastapi import APIRouter, Depends
from ..dependencies import get_admin_user, get_current_user
from ..schemas.user import UserResponse
from ..services.report_service import ReportService
from ..services.consultation_service import ConsultationService

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/me", response_model=UserResponse)
async def get_current_admin(current_user: dict = Depends(get_current_user)):
    """Get current admin user information."""
    return {
        "id": str(current_user["_id"]),
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user["role"],
        "is_active": current_user["is_active"],
        "created_at": current_user["created_at"]
    }

@router.get("/dashboard")
async def get_dashboard_stats(admin: dict = Depends(get_admin_user)):
    """Get dashboard statistics."""
    # Get report counts
    all_reports = await ReportService.get_all_reports()
    published_reports = [r for r in all_reports if r.get("status") == "published"]
    draft_reports = [r for r in all_reports if r.get("status") == "draft"]
    
    # Get consultation stats
    consultation_stats = await ConsultationService.get_consultation_stats()
    
    return {
        "reports": {
            "total": len(all_reports),
            "published": len(published_reports),
            "draft": len(draft_reports)
        },
        "consultations": consultation_stats
    }
