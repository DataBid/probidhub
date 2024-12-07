import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface ProjectChecklistTabProps {
  project: any;
}

export const ProjectChecklistTab = ({ project }: ProjectChecklistTabProps) => {
  const checklistItems = [
    { id: 1, task: "Review Project Details", completed: true },
    { id: 2, task: "Download Bid Documents", completed: false },
    { id: 3, task: "Submit Questions", completed: false },
    { id: 4, task: "Attend Pre-bid Meeting", completed: false },
    { id: 5, task: "Upload Bid Documents", completed: false },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Bid Submission Checklist</h3>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
              <span className={item.completed ? "text-gray-600" : "text-gray-900"}>
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};