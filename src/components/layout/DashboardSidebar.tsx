import { Home, FileText, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const DashboardSidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Projects", href: "/projects" },
    { icon: Users, label: "Contractors", href: "/contractors" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const MenuContent = () => (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => console.log(`Navigate to ${item.href}`)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className="flex flex-col items-center justify-center h-full w-full space-y-1 hover:bg-accent"
              onClick={() => console.log(`Navigate to ${item.href}`)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
        <div className="p-4">
          <MenuContent />
        </div>
      </div>
    </>
  );
};