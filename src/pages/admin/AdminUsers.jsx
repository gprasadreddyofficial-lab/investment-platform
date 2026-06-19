import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

export default function AdminUsers() {
  const { adminUsers } = useStore();
  const [search, setSearch] = useState('');
  const [kycFilter, setKycFilter] = useState('All');

  const filtered = adminUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchKyc = kycFilter === 'All' || u.kycStatus === kycFilter.toLowerCase();
    return matchSearch && matchKyc;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-[#A8AABD] text-sm mt-1">{adminUsers.length} total users</p>
      </div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Toolbar */}
        <div className="p-5 border-b border-[#252840] flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 text-[#5C5F78] absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search users..." className="input-field pl-9 h-9 text-sm w-full" />
          </div>
          <div className="flex gap-1">
            {['All', 'Approved', 'Pending', 'Rejected'].map((f) => (
              <button key={f} onClick={() => setKycFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${kycFilter === f ? 'bg-warning/20 text-warning' : 'bg-[#1e2235] text-[#A8AABD] hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['User', 'Email', 'Phone', 'KYC', 'Balance', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr key={u.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm text-white font-medium">{u.name}</p>
                        <p className="text-[10px] text-[#5C5F78] font-mono">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{u.email}</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD] font-mono">{u.phone}</td>
                  <td className="px-5 py-3.5"><Badge status={u.kycStatus} label={u.kycStatus} /></td>
                  <td className="px-5 py-3.5 text-sm font-mono text-white">{formatINR(u.walletBalance)}</td>
                  <td className="px-5 py-3.5"><Badge status={u.status} label={u.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Viewing ${u.name}`)}
                        className="w-7 h-7 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 flex items-center justify-center transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {u.status === 'active' ? (
                        <button onClick={() => toast.error(`${u.name} suspended`)}
                          className="w-7 h-7 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 flex items-center justify-center transition-colors">
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button onClick={() => toast.success(`${u.name} activated`)}
                          className="w-7 h-7 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 flex items-center justify-center transition-colors">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
