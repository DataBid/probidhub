import { Card } from "@/components/ui/card";
import { SubcontractorForm } from "./SubcontractorForm";
import { SubcontractorTableLoading } from "./SubcontractorTableLoading";
import { SubcontractorTableContent } from "./SubcontractorTableContent";
import { SubcontractorBulkActions } from "./SubcontractorBulkActions";
import { SubcontractorTablePagination } from "./SubcontractorTablePagination";
import { useSubcontractorTable } from "./hooks/useSubcontractorTable";
import { sortSubcontractors } from "./utils/sortUtils";
import { SubcontractorTableProps } from "./types";

const ITEMS_PER_PAGE = 10;

export const SubcontractorTable = ({
  subcontractors,
  isLoading,
  refetch,
}: SubcontractorTableProps) => {
  const {
    formOpen,
    setFormOpen,
    selectedSubcontractor,
    sortConfig,
    setSortConfig,
    selectedIds,
    setSelectedIds,
    currentPage,
    setCurrentPage,
    handleEdit,
    handleDelete,
    handleBulkDelete,
    handleBulkInvite,
    handleBulkStatusChange,
    handleInvite,
  } = useSubcontractorTable(subcontractors, refetch);

  const sortedSubcontractors = sortSubcontractors(subcontractors, sortConfig);

  // Calculate pagination
  const totalPages = Math.ceil(sortedSubcontractors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubcontractors = sortedSubcontractors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]); // Clear selections when changing pages
  };

  if (isLoading) {
    return <SubcontractorTableLoading />;
  }

  return (
    <Card className="p-3 sm:p-6">
      <SubcontractorBulkActions
        selectedIds={selectedIds}
        onDelete={handleBulkDelete}
        onInvite={handleBulkInvite}
        onStatusChange={handleBulkStatusChange}
      />
      <SubcontractorTableContent
        subcontractors={paginatedSubcontractors}
        selectedIds={selectedIds}
        onSelectAll={(checked) => {
          if (checked) {
            setSelectedIds(paginatedSubcontractors.map(sub => sub.id));
          } else {
            setSelectedIds([]);
          }
        }}
        onSelectOne={(id, checked) => {
          if (checked) {
            setSelectedIds(prev => [...prev, id]);
          } else {
            setSelectedIds(prev => prev.filter(prevId => prevId !== id));
          }
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onInvite={handleInvite}
        sortConfig={sortConfig}
        onSort={(column) => setSortConfig(prev => {
          if (!prev || prev.column !== column) {
            return { column, direction: 'asc' };
          }
          if (prev.direction === 'asc') {
            return { column, direction: 'desc' };
          }
          return null;
        })}
      />
      <SubcontractorTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <SubcontractorForm
        open={formOpen}
        onOpenChange={setFormOpen}
        subcontractor={selectedSubcontractor}
        onSuccess={() => {
          refetch();
          setFormOpen(false);
        }}
      />
    </Card>
  );
};