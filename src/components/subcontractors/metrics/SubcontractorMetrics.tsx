import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";

interface SubcontractorMetricsProps {
  subcontractors: any[];
}

export const SubcontractorMetrics = ({ subcontractors }: SubcontractorMetricsProps) => {
  // Calculate trade distribution
  const tradeDistribution = subcontractors.reduce((acc: any, sub: any) => {
    acc[sub.trade] = (acc[sub.trade] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(tradeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate status metrics
  const activeCount = subcontractors.filter(sub => sub.status === 'active').length;
  const inactiveCount = subcontractors.filter(sub => sub.status === 'inactive').length;
  const pendingCount = subcontractors.filter(sub => sub.status === 'pending').length;

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Status Overview</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
            <span className="text-2xl font-bold text-green-600">{activeCount}</span>
            <Badge variant="secondary" className="mt-1">Active</Badge>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl font-bold text-gray-600">{inactiveCount}</span>
            <Badge variant="secondary" className="mt-1">Inactive</Badge>
          </div>
          <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg">
            <span className="text-2xl font-bold text-yellow-600">{pendingCount}</span>
            <Badge variant="secondary" className="mt-1">Pending</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Trade Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};