import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { useState, useCallback } from "react";

interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  sectionId: string;
  progress: number;
}

interface ProjectChecklistProps {
  project: {
    id: string;
    title: string;
  };
}

export const ProjectChecklistTab = ({ project }: ProjectChecklistProps) => {
  console.log('Rendering ProjectChecklistTab with project:', { id: project?.id, title: project?.title });
  
  const [checklistItems] = useState<ChecklistItem[]>([
    { 
      id: '1', 
      task: "Review Project Details", 
      completed: true,
      sectionId: "details",
      progress: 100 
    },
    { 
      id: '2', 
      task: "Download Bid Documents", 
      completed: false,
      sectionId: "files",
      progress: 0 
    },
    { 
      id: '3', 
      task: "Submit Questions", 
      completed: false,
      sectionId: "details",
      progress: 30 
    },
    { 
      id: '4', 
      task: "Attend Pre-bid Meeting", 
      completed: false,
      sectionId: "details",
      progress: 0 
    },
    { 
      id: '5', 
      task: "Upload Bid Documents", 
      completed: false,
      sectionId: "files",
      progress: 0 
    }
  ]);

  const completedTasks = checklistItems.filter(item => item.completed).length;
  const totalTasks = checklistItems.length;
  const overallProgress = Math.floor((completedTasks / totalTasks) * 100);

  const handleSectionClick = useCallback((sectionId: string) => {
    console.log('Attempting to scroll to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      console.log('Successfully scrolled to element:', sectionId);
    } else {
      console.log('Element not found:', sectionId);
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Bid Submission Checklist</h3>
              <span className="text-sm text-gray-500">
                {completedTasks}/{totalTasks} tasks completed
              </span>
            </div>
            
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {checklistItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={item.completed ? "text-gray-600" : "text-gray-900"}>
                      {item.task}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-hover"
                    onClick={() => handleSectionClick(item.sectionId)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Go to section
                  </Button>
                </div>
                <Progress value={item.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};