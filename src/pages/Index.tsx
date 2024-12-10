import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking initial session...");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Initial session check error:", error);
          return;
        }

        if (currentSession) {
          console.log("Active session found, redirecting to dashboard");
          navigate("/dashboard");
        } else {
          console.log("No active session found, showing login form");
        }
      } catch (error) {
        console.error("Session verification error:", error);
      }
    };

    checkSession();
  }, [navigate, supabase.auth]);

  // If there's a session, return null to prevent flash of login form
  if (session) {
    return null;
  }

  return <AuthForm />;
};

export default Index;