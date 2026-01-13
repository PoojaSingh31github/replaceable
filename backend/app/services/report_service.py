from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from ..database import get_reports_collection
from ..schemas.report import ReportCreate, ReportUpdate

class ReportService:
    @staticmethod
    async def create_report(report_data: ReportCreate) -> dict:
        """Create a new report."""
        reports = get_reports_collection()
        
        # Check if slug exists
        existing = await reports.find_one({"slug": report_data.slug})
        if existing:
            raise ValueError("Report with this slug already exists")
        
        report_doc = report_data.model_dump()
        report_doc["created_at"] = datetime.utcnow()
        report_doc["updated_at"] = datetime.utcnow()
        
        result = await reports.insert_one(report_doc)
        report_doc["_id"] = result.inserted_id
        return report_doc

    @staticmethod
    async def get_report_by_id(report_id: str) -> Optional[dict]:
        """Get report by ID."""
        reports = get_reports_collection()
        try:
            return await reports.find_one({"_id": ObjectId(report_id)})
        except:
            return None

    @staticmethod
    async def get_report_by_slug(slug: str) -> Optional[dict]:
        """Get report by slug."""
        reports = get_reports_collection()
        return await reports.find_one({"slug": slug})

    @staticmethod
    async def get_all_reports(status: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[dict]:
        """Get all reports with optional status filter."""
        reports = get_reports_collection()
        query = {}
        if status:
            query["status"] = status
        
        cursor = reports.find(query).sort("created_at", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)

    @staticmethod
    async def get_published_reports() -> List[dict]:
        """Get all published reports."""
        return await ReportService.get_all_reports(status="published")

    @staticmethod
    async def update_report(report_id: str, report_data: ReportUpdate) -> Optional[dict]:
        """Update a report."""
        reports = get_reports_collection()
        
        update_data = {k: v for k, v in report_data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        # If publishing, set published_at
        if update_data.get("status") == "published":
            update_data["published_at"] = datetime.utcnow()
        
        result = await reports.find_one_and_update(
            {"_id": ObjectId(report_id)},
            {"$set": update_data},
            return_document=True
        )
        return result

    @staticmethod
    async def delete_report(report_id: str) -> bool:
        """Delete a report."""
        reports = get_reports_collection()
        result = await reports.delete_one({"_id": ObjectId(report_id)})
        return result.deleted_count > 0

    @staticmethod
    async def publish_report(report_id: str) -> Optional[dict]:
        """Publish a report."""
        reports = get_reports_collection()
        result = await reports.find_one_and_update(
            {"_id": ObjectId(report_id)},
            {
                "$set": {
                    "status": "published",
                    "published_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
            },
            return_document=True
        )
        return result

    @staticmethod
    async def unpublish_report(report_id: str) -> Optional[dict]:
        """Unpublish a report (set to draft)."""
        reports = get_reports_collection()
        result = await reports.find_one_and_update(
            {"_id": ObjectId(report_id)},
            {
                "$set": {
                    "status": "draft",
                    "updated_at": datetime.utcnow()
                }
            },
            return_document=True
        )
        return result
