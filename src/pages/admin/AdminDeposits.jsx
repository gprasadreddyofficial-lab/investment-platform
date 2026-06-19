import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

export default function AdminDeposits() {
  const { transactions } = useStore();
  const [deposits, setDeposits] = useState(transactions.deposits);
  const [selected, setSelected] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAction = (id, action) => {
    setDeposits(deposits.map((d) => d.id === id ? { ...d, status: action === 'approve' ? 'approved' : 'rejected' } : d));
    toast.success(`Deposit ${action === 'approve' ? 'approved' : 'rejected'}`);
    setConfirmId(null);
  };

  const bulkApprove = () => {
    setDeposits(deposits.map((d) => selected.includes(d.id) ? { ...d, status: 'approved' } : d));
    toast.success(`${selected.length} deposits approved`);
    setSelected([]);
  };

  const toggleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Deposits</h1>
          <p className="text-[#A8AABD] text-sm mt-1">{deposits.filter((d) => d.status === 'pending').length} pending</p>
        </div>
        {selected.length > 0 && (
          <button onClick={bulkApprove} className="flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/30 transition-colors">
            <CheckSquare className="w-4 h-4" />
            Bulk Approve ({selected.length})
          </button>
        )}
      </div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                <th className="px-5 py-3 text-left">
                  <input type="checkbox" className="accent-warning rounded"
                    onChange={(e) => setSelected(e.target.checked ? deposits.filter((d) => d.status === 'pending').map((d) => d.id) : [])} />
                </th>
                {['ID', 'Date', 'Amount', 'Method', 'Txn ID', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deposits.map((d, i) => (
                <motion.tr key={d.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td className="px-5 py-3.5">
                    <input type="checkbox" checked={selected.includes(d.id)} onChange={() => toggleSelect(d.id)} className="accent-warning rounded" disabled={d.status !== 'pending'} />
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#A8AABD]">{d.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{d.date}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">+{formatINR(d.amount)}</td>
                  <td className="px-5 py-3.5 text-sm text-white">{d.method}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#5C5F78]">{d.txnId || '—'}</td>
                  <td className="px-5 py-3.5"><Badge status={d.status} label={d.status} /></td>
                  <td className="px-5 py-3.5">
                    {d.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => { setConfirmId(d.id); setConfirmAction('approve'); }}
                          className="w-7 h-7 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 flex items-center justify-center transition-colors">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { setConfirmId(d.id); setConfirmAction('reject'); }}
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

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmId && (
          <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-sm p-6"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3 className="font-bold text-white mb-2">Confirm {confirmAction === 'approve' ? 'Approval' : 'Rejection'}</h3>
              <p className="text-[#A8AABD] text-sm mb-5">Are you sure you want to {confirmAction} deposit {confirmId}?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="btn-secondary flex-1 text-sm">Cancel</button>
                <button onClick={() => handleAction(confirmId, confirmAction)}
                  className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm ripple ${confirmAction === 'approve' ? 'bg-secondary' : 'bg-danger'}`}>
                  {confirmAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
