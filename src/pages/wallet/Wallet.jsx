import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, TrendingDown, TrendingUp, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import CountUp from '../../components/ui/CountUp';

const filters = ['All', 'Credits', 'Debits'];

export default function Wallet() {
  const { walletBalance, walletLedger, user } = useStore();
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = walletLedger.filter((t) => {
    if (filter === 'Credits') return t.amount > 0;
    if (filter === 'Debits') return t.amount < 0;
    return true;
  });

  const subBalances = [
    { label: 'Pending Balance', value: 0, color: '#FFB830' },
    { label: 'Withdrawable', value: walletBalance * 0.8, color: '#00D4AA' },
    { label: 'Total Deposits', value: user.totalDeposits, color: '#6C63FF' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Manage your funds</p>
      </div>

      {/* Hero wallet card */}
      <motion.div
        className="card p-6 sm:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #161827 0%, #1a1d2e 50%, #1e2035 100%)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/5 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <WalletIcon className="w-5 h-5 text-primary" />
            <span className="text-[#A8AABD] text-sm font-medium">Available Balance</span>
          </div>
          <div className="text-4xl sm:text-5xl font-bold font-mono text-white mb-6">
            <CountUp value={walletBalance} currency duration={2000} />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {subBalances.map((b) => (
              <div key={b.label} className="bg-[#0D0F1A]/60 rounded-xl p-3">
                <p className="text-[10px] text-[#A8AABD] mb-1">{b.label}</p>
                <p className="font-bold font-mono text-sm" style={{ color: b.color }}>
                  {formatINR(b.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={() => navigate('/deposit')}
              className="flex-1 flex items-center justify-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 font-semibold py-3 rounded-xl hover:bg-secondary/30 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              <ArrowDownToLine className="w-4 h-4" />
              Deposit Funds
            </motion.button>
            <motion.button
              onClick={() => navigate('/withdraw')}
              className="flex-1 flex items-center justify-center gap-2 bg-primary/20 text-primary border border-primary/30 font-semibold py-3 rounded-xl hover:bg-primary/30 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              <ArrowUpFromLine className="w-4 h-4" />
              Withdraw
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Transaction ledger */}
      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="p-5 border-b border-[#252840] flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-semibold text-white">Transaction Ledger</h3>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
                  {f}
                </button>
              ))}
            </div>
            <button className="w-8 h-8 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white transition-colors">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['Date', 'Description', 'Type', 'Amount', 'Balance'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <motion.tr key={t.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{t.date}</td>
                  <td className="px-5 py-3.5 text-sm text-white">{t.description}</td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1 text-xs font-semibold ${t.amount > 0 ? 'text-secondary' : 'text-danger'}`}>
                      {t.amount > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 text-sm font-mono font-semibold ${t.amount > 0 ? 'text-secondary' : 'text-danger'}`}>
                    {t.amount > 0 ? '+' : ''}{formatINR(t.amount)}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-mono text-[#A8AABD]">{formatINR(Math.abs(t.balance))}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
