import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onToggleMode: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoginForm = ({ onToggleMode, isLoading, setIsLoading }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    console.log("LoginForm: Attempting login");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("LoginForm: Login error:", error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user && data.session) {
        console.log("LoginForm: Login successful");
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
      }
    } catch (error: any) {
      console.error("LoginForm: Unexpected error:", error);
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
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </Button>
      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm text-construction-500 hover:text-construction-700"
          disabled={isLoading}
        >
          Need an account? Sign up
        </button>
      </div>
    </form>
  );
};