import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMonthlyData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161827] border border-[#252840] rounded-lg p-3 shadow-xl">
        <p className="text-[#A8AABD] text-xs mb-1">{label}</p>
        <p className="text-primary font-bold">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export function InvestmentBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data || mockMonthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252840" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="investment"
          fill="#6C63FF"
          radius={[6, 6, 0, 0]}
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default InvestmentBarChart;
