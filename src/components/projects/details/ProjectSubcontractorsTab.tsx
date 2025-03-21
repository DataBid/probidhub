
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/utils/statusColorUtils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectSubcontractorsTabProps {
  project: any;
}

export const ProjectSubcontractorsTab = ({ project }: ProjectSubcontractorsTabProps) => {
  const [expandedTrade, setExpandedTrade] = useState<string | null>(null);

  // Group subcontractors by trade
  const trades: Record<string, any[]> = {};
  
  const subcontractors = project.bids?.map((bid: any) => ({
    id: bid.id,
    name: bid.profiles?.company_name || 'Unknown Company',
    email: bid.profiles?.contact_email,
    phone: bid.profiles?.phone,
    status: bid.status,
    trade: bid.profiles?.trade || 'General',
    responseDate: bid.response_date,
    location: bid.profiles?.location,
  })) || [];
  
  // Group subcontractors by trade
  subcontractors.forEach((sub: any) => {
    if (!trades[sub.trade]) {
      trades[sub.trade] = [];
    }
    trades[sub.trade].push(sub);
  });

  const toggleTrade = (trade: string) => {
    if (expandedTrade === trade) {
      setExpandedTrade(null);
    } else {
      setExpandedTrade(trade);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Bid Packages by Trade</h3>
            <Button variant="outline" size="sm">
              Invite New Subcontractor
            </Button>
          </div>
          
          <div className="space-y-2">
            {Object.keys(trades).map((trade) => (
              <div key={trade} className="border rounded-md overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => toggleTrade(trade)}
                >
                  <div className="flex items-center gap-2">
                    {expandedTrade === trade ? 
                      <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    }
                    <span className="font-medium">{trade}</span>
                    <Badge variant="outline" className="ml-2">
                      {trades[trade].length}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trades[trade].filter((sub: any) => sub.status === 'responded').length}/{trades[trade].length} Responded
                  </div>
                </div>
                
                {expandedTrade === trade && (
                  <div className="p-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Response Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trades[trade].map((sub: any) => (
                          <TableRow key={sub.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${sub.name}`} />
                                  <AvatarFallback>
                                    <Building2 className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{sub.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{sub.email}</TableCell>
                            <TableCell>{sub.location || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sub.status)}>
                                {sub.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{sub.responseDate ? new Date(sub.responseDate).toLocaleDateString() : 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Response Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{subcontractors.length}</div>
              <div className="text-sm text-muted-foreground">Total Invited</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-500">
                {subcontractors.filter(sub => sub.status === 'viewed').length}
              </div>
              <div className="text-sm text-muted-foreground">Viewed Invitation</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-green-500">
                {subcontractors.filter(sub => sub.status === 'responded').length}
              </div>
              <div className="text-sm text-muted-foreground">Responded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
