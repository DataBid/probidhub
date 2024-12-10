import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import { SubcontractorsPage } from "@/pages/Subcontractors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
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
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}