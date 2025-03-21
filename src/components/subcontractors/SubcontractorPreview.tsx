
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  ExternalLink,
  Mail,
  PhoneCall,
  Edit,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  FileText,
  Calendar,
  Tag
} from "lucide-react";
import { ContactSection } from "./preview/ContactSection";
import { BusinessSection } from "./preview/BusinessSection";
import { CommunicationSection } from "./preview/CommunicationSection";
import { BidsSection } from "./preview/BidsSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStatusColor } from "@/utils/statusColorUtils";
import { Badge } from "@/components/ui/badge";

interface SubcontractorPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor: {
    id: string;
    name: string;
    company: string;
    email: string;
    area_code?: string;
    phone?: string;
    location?: string;
    notes?: string;
    trade: string;
    status?: string;
    last_contact?: string;
    company_type: string;
  };
  onEdit?: () => void;
}

export const SubcontractorPreview = ({
  open,
  onOpenChange,
  subcontractor,
  onEdit,
}: SubcontractorPreviewProps) => {
  const { toast } = useToast();

  const handleCall = () => {
    if (subcontractor.phone) {
      window.location.href = `tel:${(subcontractor.area_code || '') + subcontractor.phone}`;
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:${subcontractor.email}`;
  };

  // Mock data for enhanced profile display
  const recentProjects = [
    { id: 1, name: "Office Tower Renovation", role: "Main Contractor", date: "2023-08-15" },
    { id: 2, name: "Retail Space Buildout", role: "Subcontractor", date: "2023-06-22" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 transition-transform hover:scale-105 border-2 border-primary/10">
                <AvatarImage 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${subcontractor.company}`} 
                  alt={subcontractor.company} 
                />
                <AvatarFallback className="text-lg">
                  {subcontractor.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl">{subcontractor.company}</SheetTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">{subcontractor.trade}</span>
                </div>
                <Badge className={`mt-2 ${getStatusColor(subcontractor.status || '')}`}>
                  {subcontractor.status || 'Unknown Status'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEmail}
                title="Send email"
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Button>
              {subcontractor.phone && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCall}
                  title="Call"
                  className="rounded-full hover:bg-primary/10 transition-colors"
                >
                  <PhoneCall className="h-4 w-4" />
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    onEdit();
                    onOpenChange(false);
                  }}
                  title="Edit"
                  className="rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <SheetDescription>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{subcontractor.location || 'Location not specified'}</span>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Last Contact</p>
                <p className="font-medium">
                  {subcontractor.last_contact 
                    ? new Date(subcontractor.last_contact).toLocaleDateString() 
                    : 'Never'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Company Type</p>
                <p className="font-medium capitalize">{subcontractor.company_type}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <h3 className="text-base font-semibold">Contact Information</h3>
              </div>
              <ContactSection
                name={subcontractor.name}
                email={subcontractor.email}
                phone={subcontractor.phone}
                area_code={subcontractor.area_code}
                location={subcontractor.location}
                onEmail={handleEmail}
                onCall={handleCall}
              />
            </CardContent>
          </Card>

          {/* Recent Projects Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Recent Projects</h3>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentProjects.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.role}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Communication History Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Communication History</h3>
                <Button variant="outline" size="sm" className="text-xs">
                  Send Message
                </Button>
              </div>
              <CommunicationSection subcontractorId={subcontractor.id} />
            </CardContent>
          </Card>

          {/* Bids Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Bid History</h3>
                <Button variant="outline" size="sm" className="text-xs">
                  Invite to Bid
                </Button>
              </div>
              <BidsSection subcontractorId={subcontractor.id} />
            </CardContent>
          </Card>

          {/* View Full Profile Link */}
          <div className="flex justify-center pt-4">
            <Button
              variant="default"
              className="text-sm group"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Full profile view will be available soon",
                });
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              View complete profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
