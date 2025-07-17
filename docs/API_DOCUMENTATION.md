# AuraColour API Documentation

This document provides comprehensive information about the AuraColour platform's API endpoints, their functionality, request/response formats, and usage examples.

## Base URL

All API endpoints are relative to:

```
https://[your-domain]/api
```

## Authentication

Most API endpoints require authentication. Include the authentication token in the request headers:

```
Authorization: Bearer [your-token]
```

## API Endpoints

### Color Analysis

#### 1. 12-Season Analysis

**Endpoint:** `/12-season-analysis`  
**Method:** `POST`  
**Description:** Analyzes uploaded photos to determine the user's color season based on the 12-season color analysis system.

**Request Body:**
```json
{
  "imageUrls": ["https://..."],
  "userId": "user-uuid",
  "questionnaire": {
    "skinTone": "fair",
    "hairColor": "blonde",
    "eyeColor": "blue"
  }
}
```

**Response:**
```json
{
  "season": "Spring",
  "confidence": 0.85,
  "undertone": "warm",
  "colorPalette": ["#color1", "#color2"],
  "analysisId": "analysis-uuid"
}
```

#### 2. AI Compare

**Endpoint:** `/ai-compare`  
**Method:** `POST`  
**Description:** Compares multiple color analysis results using AI to determine the most accurate season.

**Request Body:**
```json
{
  "analysisIds": ["id1", "id2"],
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "recommendedSeason": "Winter",
  "confidence": 0.92,
  "comparisonResults": {
    "id1": { "season": "Winter", "confidence": 0.85 },
    "id2": { "season": "Winter", "confidence": 0.78 }
  }
}
```

#### 3. Generate Analysis

**Endpoint:** `/generate-analysis`  
**Method:** `POST`  
**Description:** Generates a comprehensive color analysis report based on submitted photos and questionnaire data.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "imageUrls": ["https://..."],
  "questionnaireId": "questionnaire-uuid"
}
```

**Response:**
```json
{
  "reportId": "report-uuid",
  "status": "processing",
  "estimatedCompletionTime": "2023-07-17T15:30:00Z"
}
```

### Bookings & Appointments

#### 1. Bookings

**Endpoint:** `/bookings`  
**Method:** `POST`  
**Description:** Creates a new booking for a color analysis session.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "serviceId": "service-uuid",
  "date": "2023-07-20",
  "time": "14:00",
  "notes": "Virtual session preferred"
}
```

**Response:**
```json
{
  "bookingId": "booking-uuid",
  "status": "confirmed",
  "paymentRequired": true,
  "paymentUrl": "https://..."
}
```

**Method:** `GET`  
**Description:** Retrieves all bookings for a user.

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking-uuid",
      "serviceId": "service-uuid",
      "serviceName": "Virtual Color Analysis",
      "date": "2023-07-20",
      "time": "14:00",
      "status": "confirmed"
    }
  ]
}
```

### Contact & Feedback

#### 1. Contact

**Endpoint:** `/contact`  
**Method:** `POST`  
**Description:** Submits a contact form.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Booking Question",
  "message": "I'd like to know more about your services."
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "msg-uuid"
}
```

#### 2. Feedback

**Endpoint:** `/feedback`  
**Method:** `POST`  
**Description:** Submits user feedback about a color analysis or service.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "serviceId": "service-uuid",
  "rating": 5,
  "comments": "Excellent service, very insightful analysis."
}
```

**Response:**
```json
{
  "success": true,
  "feedbackId": "feedback-uuid"
}
```

### Payments

#### 1. Create Payment

**Endpoint:** `/create-payment`  
**Method:** `POST`  
**Description:** Creates a payment intent for Stripe integration.

**Request Body:**
```json
{
  "amount": 9900,
  "currency": "gbp",
  "description": "Color Analysis Session",
  "customerId": "customer-uuid"
}
```

**Response:**
```json
{
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

#### 2. Stripe Webhook

**Endpoint:** `/webhooks/stripe`  
**Method:** `POST`  
**Description:** Handles Stripe webhook events for payment processing.

**Request Body:** Stripe event object

**Response:**
```json
{
  "received": true
}
```

### Reports

#### 1. Get Reports

**Endpoint:** `/reports`  
**Method:** `GET`  
**Description:** Retrieves all reports for a user.

**Response:**
```json
{
  "reports": [
    {
      "id": "report-uuid",
      "title": "Color Analysis Report",
      "createdAt": "2023-07-15T10:30:00Z",
      "status": "completed"
    }
  ]
}
```

#### 2. Get Report by ID

**Endpoint:** `/reports/[id]`  
**Method:** `GET`  
**Description:** Retrieves a specific report by ID.

**Response:**
```json
{
  "id": "report-uuid",
  "title": "Color Analysis Report",
  "createdAt": "2023-07-15T10:30:00Z",
  "content": {
    "season": "Winter",
    "palette": ["#color1", "#color2"],
    "recommendations": [...]
  }
}
```

#### 3. Send Report

**Endpoint:** `/reports/[id]/send`  
**Method:** `POST`  
**Description:** Sends a report to the user's email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "includeAttachments": true
}
```

**Response:**
```json
{
  "success": true,
  "sentTo": "user@example.com"
}
```

### Questionnaire

**Endpoint:** `/questionnaire`  
**Method:** `POST`  
**Description:** Submits a color analysis questionnaire.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "answers": {
    "skinTone": "medium",
    "hairColor": "brown",
    "eyeColor": "green",
    "veins": "blue",
    "jewelry": "silver",
    "sunburn": "rarely"
  }
}
```

**Response:**
```json
{
  "success": true,
  "questionnaireId": "questionnaire-uuid",
  "nextStep": "upload-photos"
}
```

### File Upload

**Endpoint:** `/upload`  
**Method:** `POST`  
**Description:** Uploads files (images) for color analysis.

**Request Body:** FormData with files

**Response:**
```json
{
  "success": true,
  "fileUrls": ["https://..."],
  "nextStep": "analysis"
}
```

### Gift Vouchers

#### 1. Create Voucher

**Endpoint:** `/gift-vouchers`  
**Method:** `POST`  
**Description:** Creates a new gift voucher.

**Request Body:**
```json
{
  "amount": 100,
  "recipientEmail": "friend@example.com",
  "senderName": "Jane Doe",
  "message": "Happy Birthday!"
}
```

**Response:**
```json
{
  "voucherId": "voucher-uuid",
  "code": "GIFT-123456",
  "expiryDate": "2024-07-17"
}
```

#### 2. Redeem Voucher

**Endpoint:** `/voucher-redeem`  
**Method:** `POST`  
**Description:** Redeems a gift voucher.

**Request Body:**
```json
{
  "code": "GIFT-123456",
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "amount": 100,
  "appliedToAccount": true
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": true,
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common error codes:
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `VALIDATION_ERROR`: Invalid request parameters
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `PAYMENT_ERROR`: Payment processing failed
- `SERVER_ERROR`: Internal server error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address. When exceeded, the API will return a 429 Too Many Requests response.

## Versioning

The current API version is v1. All endpoints are prefixed with `/api`.

Future API versions will be accessible via `/api/v2/`, etc.