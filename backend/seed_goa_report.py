"""
Seed script to insert the Goa Hospitality 2064 report into the database.
Run this script after starting the backend server.
"""

import asyncio
import os
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Goa Report Data - Extracted from goa.html
GOA_REPORT_DATA = {
    "slug": "goa-hospitality-2064",
    "title": "Goa Hospitality 2064",
    "subtitle": "A forty-year projection of workforce transformation in India's premier coastal tourism destination—where climate adaptation meets AI-augmented service excellence.",
    "report_type": "horizon-scan",
    "status": "published",
    "featured": True,
    "target_year": 2064,
    "region": "Goa, India",
    "industry": "Hospitality",
    "image_url": "/images/goa-report.jpg",
    
    "cover": {
        "reportMeta": "Strategic Foresight Report · December 2024",
        "title": "The <em>Goa</em> Hospitality Workforce of <em>2064</em>",
        "subtitle": "A forty-year projection of workforce transformation in India's premier coastal tourism destination—where climate adaptation meets AI-augmented service excellence.",
        "stats": [
            {"value": "10", "label": "Future Roles Analyzed"},
            {"value": "0.47", "label": "Sector RPI Score"},
            {"value": "+23%", "label": "Net Employment Change"},
            {"value": "2064", "label": "Target Year"}
        ]
    },
    
    "nav_links": [
        {"id": "executive", "label": "Executive Summary"},
        {"id": "prologue", "label": "2064 Prologue"},
        {"id": "methodology", "label": "Methodology"},
        {"id": "roles", "label": "Future Roles"},
        {"id": "charts", "label": "Analytics"},
        {"id": "scenarios", "label": "Scenarios"},
        {"id": "implications", "label": "Implications"}
    ],
    
    "executive_summary": {
        "paragraphs": [
            "<strong>The most striking finding:</strong> By 2064, Goa's hospitality workforce will have fundamentally inverted its skill pyramid. Today's dominant roles—room attendants, front desk agents, and food service workers—will represent less than 15% of total employment, while entirely new categories of work centered on climate resilience, cultural authentication, and human-AI orchestration will account for over 60% of positions.",
            "Our analysis projects a <strong>net positive employment trajectory of +23%</strong> despite an aggregate sector RPI (Replaceability Potential Index) of 0.47—indicating significant transformation. This counterintuitive finding emerges from Goa's unique positioning: as global beach destinations contract under climate pressure, Goa's early investment in adaptive infrastructure and its irreplaceable cultural heritage create employment categories that cannot be automated or relocated.",
            "The transformation will unfold across three distinct phases: <em>Augmentation</em> (2025-2040), where AI tools enhance existing roles; <em>Restructuring</em> (2040-2055), where new role categories emerge while traditional positions contract; and <em>Equilibrium</em> (2055-2064), where the human-AI service model stabilizes around premium, high-touch experiences that command global premiums."
        ],
        "cards": [
            {
                "title": "Total Workforce Impact",
                "value": "+23%",
                "change": "▲ Net Job Creation",
                "changeClass": "positive",
                "desc": "From ~180,000 direct hospitality workers today to ~221,000 by 2064."
            },
            {
                "title": "Sector RPI Score",
                "value": "0.47",
                "change": "Significant Transformation",
                "changeClass": "negative",
                "desc": "Substantial role restructuring while preserving employment through value elevation."
            },
            {
                "title": "Peak Transformation",
                "value": "2048",
                "change": "◆ Critical Inflection",
                "changeClass": "",
                "desc": "The year when new role creation will overtake traditional role displacement."
            }
        ]
    },
    
    "prologue": """<p>Priya Naik wakes at 5:47 AM to the soft amber glow of her heritage cottage in Candolim. The AI-managed climate system has already adjusted to the pre-monsoon humidity—a season that now arrives in late March rather than June, one of the many adaptations Goa has made since the great thermal shift of the 2040s. Through her window, she can see the rehabilitated coastline: the floating barrier reefs that replaced the eroded beaches of her grandmother's stories, now home to bioluminescent coral gardens that draw visitors from across the planet.</p>
<p>She holds the title of <em>Cultural Authenticity Director</em> at the Mandovi Heritage Collective—a consortium of twelve properties that merged their operations during the consolidation of 2051. Her role didn't exist when she completed her hospitality degree in 2038. Today, she's the custodian of something far more valuable: the verification that experiences are genuinely Goan.</p>
<p>By 6:30, Priya is reviewing the day's <em>authenticity queue</em>—flagged interactions where the property's ambient AI detected guests seeking deeper cultural connection. A retired professor from São Paulo wants to understand the <em>kalamel</em> fishing technique his great-grandmother described. A young couple from Seoul has asked about the significance of the <em>mando</em> songs. Each of these moments represents the economic engine of 2064 hospitality: the premium that guests pay for verified human connection to place, history, and craft.</p>
<p>At midday, she conducts what her job description calls a <em>heritage immersion session</em>—though her grandmother would have called it lunch with strangers. She sits with six guests in the property's restored Portuguese-era kitchen, where actual fire heats actual clay pots, and she teaches them to make <em>sorpotel</em> the way her family has for generations. The robots could prepare the dish more efficiently. But the experience economy of 2064 has proven that guests will pay 300% premiums for inefficiency—because that imperfection is the signature of human craft.</p>
<p>As evening falls over the rebuilt waterfront, Priya reviews her impact metrics. Not efficiency scores—those are handled entirely by systems now—but the measures that matter in 2064: emotional resonance ratings, cultural transmission depth, guest transformation indices. Walking home along the elevated coastal pathway—the old beach road now lies three meters underwater at high tide—she passes junior staff learning the evening <em>aarti</em> ceremony from an elder. This is the Goa of 2064: where the displacement of routine labor has created space for the elevation of meaning.</p>""",
    
    "methodology": {
        "sources": [
            "World Travel & Tourism Council Employment Projections 2024-2035",
            "India Tourism Statistics 2023, Ministry of Tourism",
            "Goa State Action Plan on Climate Change (SAPCC)",
            "National Centre for Coastal Research Erosion Studies",
            "American Hotel & Lodging Association Workforce Reports 2024",
            "Hospitality Robots Market Analysis (Mordor Intelligence)",
            "BLS Occupational Outlook Handbook—Lodging Managers",
            "ScienceDirect: AI Adoption in Hospitality Research"
        ],
        "assumptions": [
            {"label": "Climate:", "text": "40% of Goa's low-lying areas impacted by 2050; adaptive infrastructure by 2030"},
            {"label": "Technology:", "text": "Hospitality robotics CAGR 17-25% through 2040; AI-human models mature by 2045"},
            {"label": "Regulation:", "text": "Cultural authenticity frameworks by 2035; human-interaction minimums by 2040"},
            {"label": "Economics:", "text": "India remains top-5 tourism destination; Goa's premium positioning strengthens"},
            {"label": "Demographics:", "text": "Hospitality training capacity doubles by 2040"}
        ],
        "rpiFramework": "The Replaceability Potential Index decomposes roles into tasks, scored across: <strong>APS</strong> (Automation Probability Score, 0-1), <strong>W</strong> (Weight/time proportion), <strong>HRF</strong> (Human Resilience Factor, 0-1). Task score: HRA_t = APS × W × (1-HRF). Role RPI = Σ HRA_t"
    },
    
    "roles": [
        {
            "role_number": "01",
            "title": "Cultural Authenticity Director",
            "emergence_period": "2035-2045",
            "origin": "From: Guest Relations + Cultural Guide",
            "confidence": "High Confidence",
            "narrative": "Certifies that guest interactions, culinary offerings, and cultural programs connect authentically to Goan heritage. They're the human guarantee that what guests experience is real—not algorithmically optimized entertainment.",
            "rpi_score": 0.032,
            "tasks": [
                {"task": "Heritage program design", "aps": 0.35, "w": 0.25, "hrf": 0.85, "hrat": 0.013},
                {"task": "Authenticity verification", "aps": 0.20, "w": 0.20, "hrf": 0.90, "hrat": 0.004},
                {"task": "Community artisan relationships", "aps": 0.15, "w": 0.20, "hrf": 0.95, "hrat": 0.002},
                {"task": "Guest cultural exchange", "aps": 0.10, "w": 0.25, "hrf": 0.95, "hrat": 0.001},
                {"task": "Staff cultural training", "aps": 0.40, "w": 0.10, "hrf": 0.70, "hrat": 0.012}
            ],
            "gauge_info": {"title": "Human-Resilient (0.03)", "description": "Pinnacle of automation-proof work. Authenticating human connection to culture is precisely what AI cannot replicate."},
            "causal_chain": ["AI Content Saturation", "Authenticity Premium", "Cultural Authenticity Director"]
        },
        {
            "role_number": "02",
            "title": "Coastal Resilience Engineer",
            "emergence_period": "2030-2040",
            "origin": "From: Facilities + Marine Engineer",
            "confidence": "High Confidence",
            "narrative": "Manages adaptive systems—floating platforms, dynamic seawalls, desalination networks—bridging engineering with generational knowledge of local fishing communities.",
            "rpi_score": 0.202,
            "tasks": [
                {"task": "Infrastructure monitoring", "aps": 0.75, "w": 0.25, "hrf": 0.40, "hrat": 0.113},
                {"task": "Emergency response", "aps": 0.30, "w": 0.15, "hrf": 0.80, "hrat": 0.009},
                {"task": "Traditional knowledge integration", "aps": 0.10, "w": 0.20, "hrf": 0.95, "hrat": 0.001},
                {"task": "Climate adaptation planning", "aps": 0.45, "w": 0.25, "hrf": 0.60, "hrat": 0.045},
                {"task": "Guest safety communication", "aps": 0.50, "w": 0.15, "hrf": 0.55, "hrat": 0.034}
            ],
            "gauge_info": {"title": "Human-Resilient (0.20)", "description": "Traditional knowledge and emergency judgment keep this role firmly in human territory."}
        },
        {
            "role_number": "03",
            "title": "AI-Human Experience Orchestrator",
            "emergence_period": "2040-2050",
            "origin": "From: Operations Manager",
            "confidence": "Moderate",
            "narrative": "When AI handles 70% of routine tasks, someone must choreograph the 30% where human presence creates value. Part conductor, part therapist, ensuring human touchpoints feel organic.",
            "rpi_score": 0.150,
            "tasks": [
                {"task": "Human deployment decisions", "aps": 0.55, "w": 0.30, "hrf": 0.65, "hrat": 0.058},
                {"task": "AI quality oversight", "aps": 0.60, "w": 0.20, "hrf": 0.50, "hrat": 0.060},
                {"task": "Staff emotional coaching", "aps": 0.25, "w": 0.20, "hrf": 0.85, "hrat": 0.008},
                {"task": "Guest journey design", "aps": 0.40, "w": 0.15, "hrf": 0.75, "hrat": 0.015},
                {"task": "Human-AI friction resolution", "aps": 0.30, "w": 0.15, "hrf": 0.80, "hrat": 0.009}
            ]
        },
        {
            "role_number": "04",
            "title": "Wellness Integration Therapist",
            "emergence_period": "2030-2040",
            "origin": "From: Spa Therapist + Wellness Coach",
            "confidence": "High",
            "narrative": "Integrates Ayurvedic protocols with AI-driven biometric monitoring. The irreplaceable human elements—touch, presence, sacred space—anchor this role despite automation in diagnostics.",
            "rpi_score": 0.125
        },
        {
            "role_number": "05",
            "title": "Regenerative Tourism Architect",
            "emergence_period": "2035-2045",
            "origin": "From: Sustainability Manager + Tourism Planner",
            "confidence": "Moderate",
            "narrative": "Designs hospitality that restores ecosystems and revitalizes communities. In Goa, reversing coastal degradation while creating premium experiences from the restoration process itself.",
            "rpi_score": 0.142
        },
        {
            "role_number": "06",
            "title": "Culinary Heritage Curator",
            "emergence_period": "2030-2040",
            "origin": "From: Executive Chef + Food Historian",
            "confidence": "High",
            "narrative": "When molecular printers can replicate any flavor, what remains? The story, the technique, the human hand. Transforms meals into cultural transmission events.",
            "rpi_score": 0.065
        },
        {
            "role_number": "07",
            "title": "Biometric Experience Analyst",
            "emergence_period": "2040-2055",
            "origin": "From: Data Analyst + Guest Services",
            "confidence": "Moderate",
            "narrative": "Interprets real-time guest emotional and physiological data to anticipate needs before guests articulate them. Bridges data science with hospitality intuition.",
            "rpi_score": 0.385
        },
        {
            "role_number": "08",
            "title": "Historical Reconciliation Specialist",
            "emergence_period": "2040-2055",
            "origin": "From: Tour Guide + Historian",
            "confidence": "Speculative",
            "narrative": "Heritage tourism in post-colonial destinations requires handling wounds, not just wonders. Facilitates emotionally complex encounters with layered histories.",
            "rpi_score": 0.088
        },
        {
            "role_number": "09",
            "title": "Autonomous Fleet Coordinator",
            "emergence_period": "2045-2055",
            "origin": "From: Housekeeping Manager + IT Operations",
            "confidence": "Moderate",
            "narrative": "Manages robotic housekeeping, delivery, and service fleets. Handles exceptions, guest preferences for human intervention, and system optimization.",
            "rpi_score": 0.520
        },
        {
            "role_number": "10",
            "title": "Longevity Concierge",
            "emergence_period": "2050-2060",
            "origin": "From: Personal Butler + Healthcare Coordinator",
            "confidence": "Speculative",
            "narrative": "As extended healthy lifespan becomes a tourism category, coordinates medical, wellness, and lifestyle services for guests on multi-month rejuvenation stays.",
            "rpi_score": 0.175
        }
    ],
    
    "charts": {
        "rpi_radar": {
            "labels": ["Cultural Authenticity", "Coastal Resilience", "AI-Human Orchestrator", "Wellness Integration", "Regenerative Tourism", "Culinary Heritage", "Biometric Analyst", "Historical Reconciliation", "Fleet Coordinator", "Longevity Concierge"],
            "data": [0.032, 0.202, 0.150, 0.125, 0.142, 0.065, 0.385, 0.088, 0.520, 0.175]
        },
        "composition_chart": {
            "labels": ["Operations", "F&B Service", "Experience Design", "Climate/Infrastructure", "Cultural/Heritage", "Technology", "Wellness", "Management"],
            "data_2024": [45, 30, 3, 2, 5, 3, 5, 7],
            "data_2064": [15, 10, 20, 18, 15, 8, 7, 7]
        },
        "timeline_chart": {
            "high_confidence": [
                {"x": 2035, "y": 0.032, "r": 15},
                {"x": 2032, "y": 0.202, "r": 12},
                {"x": 2033, "y": 0.125, "r": 14},
                {"x": 2035, "y": 0.065, "r": 16}
            ],
            "moderate_confidence": [
                {"x": 2045, "y": 0.150, "r": 13},
                {"x": 2040, "y": 0.142, "r": 12},
                {"x": 2047, "y": 0.385, "r": 10},
                {"x": 2050, "y": 0.520, "r": 11}
            ],
            "speculative": [
                {"x": 2048, "y": 0.088, "r": 9},
                {"x": 2055, "y": 0.175, "r": 10}
            ]
        }
    },
    
    "scenarios": [
        {
            "type": "acceleration",
            "title": "Acceleration",
            "description": "AI adoption exceeds projections. Hospitality robotics penetration reaches 60% by 2045. Climate infrastructure investment accelerates globally.",
            "outcome": "Peak transformation occurs by 2042. Net employment +31% as Goa captures premium experience market share from degrading competitors.",
            "indicators": {
                "title": "Early Indicators",
                "text": "Major hotel chains announce robot-first properties by 2028; India climate adaptation funding doubles by 2030."
            }
        },
        {
            "type": "baseline",
            "title": "Baseline",
            "description": "Current trajectory continues. Robotics CAGR 17-25%. Climate adaptation proceeds as planned. Authenticity regulations emerge mid-2030s.",
            "outcome": "Peak transformation in 2048. Net employment +23%. Goa establishes itself as the definitive cultural hospitality destination.",
            "indicators": {
                "title": "Tracking Metrics",
                "text": "Monitor hospitality tech CapEx, tourism minister policy statements, WTTC employment reports."
            }
        },
        {
            "type": "disruption",
            "title": "Disruption",
            "description": "Economic downturn slows technology investment. Climate events exceed projections, forcing reactive rather than proactive adaptation.",
            "outcome": "Transformation delayed to 2055+. Temporary employment decline of -8% before recovery. Higher displacement friction.",
            "indicators": {
                "title": "Warning Signs",
                "text": "Hotel tech investment flat for 3+ years; major coastal property closures; skill gap widening."
            }
        }
    ],
    
    "implications": {
        "policymakers": [
            {"title": "Establish Cultural Authenticity Certification Framework", "description": "Create regulatory standards for heritage experience verification, preventing AI-generated cultural misrepresentation while enabling premium pricing for certified human-delivered experiences."},
            {"title": "Invest in Climate-Adaptive Hospitality Infrastructure", "description": "Allocate ₹5,000 crore over 15 years for floating platforms, dynamic coastal defenses, and resilient utility systems that enable continued tourism operations."},
            {"title": "Transform Hospitality Education Curriculum", "description": "Partner with hospitality institutes to introduce AI orchestration, climate resilience, and cultural curation tracks by 2028."}
        ],
        "industry_leaders": [
            {"title": "Begin Human-AI Orchestration Pilots Now", "description": "Deploy controlled experiments combining robotic service delivery with human touchpoint optimization. Build institutional knowledge before competitors."},
            {"title": "Secure Cultural Heritage Partnerships", "description": "Establish long-term relationships with local artisan communities, traditional practitioners, and cultural institutions before authenticity becomes a competitive bottleneck."},
            {"title": "Develop Climate Resilience as a Guest Experience", "description": "Position adaptive infrastructure not as a defensive necessity but as a premium attraction—guests participating in regenerative tourism."}
        ],
        "individuals": [
            {"title": "Cultivate Irreplaceable Human Skills", "description": "Invest in cultural fluency, emotional intelligence, and traditional craft knowledge. These appreciate in value as routine tasks automate."},
            {"title": "Build AI-Collaboration Competencies", "description": "Learn to work alongside AI systems—monitoring, directing, and enhancing their outputs rather than competing with them."},
            {"title": "Document and Preserve Heritage Knowledge", "description": "Become a bridge between generations. Those who can transmit authentic cultural knowledge will command premium positions."}
        ]
    },
    
    "cta": {
        "title": "Unlock the Full Report",
        "subtitle": "This executive briefing represents 20% of our complete analysis. Access detailed methodology, extended role profiles, and bespoke scenario modeling.",
        "primaryButton": "Purchase Full Report",
        "secondaryButton": "Request Bespoke Analysis"
    },
    
    "created_at": datetime.utcnow(),
    "updated_at": datetime.utcnow(),
    "published_at": datetime.utcnow()
}


