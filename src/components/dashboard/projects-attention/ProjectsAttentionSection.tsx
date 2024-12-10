import { ProjectsAttention } from "../ProjectsAttention";

interface ProjectsAttentionSectionProps {
  userRole?: string;
}

export const ProjectsAttentionSection = ({ userRole }: ProjectsAttentionSectionProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6 w-full">
      <ProjectsAttention userRole={userRole} />
    </div>
  );
};