from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ..schemas.consultation import ConsultationCreate, ConsultationUpdate, ConsultationResponse, ConsultationListResponse
from ..services.consultation_service import ConsultationService
from ..dependencies import get_admin_user

router = APIRouter(prefix="/consultations", tags=["Consultations"])

def format_consultation_response(consultation: dict) -> dict:
    """Format consultation document for response."""
    return {
        "id": str(consultation["_id"]),
        "first_name": consultation["first_name"],
        "last_name": consultation["last_name"],
        "email": consultation["email"],
        "company": consultation["company"],
        "role_title": consultation.get("role_title"),
        "industry_sector": consultation["industry_sector"],
        "preferred_month": consultation.get("preferred_month"),
        "preferred_week": consultation.get("preferred_week"),
        "preferred_time": consultation.get("preferred_time"),
        "packages": consultation.get("packages", []),
        "message": consultation.get("message"),
        "status": consultation.get("status", "new"),
        "notes": consultation.get("notes"),
        "created_at": consultation["created_at"],
        "updated_at": consultation["updated_at"]
    }

def format_consultation_list_response(consultation: dict) -> dict:
    """Format consultation for list response."""
    return {
        "id": str(consultation["_id"]),
        "first_name": consultation["first_name"],
        "last_name": consultation["last_name"],
        "email": consultation["email"],
        "company": consultation["company"],
        "industry_sector": consultation["industry_sector"],
        "status": consultation.get("status", "new"),
        "created_at": consultation["created_at"]
    }

# Public endpoint for form submission
@router.post("/submit", response_model=ConsultationResponse, status_code=status.HTTP_201_CREATED)
async def submit_consultation(consultation_data: ConsultationCreate):
    """Submit a consultation request (public endpoint)."""
    consultation = await ConsultationService.create_consultation(consultation_data)
    return format_consultation_response(consultation)

# Admin endpoints
@router.get("/", response_model=List[ConsultationListResponse])
async def get_all_consultations(
    status: Optional[str] = Query(None, description="Filter by status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    admin: dict = Depends(get_admin_user)
):
    """Get all consultations (admin only)."""
    consultations = await ConsultationService.get_all_consultations(status=status, skip=skip, limit=limit)
    return [format_consultation_list_response(c) for c in consultations]

@router.get("/stats")
async def get_consultation_stats(admin: dict = Depends(get_admin_user)):
    """Get consultation statistics (admin only)."""
    return await ConsultationService.get_consultation_stats()

@router.get("/{consultation_id}", response_model=ConsultationResponse)
async def get_consultation(consultation_id: str, admin: dict = Depends(get_admin_user)):
    """Get a consultation by ID (admin only)."""
    consultation = await ConsultationService.get_consultation_by_id(consultation_id)
    if not consultation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation not found"
        )
    return format_consultation_response(consultation)

@router.put("/{consultation_id}", response_model=ConsultationResponse)
async def update_consultation(
    consultation_id: str,
    consultation_data: ConsultationUpdate,
    admin: dict = Depends(get_admin_user)
):
    """Update a consultation (admin only)."""
    consultation = await ConsultationService.update_consultation(consultation_id, consultation_data)
    if not consultation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation not found"
        )
    return format_consultation_response(consultation)

@router.delete("/{consultation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_consultation(consultation_id: str, admin: dict = Depends(get_admin_user)):
    """Delete a consultation (admin only)."""
    deleted = await ConsultationService.delete_consultation(consultation_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation not found"
        )

@router.patch("/{consultation_id}/status")
async def update_consultation_status(
    consultation_id: str,
    status: str = Query(..., description="New status"),
    notes: Optional[str] = Query(None, description="Admin notes"),
    admin: dict = Depends(get_admin_user)
):
    """Update consultation status (admin only)."""
    valid_statuses = ["new", "contacted", "scheduled", "completed", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )
    
    consultation = await ConsultationService.update_status(consultation_id, status, notes)
    if not consultation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation not found"
        )
    return format_consultation_response(consultation)
