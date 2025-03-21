
import { 
  Home, FileText, Users, Settings, Search, Inbox, Award, 
  BarChart, ShieldCheck, Wrench, UserCog, FileStack
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();
  
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", href: "/dashboard" },
    ];

    const gcItems = [
      { icon: FileText, label: "Projects", href: "/projects" },
      { icon: Users, label: "Subcontractors", href: "/subcontractors" },
      { icon: BarChart, label: "Analytics", href: "/analytics" },
    ];

    const subItems = [
      { icon: Inbox, label: "Bid Board", href: "/bid-board" },
      { icon: Search, label: "Find Projects", href: "/projects" },
      { icon: Award, label: "Prequalification", href: "/prequalification" },
    ];

    const adminItems = [
      { icon: ShieldCheck, label: "Admin Panel", href: "/admin" },
      { icon: UserCog, label: "User Management", href: "/users" },
      { icon: Wrench, label: "System Config", href: "/system" },
      { icon: FileStack, label: "Activity Logs", href: "/logs" },
    ];

    // Common items at the end for all users
    const commonItems = [
      { icon: Settings, label: "Settings", href: "/settings" },
    ];

    const items = [...baseItems];

    if (userProfile?.role === "gc") {
      items.push(...gcItems);
    } else if (userProfile?.role === "sub") {
      items.push(...subItems);
    } else if (userProfile?.role === "admin") {
      items.push(...adminItems);
    }

    return [...items, ...commonItems];
  };

  const menuItems = getMenuItems();

  const isActive = (href: string) => location.pathname === href;

  const MenuContent = () => (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className={`w-full justify-start ${
            isActive(item.href)
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "hover:bg-accent"
          }`}
          onClick={() => navigate(item.href)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r min-h-full">
        <div className="p-4">
          <MenuContent />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {menuItems.slice(0, 4).map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center h-full w-full space-y-1 ${
                isActive(item.href)
                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                  : "hover:bg-accent"
              }`}
              onClick={() => navigate(item.href)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
