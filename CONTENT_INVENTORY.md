# Content Inventory - Artist Portfolio

## 📄 **Questionnaire Page** (`/questionnaire`)

### Headers
- **H1**: "Style Questionnaire"
- **H2**: Dynamic question titles:
  - "What is your skin tone?"
  - "What is your natural hair color?"
  - "What is your eye color?"
  - "What is your preferred style?"
  - "Upload Your Photos"
  - "Get Your Free Mini Analysis"

### Text Content
- **Progress Counter**: "{currentStep + 1} of {questions.length}"
- **Photo Upload Description**: "Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veins"
- **File Format**: "JPG, PNG up to 10MB each"
- **Privacy Message**: "Your photos are secure and private"
- **Newsletter Description**: "Subscribe to receive your AI color analysis results and styling tips"
- **Checkbox Text**: "I agree to receive styling tips and color analysis updates"
- **Button Labels**: "Previous", "Next", "Submit"

### Question Options
**Skin Tone Options:**
- Very fair with pink undertones
- Fair with neutral undertones
- Medium with warm undertones
- Medium with cool undertones
- Deep with warm undertones
- Deep with cool undertones

**Hair Color Options:**
- Platinum blonde
- Golden blonde
- Light brown
- Medium brown
- Dark brown
- Black
- Red/Auburn
- Gray/Silver

**Eye Color Options:**
- Blue
- Green
- Brown
- Hazel
- Gray
- Amber

**Style Preference Options:**
- Classic and timeless
- Modern and trendy
- Bohemian and relaxed
- Professional and polished
- Edgy and bold
- Romantic and feminine

### Icons/Images
- **Upload Icon**: SVG cloud upload icon
- **Security Icon**: SVG lock icon
- **Progress Bar**: Gradient visual indicator

---

## 📄 **Results Page** (After Submission)

### Headers
- **H1**: "Your Mini Color Analysis"
- **H3**: "Your Top Colors"
- **H3**: "Want Your Complete Analysis?"

### Text Content
- **Season Display**: Dynamic result (e.g., "Spring", "Winter")
- **Confidence**: "Confidence: {percentage}%"
- **Description**: Dynamic analysis description
- **Upsell Text**: "Get your full 30+ color palette, styling guide, and personalized recommendations"
- **Button Labels**: "View Services", "Book Consultation"

### Visual Elements
- **Color Swatches**: Dynamic color circles with hex values
- **Glass Panel**: Semi-transparent background containers

---

## 📄 **Main Pages** (Other Files)

### Home Page (`/`)
- **H1**: "Discover Your Perfect Colors"
- **H2**: "Professional Color Analysis"
- **CTA Button**: "✨ Discover Your Color Story FREE"

### Services Page (`/services`)
- **H1**: "Our Services"
- **Service Cards**: 
  - "12-Season Color Analysis" - $149
  - "Virtual Wardrobe Curation" - $299
  - "Personal Shopping Service" - $399

### Navigation
- **Logo/Brand**: "Aura Color"
- **Nav Links**: Home, Services, About, Contact
- **Language Selector**: English (with dropdown)
- **Theme Toggle**: Sun/Moon icons

---

## 🎨 **Visual Elements to Customize**

### Colors
- **Primary**: Champagne/Gold theme (#F7E7CE)
- **Secondary**: Deep champagne (#E6C7A6)
- **Accent**: Light champagne (#FFF5E1)
- **Background**: Black/White (theme dependent)

### Typography
- **Font Family**: Inter, Century Gothic
- **Headings**: Light weight (300)
- **Body**: Regular weight (400)

### Components
- **Glass Panels**: Semi-transparent backgrounds
- **Buttons**: Gradient champagne styling
- **Progress Bars**: Animated gradients
- **Form Inputs**: Glass panel styling

---

## 📝 **Content Modification Priority**

### High Priority (User-Facing)
1. Question titles and options
2. Button labels
3. Privacy/security messages
4. Results page content

### Medium Priority (Branding)
1. Page titles
2. Navigation labels
3. Service descriptions
4. CTA text

### Low Priority (Technical)
1. Alt text for images
2. Placeholder text
3. Error messages
4. Loading states

---

## 🔧 **Files to Edit**

- **Main Content**: `/app/questionnaire/page.tsx`
- **Navigation**: `/app/components/navbar.tsx`
- **Services**: `/app/services/page.tsx`
- **Home**: `/app/page.tsx`
- **Styling**: `/styles/globals.css`