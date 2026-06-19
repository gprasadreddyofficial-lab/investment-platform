import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

export default function AdminInvestments() {
  const { investments } = useStore();
  const allInvestments = [...investments, ...investments.map((i) => ({ ...i, id: i.id + '_2' }))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">All Investments</h1>
        <p className="text-[#A8AABD] text-sm mt-1">{allInvestments.length} investments across all users</p>
      </div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['ID', 'Package', 'Amount', 'Earned', 'Progress', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allInvestments.map((inv, i) => (
                <motion.tr key={inv.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#A8AABD]">{inv.id}</td>
                  <td className="px-5 py-3.5 text-sm text-white">{inv.package}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-white">{formatINR(inv.amount)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-secondary">+{formatINR(inv.earned)}</td>
                  <td className="px-5 py-3.5 w-32">
                    <ProgressBar value={inv.elapsed} max={inv.duration} />
                    <span className="text-[10px] text-[#5C5F78] mt-1 block">{inv.elapsed}/{inv.duration}d</span>
                  </td>
                  <td className="px-5 py-3.5"><Badge status={inv.status} label={inv.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
