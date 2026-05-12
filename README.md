5.1 Used Technologies, Tools, and Programming Languages
The frontend of the Tennis Finder system was implemented as a modern single-page application designed to provide an interactive, responsive, and maintainable user experience. The selected technologies were chosen to support rapid development, reusable user interface construction, and smooth client-side navigation.
5.1.1 Programming Languages
•	TypeScript was used to improve code reliability through static typing and clear data modeling for users, bookings, courts, and financial records.
•	JavaScript (ES6+) was used through the React ecosystem to support component-based development, event handling, and asynchronous interaction.
•	HTML and CSS formed the structural and visual foundation of the frontend, with styling largely managed through Tailwind CSS utilities.
5.1.2 Frameworks and Libraries
•	React.js was selected as the main frontend library because it supports modular component development, efficient UI rendering, and reusable page sections.
•	Vite was used as the build and development tool because it provides fast startup time, efficient hot module replacement, and lightweight configuration.
•	React Router DOM was used to manage navigation between the landing page, authentication pages, user dashboard, marketplace, courts page, matchmaking page, and admin dashboard.
•	Tailwind CSS was used for styling because it enables rapid interface development, responsive layouts, and consistent visual spacing.
•	Radix-based UI components were used to support accessible, reusable interface primitives such as dialogs, selects, tabs, labels, and form controls.
•	Lucide React was used to provide lightweight and consistent icons across menus, forms, dashboards, and action areas.
•	Sonner was used for toast notifications to provide immediate user feedback after actions such as login, signup, booking, and matchmaking requests.
•	Recharts was used to visualize booking activity, revenue trends, payment distribution, and expense analysis in administrative and financial pages.
5.1.3 State Management Approach
•	React useState was used as the main state management technique because most interactions are local to individual components or pages.
•	Browser localStorage was used to preserve authentication data and support role-based route protection.
5.1.4 Development Tools
•	Node.js and npm were used for dependency management and project execution.
•	Git was used for version control and organized change tracking.
•	Visual Studio Code is an appropriate editor for this project because it supports TypeScript, React, and frontend tooling efficiently.
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
5.3.2 Folder Structure Explanation
The frontend source code is organized into components, pages, data, styling resources, utility files, and image assets. This structure improves maintainability and separates reusable interface logic from page-level functionality.
src/
├── components/
│   ├── admin/
│   ├── dashboard/
│   ├── landing-v2/
│   ├── ui/
│   
├── data/
├── img/
├── lib/
├── pages/
├── styles/
├── App.tsx
├── main.tsx
└── index.css

5.3.3 Main Pages and Components
•	Landing Page: presents the platform identity, features, app preview, pricing, testimonials, and call-to-action sections.
•	Login and Signup Pages: support user authentication and onboarding with validation logic.
•	Courts Page: supports court discovery, filtering, pricing display, and booking interaction.
•	Matchmaking Page: presents player profiles, skill-level filtering, and match request actions.
•	Marketplace Page: displays tennis equipment, category filters, and simulated cart and wishlist actions.
•	User Dashboard: provides activity summaries, bookings, quick actions, and settings.
•	Admin Dashboard: supports management of courts, bookings, customers, and financial analytics.
5.3.4 Routing and Navigation Flow
Routing is implemented through React Router DOM. Public pages are separated from protected user and admin dashboards. Standard users are redirected to the user dashboard after authentication, while verified administrators are redirected to the protected admin panel.
5.3.5 API Communication Flow
1.	The user triggers an action such as login, signup, or booking.
2.	The frontend validates the submitted data locally.
3.	A simulated asynchronous delay represents request processing.
4.	Mock data or local logic generates the result.
5.	A toast notification and route transition provide feedback to the user.
5.3.6 Authentication Flow
6.	The user submits login or signup data.
7.	The frontend validates the provided fields.
8.	A user object is stored in localStorage after successful authentication.
9.	Protected routes read the stored user using authentication helper functions.
10.	Admin routes verify both the role value and the admin verification flag.
5.4 Code Snippets
5.4.1 API Integration Example
const handleLogin = async () => {
  setLoading(true);

  setTimeout(() => {
    setStoredUser({
      email: formData.email,
      role: "player",
    });

    setLoading(false);
    navigate("/dashboard");
  }, 1500);
};

This snippet illustrates the simulated asynchronous flow used to imitate backend processing while preserving realistic loading and redirection behavior.
5.4.2 Authentication Example
export function setStoredUser(user: StoredUser) {
  localStorage.setItem("tennisfinder_auth", JSON.stringify(user));
}

export function getStoredUser(): StoredUser | null {
  const raw = localStorage.getItem("tennisfinder_auth");
  return raw ? JSON.parse(raw) : null;
}

This snippet shows how the application stores and retrieves the authenticated user state on the client side.
5.4.3 State Management Example
const [searchQuery, setSearchQuery] = useState("");
const [selectedCity, setSelectedCity] = useState("all");
const [selectedSurface, setSelectedSurface] = useState("all");

This code reflects the local component state pattern used throughout the project for filtering, form input handling, and UI interaction.
5.4.4 Form Validation Example
if (formData.password !== formData.confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

if (!formData.agreeToTerms) {
  toast.error("Please agree to the terms and conditions");
  return;
}

This snippet demonstrates direct client-side validation before allowing the form submission process to continue.
5.4.5 Reusable Component Example
<ImageWithFallback
  src={appPreview}
  alt="Tennis Finder app preview"
  className="w-full h-full object-cover"
/>

This reusable component improves consistency and centralizes image rendering behavior across the project.
