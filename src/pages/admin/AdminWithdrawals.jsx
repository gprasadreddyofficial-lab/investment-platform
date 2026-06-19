import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

export default function AdminWithdrawals() {
  const { transactions } = useStore();
  const [withdrawals, setWithdrawals] = useState(transactions.withdrawals);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAction = (id, action) => {
    setWithdrawals(withdrawals.map((w) => w.id === id ? { ...w, status: action === 'approve' ? 'completed' : 'rejected' } : w));
    toast.success(`Withdrawal ${action === 'approve' ? 'approved' : 'rejected'}`);
    setConfirmId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Withdrawals</h1>
        <p className="text-[#A8AABD] text-sm mt-1">{withdrawals.filter((w) => w.status === 'pending').length} pending</p>
      </div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['ID', 'Date', 'Amount', 'Charges', 'Net Amount', 'Method', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w, i) => (
                <motion.tr key={w.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#A8AABD]">{w.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{w.date}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-white">{formatINR(w.amount)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-danger">– {formatINR(w.charges)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">{formatINR(w.netAmount)}</td>
                  <td className="px-5 py-3.5 text-sm text-white">{w.method || 'UPI'}</td>
                  <td className="px-5 py-3.5"><Badge status={w.status} label={w.status} /></td>
                  <td className="px-5 py-3.5">
                    {w.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => { setConfirmId(w.id); setConfirmAction('approve'); }}
                          className="w-7 h-7 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 flex items-center justify-center transition-colors">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { setConfirmId(w.id); setConfirmAction('reject'); }}
                          className="w-7 h-7 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 flex items-center justify-center transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {confirmId && (
          <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-sm p-6"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3 className="font-bold text-white mb-2">Confirm {confirmAction === 'approve' ? 'Approval' : 'Rejection'}</h3>
              <p className="text-[#A8AABD] text-sm mb-5">Are you sure you want to {confirmAction} this withdrawal?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="btn-secondary flex-1 text-sm">Cancel</button>
                <button onClick={() => handleAction(confirmId, confirmAction)}
                  className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm ripple ${confirmAction === 'approve' ? 'bg-secondary' : 'bg-danger'}`}>
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
