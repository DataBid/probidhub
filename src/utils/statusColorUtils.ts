
export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "closed":
      return "bg-red-100 text-red-800 border-red-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "viewed":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "responded":
      return "bg-green-100 text-green-800 border-green-300";
    case "blocked":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "viewed":
      return "bg-blue-100 text-blue-800";
    case "responded":
      return "bg-green-100 text-green-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
