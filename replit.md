# CodeBridge - Technology Consulting Application

## Overview

CodeBridge is a full-stack web application for a technology consulting company that helps small businesses, nonprofits, and solo entrepreneurs modernize their tech infrastructure. The application features a modern, dark-themed UI with a focus on user empowerment and clarity in technology consulting services.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Development**: Hot reload with tsx for development

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless connection
- **Migration**: Drizzle Kit for schema migrations
- **Storage**: DatabaseStorage class replaces in-memory storage

## Key Components

### Database Schema
The application uses the following main entities:
- **Users**: Authentication and user management
- **Contacts**: Contact form submissions
- **Email Signups**: Newsletter subscriptions
- **Client Intakes**: Detailed client onboarding forms
- **Testimonials**: Client testimonials with featured flag

### API Endpoints
- `POST /api/contact` - Contact form submission
- `POST /api/email-signup` - Newsletter signup
- `POST /api/client-intake` - Client intake form submission
- `GET /api/testimonials` - Retrieve testimonials
- `GET /api/testimonials/featured` - Retrieve featured testimonials

### UI Components
- Navigation with responsive mobile menu
- Hero section with dynamic video backgrounds
- Service preview cards with adaptive videos
- Testimonial displays
- Contact forms with validation and video backgrounds
- AI chatbot interface
- Multi-step client intake form
- Dynamic video background system with behavior tracking

## Data Flow

1. **User Interaction**: Users interact with forms and navigation
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Requests**: TanStack Query manages API calls with error handling
4. **Database Operations**: Drizzle ORM handles database interactions
5. **Response Handling**: Success/error feedback via toast notifications

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **UI Library**: Radix UI components for accessibility
- **Animation**: Tailwind CSS animations and transitions
- **Form Validation**: Zod for schema validation
- **Session Management**: connect-pg-simple for session storage

### Development Tools
- **Build Tool**: Vite for frontend bundling
- **Type Checking**: TypeScript for type safety
- **Code Formatting**: ESLint and Prettier configuration
- **Development Server**: tsx for TypeScript execution

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations run via `npm run db:push`

### Environment Configuration
- **Development**: `npm run dev` starts both frontend and backend
- **Production**: `npm run build` followed by `npm run start`
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Hosting
- **Platform**: Configured for Replit deployment
- **Scaling**: Autoscale deployment target
- **Port Configuration**: Internal port 5000, external port 80

## Recent Changes

✓ Successfully implemented working video backgrounds across all sections  
✓ Created comprehensive SimpleVideoBackground component with robust error handling and fallback system
✓ Fixed video autoplay interruption issues with proper event handling and timing
✓ Updated chatbot icon to black theme with gentle 3s pulse animation matching site aesthetics
✓ Added "Businesses We Transform" section with specific industry examples and success metrics
✓ Enhanced About page with detailed business case studies including restaurants, healthcare, nonprofits, retail, professional services, and education
✓ Maintained professional black and white aesthetic with engaging visual content
✓ Added custom bridge icon next to CodeBridge logo in navigation for brand identity
✓ Standardized button design system across entire website with consistent styling and interactions
✓ Implemented advanced mouse effects including custom cursor, particle system, magnetic hover effects, and parallax scrolling
✓ Added sophisticated CSS animations with 3D transforms, glitch effects, ripple effects, and staggered fade-ins
✓ Enhanced Resources page newsletter section to match black/white theme with proper interactive effects
✓ Added scroll progress bar and smooth scrolling behavior throughout the website
✓ Implemented reveal-on-scroll animations for enhanced user engagement
✓ Added comprehensive article system with 4 detailed guides (3,000+ words each)
✓ Created individual article pages with proper routing and SEO-friendly URLs
✓ Fixed article navigation and content formatting with enhanced typography
✓ Added new article: "Why Technology and AI are Game-Changers for Home Service Businesses" - comprehensive guide for home services industry
✓ Added 4 new SEO-targeted articles for specific business types:
  - Restaurant Technology: Essential Tools for Small Food Businesses (16 min read)
  - Healthcare Practice Management: Technology Solutions for Small Medical Offices (17 min read)  
  - Legal Practice Technology: Modern Tools for Small Law Firms (19 min read)
  - Retail Technology Solutions: Point of Sale and Customer Management (20 min read)
✓ Successfully uploaded codebase to GitHub repository: https://github.com/Mearaf/codebridge-website
✓ Created AWS deployment configuration files (amplify.yml, Dockerfile, deployment guide)
→ Ready for AWS Amplify deployment to learn cloud services

## Changelog

- June 25, 2025: Implemented dynamic video backgrounds with user behavior tracking and intelligent video selection
- June 25, 2025: Enhanced design with futuristic elements, video background, and improved human-centered interactions
- June 24, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.