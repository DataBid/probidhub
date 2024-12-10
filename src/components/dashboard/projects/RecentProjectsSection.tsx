import { useEffect } from "react";
import { RecentProjects } from "../RecentProjects";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RecentProjectsSectionProps {
  userRole?: string;
  isGC: boolean;
}

export const RecentProjectsSection = ({ userRole, isGC }: RecentProjectsSectionProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("Setting up real-time projects subscription");
    
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Received project change:', payload);
          
          // Invalidate and refetch projects
          queryClient.invalidateQueries({ queryKey: ['recent-projects'] });
          
          // Show relevant toast messages
          if (payload.eventType === 'UPDATE') {
            const newStage = payload.new.stage;
            const oldStage = payload.old.stage;
            
            if (newStage !== oldStage) {
              toast.info(`Project status updated to ${newStage}`);
            }
          } else if (payload.eventType === 'INSERT') {
            toast.success('New project added');
          }
        }
      )
      .subscribe((status) => {
        console.log('Project subscription status:', status);
      });

    return () => {
      console.log("Cleaning up projects subscription");
      channel.unsubscribe();
    };
  }, [queryClient]);

  return (
    <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
      <h2 className="text-lg font-semibold text-construction-900 mb-4 sm:mb-6">
        {isGC ? "Recently Posted Projects" : "Available Projects"}
      </h2>
      <RecentProjects userRole={userRole} />
    </div>
  );
};