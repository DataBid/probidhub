import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import { SubcontractorsPage } from "@/pages/Subcontractors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
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