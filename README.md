5.1.1 Programming Languages
●	TypeScript was used to improve code reliability through static typing and clear data modeling for users, bookings, courts, and financial records.
●	JavaScript (ES6+) was used through the React ecosystem to support component-based development, event handling, and asynchronous interaction.
●	HTML and CSS formed the structural and visual foundation of the frontend, with styling largely managed through Tailwind CSS utilities.
5.1.2 Frameworks and Libraries
●	React.js was selected as the main frontend library because it supports modular component development, efficient UI rendering, and reusable page sections.
●	Vite was used as the build and development tool because it provides fast startup time, efficient hot module replacement, and lightweight configuration.
●	React Router DOM was used to manage navigation between the landing page, authentication pages, user dashboard, marketplace, courts page, matchmaking page, and admin dashboard.
●	Tailwind CSS was used for styling because it enables rapid interface development, responsive layouts, and consistent visual spacing.
●	Radix-based UI components were used to support accessible, reusable interface primitives such as dialogs, selects, tabs, labels, and form controls.
●	Lucide React was used to provide lightweight and consistent icons across menus, forms, dashboards, and action areas.
●	Sonner was used for toast notifications to provide immediate user feedback after actions such as login, signup, booking, and matchmaking requests.
●	Recharts was used to visualize booking activity, revenue trends, payment distribution, and expense analysis in administrative and financial pages.
5.1.3 State Management Approach
●	React useState was used as the main state management technique because most interactions are local to individual components or pages.
●	Browser localStorage was used to preserve authentication data and support role-based route protection.
5.1.4 Development Tools
●	Node.js and npm were used for dependency management and project execution.
●	Git was used for version control and organized change tracking.
●	Visual Studio Code is an appropriate editor for this project because it supports TypeScript, React, and frontend tooling efficiently.

5.2 Frontend Logic and Techniques Used
The frontend logic of the Tennis Finder project was designed to support interactive user flows while keeping the current implementation simple, maintainable, and suitable for prototype-stage validation.
5.2.1 State Management
The project uses a component-level state management model through React hooks such as useState. This approach is appropriate because most interactions are localized, including form inputs, search filters, modal visibility, chart display, and mobile sidebar behavior.
5.2.2 API Integration Logic
The current frontend relies mainly on mock data and simulated asynchronous operations instead of a fully connected production backend. Timeout-based request simulation is used in authentication and interaction flows to imitate server communication and loading behavior.
5.2.3 Authentication Handling
Authentication is handled on the client side using local validation logic and browser storage. After a successful login or signup process, a user object is stored in localStorage and used later by protected route logic. Admin access is restricted using both role checking and an admin verification flag.
5.2.4 Form Validation
Form validation is implemented through controlled components and conditional checks in submit handlers. Validation covers password confirmation, required fields, minimum password length, terms acceptance, and skill-level selection.
5.2.5 Responsive Design Techniques
Responsiveness is implemented through Tailwind CSS breakpoints, grid layouts, flexible containers, and adaptive spacing. Mobile navigation, stacked layouts, and responsive cards help preserve usability across different screen sizes.
5.2.6 Performance Optimization
The frontend applies practical performance techniques such as modular page composition, reusable components, localized state updates, and responsive chart containers. Selected derived values are computed efficiently using React hooks such as useMemo where needed.
5.2.7 Component Reusability
A reusable component strategy was followed throughout the project. Shared elements such as buttons, cards, badges, inputs, selects, dialogs, and image wrappers are centralized inside common component directories to improve consistency and reduce duplication.
5.2.8 Error Handling
Error handling is achieved through conditional validation logic and toast notifications. This ensures that users receive immediate feedback when invalid credentials are entered, required form fields are missing, or unauthorized access is attempted.

5.3 System Implementation Details
5.3.1 Project Architecture
The frontend follows a component-based architecture organized around pages, feature-specific component groups, shared UI primitives, utility modules, and mock data sources. The entire application operates as a single-page React application with client-side routing.
5.3.2 Folder Structure
The frontend source code is organized into components, pages, data, styling resources, utility files, and image assets. This structure improves maintainability and separates reusable interface logic from page-level functionality.

src/
├── components/
│   ├── admin/
│   ├── dashboard/
│   ├── landing-v2/
│   └── ui/
├── data/
├── img/
├── lib/
├── pages/
├── styles/
├── App.tsx
├── main.tsx
└── index.css

Folder	Purpose
components/	Reusable and feature-oriented React components
components/admin/	Admin dashboard views: overview, court management, booking, settings
components/dashboard/	User dashboard views: overview, bookings, matches, orders, settings
components/landing-v2/	Public landing sections: hero, features, app preview, FAQ, pricing
components/ui/	Shared UI primitives: buttons, inputs, cards, dialogs, badges, tables
data/	Mock business data for bookings, customers, courts, revenue, transactions
img/	Local image assets for landing page and app preview screens
lib/	Helper logic including authentication utilities
pages/	Page-level admin screens: overview, bookings, courts, customers, financials
styles/	Project styling files and landing-page CSS resources
5.3.3 Main Pages and Components
●	Landing Page: presents the platform identity, features, app preview, pricing, testimonials, and call-to-action sections.
●	Login and Signup Pages: support user authentication and onboarding with validation logic.
●	Courts Page: supports court discovery, filtering, pricing display, and booking interaction.
●	Matchmaking Page: presents player profiles, skill-level filtering, and match request actions.
●	Marketplace Page: displays tennis equipment, category filters, and simulated cart and wishlist actions.
●	User Dashboard: provides activity summaries, bookings, quick actions, and settings.
●	Admin Dashboard: supports management of courts, bookings, customers, and financial analytics.
<img width="468" height="648" alt="image" src="https://github.com/user-attachments/assets/35311fe9-04bc-46cd-b218-b0900f682d40" />
