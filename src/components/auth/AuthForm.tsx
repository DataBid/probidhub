import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleSelect } from "./RoleSelect";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"gc" | "sub" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Starting authentication process for email:", email);

    try {
      if (isLogin) {
        console.log("Attempting login...");
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log("Login response:", { session, error });
        
        if (error) {
          console.error("Login error:", error);
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        if (session) {
          console.log("Login successful, redirecting to dashboard");
          toast({
            title: "Success",
            description: "Successfully logged in",
          });
          navigate("/dashboard");
        }
      } else {
        if (!role) {
          toast({
            title: "Error",
            description: "Please select a role",
            variant: "destructive",
          });
          return;
        }

        console.log("Attempting signup with role:", role);
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: role,
            },
          },
        });
        console.log("Signup response:", { data, signUpError });

        if (signUpError) {
          console.error("Signup error:", signUpError);
          toast({
            title: "Error",
            description: signUpError.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: "Please check your email to verify your account",
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-construction-50">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center mt-8">
          <Building2 className="h-12 w-12 text-primary mb-2" />
          <h1 className="text-3xl font-bold text-primary mb-4">BidWall</h1>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-construction-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            {!isLogin && <RoleSelect value={role} onChange={setRole} />}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-construction-500 hover:text-construction-700"
                disabled={isLoading}
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};