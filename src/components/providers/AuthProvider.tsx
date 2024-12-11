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
    
    const initializeSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("AuthProvider: Initial session fetch:", session?.user?.id || 'No session');
        
        if (session) {
          setInitialSession(session);
        } else {
          // Clear any stale session data
          localStorage.removeItem('supabase.auth.token');
        }
      } catch (error) {
        console.error("AuthProvider: Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("AuthProvider: Auth state changed:", session?.user?.id || 'No session');
      setInitialSession(session);
      
      if (!session) {
        localStorage.removeItem('supabase.auth.token');
      }
    });

    return () => {
      console.log("AuthProvider: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, []);

  // Only show loading spinner for a maximum of 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("AuthProvider: Force ending loading state after timeout");
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
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