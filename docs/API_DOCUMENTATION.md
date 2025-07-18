# AuraColor API Documentation

## Overview

The AuraColor API is built using Next.js API Routes with a RESTful architecture. All endpoints return standardized JSON responses.

## Base URL

```
https://[your-domain]/api
```

For local development:
```
http://localhost:3000/api
```

## Authentication

Most API endpoints require authentication. Include the authentication token in the request header:

```
Authorization: Bearer [token]
```

## Standard Response Format

All API responses follow this standard format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    // Optional metadata (pagination, etc.)
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Optional additional error details
    }
  }
}
```

## API Endpoints

### Services

#### GET /api/services

Returns a list of all available services.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "12-Season Color Analysis",
      "price": 75,
      "description": "Personal color season identification with comprehensive palette"
    },
    // More services...
  ]
}
```

#### GET /api/services?id=[id]

Returns a specific service by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "12-Season Color Analysis",
    "price": 75,
    "description": "Personal color season identification with comprehensive palette"
  }
}
```

## Error Codes

- `BAD_REQUEST`: Invalid request parameters
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Request validation failed
- `SERVER_ERROR`: Internal server error