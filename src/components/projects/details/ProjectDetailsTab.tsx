import { MapPin, DollarSign, Building, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProjectDetailsTabProps {
  project: any;
}

export const ProjectDetailsTab = ({ project }: ProjectDetailsTabProps) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-gray-600">{project.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Industry</h4>
                <p className="text-sm text-gray-600">{project.industry || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
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
          
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Bid Due Date</h4>
                    <p className="text-sm text-gray-600">
                      {project.bids_due ? new Date(project.bids_due).toLocaleDateString() : 'Not specified'}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Prequalification</h4>
                    <p className="text-sm text-gray-600">
                      {project.prequalification ? 'Required' : 'Not required'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};