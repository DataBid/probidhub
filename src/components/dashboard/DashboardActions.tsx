
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, FolderOpen, Clock, ListChecks, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { addDays } from "date-fns";

interface DashboardActionsProps {
  userRole?: string;
}

export const DashboardActions = ({ userRole }: DashboardActionsProps) => {
  const isGC = userRole === "gc";
  const navigate = useNavigate();

  // Fetch urgent projects count (deadline within 3 days)
  const { data: urgentProjectsCount = 0 } = useQuery({
    queryKey: ["urgent-projects-count"],
    queryFn: async () => {
      const threeDaysFromNow = addDays(new Date(), 3).toISOString();
      const { data, error } = await supabase
        .from("projects")
        .select("id", { count: "exact" })
        .gt("bids_due", new Date().toISOString())
        .lt("bids_due", threeDaysFromNow);

      if (error) {
        console.error("Error fetching urgent projects count:", error);
        return 0;
      }

      return data?.length || 0;
    },
    enabled: isGC
  });

  // Fetch pending bids count
  const { data: pendingBidsCount = 0 } = useQuery({
    queryKey: ["pending-bids-count"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bids")
        .select("id", { count: "exact" })
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending bids count:", error);
        return 0;
      }

      return data?.length || 0;
    },
    enabled: isGC
  });

  return (
    <div className="bg-white rounded-lg shadow-md border mb-6 w-full transition-all duration-300 hover:shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {isGC && (
              <Button 
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 w-full transform hover:-translate-y-1"
                onClick={() => navigate('/projects/new')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            )}
            
            {isGC && (
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8a76e4] text-white transition-all duration-300 w-full transform hover:-translate-y-1"
                onClick={() => navigate('/subcontractors')}
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Subcontractors
              </Button>
            )}
            
            <Button 
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white transition-all duration-300 w-full transform hover:-translate-y-1"
              onClick={() => navigate('/projects')}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              {isGC ? "All Projects" : "Available Projects"}
            </Button>
            
            {pendingBidsCount > 0 && isGC && (
              <Button 
                variant="outline"
                className="border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10 w-full justify-between transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate('/bids')}
              >
                <span className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Pending Bids
                </span>
                <Badge className="bg-[#F97316] hover:bg-[#F97316] text-white animate-pulse">
                  {pendingBidsCount}
                </Badge>
              </Button>
            )}
            
            {urgentProjectsCount > 0 && isGC && (
              <Button 
                variant="outline"
                className="border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10 w-full justify-between transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate('/projects?filter=upcoming')}
              >
                <span className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Urgent Deadlines
                </span>
                <Badge className="bg-[#ea384c] hover:bg-[#ea384c] text-white animate-pulse">
                  {urgentProjectsCount}
                </Badge>
              </Button>
            )}
          </div>
          
          {/* What's Next Section */}
          {isGC && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                <ListChecks className="mr-2 h-4 w-4 text-primary" />
                What's Next
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pendingBidsCount > 0 && (
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                    onClick={() => navigate('/bids')}
                  >
                    Review {pendingBidsCount} pending {pendingBidsCount === 1 ? 'bid' : 'bids'}
                  </Button>
                )}
                
                {urgentProjectsCount > 0 && (
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                    onClick={() => navigate('/projects?filter=upcoming')}
                  >
                    Address {urgentProjectsCount} upcoming {urgentProjectsCount === 1 ? 'deadline' : 'deadlines'}
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  className="justify-start text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                  onClick={() => navigate('/analytics')}
                >
                  Review project analytics
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
