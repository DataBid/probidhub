import { RecentProjects } from "../RecentProjects";

interface RecentProjectsSectionProps {
  userRole?: string;
  isGC: boolean;
}

export const RecentProjectsSection = ({ userRole, isGC }: RecentProjectsSectionProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
      <h2 className="text-lg font-semibold text-construction-900 mb-4 sm:mb-6">
        {isGC ? "Recently Posted Projects" : "Available Projects"}
      </h2>
      <RecentProjects userRole={userRole} />
    </div>
  );
};