
export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "closed":
      return "bg-red-100 text-red-800 border-red-300";
    case "in_progress":
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "viewed":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "responded":
      return "bg-green-100 text-green-800 border-green-300";
    case "blocked":
      return "bg-red-100 text-red-800 border-red-300";
    case "invited":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "declined":
      return "bg-red-100 text-red-800 border-red-300";
    case "accepted":
      return "bg-green-100 text-green-800 border-green-300";
    case "submitted":
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-300";
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
    case "invited":
      return "bg-purple-100 text-purple-800";
    case "in_progress":
    case "in progress":
      return "bg-blue-100 text-blue-800";
    case "submitted":
      return "bg-indigo-100 text-indigo-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "declined":
      return "bg-red-100 text-red-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// For colored icons/indicators
export const getStatusDotColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "closed":
      return "bg-red-500";
    case "in_progress":
    case "in progress":
      return "bg-blue-500";
    case "viewed":
      return "bg-blue-500";
    case "responded":
      return "bg-green-500";
    case "invited":
      return "bg-purple-500";
    case "submitted":
      return "bg-indigo-500";
    case "accepted":
      return "bg-green-500";
    case "declined":
      return "bg-red-500";
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
};
