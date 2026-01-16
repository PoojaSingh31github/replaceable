from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ..schemas.site_content import (
    TagCreate, TagUpdate, TagResponse,
    SiteContentUpdate, SiteContentResponse,
    LandingPageCardCreate, LandingPageCardUpdate, LandingPageCardResponse
)
from ..services.site_content_service import (
    SiteContentService, TagService, LandingCardService
)
from ..dependencies import get_admin_user

router = APIRouter(prefix="/site-content", tags=["Site Content"])


# ============= Helper Functions =============
def format_tag_response(tag: dict) -> dict:
    return {
        "id": str(tag["_id"]),
        "name": tag["name"],
        "slug": tag["slug"],
        "color": tag.get("color", "#c41e3a"),
        "created_at": tag["created_at"]
    }


def format_card_response(card: dict) -> dict:
    return {
        "id": str(card["_id"]),
        "year": card["year"],
        "title": card["title"],
        "category": card["category"],
        "summary": card["summary"],
        "rpi": card.get("rpi", 0),
        "augment": card.get("augment", 0),
        "roles": card.get("roles", 0),
        "tags": card.get("tags", []),
        "linked_report_slug": card.get("linked_report_slug"),
        "featured": card.get("featured", False),
        "order": card.get("order", 0),
        "is_active": card.get("is_active", True),
        "image_url": card.get("image_url"),
        "image_category": card.get("image_category", "technology"),
        "created_at": card["created_at"],
        "updated_at": card["updated_at"]
    }


def format_site_content_response(content: dict) -> dict:
    if content is None:
        # Return defaults
        from ..models.site_content import SiteContent
        default = SiteContent()
        return {
            "id": None,
            "hero": default.hero.model_dump(),
            "filters": [f.model_dump() for f in default.filters],
            "execution": default.execution.model_dump(),
            "analytics": default.analytics.model_dump(),
            "cta": default.cta.model_dump(),
            "footer": default.footer.model_dump(),
            "nav_links": default.nav_links,
            "created_at": None,
            "updated_at": None
        }
    
    return {
        "id": str(content["_id"]) if content.get("_id") else None,
        "hero": content.get("hero", {}),
        "filters": content.get("filters", []),
        "execution": content.get("execution", {}),
        "analytics": content.get("analytics", {}),
        "cta": content.get("cta", {}),
        "footer": content.get("footer", {}),
        "nav_links": content.get("nav_links", []),
        "created_at": content.get("created_at"),
        "updated_at": content.get("updated_at")
    }


# ============= Public Endpoints =============
@router.get("/public", response_model=SiteContentResponse)
async def get_public_site_content():
    """Get site content for public display"""
    content = await SiteContentService.get_site_content()
    return format_site_content_response(content)


@router.get("/public/tags", response_model=List[TagResponse])
async def get_public_tags():
    """Get all tags for public display"""
    tags = await TagService.get_all_tags()
    return [format_tag_response(t) for t in tags]


@router.get("/public/cards", response_model=List[LandingPageCardResponse])
async def get_public_cards(tag: Optional[str] = Query(None, description="Filter by tag slug")):
    """Get landing page cards for public display"""
    if tag:
        cards = await LandingCardService.get_cards_by_tag(tag)
    else:
        cards = await LandingCardService.get_all_cards(include_inactive=False)
    return [format_card_response(c) for c in cards]


# ============= Admin Endpoints: Site Content =============
@router.get("/", response_model=SiteContentResponse)
async def get_site_content(admin: dict = Depends(get_admin_user)):
    """Get site content (admin)"""
    content = await SiteContentService.get_site_content()
    return format_site_content_response(content)


@router.put("/", response_model=SiteContentResponse)
async def update_site_content(
    data: SiteContentUpdate,
    admin: dict = Depends(get_admin_user)
):
    """Update site content (admin)"""
    content = await SiteContentService.update_site_content(data)
    return format_site_content_response(content)


@router.post("/initialize", response_model=SiteContentResponse)
async def initialize_site_content(admin: dict = Depends(get_admin_user)):
    """Initialize site content with defaults (admin)"""
    content = await SiteContentService.initialize_site_content()
    return format_site_content_response(content)


# ============= Admin Endpoints: Tags =============
@router.get("/tags", response_model=List[TagResponse])
async def get_all_tags(admin: dict = Depends(get_admin_user)):
    """Get all tags (admin)"""
    tags = await TagService.get_all_tags()
    return [format_tag_response(t) for t in tags]


@router.post("/tags", response_model=TagResponse, status_code=status.HTTP_201_CREATED)
async def create_tag(tag_data: TagCreate, admin: dict = Depends(get_admin_user)):
    """Create a new tag (admin)"""
    try:
        tag = await TagService.create_tag(tag_data)
        return format_tag_response(tag)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/tags/{tag_id}", response_model=TagResponse)
async def get_tag(tag_id: str, admin: dict = Depends(get_admin_user)):
    """Get tag by ID (admin)"""
    tag = await TagService.get_tag_by_id(tag_id)
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found"
        )
    return format_tag_response(tag)


@router.put("/tags/{tag_id}", response_model=TagResponse)
async def update_tag(
    tag_id: str,
    tag_data: TagUpdate,
    admin: dict = Depends(get_admin_user)
):
    """Update a tag (admin)"""
    tag = await TagService.update_tag(tag_id, tag_data)
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found"
        )
    return format_tag_response(tag)


@router.delete("/tags/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tag(tag_id: str, admin: dict = Depends(get_admin_user)):
    """Delete a tag (admin)"""
    deleted = await TagService.delete_tag(tag_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found"
        )


# ============= Admin Endpoints: Landing Cards =============
@router.get("/cards", response_model=List[LandingPageCardResponse])
async def get_all_cards(
    include_inactive: bool = Query(False),
    admin: dict = Depends(get_admin_user)
):
    """Get all landing page cards (admin)"""
    cards = await LandingCardService.get_all_cards(include_inactive=include_inactive)
    return [format_card_response(c) for c in cards]


@router.post("/cards", response_model=LandingPageCardResponse, status_code=status.HTTP_201_CREATED)
async def create_card(
    card_data: LandingPageCardCreate,
    admin: dict = Depends(get_admin_user)
):
    """Create a new landing page card (admin)"""
    try:
        card = await LandingCardService.create_card(card_data)
        return format_card_response(card)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/cards/{card_id}", response_model=LandingPageCardResponse)
async def get_card(card_id: str, admin: dict = Depends(get_admin_user)):
    """Get card by ID (admin)"""
    card = await LandingCardService.get_card_by_id(card_id)
    if not card:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Card not found"
        )
    return format_card_response(card)


@router.put("/cards/{card_id}", response_model=LandingPageCardResponse)
async def update_card(
    card_id: str,
    card_data: LandingPageCardUpdate,
    admin: dict = Depends(get_admin_user)
):
    """Update a landing page card (admin)"""
    card = await LandingCardService.update_card(card_id, card_data)
    if not card:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Card not found"
        )
    return format_card_response(card)


@router.delete("/cards/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_card(card_id: str, admin: dict = Depends(get_admin_user)):
    """Delete a landing page card (admin)"""
    deleted = await LandingCardService.delete_card(card_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Card not found"
        )


@router.post("/cards/reorder")
async def reorder_cards(
    card_orders: List[dict],
    admin: dict = Depends(get_admin_user)
):
    """Reorder landing page cards (admin)"""
    success = await LandingCardService.reorder_cards(card_orders)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reorder cards"
        )
    return {"message": "Cards reordered successfully"}
