# sangtildeg.no - Website

Personal remembrance songs for funerals and memorials by Thea & Mia.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
cd sangtildeg-website
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your keys:
# - Airtable API key and Base ID
# - Resend API key
# - Vipps payment link
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
sangtildeg-website/
├── app/
│   ├── [locale]/              # i18n routing (en/no)
│   │   ├── components/        # Page sections
│   │   ├── layout.tsx         # Root layout with fonts
│   │   └── page.tsx           # Homepage
│   ├── api/
│   │   └── submit-form/       # Form API route
│   └── globals.css            # Global styles
├── components/
│   ├── AudioPlayer.tsx        # Custom audio player
│   ├── LanguageSwitcher.tsx   # EN/NO toggle
│   └── Navigation.tsx         # Header navigation
├── lib/
│   ├── airtable.ts            # Airtable integration
│   ├── resend.ts              # Email notifications
│   ├── validations.ts         # Form validation (Zod)
│   └── utils.ts               # Utility functions
├── messages/
│   ├── en.json                # English translations
│   └── no.json                # Norwegian translations
├── public/
│   ├── images/                # Add your images here
│   └── audio/                 # Add example song here
├── middleware.ts              # i18n middleware
└── tailwind.config.ts         # Tailwind with beige theme
```

## ⚙️ Configuration

### Environment Variables

Required for production:

```bash
AIRTABLE_API_KEY=           # From airtable.com/create/tokens
AIRTABLE_BASE_ID=           # From your Airtable base URL
AIRTABLE_TABLE_NAME=        # Usually "Submissions"
RESEND_API_KEY=             # From resend.com
RESEND_FROM_EMAIL=          # hello@sangtildeg.no
NEXT_PUBLIC_VIPPS_LINK=     # Vipps payment/QR link
```

### Airtable Setup

1. Create a new Base at https://airtable.com/create
2. Create a table named "Submissions" with these fields:
   - Name (Single line text)
   - About (Long text)
   - Personality (Long text)
   - Favorites (Long text)
   - Saying (Single line text)
   - Memory (Long text)
   - Tone (Single select: Gentle / Warm / Reflective / Other)
   - Music Style (Single line text)
   - Contact Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Additional (Long text)
   - Language (Single select: EN / NO)
   - Submitted At (Date)
   - Status (Single select: New / In Progress / Completed)

3. Get your API key: https://airtable.com/create/tokens
4. Copy Base ID from URL: `https://airtable.com/app[BASE_ID]/...`

### Vipps Setup

1. Create QR code: https://www.vipps.no/produkter-og-tjenester/bedrift/ta-betalt-paa-nett/ta-betalt-med-qr/
2. Copy payment link
3. Add to `.env.local` as `NEXT_PUBLIC_VIPPS_LINK`

## 🎨 Design System

### Colors

- **Cream** (#F5F1E8) - Main background
- **Beige** (#E8DFD0) - Secondary background
- **Warm** (#D4C5B0) - Accents
- **Accent Gold** (#D4AF7A) - CTAs, highlights

### Fonts

- **Crimson Pro** - Body text (serif)
- **Playfair Display** - Headings (serif)
- **Dancing Script** - Handwriting accents
- **Inter** - UI elements (sans-serif)

All fonts loaded via Google Fonts with `next/font`.

## 📦 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repo]
git push -u origin main

# 2. Import to Vercel
# - Go to vercel.com
# - Import your GitHub repo
# - Add environment variables
# - Deploy
```

### Environment Variables in Vercel

Go to Project Settings → Environment Variables and add all variables from `.env.local`.

## ✅ TODO Before Launch

- [ ] Add professional photos (Thea & Mia, hero image)
- [ ] Add example song audio file
- [ ] Set up Airtable base
- [ ] Get Airtable API key
- [ ] Set up Resend account
- [ ] Configure Vipps payment link
- [ ] Add all environment variables
- [ ] Test form submission
- [ ] Test email notifications
- [ ] Deploy to Vercel
- [ ] Connect domain (sangtildeg.no)
- [ ] Set up Plausible Analytics (optional)

## 📝 Content Updates

To update text content, edit the JSON files in `/messages/`:
- `en.json` - English
- `no.json` - Norwegian

No code changes needed for text updates!

## 🎯 Features

- ✅ Fully bilingual (EN/NO) with URL-based routing
- ✅ Custom form with Zod validation
- ✅ Airtable integration for submissions
- ✅ Email notifications via Resend
- ✅ Custom audio player (Howler.js)
- ✅ Responsive design (mobile-first)
- ✅ Warm beige color theme
- ✅ Google Fonts with optimal loading
- ✅ SEO optimized
- ✅ Accessibility (WCAG 2.1 AA)

## 🆘 Troubleshooting

### Form not submitting?
- Check Airtable API key and Base ID
- Verify field names match in Airtable
- Check browser console for errors

### Emails not sending?
- Verify Resend API key
- Check `RESEND_FROM_EMAIL` is correct
- Emails go to `hello@sangtildeg.no` by default

### i18n not working?
- Ensure middleware.ts is in root directory
- Check URL format: `/en` or `/no`
- Default locale is Norwegian (`no`)

## 📧 Support

Questions? Contact hello@sangtildeg.no

---

*Made with 🤍 for sangtildeg.no*

