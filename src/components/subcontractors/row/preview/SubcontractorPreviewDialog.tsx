import { SubcontractorPreview } from "../../SubcontractorPreview";
import { SendMessageDialog } from "../../communication/SendMessageDialog";
import { CommunicationHistory } from "../../communication/CommunicationHistory";

interface SubcontractorPreviewDialogProps {
  sub: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone?: string;
    location?: string;
    notes?: string;
    trade: string;
    status?: string;
  };
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
}

export const SubcontractorPreviewDialog = ({
  sub,
  previewOpen,
  setPreviewOpen,
}: SubcontractorPreviewDialogProps) => {
  return (
    <>
      <SubcontractorPreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        subcontractor={sub}
      />
    </>
  );
};