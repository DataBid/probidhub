import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface CompanyCellProps {
  id: string;
  company: string;
}

export const CompanyCell = ({ id, company }: CompanyCellProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${company}`} />
        <AvatarFallback>{company.charAt(0)}</AvatarFallback>
      </Avatar>
      <Link 
        to={`/companies/${id}`} 
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {company}
      </Link>
    </div>
  );
};