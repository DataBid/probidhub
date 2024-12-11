import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return <AuthForm />;
};

export default Index;