import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Validate UUID format
  useEffect(() => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (id && !uuidRegex.test(id)) {
      console.error('Invalid project ID format:', id);
      navigate('/dashboard');
      return;
    }
  }, [id, navigate]);

  const { data: project, isLoading, error } = useProjectData(id);

  console.log('Project details page - Project ID:', id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div>Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
    </div>
  );
};

export default ProjectDetails;