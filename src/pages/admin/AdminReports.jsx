import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockDailyData, mockMonthlyData } from '../../data/mockData';

const reportTabs = ['Overview', 'Deposits', 'Withdrawals', 'Investments', 'Users'];

export default function AdminReports() {
  const [tab, setTab] = useState('Overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-[#A8AABD] text-sm mt-1">Platform analytics and reports</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#252840] text-[#A8AABD] hover:text-white text-xs font-medium transition-colors">
            <Download className="w-3.5 h-3.5" />Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#252840] text-[#A8AABD] hover:text-white text-xs font-medium transition-colors">
            <Download className="w-3.5 h-3.5" />CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {reportTabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: '₹12,34,567', change: '+18%' },
          { label: 'Avg. Investment', value: '₹38,400', change: '+5%' },
          { label: 'Payout Efficiency', value: '99.2%', change: '▲' },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-bold font-mono text-white">{s.value}</p>
            <p className="text-xs text-[#A8AABD] mt-1">{s.label}</p>
            <p className="text-secondary text-xs mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-semibold text-white mb-4">Daily Earnings (30 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockDailyData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="repEarn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFB830" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFB830" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#252840" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} interval={5} />
              <YAxis tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={{ background: '#161827', border: '1px solid #252840', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="earnings" stroke="#FFB830" strokeWidth={2} fill="url(#repEarn)" isAnimationActive animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-semibold text-white mb-4">Monthly Investment Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockMonthlyData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252840" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#5C5F78', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#161827', border: '1px solid #252840', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="investment" fill="#6C63FF" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
