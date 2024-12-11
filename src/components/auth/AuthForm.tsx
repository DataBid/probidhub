import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-construction-50">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center mt-8">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-1">ProBidHub</h1>
          <p className="text-sm text-construction-500 mb-4">Construction Bidding</p>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-construction-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <LoginForm
              onToggleMode={() => setIsLogin(false)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <SignupForm
              onToggleMode={() => setIsLogin(true)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};