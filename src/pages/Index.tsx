import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      window.location.href = "/dashboard";
    } else {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return null; // Return nothing while loading to prevent flash
  }

  return <AuthForm />;
};

export default Index;