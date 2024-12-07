import { MapPin, DollarSign, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectDetailsTabProps {
  project: any;
}

export const ProjectDetailsTab = ({ project }: ProjectDetailsTabProps) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
          <p className="text-gray-600 mb-6">{project.detail_of_services || 'No description available'}</p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-gray-600">{project.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Industry</h4>
                <p className="text-sm text-gray-600">{project.industry || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Project Class</h4>
                <p className="text-sm text-gray-600">{project.project_class || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Pre-bid Meeting</h4>
              {project.prebid_datetime ? (
                <div className="text-sm text-gray-600">
                  <p>Date: {new Date(project.prebid_datetime).toLocaleDateString()}</p>
                  <p>Location: {project.prebid_location || 'TBD'}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No pre-bid meeting scheduled</p>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Prequalification</h4>
              {project.prequalification ? (
                <div className="text-sm text-gray-600">
                  <p>Required</p>
                  <p>{project.prequalification_info}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Not required</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};