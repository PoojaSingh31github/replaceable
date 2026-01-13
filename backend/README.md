# Replaceable.ai Backend API

FastAPI backend for the Replaceable.ai Horizon Scan Series platform.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

- Copy `.env` file and update the values
- Make sure MongoDB is running

4. Run the server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Default Admin Credentials

- Email: `admin@replaceable.ai`
- Password: `admin123`

**Important:** Change these in production!

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/register` - Register new admin user

### Reports (Admin)

- `GET /api/reports/` - Get all reports
- `GET /api/reports/{id}` - Get report by ID
- `POST /api/reports/` - Create new report
- `PUT /api/reports/{id}` - Update report
- `DELETE /api/reports/{id}` - Delete report
- `POST /api/reports/{id}/publish` - Publish report
- `POST /api/reports/{id}/unpublish` - Unpublish report

### Reports (Public)

- `GET /api/reports/public` - Get all published reports
- `GET /api/reports/public/{slug}` - Get published report by slug

### Consultations

- `POST /api/consultations/submit` - Submit consultation (public)
- `GET /api/consultations/` - Get all consultations (admin)
- `GET /api/consultations/{id}` - Get consultation by ID (admin)
- `PUT /api/consultations/{id}` - Update consultation (admin)
- `DELETE /api/consultations/{id}` - Delete consultation (admin)
- `PATCH /api/consultations/{id}/status` - Update status (admin)

### Admin

- `GET /api/admin/me` - Get current admin info
- `GET /api/admin/dashboard` - Get dashboard stats

## Sample API Requests

### Login

```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@replaceable.ai", "password": "admin123"}'
```

### Create Report (with token)

```bash
curl -X POST "http://localhost:8000/api/reports/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "slug": "goa-hospitality-2064",
    "title": "Goa Hospitality 2064",
    "subtitle": "A forty-year projection...",
    "report_type": "horizon-scan"
  }'
```
