import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockWithdrawalTrend } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161827] border border-[#252840] rounded-lg p-3 shadow-xl">
        <p className="text-[#A8AABD] text-xs mb-1">{label}</p>
        <p className="text-danger font-bold">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export function WithdrawalLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data || mockWithdrawalTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252840" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#FF4D6D"
          strokeWidth={2}
          dot={{ fill: '#FF4D6D', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WithdrawalLineChart;
