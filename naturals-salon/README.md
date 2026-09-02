# Naturals Salon - Frontend

This is the frontend implementation for Naturals Salon, Kalaburagi. It provides a premium, responsive, and accessible user experience for discovering services, requesting appointments, viewing the gallery, and reading reviews.

## Tech Stack
- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Lucide React (Icons)
- React Helmet Async (SEO)

## Development & Deployment

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Main Routes
- `/` - Home
- `/services` - Service discovery & search
- `/appointment` - Appointment request form
- `/gallery` - Salon photo gallery with lightbox
- `/reviews` - Google reviews & website feedback
- `/about` - About the salon
- `/contact` - Location, hours, and contact details

## Current Frontend Capabilities
- **Service Discovery**: Browse, search, and filter hair, beauty, and grooming services.
- **Appointment Request**: Form to capture customer details and preferred time, which currently generates a WhatsApp message for the salon.
- **Service Preselection**: Selecting a service from the Services or Gallery pages pre-fills the appointment form.
- **Gallery & Lightbox**: Interactive photo gallery with filtering and an accessible lightbox.
- **Reviews**: Displays verified Google reviews and a form for website feedback (currently using `localStorage`).
- **Contact & Location**: Direct links for Call, WhatsApp, Google Maps directions, and social media.
- **Business Status**: Real-time "Open/Closed" status based on business hours.
- **Responsive Navigation**: Mobile-first design with a bottom action bar for quick access to booking and calling.
- **SEO Ready**: Dynamic meta tags and titles using React Helmet.

## Important Limitations & Backend Dependencies
1. **Appointments are Requests**: Appointments submitted via the website are currently requests and are not automatically confirmed. The frontend generates a WhatsApp message for the user to send.
2. **Real Availability**: The time picker allows any valid future time during business hours. Real slot availability requires a backend integration.
3. **Website Feedback Storage**: Feedback submitted on the website is currently stored locally in the browser's `localStorage` and is not shared globally.
4. **No Shared Database**: All data (services, business info, initial reviews) is currently static and loaded from the `src/data` directory.

## Environment Variables
Create a `.env` file based on `.env.example`:
```env
VITE_API_BASE_URL=
VITE_SITE_URL=https://naturalssalonkalaburagi.com
```

## Deployment Notes
- **Vercel / SPA Hosting**: A `vercel.json` file is included to ensure all routes fallback to `index.html` to support React Router.
- **Case-Sensitivity**: All file imports must strictly match the filename casing, as Linux-based hosting environments (like Vercel) are case-sensitive.
