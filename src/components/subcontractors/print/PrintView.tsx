import { format } from "date-fns";

interface PrintViewProps {
  subcontractors: any[];
}

export function PrintView({ subcontractors }: PrintViewProps) {
  return (
    <div className="hidden print:block p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Subcontractors List</h1>
        <p className="text-sm text-gray-500">
          Generated on {format(new Date(), "MMMM d, yyyy")}
        </p>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Company</th>
            <th className="text-left py-2">Contact</th>
            <th className="text-left py-2">Trade</th>
            <th className="text-left py-2">Email</th>
            <th className="text-left py-2">Phone</th>
            <th className="text-left py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {subcontractors.map((sub) => (
            <tr key={sub.id} className="border-b">
              <td className="py-2">{sub.company}</td>
              <td className="py-2">{sub.name}</td>
              <td className="py-2">{sub.trade}</td>
              <td className="py-2">{sub.email}</td>
              <td className="py-2">{sub.phone || '-'}</td>
              <td className="py-2">{sub.location || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}