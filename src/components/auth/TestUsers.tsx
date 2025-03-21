
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const TestUsers = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [subEmail, setSubEmail] = useState("test_sub@example.com");
  const [subPassword, setSubPassword] = useState("test_sub_password");
  const [adminEmail, setAdminEmail] = useState("test_admin@example.com");
  const [adminPassword, setAdminPassword] = useState("test_admin_password");
  const { toast } = useToast();

  const createTestUser = async (email: string, password: string, role: "gc" | "sub" | "admin") => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Test user created",
        description: `Created ${role} user with email: ${email}`,
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error creating test user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateTestUsers = async () => {
    setIsCreating(true);
    
    try {
      // Create a test Sub user
      await createTestUser(subEmail, subPassword, "sub");
      
      // Create a test Admin user
      await createTestUser(adminEmail, adminPassword, "admin");
      
      toast({
        title: "Test users created",
        description: "You can now login using these test accounts",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Test Users</CardTitle>
        <CardDescription>Create test users for different roles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subEmail">Subcontractor Email</Label>
          <Input 
            id="subEmail" 
            value={subEmail} 
            onChange={(e) => setSubEmail(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subPassword">Subcontractor Password</Label>
          <Input 
            id="subPassword" 
            type="password" 
            value={subPassword} 
            onChange={(e) => setSubPassword(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adminEmail">Admin Email</Label>
          <Input 
            id="adminEmail" 
            value={adminEmail} 
            onChange={(e) => setAdminEmail(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adminPassword">Admin Password</Label>
          <Input 
            id="adminPassword" 
            type="password" 
            value={adminPassword} 
            onChange={(e) => setAdminPassword(e.target.value)} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateTestUsers}
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? "Creating..." : "Create Test Users"}
        </Button>
      </CardFooter>
    </Card>
  );
};
