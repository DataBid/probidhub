import { useParams } from "react-router-dom";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProjectData(id);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
    </div>
  );
};

const ProjectDetailsSkeleton = () => (
  <div className="min-h-screen bg-[#F7F7F7]">
    <div className="w-full bg-white border-b">
      <div className="container mx-auto py-6 px-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDetails;