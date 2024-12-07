import { AuthForm } from "@/components/auth/AuthForm";

const Index = () => {
  const isAuthenticated = false; // This will be replaced with actual auth check

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-construction-900">Welcome to BuildBid</h1>
      <p className="mt-2 text-construction-600">
        Connect with contractors and manage your projects efficiently.
      </p>
    </div>
  );
};

export default Index;