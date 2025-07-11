# Style & Fashion Platform

A comprehensive style and fashion platform built with Next.js, featuring AI-powered color analysis, personal shopping, and expert styling coaching.

## Architecture

```
+---------------------+
|     Client Layer    |
| (Mobile/Web Apps)   |
+----------+----------+
           |
+----------v----------+
|    API Gateway      |
| (Authentication,    |
|  Request Routing)   |
+----------+----------+
           |
+----------v----------+
|  Microservices Layer|
+---------------------+
| 1. Color Analysis   |    +----------------+
|    - AI Processing  <----+ Cloud Storage  |
|    - Season Detection|   | (User Photos)  |
+---------------------+    +----------------+
| 2. Personal Shopper |    +----------------+
|    - Product Catalog<----+ E-commerce APIs|
|    - Cart/Checkout  |   | (Payment Gateways)|
+---------------------+    +----------------+
| 3. Stylist Coaching |    +----------------+
|    - Appointment Mgmt<---+ Calendar Sync  |
|    - Video Consult  |   | (WebRTC)       |
+---------------------+    +----------------+
           |
+----------v----------+
|   Databases Layer   |
+---------------------+
| - User Profiles     |
| - Virtual Wardrobe  |
| - Order History     |
| - Style Preferences |
+---------------------+
```

## Features

### 🎨 Color Analysis
- AI-powered skin tone analysis
- Seasonal color palette recommendations
- Personalized color matching

### 🛍️ Personal Shopper
- Curated product recommendations
- Smart filtering by color season
- Integrated shopping cart and checkout

### 👗 Stylist Coaching
- Expert style consultations
- Video call appointments
- Personalized styling advice

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **API**: Next.js API Routes
- **Database**: TypeScript interfaces (ready for integration)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /api/auth` - Authentication
- `POST /api/color-analysis` - Image color analysis
- `GET/POST /api/personal-shopper` - Product catalog and checkout
- `POST /api/stylist-coaching` - Appointment booking and management

## Project Structure

```
├── app/
│   ├── api/                    # API Gateway & Microservices
│   │   ├── auth/
│   │   ├── color-analysis/
│   │   ├── personal-shopper/
│   │   └── stylist-coaching/
│   └── page.tsx               # Main application
├── components/
│   ├── client-layer/          # Client Layer Components
│   └── ui/                    # UI Components
├── lib/
│   ├── database/              # Database Schema
│   └── services/              # Service Layer
└── styles/
    └── globals.css            # Global Styles
```