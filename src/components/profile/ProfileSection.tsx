import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ProfileSection = () => {
  const session = useSession();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    company_name: "",
    phone: "",
    contact_email: session?.user?.email || "",
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${session?.user?.id}-avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          company_name: profile.company_name,
          phone: profile.phone,
          contact_email: profile.contact_email,
        })
        .eq("id", session?.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`${supabase.storage.from("avatars").getPublicUrl(`${session?.user?.id}-avatar`).data.publicUrl}`} />
            <AvatarFallback>
              {session?.user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <Label htmlFor="avatar" className="cursor-pointer">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                {uploading ? "Uploading..." : "Upload Avatar"}
              </div>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={profile.company_name}
              onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile.contact_email}
              onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};