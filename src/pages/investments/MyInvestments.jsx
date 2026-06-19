import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Countdown from '../../components/ui/Countdown';
import EmptyState from '../../components/ui/EmptyState';

const tabs = ['All', 'Active', 'Completed', 'Expired'];

// Circular progress ring
function RingProgress({ pct, size = 100, label, color = '#6C63FF' }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="donut-ring">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#252840" strokeWidth="8" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-mono text-white">{Math.round(pct)}%</span>
        <span className="text-[10px] text-[#5C5F78]">{label}</span>
      </div>
    </div>
  );
}

export default function MyInvestments() {
  const { investments } = useStore();
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? investments : investments.filter((i) => i.status === tab.toLowerCase());

  const statusColor = { active: '#00D4AA', completed: '#5C5F78', expired: '#FF4D6D' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Investments</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Track all your investment plans</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const count = t === 'All' ? investments.length : investments.filter((i) => i.status === t.toLowerCase()).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
              {t}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t ? 'bg-white/20' : 'bg-[#0D0F1A]'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={TrendingUp} title="No investments found" description="Explore our packages and start your investment journey today." ctaLabel="Explore Packages" ctaPath="/packages" />
      ) : (
        <div className="space-y-4">
          {filtered.map((inv, i) => {
            const pct = Math.round((inv.elapsed / inv.duration) * 100);
            const endDate = new Date(inv.startDate);
            endDate.setDate(endDate.getDate() + inv.duration);
            const color = statusColor[inv.status] || '#6C63FF';

            return (
              <motion.div
                key={inv.id}
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="flex gap-4">
                  <RingProgress pct={pct} label="done" color={color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{inv.package}</h3>
                        <p className="text-xs text-[#5C5F78] font-mono mt-0.5">{inv.id}</p>
                      </div>
                      <Badge status={inv.status} label={inv.status.charAt(0).toUpperCase() + inv.status.slice(1)} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-[#A8AABD]">Invested</p>
                        <p className="font-bold font-mono text-white">{formatINR(inv.amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A8AABD]">Earned so far</p>
                        <p className="font-bold font-mono text-secondary">+{formatINR(inv.earned)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A8AABD]">Remaining</p>
                        <p className="font-bold font-mono text-[#A8AABD]">{formatINR(inv.remaining)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A8AABD]">Daily Rate</p>
                        <p className="font-bold font-mono text-white">{formatINR(inv.dailyPayout)}</p>
                      </div>
                    </div>

                    <ProgressBar value={inv.elapsed} max={inv.duration} color={color} />
                    <div className="flex items-center justify-between mt-2 text-xs text-[#A8AABD]">
                      <span>{inv.elapsed}/{inv.duration} days elapsed</span>
                      {inv.status === 'active' && (
                        <div className="flex items-center gap-1">
                          <span className="text-[#5C5F78]">Expires in:</span>
                          <Countdown targetDate={endDate.toISOString()} />
                        </div>
                      )}
                      {inv.status !== 'active' && <span>Ended {inv.endDate}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
