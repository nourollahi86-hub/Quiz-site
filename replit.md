# True/False Quiz Platform

## Overview

This is an educational web application that enables instructors to create True/False quizzes and students to complete them. The platform features a simple, clean interface inspired by Linear and Notion, prioritizing clarity and efficiency for both instructors managing questions and students taking quizzes.

The application uses a role-based authentication system where instructors authenticate with a fixed password ("ZQY0H4"), while students simply enter their name to participate. Questions are managed in-memory, while student responses are automatically saved to Google Sheets for instructor access and analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite as the build tool and development server.

**UI Component System**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components following the "new-york" style variant. The design system emphasizes clean productivity aesthetics with careful attention to typography, spacing, and visual hierarchy.

**Styling**: Tailwind CSS with a custom configuration that extends the base theme with:
- Semantic color tokens (background, foreground, primary, secondary, etc.)
- Consistent border radius values (lg: 9px, md: 6px, sm: 3px)
- Custom CSS variables for theme customization
- Inter font family from Google Fonts for all text

**State Management**: Component-level React state (useState) for managing authentication, questions, and submissions. TanStack Query (React Query) is configured for potential future API integration, though currently unused.

**Routing**: Single-page application with conditional rendering based on authentication state. No client-side routing library is used.

**Key Design Patterns**:
- Component composition with clear separation of concerns (LoginPage, InstructorView, StudentView, Header)
- Props drilling for state management between parent App and child components
- Validation using Zod schemas defined in shared schema file
- TypeScript for type safety across the application

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development vs Production**:
- Development mode uses Vite middleware for hot module replacement and development server integration
- Production mode serves pre-built static assets from the dist/public directory
- Both modes share the same Express application setup and route registration

**API Structure**: The application uses Express routes with a `/api/submit` endpoint to handle student quiz submissions. All routes are prefixed with `/api`.

**Storage Layer**: Implements an IStorage interface with a MemStorage class that:
- Maintains questions in-memory using an array
- Integrates with Google Sheets API to persist student submissions
- Uses the appendSubmissionToSheet utility to append responses to a "Campbell Responses" spreadsheet
- Automatically creates the Google Sheets spreadsheet if it doesn't exist

**Session Management**: Infrastructure for connect-pg-simple sessions is available in dependencies but not currently implemented, as authentication is stateless and session-less.

### Data Storage Solutions

**Questions Storage**: In-memory storage using the MemStorage class. Questions are stored as an array and reset on server restart. Each question includes:
- id: unique identifier
- text: question content
- direction: text direction (ltr/rtl) for internationalization support

**Student Responses Storage**: Google Sheets integration via Replit's Google Sheets connector. Each submission is automatically appended to a "Campbell Responses" spreadsheet with columns:
- Student Name: The name entered by the student
- Question ID: The unique identifier of each question
- Answer: "True" or "False" response

**Schema Definition**: Uses Zod for runtime validation with defined schemas for:
- Questions (id: string, text: string, direction: "ltr" | "rtl")
- Submissions (studentName: string, answers: Record<string, boolean>)

**Google Sheets Integration**: 
- Authenticated via Replit's connector system
- Automatic spreadsheet creation if "Campbell Responses" doesn't exist
- One row per answer (allows multiple rows per student for multi-question quizzes)
- Accessible to instructors for data analysis and reporting

### Authentication and Authorization

**Instructor Authentication**: 
- Fixed password: "ZQY0H4"
- Password not displayed publicly; hardcoded in the application
- No session persistence or token-based authentication
- Password validation happens client-side during login

**Student Authentication**:
- Name-based entry with no password required
- Minimal validation (non-empty string)
- No session tracking or user persistence

**Security Considerations**: Current implementation prioritizes simplicity over security. This is suitable for controlled educational environments but would require significant hardening for production use (proper session management, secure password hashing, HTTPS enforcement, CSRF protection).

### External Dependencies

**Google Sheets Integration**:
- googleapis package for Google Sheets API interaction
- Replit connector system for OAuth authentication
- Automatic token refresh and credential management

**UI Framework**:
- Radix UI primitives (@radix-ui/*) for accessible component foundations
- Lucide React for iconography
- class-variance-authority and clsx for conditional styling utilities
- TanStack Query for API state management

**Form Handling**:
- React Hook Form with @hookform/resolvers for form state management
- Zod for schema validation (drizzle-zod for ORM integration)

**Development Tools**:
- Vite with React plugin for fast development and optimized production builds
- ESBuild for server-side bundling
- TypeScript compiler for type checking
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal) for Replit IDE integration

**Database (Configured but Unused)**:
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- connect-pg-simple for potential session storage

**Build and Deployment**:
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Separate development (tsx with --watch) and production (esbuild bundle) scripts