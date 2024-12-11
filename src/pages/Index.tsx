import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

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