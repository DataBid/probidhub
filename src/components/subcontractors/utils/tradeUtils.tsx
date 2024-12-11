import { Building2, Wrench, Zap, Droplet, PaintBucket, Hammer, Truck, Shovel, Warehouse } from "lucide-react";

export const getTradeIcon = (trade: string) => {
  const normalizedTrade = trade.toLowerCase();
  
  switch (normalizedTrade) {
    case "electrical":
      return Zap;
    case "plumbing":
      return Droplet;
    case "general contractor":
      return Building2;
    case "mechanical":
      return Wrench;
    case "painting":
      return PaintBucket;
    case "carpentry":
      return Hammer;
    case "excavation":
      return Shovel;
    case "hauling":
      return Truck;
    default:
      return Warehouse;
  }
};

export const getTradeColor = (trade: string) => {
  const normalizedTrade = trade.toLowerCase();
  
  switch (normalizedTrade) {
    case "electrical":
      return "text-blue-500";
    case "plumbing":
      return "text-cyan-500";
    case "general contractor":
      return "text-purple-500";
    case "mechanical":
      return "text-orange-500";
    case "painting":
      return "text-pink-500";
    case "carpentry":
      return "text-amber-500";
    case "excavation":
      return "text-brown-500";
    case "hauling":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "blocked":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};