
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useUserProfile = () => {
  const session = useSession();

  return useQuery({
    queryKey: ["user-profile", session?.user?.id],
    queryFn: async () => {
      console.log("useUserProfile: Fetching user profile for:", session?.user?.id);
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("useUserProfile: Error fetching user profile:", error);
        throw error;
      }

      console.log("useUserProfile: User profile fetched:", data);
      return data;
    },
    enabled: !!session?.user?.id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (formerly cacheTime)
  });
};
