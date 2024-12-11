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
        console.log("Index: Starting session check");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Index: Session check error:", error);
          return;
        }

        if (currentSession) {
          console.log("Index: Active session found, redirecting to dashboard");
          window.location.href = "/dashboard";
        } else {
          console.log("Index: No active session found, showing login form");
        }
      } catch (error) {
        console.error("Index: Session verification error:", error);
      }
    };

    checkSession();
  }, [navigate, supabase.auth]);

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      window.location.href = "/dashboard";
    }
  }, [session, navigate]);

  if (session) {
    console.log("Index: Session exists, returning null");
    return null;
  }

  return <AuthForm />;
};

export default Index;