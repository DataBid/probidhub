import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface SimilarProjectsProps {
  currentProject: any;
}

export const SimilarProjects = ({ currentProject }: SimilarProjectsProps) => {
  // This would typically fetch similar projects based on the current project's attributes
  const similarProjects = [
    {
      id: 1,
      title: "Similar Construction Project 1",
      location: "Nearby Location",
      budget: "$500,000",
      status: "Active",
    },
    {
      id: 2,
      title: "Similar Construction Project 2",
      location: "Another Location",
      budget: "$750,000",
      status: "Active",
    },
    {
      id: 3,
      title: "Similar Construction Project 3",
      location: "Different Location",
      budget: "$600,000",
      status: "Closed",
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Similar Projects</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {similarProjects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">{project.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{project.budget}</span>
                <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};