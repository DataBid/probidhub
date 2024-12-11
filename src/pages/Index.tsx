import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      window.location.href = "/dashboard";
    }
  }, [session]);

  return <AuthForm />;
};

export default Index;