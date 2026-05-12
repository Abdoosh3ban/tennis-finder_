Tennis Finder Frontend
Tennis Finder is a React + TypeScript frontend for a tennis platform that helps players discover courts, book sessions, connect with other players, browse equipment, and manage activity through user and admin dashboards.

This frontend is currently built as a prototype-style single-page application with client-side routing, mock data, local authentication state, and responsive UI flows for public users, players, and administrators.

Overview
The project focuses on the main tennis user journey:

Explore the public landing page and platform features
Sign up or log in as a player
Search and filter tennis courts
Book available courts
Find partners through matchmaking
Browse tennis products in the marketplace
Track activity from a user dashboard
Manage operations from an admin dashboard
Main Features
Landing page with hero, features, app preview, pricing, testimonials, FAQ, and call-to-action sections
Authentication flows for login and signup with client-side validation
Court discovery with filters for city and surface type
Booking flow with toast feedback and dashboard handoff
Matchmaking experience for connecting players by skill and availability
Marketplace page for browsing tennis products
Community page and demo chat experience
Player dashboard for bookings, orders, settings, and activity summaries
Admin dashboard for court management, bookings, customers, and financial analytics
Responsive layouts for desktop and mobile screens
English and Arabic UI support in parts of the application
Tech Stack
React 18
TypeScript
Vite
Tailwind CSS
React Router DOM
Radix UI primitives
Lucide React icons
Sonner toast notifications
Recharts for analytics and reporting views
Current Frontend Architecture
The app uses a component-based structure organized around reusable UI, feature sections, pages, utilities, and mock data.

src/
├── components/
├── data/
├── img/
├── lib/
├── pages/
├── App.tsx
├── main.tsx
└── routes.tsx
Key areas:

src/components/landing-v2/: public landing page sections
src/components/admin/: admin management UI
src/components/dashboard/: player dashboard pages
src/pages/: analytics and admin-facing page modules
src/lib/: auth and preference helpers
src/data/: mock application data
Routes Included
Public and player-facing routes:

/
/login
/signup
/courts
/marketplace
/matchmaking
/community
/demochat
/dashboard/*
/pricing/*
Protected admin route:

/admin/*
Authentication Notes
Authentication is currently simulated on the client side:

User state is stored in localStorage
Protected admin access checks both user role and an admin verification flag
The auth storage key is tennisfinder_auth
Current admin credentials in the frontend prototype:

Email: admin@tennisfinder.com
Password: 1234567809
Development Setup
Requirements
Node.js
npm
Run locally
npm install
npm run dev
The Vite dev server is configured to run on:

http://localhost:3000
Build for production
npm run build
Implementation Notes
The current version relies heavily on mock data and simulated async behavior
Form validation is handled through controlled inputs and conditional checks
UI feedback is provided through toast notifications
Most state is managed locally with React hooks such as useState
The project is designed as a strong frontend prototype and foundation for backend integration
Project Status
This repository represents the frontend side of Tennis Finder. It is best described as a functional prototype that validates:

Navigation flow
User and admin experiences
Responsive behavior
Booking and dashboard interactions
Financial and operational UI concepts
The next logical step is full backend/API integration for real authentication, persistence, bookings, marketplace operations, and matchmaking services.
