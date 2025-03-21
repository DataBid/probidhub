
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      console.log("Index: Session detected, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-construction-50">
      <AuthForm />
      <div className="mt-4">
        <Link to="/test-users">
          <Button variant="outline">Create Test Users</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
