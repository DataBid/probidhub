import { Navbar } from "./Navbar";
import { DashboardSidebar } from "./DashboardSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 w-full pb-20 lg:pb-6">{children}</main>
      </div>
    </div>
  );
};