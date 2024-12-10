import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPage } from "@/pages/Dashboard";
import { ProjectsPage } from "@/pages/Projects";
import { ProjectDetailsPage } from "@/pages/ProjectDetails";
import { SubcontractorsPage } from "@/pages/Subcontractors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsPage />,
      },
      {
        path: "subcontractors",
        element: <SubcontractorsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}