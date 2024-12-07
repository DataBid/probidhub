import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-construction-900">BidWall</span>
        </div>
        <Button variant="ghost" onClick={() => console.log("Sign out")}>
          Sign Out
        </Button>
      </div>
    </nav>
  );
};