import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MetricsErrorProps {
  title?: string;
  description?: string;
}

export const MetricsError = ({ 
  title = "Error loading metrics",
  description = "There was a problem loading your metrics. Please try again later."
}: MetricsErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};