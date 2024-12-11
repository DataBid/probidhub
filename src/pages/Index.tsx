import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Index: Starting session check");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Index: Session check error:", error);
          return;
        }

        if (session) {
          console.log("Index: Active session found, redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        } else {
          console.log("Index: No active session found, showing login form");
        }
      } catch (error) {
        console.error("Index: Session verification error:", error);
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [session, navigate]);

  return <AuthForm />;
};

export default Index;