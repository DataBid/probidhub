import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ProjectFilesTabProps {
  project: any;
}

export const ProjectFilesTab = ({ project }: ProjectFilesTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Files</h3>
        <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
          <div className="text-center">
            <FileText className="w-8 h-8 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop files here or click to upload
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};