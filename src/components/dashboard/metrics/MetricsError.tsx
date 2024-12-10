import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const MetricsError = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error loading metrics</AlertTitle>
      <AlertDescription>
        There was a problem loading your metrics. Please try again later.
      </AlertDescription>
    </Alert>
  );
};