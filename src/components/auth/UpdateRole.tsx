
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const UpdateRole = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const updateUserRole = async (role: "gc" | "sub" | "admin") => {
    setIsUpdating(true);
    
    try {
      // First, get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No authenticated user found");
      }
      
      // Update the user's role in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({ role: role })
        .eq("id", user.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Role updated",
        description: `Your role has been updated to: ${role}`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Update Your Role</CardTitle>
        <CardDescription>Change your user role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>If you are currently logged in, you can update your role using these buttons:</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          <Button 
            onClick={() => updateUserRole("gc")}
            disabled={isUpdating}
            className="flex-1"
            variant="outline"
          >
            Set as GC
          </Button>
          <Button 
            onClick={() => updateUserRole("sub")}
            disabled={isUpdating}
            className="flex-1"
            variant="outline"
          >
            Set as Sub
          </Button>
          <Button 
            onClick={() => updateUserRole("admin")}
            disabled={isUpdating}
            className="flex-1"
            variant="outline"
          >
            Set as Admin
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
