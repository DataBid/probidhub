import { Card, CardContent } from "@/components/ui/card";

interface ProjectIntelligenceTabProps {
  project: any;
}

export const ProjectIntelligenceTab = ({ project }: ProjectIntelligenceTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Market Intelligence</h3>
        <p className="text-gray-600">
          Market intelligence data will be displayed here, including project trends,
          regional statistics, and comparative analysis.
        </p>
      </CardContent>
    </Card>
  );
};