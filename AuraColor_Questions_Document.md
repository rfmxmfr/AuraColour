# AuraColor App - Complete Questions Documentation

## Overview
This document contains all questions and form fields used in the AuraColor application for color analysis and customer interaction.

---

## 1. Style Questionnaire (Main Color Analysis)
**Location:** `/questionnaire` page  
**Purpose:** Determine customer's color season and style preferences  
**Total Questions:** 6

### Question 1: Skin Tone Analysis
**Question:** "What is your skin tone?"  
**Type:** Multiple Choice (Radio)  
**Options:**
- Very fair with pink undertones
- Fair with neutral undertones
- Medium with warm undertones
- Medium with cool undertones
- Deep with warm undertones
- Deep with cool undertones

### Question 2: Hair Color Assessment
**Question:** "What is your natural hair color?"  
**Type:** Multiple Choice (Radio)  
**Options:**
- Platinum blonde
- Golden blonde
- Light brown
- Medium brown
- Dark brown
- Black
- Red/Auburn
- Gray/Silver

### Question 3: Eye Color Identification
**Question:** "What is your eye color?"  
**Type:** Multiple Choice (Radio)  
**Options:**
- Blue
- Green
- Brown
- Hazel
- Gray
- Amber

### Question 4: Style Preference
**Question:** "What is your preferred style?"  
**Type:** Multiple Choice (Radio)  
**Options:**
- Classic and timeless
- Modern and trendy
- Bohemian and relaxed
- Professional and polished
- Edgy and bold
- Romantic and feminine

### Question 5: Photo Upload
**Question:** "Upload Your Photos"  
**Type:** File Upload  
**Description:** "Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veins"  
**Requirements:**
- 3 photos required
- JPG, PNG formats accepted
- Up to 10MB each
- Security note: "Your photos are secure and private"

### Question 6: Email Subscription
**Question:** "Get Your Free Mini Analysis"  
**Type:** Email Input + Checkbox  
**Description:** "Subscribe to receive your AI color analysis results and styling tips"  
**Fields:**
- Email address (required)
- Checkbox: "I agree to receive styling tips and color analysis updates" (required)

---

## 2. Contact Form
**Location:** `/contact` page  
**Purpose:** Customer inquiries and service requests  
**Total Fields:** 4

### Field 1: Personal Information
**Label:** "Full Name"  
**Type:** Text Input  
**Placeholder:** "Your full name"  
**Required:** Yes

### Field 2: Contact Information
**Label:** "Email Address"  
**Type:** Email Input  
**Placeholder:** "your.email@example.com"  
**Required:** Yes

### Field 3: Inquiry Type
**Label:** "Subject"  
**Type:** Dropdown Select  
**Options:**
- Select a subject (default)
- Color Analysis Consultation
- Style Consultation
- Virtual Wardrobe Service
- Personal Shopping
- General Inquiry
**Required:** Yes

### Field 4: Message Details
**Label:** "Message"  
**Type:** Textarea (5 rows)  
**Placeholder:** "Tell us about your style goals and how we can help..."  
**Required:** Yes

---

## 3. Admin Login Form
**Location:** `/login` page  
**Purpose:** Admin authentication  
**Total Fields:** 2

### Field 1: Admin Email
**Label:** "Email"  
**Type:** Email Input  
**Placeholder:** "admin@test.com"  
**Required:** Yes

### Field 2: Admin Password
**Label:** "Password"  
**Type:** Password Input  
**Placeholder:** "Enter password"  
**Required:** Yes

**Demo Credentials Provided:**
- Email: admin@test.com
- Password: admin123

---

## 4. Analysis Results Display
**Location:** Questionnaire results page  
**Purpose:** Show color analysis results  

### Results Components:
1. **Season Result:** Display determined color season (Spring/Summer/Autumn/Winter)
2. **Confidence Score:** Percentage confidence in analysis
3. **Description:** Detailed explanation of the color season
4. **Top Colors:** Visual display of 5 recommended colors with hex codes
5. **Call-to-Action:** Options to view services or book consultation

---

## 5. Business Information Display
**Location:** `/contact` page  
**Purpose:** Company contact details  

### Contact Information:
- **Email:** hello@auracolor.com
- **Phone:** +44 (0) 123 456 7890
- **Location:** Glasgow, Scotland

### Business Hours:
- **Monday - Friday:** 9:00 AM - 6:00 PM
- **Saturday:** 10:00 AM - 4:00 PM
- **Sunday:** Closed
- **Response Time:** Within 24 hours guaranteed

---

## 6. Service Categories
**Location:** `/services` page  
**Purpose:** Service selection and booking  

### Available Services:
1. **12-Season Color Analysis** - £75
2. **Virtual Wardrobe Curation** - £100
3. **Personal Shopping Service** - £150
4. **Style Evolution Coaching** - £300
5. **Gift Vouchers** - £75

---

## Technical Implementation Notes

### Form Validation:
- All required fields must be completed before submission
- Email fields validate proper email format
- File uploads limited to image formats and size restrictions
- Progress tracking shows completion percentage

### Data Processing:
- Questionnaire answers processed through rule-based algorithm
- Results stored in database with session tracking
- Email notifications sent to both customer and admin
- Admin dashboard displays all submissions

### Security Features:
- File upload security with type and size validation
- Row Level Security (RLS) on database tables
- Admin authentication required for protected routes
- HTTPS encryption for all data transmission

---

## Question Flow Logic

### Questionnaire Progression:
1. **Linear Flow:** Questions presented one at a time
2. **Progress Indicator:** Visual progress bar showing completion
3. **Navigation:** Previous/Next buttons with validation
4. **Final Submission:** Analysis processing with loading state
5. **Results Display:** Immediate feedback with recommendations

### Contact Form Processing:
1. **Form Validation:** Real-time field validation
2. **Submission:** AJAX post to API endpoint
3. **Confirmation:** Success/error message display
4. **Notifications:** Email sent to customer and admin
5. **Database Storage:** All submissions logged for admin review

---

*Document Generated: $(date)*  
*Application: AuraColor - Color Analysis Platform*  
*Version: 1.0.0*