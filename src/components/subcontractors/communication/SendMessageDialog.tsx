import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractorId: string;
  subcontractorEmail: string;
  onSuccess?: () => void;
}

export const SendMessageDialog = ({
  open,
  onOpenChange,
  subcontractorId,
  subcontractorEmail,
  onSuccess,
}: SendMessageDialogProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  const handleSend = async () => {
    if (!user?.id) return;
    
    setIsSending(true);
    try {
      console.log('Sending message to subcontractor:', subcontractorId);
      
      // Store in communication_logs
      const { error: logError } = await supabase
        .from('communication_logs')
        .insert({
          subcontractor_id: subcontractorId,
          gc_id: user.id,
          type: 'email',
          subject,
          content: message,
        });

      if (logError) throw logError;

      // Call edge function to send email (you'll implement this later)
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          to: [subcontractorEmail],
          subject,
          html: message,
        },
      });

      if (emailError) throw emailError;

      toast({
        title: "Message sent successfully",
        description: "Your message has been sent and logged.",
      });

      onSuccess?.();
      onOpenChange(false);
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSend}
            disabled={!subject || !message || isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};