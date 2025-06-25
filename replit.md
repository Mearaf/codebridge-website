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
- **Database**: PostgreSQL (configured for production)
- **Migration**: Drizzle Kit for schema migrations
- **Development**: In-memory storage fallback for development

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
- Hero section with gradient animations
- Service preview cards
- Testimonial displays
- Contact forms with validation
- AI chatbot interface
- Multi-step client intake form

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

✓ Enhanced hero section with video background and futuristic design elements
✓ Added holographic borders and tech glow effects throughout the site
✓ Implemented neural network line animations and floating tech elements
✓ Enhanced AI chatbot with more human-like personality and responses
✓ Applied black and white color scheme for text as requested
✓ Added particle animations and gradient shifts for modern tech aesthetic

## Changelog

- June 25, 2025: Enhanced design with futuristic elements, video background, and improved human-centered interactions
- June 24, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.