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
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log("Index - Session check:", currentSession ? "Session exists" : "No session");
      
      if (currentSession) {
        console.log("Index - Session exists, redirecting to dashboard");
        navigate("/dashboard");
      }
    };

    checkSession();
  }, [session, navigate, supabase]);

  if (session) {
    return null;
  }

  return <AuthForm />;
};

export default Index;