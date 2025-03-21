
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Filter, Calendar, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getStatusColor, getStatusDotColor } from "@/utils/statusColorUtils";

interface ProjectBidPackagesTabProps {
  project: any;
}

export const ProjectBidPackagesTab = ({ project }: ProjectBidPackagesTabProps) => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  // Mock data for demo purposes
  const bidPackages = [
    {
      id: "1",
      name: "Concrete and Foundation",
      count: 4,
      priority: "High",
      responded: 2,
      viewed: 1,
      pending: 1,
      subcontractors: [
        { id: "1", name: "Solid Foundation Concrete", status: "Responded", location: "San Francisco, CA", distance: "22 miles" },
        { id: "2", name: "Precision Pour", status: "Viewed", location: "Oakland, CA", distance: "18 miles" },
        { id: "3", name: "Bay Area Concrete", status: "Pending", location: "San Jose, CA", distance: "42 miles" },
        { id: "4", name: "Stronghold Solutions", status: "Responded", location: "Richmond, CA", distance: "15 miles" },
      ]
    },
    {
      id: "2",
      name: "Electrical Systems",
      count: 3,
      priority: "Medium",
      responded: 1,
      viewed: 1,
      pending: 1,
      subcontractors: [
        { id: "5", name: "PowerWorks Electric", status: "Responded", location: "San Francisco, CA", distance: "5 miles" },
        { id: "6", name: "LiveWire Solutions", status: "Viewed", location: "Palo Alto, CA", distance: "28 miles" },
        { id: "7", name: "Circuit Masters", status: "Pending", location: "Fremont, CA", distance: "32 miles" },
      ]
    },
    {
      id: "3",
      name: "Plumbing and HVAC",
      count: 5,
      priority: "Medium",
      responded: 2,
      viewed: 2,
      pending: 1,
      subcontractors: [
        { id: "8", name: "FlowMasters Plumbing", status: "Responded", location: "San Mateo, CA", distance: "15 miles" },
        { id: "9", name: "Climate Control Inc", status: "Viewed", location: "San Francisco, CA", distance: "3 miles" },
        { id: "10", name: "Pipe Perfection", status: "Pending", location: "Berkeley, CA", distance: "12 miles" },
        { id: "11", name: "Air Systems Ltd", status: "Viewed", location: "Daly City, CA", distance: "8 miles" },
        { id: "12", name: "Total Comfort Solutions", status: "Responded", location: "San Rafael, CA", distance: "18 miles" },
      ]
    },
    {
      id: "4",
      name: "Drywall and Finishing",
      count: 2,
      priority: "Low",
      responded: 0,
      viewed: 1,
      pending: 1,
      subcontractors: [
        { id: "13", name: "Smooth Finish Drywall", status: "Viewed", location: "Oakland, CA", distance: "18 miles" },
        { id: "14", name: "Interior Experts", status: "Pending", location: "San Francisco, CA", distance: "2 miles" },
      ]
    },
  ];

  const togglePackage = (id: string) => {
    if (expandedPackage === id) {
      setExpandedPackage(null);
    } else {
      setExpandedPackage(id);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bid Packages</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-primary">{bidPackages.reduce((acc, p) => acc + p.count, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Invitations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-yellow-500">
              {bidPackages.reduce((acc, p) => acc + p.viewed, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Invitations Viewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-green-500">
              {bidPackages.reduce((acc, p) => acc + p.responded, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Responses Received</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {bidPackages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => togglePackage(pkg.id)}
            >
              <div className="flex items-center gap-3">
                {expandedPackage === pkg.id ? 
                  <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                }
                <div>
                  <div className="font-medium">{pkg.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.count} subcontractors invited
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium hidden sm:block">
                  Priority: <span className={getPriorityClass(pkg.priority)}>{pkg.priority}</span>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-sm text-right mb-1">
                    {pkg.responded}/{pkg.count} Responses ({Math.round((pkg.responded / pkg.count) * 100)}%)
                  </div>
                  <Progress 
                    value={(pkg.responded / pkg.count) * 100} 
                    className="h-2 w-32 bg-gray-200"
                  />
                </div>
                
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Invite
                </Button>
              </div>
            </div>
            
            {expandedPackage === pkg.id && (
              <CardContent className="border-t pt-0 px-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Subcontractor</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Location</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Distance</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.subcontractors.map((sub) => (
                        <tr key={sub.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">{sub.name}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(sub.status)}>
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm">{sub.location}</td>
                          <td className="p-3 text-sm">{sub.distance}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Follow Up
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                View Docs
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
