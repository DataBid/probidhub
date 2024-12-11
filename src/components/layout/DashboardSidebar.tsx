import { Home, FileText, Users, Settings, Search, Inbox, Award, BarChart } from "lucide-react";
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
      { icon: Settings, label: "Settings", href: "/settings" },
    ];

    const gcItems = [
      { icon: FileText, label: "Projects", href: "/projects" },
      { icon: Users, label: "Saved Companies", href: "/subcontractors" }, // Updated label here
      { icon: BarChart, label: "Analytics", href: "/analytics" },
    ];

    const subItems = [
      { icon: Inbox, label: "Invitations", href: "/invitations" },
      { icon: Search, label: "Find Projects", href: "/projects" },
      { icon: Award, label: "Prequalification", href: "/prequalification" },
    ];

    return [
      ...baseItems,
      ...(userProfile?.role === "gc" ? gcItems : []),
      ...(userProfile?.role === "sub" ? subItems : []),
    ];
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