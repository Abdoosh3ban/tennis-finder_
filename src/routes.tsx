import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Overview } from "./pages/Overview";
import { Bookings } from "./pages/Bookings";
import { Customers } from "./pages/Customers";
import { Financial } from "./pages/Financial";
import { Courts } from "./pages/Courts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "bookings", Component: Bookings },
      { path: "customers", Component: Customers },
      { path: "financial", Component: Financial },
      { path: "courts", Component: Courts },
    ],
  },
]);
