import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDailyData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161827] border border-[#252840] rounded-lg p-3 shadow-xl">
        <p className="text-[#A8AABD] text-xs mb-1">{label}</p>
        <p className="text-secondary font-bold">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export function EarningsAreaChart({ data }) {
  const chartData = (data || mockDailyData).map((d) => ({
    date: d.date,
    earnings: d.earnings,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#252840" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} interval={5} />
        <YAxis tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="earnings"
          stroke="#00D4AA"
          strokeWidth={2}
          fill="url(#earningsGrad)"
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default EarningsAreaChart;
