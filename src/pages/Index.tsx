import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return <AuthForm />;
};

export default Index;