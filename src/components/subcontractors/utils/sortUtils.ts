export const sortSubcontractors = (subcontractors: any[], sortConfig: any) => {
  if (!sortConfig) return subcontractors;

  return [...subcontractors].sort((a, b) => {
    const { column, direction } = sortConfig;
    const aValue = a[column]?.toLowerCase() || '';
    const bValue = b[column]?.toLowerCase() || '';

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const handleSort = (currentSort: any, column: string) => {
  if (!currentSort || currentSort.column !== column) {
    return { column, direction: 'asc' };
  }
  if (currentSort.direction === 'asc') {
    return { column, direction: 'desc' };
  }
  return null;
};