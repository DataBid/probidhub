import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InviteActionProps {
  onInvite: () => void;
  disabled?: boolean;
}

export const InviteAction = ({ onInvite, disabled }: InviteActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onInvite();
            }}
            disabled={disabled}
          >
            {disabled ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Invite to bid</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};