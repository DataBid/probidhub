import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CompanyCellProps {
  id: string;
  company: string;
  company_type?: string;
}

export const CompanyCell = ({ id, company, company_type }: CompanyCellProps) => {
  return (
    <div className="flex items-start space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${company}`} />
        <AvatarFallback>{company.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <Link 
          to={`/companies/${id}`} 
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {company}
        </Link>
        {company_type && (
          <Badge variant="outline" className="capitalize text-xs mt-1">
            {company_type}
          </Badge>
        )}
      </div>
    </div>
  );
};