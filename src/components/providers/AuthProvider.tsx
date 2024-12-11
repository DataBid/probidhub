import { useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [initialSession, setInitialSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Starting session initialization");
    
    // First try to get the session from localStorage
    const savedSession = localStorage.getItem('supabase.auth.token');
    if (savedSession) {
      console.log("AuthProvider: Found saved session");
    }
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: Initial session fetch:", session?.user?.id || 'No session');
      setInitialSession(session);
      
      // Store session in localStorage if it exists
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
      }
      
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("AuthProvider: Auth state changed:", session?.user?.id || 'No session');
      setInitialSession(session);
      
      // Update localStorage when session changes
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
      } else {
        localStorage.removeItem('supabase.auth.token');
      }
    });

    return () => {
      console.log("AuthProvider: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <SessionContextProvider 
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
};