import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

const PAGE_SIZE = 5;

export default function Transactions() {
  const { transactions, investments } = useStore();
  const [tab, setTab] = useState('Deposits');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const data = {
    Deposits: transactions.deposits,
    Withdrawals: transactions.withdrawals,
    Investments: investments,
  };

  const current = (data[tab] || []).filter((r) => {
    const id = (r.id || '').toLowerCase();
    return id.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(current.length / PAGE_SIZE);
  const paginated = current.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const depositCols = ['ID', 'Date', 'Amount', 'Method', 'Status'];
  const withdrawCols = ['ID', 'Date', 'Amount', 'Charges', 'Net', 'Status'];
  const investCols = ['ID', 'Package', 'Amount', 'Date', 'Status'];

  const cols = tab === 'Deposits' ? depositCols : tab === 'Withdrawals' ? withdrawCols : investCols;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Complete transaction history</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Object.keys(data).map((t) => (
          <button key={t} onClick={() => { setTab(t); setPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Toolbar */}
        <div className="p-5 border-b border-[#252840] flex items-center justify-between flex-wrap gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#5C5F78] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by ID..."
              className="input-field pl-9 w-48 h-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252840] text-[#A8AABD] hover:text-white text-xs font-medium transition-colors">
              <Download className="w-3.5 h-3.5" />
              Excel
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252840] text-[#A8AABD] hover:text-white text-xs font-medium transition-colors">
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {cols.map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <motion.tr key={row.id} className="table-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#A8AABD]">{row.id}</td>

                  {tab === 'Deposits' && (
                    <>
                      <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{row.date}</td>
                      <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">+{formatINR(row.amount)}</td>
                      <td className="px-5 py-3.5 text-sm text-white">{row.method}</td>
                      <td className="px-5 py-3.5"><Badge status={row.status} label={row.status} /></td>
                    </>
                  )}

                  {tab === 'Withdrawals' && (
                    <>
                      <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{row.date}</td>
                      <td className="px-5 py-3.5 text-sm font-mono text-white">{formatINR(row.amount)}</td>
                      <td className="px-5 py-3.5 text-sm font-mono text-danger">– {formatINR(row.charges)}</td>
                      <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">{formatINR(row.netAmount)}</td>
                      <td className="px-5 py-3.5"><Badge status={row.status} label={row.status} /></td>
                    </>
                  )}

                  {tab === 'Investments' && (
                    <>
                      <td className="px-5 py-3.5 text-sm text-white">{row.package}</td>
                      <td className="px-5 py-3.5 text-sm font-mono font-semibold text-white">{formatINR(row.amount)}</td>
                      <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{row.startDate}</td>
                      <td className="px-5 py-3.5"><Badge status={row.status} label={row.status} /></td>
                    </>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-[#252840]">
          <span className="text-[#A8AABD] text-sm">{current.length} records · Page {page} of {Math.max(totalPages, 1)}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className="w-8 h-8 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white disabled:opacity-40 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}
              className="w-8 h-8 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white disabled:opacity-40 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
