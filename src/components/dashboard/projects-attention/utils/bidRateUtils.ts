import { Project } from "../types";

export const calculateBidRates = (projects: Project[]) => {
  if (!projects?.length) return {
    viewedRate: 0,
    respondedRate: 0,
    pendingRate: 100,
    totalRate: 0
  };

  let totalBids = 0;
  let viewedBids = 0;
  let respondedBids = 0;

  projects.forEach(project => {
    const bids = project.bids || [];
    totalBids += bids.length;
    
    bids.forEach(bid => {
      if (bid.status === 'responded') {
        respondedBids++;
      } else if (bid.status === 'viewed' || bid.response_date) {
        viewedBids++;
      }
    });
  });

  const pendingBids = totalBids - (viewedBids + respondedBids);
  
  return {
    viewedRate: totalBids ? (viewedBids / totalBids) * 100 : 0,
    respondedRate: totalBids ? (respondedBids / totalBids) * 100 : 0,
    pendingRate: totalBids ? (pendingBids / totalBids) * 100 : 100,
    totalRate: totalBids ? ((viewedBids + respondedBids) / totalBids) * 100 : 0
  };
};