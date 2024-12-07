import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectStatusBadgeProps {
  status: string;
  className?: string;
}

export const ProjectStatusBadge = ({ status, className }: ProjectStatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return {
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: <AlertTriangle className="w-4 h-4" />
        };
      case 'closed':
        return {
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: <XCircle className="w-4 h-4" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <AlertTriangle className="w-4 h-4" />
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border",
      config.color,
      className
    )}>
      {config.icon}
      {status || 'Unknown'}
    </span>
  );
};