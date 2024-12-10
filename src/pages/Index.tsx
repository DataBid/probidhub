import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index - Session check:", session ? "Session exists" : "No session");
    if (session) {
      console.log("Index - Session exists, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [session, navigate]);

  if (session) {
    return null;
  }

  return <AuthForm />;
};

export default Index;