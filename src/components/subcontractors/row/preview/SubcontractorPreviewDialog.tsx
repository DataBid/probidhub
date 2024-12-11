import { SubcontractorPreview } from "../../SubcontractorPreview";
import { CompanyData } from "../../types/filterTypes";

interface SubcontractorPreviewDialogProps {
  sub: CompanyData;
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