import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import EarningsAreaChart from '../../components/charts/EarningsAreaChart';
import Badge from '../../components/ui/Badge';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';

const PAGE_SIZE = 10;

export default function Earnings() {
  const { earnings } = useStore();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(earnings.history.length / PAGE_SIZE);
  const paginated = earnings.history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = [
    { title: 'Total Earnings', value: earnings.total, icon: Sparkles, color: '#FFB830', currency: true, trend: '▲ All time' },
    { title: "Today's Earnings", value: earnings.today, icon: Calendar, color: '#00D4AA', currency: true, trend: '▲ Live' },
    { title: 'Monthly Earnings', value: earnings.monthly, icon: TrendingUp, color: '#6C63FF', currency: true, trend: '▲ This month' },
  ];

  const packageChartData = earnings.byPackage.map((p) => ({ name: p.package, earned: p.earned }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Earnings</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Track your daily and total earnings</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} delay={i * 0.1} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-semibold text-white mb-4">Daily Earnings — Last 30 Days</h3>
          <EarningsAreaChart />
        </motion.div>

        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="font-semibold text-white mb-4">Earnings by Package</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={packageChartData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252840" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#A8AABD', fontSize: 12 }} tickLine={false} axisLine={false} width={90} />
              <Tooltip
                formatter={(v) => [formatINR(v), 'Earned']}
                contentStyle={{ background: '#161827', border: '1px solid #252840', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="earned" fill="#6C63FF" radius={[0, 6, 6, 0]} isAnimationActive={true} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Earnings history table */}
      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="p-5 border-b border-[#252840] flex items-center justify-between">
          <h3 className="font-semibold text-white">Earnings History</h3>
          <span className="text-[#A8AABD] text-sm">{earnings.history.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['Date', 'Investment ID', 'Package', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <motion.tr key={i} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{row.date}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-[#A8AABD]">{row.investmentId}</td>
                  <td className="px-5 py-3.5 text-sm text-white">{row.package}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">+{formatINR(row.amount)}</td>
                  <td className="px-5 py-3.5"><Badge status={row.status} label="Credited" /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#252840]">
          <span className="text-[#A8AABD] text-sm">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className="w-8 h-8 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white disabled:opacity-40 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
              className="w-8 h-8 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white disabled:opacity-40 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
