import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RoleSelect } from "./RoleSelect";

interface SignupFormProps {
  onToggleMode: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const SignupForm = ({ onToggleMode, isLoading, setIsLoading }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"gc" | "sub" | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!role) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("SignupForm: Attempting signup");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });

      if (signUpError) {
        console.error("SignupForm: Signup error:", signUpError.message);
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
    } catch (error: any) {
      console.error("SignupForm: Unexpected error:", error);
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
      <RoleSelect value={role} onChange={setRole} />
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Create Account"}
      </Button>
      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm text-construction-500 hover:text-construction-700"
          disabled={isLoading}
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};