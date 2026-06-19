import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Sparkles, Wallet, ArrowUpFromLine, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/ui/StatCard';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import EarningsAreaChart from '../../components/charts/EarningsAreaChart';
import InvestmentBarChart from '../../components/charts/InvestmentBarChart';
import WithdrawalLineChart from '../../components/charts/WithdrawalLineChart';
import { Skeleton } from '../../components/ui/Skeleton';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Countdown from '../../components/ui/Countdown';

const chartTabs = ['Earnings', 'Investments', 'Withdrawals'];

export default function Dashboard() {
  const { user, investments, notifications } = useStore();
  const [activeChart, setActiveChart] = useState('Earnings');
  const navigate = useNavigate();

  const activeInvestments = investments.filter((i) => i.status === 'active');

  const stats = [
    { title: 'Total Investment', value: user.totalInvestment, icon: DollarSign, color: '#6C63FF', currency: true, trend: '▲ +12% this month' },
    { title: 'Active Investments', value: activeInvestments.length, icon: TrendingUp, color: '#00D4AA', suffix: ' plans', trend: '▲ 2 new' },
    { title: 'Total Earnings', value: user.totalEarnings, icon: Sparkles, color: '#FFB830', currency: true, trend: '▲ +8.4%' },
    { title: 'Wallet Balance', value: user.walletBalance, icon: Wallet, color: '#00D4AA', currency: true, trend: 'Available' },
    { title: 'Total Withdrawals', value: user.totalWithdrawals, icon: ArrowUpFromLine, color: '#FF4D6D', currency: true },
    { title: 'Investment Days', value: activeInvestments.reduce((s, i) => s + i.elapsed, 0), icon: Calendar, color: '#6C63FF', suffix: ' days' },
  ];

  const notifIcons = { payout: '💰', deposit: '📥', withdrawal: '📤', kyc: '🪪' };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Your investment overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Charts */}
      <motion.div
        className="card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Analytics</h2>
          <div className="flex gap-1">
            {chartTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChart(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeChart === tab ? 'bg-primary text-white' : 'text-[#A8AABD] hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {activeChart === 'Earnings' && <EarningsAreaChart />}
        {activeChart === 'Investments' && <InvestmentBarChart />}
        {activeChart === 'Withdrawals' && <WithdrawalLineChart />}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Investments Widget */}
        <motion.div
          className="card p-5 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Active Investments</h2>
            <button onClick={() => navigate('/my-investments')}
              className="flex items-center gap-1 text-primary text-sm hover:underline">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeInvestments.length === 0 ? (
            <div className="text-center py-8 text-[#A8AABD] text-sm">No active investments</div>
          ) : (
            <div className="space-y-4">
              {activeInvestments.slice(0, 3).map((inv) => {
                const pct = Math.round((inv.elapsed / inv.duration) * 100);
                const endDate = new Date(inv.startDate);
                endDate.setDate(endDate.getDate() + inv.duration);
                return (
                  <div key={inv.id} className="p-4 rounded-xl bg-[#0D0F1A] border border-[#252840]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-white">{inv.package}</p>
                        <p className="text-xs text-[#A8AABD] font-mono mt-0.5">{inv.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold font-mono text-white">{formatINR(inv.amount)}</p>
                        <p className="text-secondary text-xs">+{formatINR(inv.dailyPayout)}/day</p>
                      </div>
                    </div>
                    <ProgressBar value={inv.elapsed} max={inv.duration} />
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-[#A8AABD]">{inv.elapsed}/{inv.duration} days</span>
                      <Countdown targetDate={endDate.toISOString()} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Notifications */}
        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className={`flex gap-3 p-3 rounded-lg ${!n.read ? 'bg-primary/5' : ''}`}>
                <span className="text-base">{notifIcons[n.type] || '🔔'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white leading-snug">{n.message}</p>
                  <p className="text-[10px] text-[#5C5F78] mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
