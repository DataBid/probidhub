import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to BidWall</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
            <p className="text-gray-600">View and manage your current projects</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Bids</h2>
            <p className="text-gray-600">Track your recent bidding activity</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Company Profile</h2>
            <p className="text-gray-600">Manage your company information</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;