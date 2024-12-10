import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MetricsLoading = () => {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-construction-900 mb-3 sm:mb-4">Quick Metrics</h2>
      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-3 sm:p-4 lg:pt-6">
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};