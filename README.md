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


