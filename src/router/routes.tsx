
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Subcontractors from "@/pages/Subcontractors";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import TestUsers from "@/pages/TestUsers";
import { MainLayout } from "@/components/layout/MainLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/test-users",
    element: <TestUsers />,
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: "/subcontractors",
    element: (
      <MainLayout>
        <RoleGuard allowedRoles={["gc", "admin"]}>
          <Subcontractors />
        </RoleGuard>
      </MainLayout>
    ),
  },
  {
    path: "/projects",
    element: (
      <MainLayout>
        <Projects />
      </MainLayout>
    ),
  },
  {
    path: "/projects/:id",
    element: (
      <MainLayout>
        <ProjectDetails />
      </MainLayout>
    ),
  },
]);
