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
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <MenuContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
        <MenuContent />
      </div>
    </>
  );
};