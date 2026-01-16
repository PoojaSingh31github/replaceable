"""
Seed landing page cards data into MongoDB

Run this script to populate the landing_cards collection with the default
articles that were previously hardcoded in the LandingPage.jsx component.
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "replaceable")

# Default cards data (from original ARTICLES array)
DEFAULT_CARDS = [
    {
        "title": "The Great Reassessment",
        "category": "Workforce",
        "summary": "Fortune 500 companies initiate comprehensive AI workforce audits across all divisions.",
        "year": 2026,
        "rpi": 42,
        "augment": 68,
        "roles": 1240,
        "image_category": "workforce",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 1
    },
    {
        "title": "The Cognitive Threshold",
        "category": "Technology",
        "summary": "AI achieves expert-level performance across twelve professional domains.",
        "year": 2028,
        "rpi": 56,
        "augment": 72,
        "roles": 890,
        "image_category": "technology",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 2
    },
    {
        "title": "The Reckoning",
        "category": "Policy",
        "summary": "EU unveils the Human Work Guarantee framework for comprehensive worker protections.",
        "year": 2030,
        "rpi": 38,
        "augment": 81,
        "roles": 2100,
        "image_category": "policy",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 3
    },
    {
        "title": "Diagnostic Singularity",
        "category": "Healthcare",
        "summary": "AI diagnostics achieve 99.7% accuracy across 500 medical conditions.",
        "year": 2032,
        "rpi": 67,
        "augment": 89,
        "roles": 340,
        "image_category": "healthcare",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 4
    },
    {
        "title": "Synthetic Renaissance",
        "category": "Creative",
        "summary": "AI-generated content comprises 80% of all digital media production.",
        "year": 2035,
        "rpi": 73,
        "augment": 54,
        "roles": 560,
        "image_category": "creative",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 5
    },
    {
        "title": "Justice Automated",
        "category": "Legal",
        "summary": "AI adjudication handles 70% of civil disputes in participating nations.",
        "year": 2038,
        "rpi": 61,
        "augment": 77,
        "roles": 420,
        "image_category": "legal",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 6
    },
    {
        "title": "The Discovery Engine",
        "category": "Science",
        "summary": "AI-driven research output surpasses the entire previous century combined.",
        "year": 2042,
        "rpi": 52,
        "augment": 91,
        "roles": 780,
        "image_category": "science",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 7
    },
    {
        "title": "Post-Scarcity Threshold",
        "category": "Economy",
        "summary": "Automation reaches 85% coverage of traditional labor categories.",
        "year": 2045,
        "rpi": 84,
        "augment": 62,
        "roles": 3400,
        "image_category": "economy",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 8
    },
    {
        "title": "The Memory Wars",
        "category": "Politics",
        "summary": "Nations compete for control of collective AI knowledge repositories.",
        "year": 2048,
        "rpi": 29,
        "augment": 85,
        "roles": 190,
        "image_category": "politics",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 9
    },
    {
        "title": "Hybrid Leadership",
        "category": "Governance",
        "summary": "Human-AI executive partnerships become the organizational standard.",
        "year": 2050,
        "rpi": 44,
        "augment": 94,
        "roles": 520,
        "image_category": "governance",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 10
    },
    {
        "title": "Cognitive Partnership",
        "category": "Technology",
        "summary": "Neural interfaces enable seamless human-AI collaborative thinking.",
        "year": 2055,
        "rpi": 58,
        "augment": 96,
        "roles": 1100,
        "image_category": "technology",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 11
    },
    {
        "title": "The Empathy Engines",
        "category": "Society",
        "summary": "AI emotional intelligence surpasses average human capability.",
        "year": 2060,
        "rpi": 71,
        "augment": 88,
        "roles": 640,
        "image_category": "society",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 12
    },
    {
        "title": "Goa Hospitality 2064",
        "category": "Industry",
        "summary": "Strategic roles defining hospitality's radical transformation.",
        "year": 2064,
        "rpi": 63,
        "augment": 79,
        "roles": 280,
        "image_category": "industry",
        "tags": [],
        "featured": True,
        "linked_report_slug": "goa-hospitality-2064",
        "active": True,
        "order": 13
    },
    {
        "title": "Universal Creativity",
        "category": "Culture",
        "summary": "Every human gains access to world-class creative tools.",
        "year": 2068,
        "rpi": 81,
        "augment": 67,
        "roles": 920,
        "image_category": "culture",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 14
    },
    {
        "title": "Neural Privacy",
        "category": "Legal",
        "summary": "Legal frameworks emerge for the Inner Monologue protection era.",
        "year": 2075,
        "rpi": 35,
        "augment": 92,
        "roles": 310,
        "image_category": "legal",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 15
    },
    {
        "title": "The Synthesis Age",
        "category": "Evolution",
        "summary": "Human-AI cognitive integration reaches mainstream adoption.",
        "year": 2080,
        "rpi": 76,
        "augment": 98,
        "roles": 1800,
        "image_category": "evolution",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 16
    },
    {
        "title": "Memory Markets",
        "category": "Economy",
        "summary": "The commodification of human experience begins in earnest.",
        "year": 2085,
        "rpi": 69,
        "augment": 74,
        "roles": 450,
        "image_category": "economy",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 17
    },
    {
        "title": "Digital Immortality",
        "category": "Philosophy",
        "summary": "Consciousness preservation becomes technically feasible.",
        "year": 2090,
        "rpi": 47,
        "augment": 99,
        "roles": 120,
        "image_category": "philosophy",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 18
    },
    {
        "title": "The Great Unbundling",
        "category": "Society",
        "summary": "Traditional institutions dissolve into networked alternatives.",
        "year": 2095,
        "rpi": 88,
        "augment": 83,
        "roles": 2600,
        "image_category": "society",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 19
    },
    {
        "title": "The New Meaning",
        "category": "Philosophy",
        "summary": "Work transforms entirely into creative and spiritual expression.",
        "year": 2100,
        "rpi": 94,
        "augment": 71,
        "roles": 4200,
        "image_category": "philosophy",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 20
    },
    {
        "title": "Planetary Consciousness",
        "category": "Evolution",
        "summary": "Earth develops rudimentary collective awareness systems.",
        "year": 2105,
        "rpi": 82,
        "augment": 97,
        "roles": 1500,
        "image_category": "evolution",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 21
    },
    {
        "title": "The Collective Mind",
        "category": "Technology",
        "summary": "Networked consciousness experiments reach global scale.",
        "year": 2110,
        "rpi": 91,
        "augment": 99,
        "roles": 890,
        "image_category": "technology",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 22
    },
    {
        "title": "Beyond Biology",
        "category": "Science",
        "summary": "The distinction between organic and synthetic life dissolves.",
        "year": 2118,
        "rpi": 96,
        "augment": 95,
        "roles": 2100,
        "image_category": "science",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 23
    },
    {
        "title": "The Horizon",
        "category": "Future",
        "summary": "The question becomes who we choose to become.",
        "year": 2126,
        "rpi": 99,
        "augment": 100,
        "roles": 5000,
        "image_category": "future",
        "tags": [],
        "featured": False,
        "active": True,
        "order": 24
    }
]

# Default site content
DEFAULT_SITE_CONTENT = {
    "hero": {
        "badge": "Strategic Foresight Series",
        "title": "The Horizon <em>Scanning</em> Series",
        "subtitle": "Strategic foresight reports mapping the transformation of human work across the next century.",
        "stats": [
            {"value": "24", "label": "Reports"},
            {"value": "100+", "label": "Years Analyzed"},
            {"value": "50K+", "label": "Roles Studied"}
        ]
    },
    "execution": {
        "title": "Research Methodology",
        "subtitle": "Our multi-disciplinary approach to forecasting workforce transformation",
        "items": [
            {
                "icon": "🔬",
                "title": "Data Collection",
                "description": "Comprehensive analysis of labor market trends and technological developments"
            },
            {
                "icon": "🤖",
                "title": "AI Analysis",
                "description": "Machine learning models trained on historical disruption patterns"
            },
            {
                "icon": "👥",
                "title": "Expert Consultation",
                "description": "Input from industry leaders and academic researchers"
            },
            {
                "icon": "📊",
                "title": "Scenario Planning",
                "description": "Multiple future pathways based on key uncertainty drivers"
            }
        ]
    },
    "analytics": {
        "title": "Platform Analytics",
        "subtitle": "Real-time insights from our research database",
        "metrics": [
            {"value": "24", "label": "Active Reports", "change": "+3 this month", "changeType": "positive"},
            {"value": "156", "label": "Roles Tracked", "change": "+12 new roles", "changeType": "positive"},
            {"value": "89%", "label": "Accuracy Rate", "change": "Validated", "changeType": "neutral"},
            {"value": "42", "label": "Industries", "change": "+5 sectors", "changeType": "positive"}
        ],
        "charts_enabled": True
    },
    "cta": {
        "title": "Ready to map <em>your</em> future?",
        "description": "Commission a custom Horizon Scan for your organization. We'll analyze the transformation of your industry across the timescales that matter.",
        "button_text": "Commission a Report →",
        "button_link": "/horizon"
    },
    "footer": {
        "logo_text": "Replace<span class='accent'>able</span>.ai",
        "copyright": "© 2026 Replaceable.ai · All rights reserved"
    },
    "nav_links": [
        {"label": "Intelligence", "url": "/horizon"},
        {"label": "Industries", "url": "/reports/goa-hospitality-2064"},
        {"label": "Research", "url": "/horizon"}
    ],
    "filters": [
        {"name": "All Reports", "key": "all"},
        {"name": "Awakening", "key": "awakening", "start_year": 2026, "end_year": 2040},
        {"name": "Transformation", "key": "transformation", "start_year": 2041, "end_year": 2070},
        {"name": "Transcendence", "key": "transcendence", "start_year": 2071, "end_year": 2100},
        {"name": "Horizon", "key": "horizon", "start_year": 2101, "end_year": 2126}
    ]
}


async def seed_data():
    """Seed landing cards and site content into MongoDB"""
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    print(f"Using database: {DATABASE_NAME}")
    
    # Seed landing cards
    cards_collection = db.landing_cards
    existing_cards = await cards_collection.count_documents({})
    
    if existing_cards == 0:
        print("\nSeeding landing cards...")
        for card in DEFAULT_CARDS:
            card["created_at"] = datetime.utcnow()
            card["updated_at"] = datetime.utcnow()
        
        result = await cards_collection.insert_many(DEFAULT_CARDS)
        print(f"✓ Inserted {len(result.inserted_ids)} landing cards")
    else:
        print(f"\n⚠ Landing cards collection already has {existing_cards} documents. Skipping.")
    
    # Seed site content
    site_content_collection = db.site_content
    existing_content = await site_content_collection.count_documents({})
    
    if existing_content == 0:
        print("\nSeeding site content...")
        DEFAULT_SITE_CONTENT["created_at"] = datetime.utcnow()
        DEFAULT_SITE_CONTENT["updated_at"] = datetime.utcnow()
        
        result = await site_content_collection.insert_one(DEFAULT_SITE_CONTENT)
        print(f"✓ Inserted site content with ID: {result.inserted_id}")
    else:
        print(f"\n⚠ Site content collection already has {existing_content} documents. Skipping.")
    
    # Seed default tags
    tags_collection = db.tags
    existing_tags = await tags_collection.count_documents({})
    
    if existing_tags == 0:
        print("\nSeeding default tags...")
        default_tags = [
            {"name": "AI Impact", "slug": "ai-impact", "color": "#c41e3a", "created_at": datetime.utcnow()},
            {"name": "Workforce", "slug": "workforce", "color": "#2563eb", "created_at": datetime.utcnow()},
            {"name": "Policy", "slug": "policy", "color": "#059669", "created_at": datetime.utcnow()},
            {"name": "Technology", "slug": "technology", "color": "#7c3aed", "created_at": datetime.utcnow()},
            {"name": "Healthcare", "slug": "healthcare", "color": "#dc2626", "created_at": datetime.utcnow()},
            {"name": "Economy", "slug": "economy", "color": "#ca8a04", "created_at": datetime.utcnow()},
        ]
        result = await tags_collection.insert_many(default_tags)
        print(f"✓ Inserted {len(result.inserted_ids)} default tags")
    else:
        print(f"\n⚠ Tags collection already has {existing_tags} documents. Skipping.")
    
    print("\n✅ Seeding complete!")
    
    # Close connection
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_data())
