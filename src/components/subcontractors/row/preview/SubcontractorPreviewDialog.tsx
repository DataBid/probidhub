import { SubcontractorPreview } from "../../SubcontractorPreview";

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
    area_code?: string;
  };
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  onEdit?: () => void;
}

export const SubcontractorPreviewDialog = ({
  sub,
  previewOpen,
  setPreviewOpen,
  onEdit,
}: SubcontractorPreviewDialogProps) => {
  return (
    <SubcontractorPreview
      open={previewOpen}
      onOpenChange={setPreviewOpen}
      subcontractor={sub}
      onEdit={onEdit}
    />
  );
};