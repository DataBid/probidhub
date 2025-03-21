
import { TestUsers } from "@/components/auth/TestUsers";
import { UpdateRole } from "@/components/auth/UpdateRole";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TestUsersPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Test User Management</h1>
      <TestUsers />
      <UpdateRole />
      <div className="mt-8 text-center text-sm text-gray-500">
        <p className="mb-2">For test accounts, use the provided credentials.</p>
        <p>For your existing account, use the Update Role buttons to change your role.</p>
      </div>
      <div className="mt-6">
        <Link to="/">
          <Button variant="default">Back to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default TestUsersPage;
