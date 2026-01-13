from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from ..database import get_consultations_collection
from ..schemas.consultation import ConsultationCreate, ConsultationUpdate

class ConsultationService:
    @staticmethod
    async def create_consultation(consultation_data: ConsultationCreate) -> dict:
        """Create a new consultation request."""
        consultations = get_consultations_collection()
        
        consultation_doc = consultation_data.model_dump()
        consultation_doc["status"] = "new"
        consultation_doc["created_at"] = datetime.utcnow()
        consultation_doc["updated_at"] = datetime.utcnow()
        
        result = await consultations.insert_one(consultation_doc)
        consultation_doc["_id"] = result.inserted_id
        return consultation_doc

    @staticmethod
    async def get_consultation_by_id(consultation_id: str) -> Optional[dict]:
        """Get consultation by ID."""
        consultations = get_consultations_collection()
        try:
            return await consultations.find_one({"_id": ObjectId(consultation_id)})
        except:
            return None

    @staticmethod
    async def get_all_consultations(status: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[dict]:
        """Get all consultations with optional status filter."""
        consultations = get_consultations_collection()
        query = {}
        if status:
            query["status"] = status
        
        cursor = consultations.find(query).sort("created_at", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)

    @staticmethod
    async def update_consultation(consultation_id: str, consultation_data: ConsultationUpdate) -> Optional[dict]:
        """Update a consultation."""
        consultations = get_consultations_collection()
        
        update_data = {k: v for k, v in consultation_data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await consultations.find_one_and_update(
            {"_id": ObjectId(consultation_id)},
            {"$set": update_data},
            return_document=True
        )
        return result

    @staticmethod
    async def delete_consultation(consultation_id: str) -> bool:
        """Delete a consultation."""
        consultations = get_consultations_collection()
        result = await consultations.delete_one({"_id": ObjectId(consultation_id)})
        return result.deleted_count > 0

    @staticmethod
    async def update_status(consultation_id: str, status: str, notes: Optional[str] = None) -> Optional[dict]:
        """Update consultation status."""
        consultations = get_consultations_collection()
        update_data = {
            "status": status,
            "updated_at": datetime.utcnow()
        }
        if notes:
            update_data["notes"] = notes
        
        result = await consultations.find_one_and_update(
            {"_id": ObjectId(consultation_id)},
            {"$set": update_data},
            return_document=True
        )
        return result

    @staticmethod
    async def get_consultation_stats() -> dict:
        """Get consultation statistics."""
        consultations = get_consultations_collection()
        
        pipeline = [
            {
                "$group": {
                    "_id": "$status",
                    "count": {"$sum": 1}
                }
            }
        ]
        
        cursor = consultations.aggregate(pipeline)
        results = await cursor.to_list(length=10)
        
        stats = {
            "total": 0,
            "new": 0,
            "contacted": 0,
            "scheduled": 0,
            "completed": 0,
            "cancelled": 0
        }
        
        for result in results:
            status = result["_id"]
            count = result["count"]
            stats[status] = count
            stats["total"] += count
        
        return stats
