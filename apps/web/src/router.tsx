import Home from "./routes/home";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import AdminDashboard from "./routes/admin-dashboard";
import { createBrowserRouter } from "react-router";

function NotFound() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-brand-dark">404</h1>
      <p className="text-brand-muted">Página no encontrada.</p>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);
