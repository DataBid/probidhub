import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      console.log("Index - Initial session check:", session ? "Session exists" : "No session");
      if (session) {
        console.log("Index - Session found, redirecting to dashboard");
        navigate("/dashboard");
      }
      setIsLoading(false);
    };

    checkSession();
  }, [session, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthForm />;
};

export default Index;