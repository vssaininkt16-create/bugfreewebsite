# BugZero Cyber Solutions

> **Elite Cybersecurity Services | Building India's Next-Generation Cybersecurity Force**

A modern, high-end cybersecurity company website built with Next.js 14, featuring a dark hacker-team aesthetic with neon green and cyan accents.

![BugZero Logo](https://customer-assets.emergentagent.com/job_ac12a0f1-a0f0-4688-bac4-5a4231d87818/artifacts/pc2i03bw_ChatGPT%20Image%20Feb%206%2C%202026%2C%2002_21_35%20PM.png)

## 🚀 Features

- **Modern Cybersecurity Design**: Dark theme with neon green/cyan accents
- **Animated Hero Section**: Typewriter effect and matrix-style background
- **Glassmorphism Cards**: Premium glass effect with cyber glow
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance Optimized**: Fast loading with Next.js 14 App Router
- **MongoDB Integration**: Contact form and logo upload functionality
- **Interactive Animations**: Smooth transitions, hover effects, floating elements

## 📄 Pages

1. **Home** - Hero section, services preview, stats, CTA
2. **About Us** - Mission, values, team information
3. **Services** - Comprehensive list of cybersecurity services
4. **Careers** - Internship program and job opportunities
5. **Contact** - Contact form with logo upload feature
6. **Dashboard** - Placeholder for future authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: JavaScript/React 18
- **Styling**: Tailwind CSS with custom cyber theme
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Database**: MongoDB
- **Deployment**: Kubernetes with Supervisor

## 🎨 Design System

### Colors
- **Primary (Cyber Green)**: `#00ff41` - Main accent color
- **Secondary (Cyan)**: `#00ffff` - Secondary accent
- **Background**: `#000000`, `#0a0a0a` - Dark backgrounds
- **Text**: White, light gray variations

### Animations
- **Glow Effect**: Pulsing neon glow on cards and buttons
- **Float**: Smooth floating animation for decorative elements
- **Matrix Fall**: Scanning line effect
- **Glitch**: Subtle glitch effect on hover
- **Typewriter**: Hero section text typing animation

### Components
- Glassmorphism cards with backdrop blur
- Cyber grid background pattern
- Terminal-style text effects
- Smooth scroll navigation
- Responsive navbar with mobile menu
- Service cards with hover glow

## 🔧 Environment Variables

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=bugzero_db
NEXT_PUBLIC_BASE_URL=https://your-domain.com
CORS_ORIGINS=*
```

## 📁 Project Structure

```
/app
├── app/
│   ├── page.js                 # Home page
│   ├── layout.js               # Root layout
│   ├── globals.css             # Global styles
│   ├── about/page.js           # About page
│   ├── services/page.js        # Services page
│   ├── careers/page.js         # Careers page
│   ├── contact/page.js         # Contact page
│   ├── dashboard/page.js       # Dashboard (future)
│   └── api/
│       └── [[...path]]/route.js # API routes
├── components/
│   ├── Navbar.jsx              # Navigation component
│   ├── Footer.jsx              # Footer component
│   ├── CyberBackground.jsx     # Animated background
│   └── ServiceCard.jsx         # Service card component
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or remote connection
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
yarn build
yarn start
```

## 🔌 API Endpoints

### GET /api
Returns API information and available endpoints.

### POST /api/contact
Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Security Inquiry",
  "message": "I need VAPT services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "uuid-here"
}
```

### POST /api/upload
Upload company logo (multipart/form-data).

**Form Fields:**
- `logo`: Image file (PNG, JPG, WEBP, max 5MB)
- `email`: User email

**Response:**
```json
{
  "success": true,
  "message": "Logo uploaded successfully",
  "id": "uuid-here",
  "filename": "logo.png"
}
```

## 🗄️ Database Schema

### Contacts Collection
```javascript
{
  id: String (UUID),
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: String (ISO date),
  status: String (default: 'new')
}
```

### Uploads Collection
```javascript
{
  id: String (UUID),
  email: String,
  filename: String,
  contentType: String,
  size: Number,
  data: String (base64),
  createdAt: String (ISO date)
}
```

## 🎯 Services Offered

- **VAPT Testing**: Web Application Penetration Testing
- **API Security**: REST API, GraphQL security testing
- **Network Security**: Infrastructure audits and testing
- **Cloud Security**: AWS, Azure, GCP security assessment
- **Mobile App Security**: iOS/Android security testing
- **Bug Bounty Assistance**: Vulnerability research and reporting
- **Security Code Review**: Manual and automated code analysis
- **Database Security**: SQL/NoSQL security testing
- **Security Consulting**: Risk assessment and compliance
- **Internship Programs**: Training with job opportunities

## 🔗 Social Links

- **LinkedIn**: [Connect with us](https://www.linkedin.com/in/vishal-saini-b32782321/)
- **Email**: contact@bugzero.com

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1920px+

## 🎨 Custom Tailwind Classes

- `.glass` - Glassmorphism effect
- `.cyber-glow` - Neon green glow
- `.cyber-glow-cyan` - Cyan glow
- `.hover-glow` - Hover glow effect
- `.cyber-grid` - Grid background
- `.terminal-text` - Terminal-style text
- `.glitch` - Glitch animation

## ⚡ Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with App Router
- Optimized fonts with next/font
- Minimal JavaScript bundle size
- CSS optimized with Tailwind purge
- MongoDB connection pooling

## 🔒 Security Features

- Input validation on all forms
- File type validation for uploads
- File size limits (5MB max)
- XSS protection
- CORS configuration
- Environment variable protection

## 🚧 Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Client dashboard with reports
- [ ] Real-time vulnerability monitoring
- [ ] Project management system
- [ ] Team collaboration tools
- [ ] Payment integration
- [ ] Blog/News section
- [ ] Multi-language support

## 📝 License

Copyright © 2026 BugZero Cyber Solutions. All rights reserved.

## 🤝 Contributing

This is a private company website. For inquiries, please contact us through the website.

## 📞 Support

For support or inquiries:
- Email: contact@bugzero.com
- LinkedIn: [Vishal Saini](https://www.linkedin.com/in/vishal-saini-b32782321/)
- 24/7 Emergency Response Available

---

**Built with ❤️ by elite ethical hackers | Securing India's Digital Future**
