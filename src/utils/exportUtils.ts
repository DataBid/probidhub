import { format } from "date-fns";

export const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]?.toString() || '';
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const prepareAnalyticsData = (data: any[]) => {
  return data.map(item => ({
    Date: item.date,
    Project: item.fullTitle,
    'Response Rate (%)': item.responseRate,
    'Total Bids': item.totalBids
  }));
};

export const prepareProjectsData = (projects: any[]) => {
  return projects.map(project => ({
    Title: project.title,
    'Bid Deadline': project.bids_due ? format(new Date(project.bids_due), 'yyyy-MM-dd') : 'No deadline',
    'Total Bids': project.bids?.length || 0,
    'Pending Bids': project.pendingBids,
    Issues: project.issues.join(', ') || 'None',
    Location: project.location || 'N/A',
    Stage: project.stage || 'N/A'
  }));
};

export const prepareSubcontractorsData = (subcontractors: any[]) => {
  return subcontractors.map(sub => ({
    'Name': sub.name,
    'Company': sub.company,
    'Trade': sub.trade,
    'Email': sub.email,
    'Phone': sub.phone || 'N/A',
    'Location': sub.location || 'N/A',
    'Status': sub.status || 'N/A',
    'Created At': format(new Date(sub.created_at), 'yyyy-MM-dd'),
    'Last Updated': format(new Date(sub.updated_at), 'yyyy-MM-dd'),
    'Notes': sub.notes || ''
  }));
};
