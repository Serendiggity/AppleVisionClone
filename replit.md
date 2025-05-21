# Wedding Planner Application

## Overview

This is a modern wedding planning application built with React, Vite, and Express. The application follows a client-server architecture with a PostgreSQL database (using Drizzle ORM). The UI is designed with a Vision OS "glass" aesthetic, featuring translucent panels, smooth animations, and a cohesive design language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with the following main components:

1. **Frontend**: React application with Vite for build tooling
   - Uses Tailwind CSS for styling with a custom design system
   - React SF Symbols for Vision OS-style icons
   - Custom glass-like UI components for a modern look
   - React Query for data fetching and state management

2. **Backend**: Express.js server
   - RESTful API patterns
   - Route-based architecture with prefixed `/api` endpoints
   - Centralized error handling

3. **Database**: PostgreSQL with Drizzle ORM
   - Schema-defined in `shared/schema.ts`
   - Current schema includes a basic user model
   - Migrations handled by Drizzle Kit

4. **Authentication**: Currently implemented with session-based auth
   - Uses `connect-pg-simple` for PostgreSQL session storage
   - Password hashing (implementation details to be completed)

## Key Components

### Frontend

1. **Routing**: Uses Wouter for client-side routing
   - Dashboard as the main view
   - Settings page for user preferences

2. **UI Components**: 
   - Shadcn/UI component library (Radix UI primitives)
   - Custom glass-effect components for Vision OS aesthetics
   - Responsive design with mobile considerations

3. **Dashboard Panels**:
   - Countdown timer for wedding date
   - Budget tracking panel
   - Timeline for planning tasks
   - Guest management panel

4. **Background System**:
   - Dynamic background with parallax effects
   - Customizable through settings

### Backend

1. **Server Setup**: Express with middleware for:
   - JSON parsing
   - Request logging
   - Error handling
   - Static file serving

2. **API Routes**: All routes are prefixed with `/api`
   - Currently implementation is minimal
   - Structured for RESTful operations

3. **Storage Layer**: 
   - Interface-based design for storage abstraction
   - Currently using in-memory storage (to be replaced with Drizzle)
   - CRUD operations for user data

### Shared

1. **Database Schema**: Defined in `shared/schema.ts`
   - Users table with basic fields
   - Zod validation schemas for type safety

## Data Flow

1. **User Authentication**:
   - User registers/logs in via API endpoints
   - Server validates credentials and creates sessions
   - Client stores session information in cookies

2. **Dashboard Data**:
   - Client fetches data from API endpoints
   - React Query handles caching and state
   - Updates are sent via API calls

3. **Settings Management**:
   - Background settings stored locally
   - User preferences could be stored in database (future enhancement)

## External Dependencies

### Frontend
- React and React DOM
- Tailwind CSS for styling
- Radix UI for accessible components
- React SF Symbols for Vision OS icons
- React Query for data fetching
- Wouter for routing
- Various utility libraries (clsx, class-variance-authority)

### Backend
- Express for API server
- Drizzle ORM for database operations
- Connect-PG-Simple for session management
- Various utility middleware

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development Mode**:
   - Run with `npm run dev` 
   - Uses Vite's development server with HMR
   - API requests proxied to Express server

2. **Production Build**:
   - Frontend built with Vite (`npm run build`)
   - Backend bundled with esbuild
   - Combined into single deployable package

3. **Database**:
   - Uses PostgreSQL module in Replit
   - Connection string stored in environment variables

4. **Scaling Considerations**:
   - deploymentTarget set to "autoscale" in .replit
   - Static assets served from `/dist/public`

## Getting Started

1. Ensure PostgreSQL database is provisioned and DATABASE_URL is set
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. API routes should be implemented in `server/routes.ts`
5. Frontend components can be added to the existing structure