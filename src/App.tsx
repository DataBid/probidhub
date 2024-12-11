import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import Subcontractors from "@/pages/Subcontractors";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
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
    element: (
      <MainLayout>
        <Dashboard />
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
  {
    path: "/subcontractors",
    element: (
      <MainLayout>
        <Subcontractors />
      </MainLayout>
    ),
  },
]);

function App() {
  const [initialSession, setInitialSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("App: Starting session initialization");
    
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("App: Initial session fetch:", session?.user?.id || 'No session');
      setInitialSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("App: Auth state changed:", session?.user?.id || 'No session');
      setInitialSession(session);
    });

    return () => {
      console.log("App: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContextProvider 
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      <QueryClientProvider client={queryClient}>
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <RouterProvider router={router} />
            <Toaster />
          </>
        )}
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;