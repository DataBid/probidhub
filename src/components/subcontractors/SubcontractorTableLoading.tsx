import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SubcontractorTableLoading = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </Card>
  );
};