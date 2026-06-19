import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Pause } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockAdminUsers } from '../../data/mockData';
import { formatINR } from '../../data/mockData';

export default function AdminEarnings() {
  const [running, setRunning] = useState(false);

  const toggle = () => {
    setRunning(!running);
    toast.success(running ? 'Earnings engine paused' : 'Earnings engine running');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Earnings Engine</h1>
          <p className="text-[#A8AABD] text-sm mt-1">Manage daily payout processing</p>
        </div>
        <button onClick={toggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${running ? 'bg-danger/20 text-danger border border-danger/30' : 'bg-secondary/20 text-secondary border border-secondary/30'}`}>
          {running ? <><Pause className="w-4 h-4" /> Pause Engine</> : <><Play className="w-4 h-4" /> Start Engine</>}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Active Investments', value: '847', color: '#6C63FF' },
          { label: 'Total Payout Today', value: '₹8,43,250', color: '#00D4AA' },
          { label: 'Engine Status', value: running ? 'RUNNING' : 'PAUSED', color: running ? '#00D4AA' : '#FFB830' },
        ].map((s) => (
          <div key={s.label} className="card p-5 text-center">
            <p className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[#A8AABD] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <motion.div className="card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={`flex items-center gap-3 p-4 rounded-xl ${running ? 'bg-secondary/10 border border-secondary/20' : 'bg-warning/10 border border-warning/20'}`}>
          <Zap className={`w-5 h-5 ${running ? 'text-secondary' : 'text-warning'}`} />
          <div>
            <p className={`font-semibold ${running ? 'text-secondary' : 'text-warning'}`}>Engine {running ? 'Active' : 'Paused'}</p>
            <p className="text-[#A8AABD] text-sm">{running ? 'Daily payouts are being processed automatically at midnight IST.' : 'Start the engine to process daily payouts.'}</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="p-5 border-b border-[#252840]">
          <h3 className="font-semibold text-white">Payout Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['User', 'Investment', 'Daily Payout', 'Next Payout'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAdminUsers.slice(0, 4).map((u, i) => (
                <tr key={u.id} className="table-row">
                  <td className="px-5 py-3.5 text-sm text-white">{u.name}</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">Growth Plan</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-secondary">+₹325</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">Today at 12:00 AM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
