from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from ..database import get_database
from ..schemas.site_content import (
    TagCreate, TagUpdate,
    SiteContentUpdate,
    LandingPageCardCreate, LandingPageCardUpdate
)


def get_site_content_collection():
    db = get_database()
    if db is None:
        return None
    return db.site_content


def get_tags_collection():
    db = get_database()
    if db is None:
        return None
    return db.tags


def get_landing_cards_collection():
    db = get_database()
    if db is None:
        return None
    return db.landing_cards


class SiteContentService:
    """Service for managing site-wide content"""
    
    @staticmethod
    async def get_site_content() -> Optional[dict]:
        """Get the site content (there should only be one document)"""
        collection = get_site_content_collection()
        if collection is None:
            return None
        content = await collection.find_one({})
        return content
    
    @staticmethod
    async def update_site_content(data: SiteContentUpdate) -> Optional[dict]:
        """Update site content (upsert)"""
        collection = get_site_content_collection()
        if collection is None:
            return None
        
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        # Check if document exists
        existing = await collection.find_one({})
        
        if existing:
            result = await collection.find_one_and_update(
                {"_id": existing["_id"]},
                {"$set": update_data},
                return_document=True
            )
        else:
            # Create new with defaults
            from ..models.site_content import SiteContent
            default_content = SiteContent().model_dump()
            default_content.update(update_data)
            default_content["created_at"] = datetime.utcnow()
            result = await collection.insert_one(default_content)
            return await collection.find_one({"_id": result.inserted_id})
        
        return result
    
    @staticmethod
    async def initialize_site_content() -> dict:
        """Initialize site content with defaults if not exists"""
        collection = get_site_content_collection()
        if collection is None:
            return None
        
        existing = await collection.find_one({})
        if existing:
            return existing
        
        from ..models.site_content import SiteContent
        default_content = SiteContent().model_dump()
        default_content["created_at"] = datetime.utcnow()
        default_content["updated_at"] = datetime.utcnow()
        
        result = await collection.insert_one(default_content)
        return await collection.find_one({"_id": result.inserted_id})


class TagService:
    """Service for managing tags"""
    
    @staticmethod
    async def create_tag(tag_data: TagCreate) -> dict:
        """Create a new tag"""
        collection = get_tags_collection()
        if collection is None:
            raise ValueError("Database not connected")
        
        # Auto-generate slug if not provided
        slug = tag_data.slug or tag_data.name.lower().replace(" ", "-").replace("_", "-")
        
        # Check if slug exists
        existing = await collection.find_one({"slug": slug})
        if existing:
            raise ValueError(f"Tag with slug '{slug}' already exists")
        
        tag_doc = {
            "name": tag_data.name,
            "slug": slug,
            "color": tag_data.color or "#c41e3a",
            "created_at": datetime.utcnow()
        }
        
        result = await collection.insert_one(tag_doc)
        tag_doc["_id"] = result.inserted_id
        return tag_doc
    
    @staticmethod
    async def get_all_tags() -> List[dict]:
        """Get all tags"""
        collection = get_tags_collection()
        if collection is None:
            return []
        
        cursor = collection.find({}).sort("name", 1)
        return await cursor.to_list(length=1000)
    
    @staticmethod
    async def get_tag_by_id(tag_id: str) -> Optional[dict]:
        """Get tag by ID"""
        collection = get_tags_collection()
        if collection is None:
            return None
        
        try:
            return await collection.find_one({"_id": ObjectId(tag_id)})
        except:
            return None
    
    @staticmethod
    async def get_tag_by_slug(slug: str) -> Optional[dict]:
        """Get tag by slug"""
        collection = get_tags_collection()
        if collection is None:
            return None
        
        return await collection.find_one({"slug": slug})
    
    @staticmethod
    async def update_tag(tag_id: str, tag_data: TagUpdate) -> Optional[dict]:
        """Update a tag"""
        collection = get_tags_collection()
        if collection is None:
            return None
        
        update_data = {k: v for k, v in tag_data.model_dump().items() if v is not None}
        
        if not update_data:
            return await TagService.get_tag_by_id(tag_id)
        
        result = await collection.find_one_and_update(
            {"_id": ObjectId(tag_id)},
            {"$set": update_data},
            return_document=True
        )
        return result
    
    @staticmethod
    async def delete_tag(tag_id: str) -> bool:
        """Delete a tag"""
        collection = get_tags_collection()
        if collection is None:
            return False
        
        result = await collection.delete_one({"_id": ObjectId(tag_id)})
        return result.deleted_count > 0


class LandingCardService:
    """Service for managing landing page cards"""
    
    @staticmethod
    async def create_card(card_data: LandingPageCardCreate) -> dict:
        """Create a new landing page card"""
        collection = get_landing_cards_collection()
        if collection is None:
            raise ValueError("Database not connected")
        
        card_doc = card_data.model_dump()
        card_doc["created_at"] = datetime.utcnow()
        card_doc["updated_at"] = datetime.utcnow()
        
        result = await collection.insert_one(card_doc)
        card_doc["_id"] = result.inserted_id
        return card_doc
    
    @staticmethod
    async def get_all_cards(include_inactive: bool = False) -> List[dict]:
        """Get all landing page cards"""
        collection = get_landing_cards_collection()
        if collection is None:
            return []
        
        query = {} if include_inactive else {"is_active": True}
        cursor = collection.find(query).sort([("order", 1), ("year", 1)])
        return await cursor.to_list(length=1000)
    
    @staticmethod
    async def get_cards_by_tag(tag_slug: str) -> List[dict]:
        """Get cards by tag"""
        collection = get_landing_cards_collection()
        if collection is None:
            return []
        
        cursor = collection.find({
            "tags": tag_slug,
            "is_active": True
        }).sort([("order", 1), ("year", 1)])
        return await cursor.to_list(length=1000)
    
    @staticmethod
    async def get_card_by_id(card_id: str) -> Optional[dict]:
        """Get card by ID"""
        collection = get_landing_cards_collection()
        if collection is None:
            return None
        
        try:
            return await collection.find_one({"_id": ObjectId(card_id)})
        except:
            return None
    
    @staticmethod
    async def update_card(card_id: str, card_data: LandingPageCardUpdate) -> Optional[dict]:
        """Update a landing page card"""
        collection = get_landing_cards_collection()
        if collection is None:
            return None
        
        update_data = {k: v for k, v in card_data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await collection.find_one_and_update(
            {"_id": ObjectId(card_id)},
            {"$set": update_data},
            return_document=True
        )
        return result
    
    @staticmethod
    async def delete_card(card_id: str) -> bool:
        """Delete a landing page card"""
        collection = get_landing_cards_collection()
        if collection is None:
            return False
        
        result = await collection.delete_one({"_id": ObjectId(card_id)})
        return result.deleted_count > 0
    
    @staticmethod
    async def reorder_cards(card_orders: List[dict]) -> bool:
        """Reorder cards by updating their order field"""
        collection = get_landing_cards_collection()
        if collection is None:
            return False
        
        for item in card_orders:
            await collection.update_one(
                {"_id": ObjectId(item["id"])},
                {"$set": {"order": item["order"]}}
            )
        return True
