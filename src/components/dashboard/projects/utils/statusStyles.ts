export const getStatusBadge = (status: string) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    closed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };
  return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
};