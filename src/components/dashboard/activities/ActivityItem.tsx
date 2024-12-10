import { formatDistanceToNow } from "date-fns";
import { Activity } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  UserPlus, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  Activity as ActivityIcon
} from "lucide-react";

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'project_created':
      return <FileText className="h-4 w-4" />;
    case 'subcontractor_added':
      return <UserPlus className="h-4 w-4" />;
    case 'bid_response':
      return <MessageSquare className="h-4 w-4" />;
    case 'bid_accepted':
      return <CheckCircle className="h-4 w-4" />;
    case 'bid_rejected':
      return <XCircle className="h-4 w-4" />;
    default:
      return <ActivityIcon className="h-4 w-4" />;
  }
};

const getActivityMessage = (activity: Activity) => {
  const userEmail = activity.profiles?.contact_email || 'Unknown user';
  const details = activity.details as Record<string, string>;

  switch (activity.action_type) {
    case 'project_created':
      return `${userEmail} created project "${details?.project_title}"`;
    case 'subcontractor_added':
      return `${userEmail} added subcontractor "${details?.subcontractor_name}"`;
    case 'bid_response':
      return `${userEmail} responded to bid for "${details?.project_title}"`;
    case 'bid_accepted':
      return `${userEmail} accepted bid from "${details?.subcontractor_name}"`;
    case 'bid_rejected':
      return `${userEmail} rejected bid from "${details?.subcontractor_name}"`;
    default:
      return `${userEmail} performed an action`;
  }
};

export const ActivityItem = ({ activity }: { activity: Activity }) => {
  return (
    <Card className="hover:bg-accent transition-colors">
      <CardContent className="p-4 flex items-start gap-4">
        <div className="mt-1">
          {getActivityIcon(activity.action_type)}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-foreground">
            {getActivityMessage(activity)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};