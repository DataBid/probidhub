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
        const { data: { user } } = await supabase.auth.getUser();
        console.log("Index - Session check:", user ? "User found" : "No user found");
        
        if (user) {
          console.log("Index - User exists, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Session check error:", error);
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