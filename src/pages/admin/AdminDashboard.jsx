import { motion } from 'framer-motion';
import { Users, UserCheck, Briefcase, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Clock, FileCheck, DollarSign } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import useStore from '../../store/useStore';
import { formatINR, mockDailyData } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

export default function AdminDashboard() {
  const { adminStats, adminUsers } = useStore();

  const stats = [
    { title: 'Total Users', value: adminStats.totalUsers, icon: Users, color: '#6C63FF', trend: '▲ +234 this week' },
    { title: 'Active Users', value: adminStats.activeUsers, icon: UserCheck, color: '#00D4AA', trend: '▲ Active now' },
    { title: 'Total Investments', value: adminStats.totalInvestments, icon: Briefcase, color: '#FFB830', currency: true },
    { title: 'Active Investments', value: adminStats.activeInvestments, icon: TrendingUp, color: '#00D4AA', currency: true },
    { title: 'Total Deposits', value: adminStats.totalDeposits, icon: ArrowDownToLine, color: '#6C63FF', currency: true },
    { title: 'Total Withdrawals', value: adminStats.totalWithdrawals, icon: ArrowUpFromLine, color: '#FF4D6D', currency: true },
    { title: 'Pending Withdrawals', value: adminStats.pendingWithdrawals, icon: Clock, color: '#FFB830', suffix: ' requests' },
    { title: 'Pending KYC', value: adminStats.pendingKYC, icon: FileCheck, color: '#FF4D6D', suffix: ' reviews' },
    { title: 'Revenue Generated', value: adminStats.revenueGenerated, icon: DollarSign, color: '#00D4AA', currency: true, trend: '▲ This month' },
  ];

  const activityFeed = [
    { msg: 'New deposit ₹25,000 from Rahul Sharma', time: '2 min ago', type: 'deposit' },
    { msg: 'KYC submitted by Priya Patel', time: '5 min ago', type: 'kyc' },
    { msg: 'Withdrawal request ₹10,000 by Amit Kumar', time: '15 min ago', type: 'withdrawal' },
    { msg: 'New user registered: Sneha Reddy', time: '22 min ago', type: 'user' },
    { msg: 'Daily payout processed — 847 users', time: '1 hour ago', type: 'payout' },
    { msg: 'KYC approved for Vikram Singh', time: '2 hours ago', type: 'kyc' },
  ];

  const typeIcon = { deposit: '📥', kyc: '🪪', withdrawal: '📤', user: '👤', payout: '💰' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Platform overview and analytics</p>
      </div>

      {/* 9 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} delay={i * 0.07} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div className="card p-5 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h3 className="font-semibold text-white mb-4">Daily Deposits vs Withdrawals</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDailyData.slice(-14)} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#161827', border: '1px solid #252840', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="deposits" fill="#6C63FF" radius={[4, 4, 0, 0]} name="Deposits" isAnimationActive animationDuration={1500} />
              <Bar dataKey="withdrawals" fill="#FF4D6D" radius={[4, 4, 0, 0]} name="Withdrawals" isAnimationActive animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="text-sm flex-shrink-0">{typeIcon[a.type]}</span>
                <div>
                  <p className="text-xs text-white leading-snug">{a.msg}</p>
                  <p className="text-[10px] text-[#5C5F78] mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Growth chart */}
      <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <h3 className="font-semibold text-white mb-4">Daily Earnings Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockDailyData} margin={{ left: -20 }}>
            <defs>
              <linearGradient id="adminEarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB830" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FFB830" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} interval={5} />
            <YAxis tick={{ fill: '#5C5F78', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip contentStyle={{ background: '#161827', border: '1px solid #252840', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Area type="monotone" dataKey="earnings" stroke="#FFB830" strokeWidth={2} fill="url(#adminEarn)" isAnimationActive animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick user table */}
      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <div className="p-5 border-b border-[#252840] flex items-center justify-between">
          <h3 className="font-semibold text-white">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['Name', 'Email', 'KYC', 'Balance', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.name.charAt(0)}</div>
                      <span className="text-sm text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{u.email}</td>
                  <td className="px-5 py-3.5"><Badge status={u.kycStatus} label={u.kycStatus} /></td>
                  <td className="px-5 py-3.5 text-sm font-mono text-white">{formatINR(u.walletBalance)}</td>
                  <td className="px-5 py-3.5"><Badge status={u.status} label={u.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