async def seed_report():
    """Insert the Goa report into the database."""
    mongodb_url = os.getenv("MONGODB_URL")
    if not mongodb_url:
        print("Error: MONGODB_URL not found in environment variables")
        return False
    
    try:
        client = AsyncIOMotorClient(mongodb_url)
        db = client.replaceable
        
        # Check if report already exists
        existing = await db.reports.find_one({"slug": GOA_REPORT_DATA["slug"]})
        if existing:
            print(f"Report '{GOA_REPORT_DATA['slug']}' already exists. Updating...")
            result = await db.reports.replace_one(
                {"slug": GOA_REPORT_DATA["slug"]},
                GOA_REPORT_DATA
            )
            print(f"Report updated successfully!")
        else:
            result = await db.reports.insert_one(GOA_REPORT_DATA)
            print(f"Report inserted with ID: {result.inserted_id}")
        
        # Verify the report
        report = await db.reports.find_one({"slug": GOA_REPORT_DATA["slug"]})
        print(f"\nVerification:")
        print(f"  - Title: {report['title']}")
        print(f"  - Status: {report['status']}")
        print(f"  - Roles: {len(report['roles'])}")
        print(f"  - Scenarios: {len(report['scenarios'])}")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"Error seeding report: {e}")
        return False


if __name__ == "__main__":
    asyncio.run(seed_report())
