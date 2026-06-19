import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';

export default function AdminPackages() {
  const { packages } = useStore();
  const [pkgList, setPkgList] = useState(packages);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const toggleEnabled = (id) => {
    setPkgList(pkgList.map((p) => p.id === id ? { ...p, enabled: !(p.enabled ?? true) } : p));
    toast.success('Package status updated');
  };

  const handleDelete = (id) => {
    setPkgList(pkgList.filter((p) => p.id !== id));
    toast.success('Package deleted');
  };

  const onSave = (data) => {
    if (editing) {
      setPkgList(pkgList.map((p) => p.id === editing.id ? { ...p, ...data } : p));
      toast.success('Package updated');
    } else {
      setPkgList([...pkgList, { id: Date.now(), ...data, status: 'active', popular: false }]);
      toast.success('Package created');
    }
    setShowModal(false);
    reset();
  };

  const tierColors = { Starter: '#00D4AA', Premium: '#6C63FF', Elite: '#FFB830' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Package Management</h1>
          <p className="text-[#A8AABD] text-sm mt-1">{pkgList.length} packages</p>
        </div>
        <button onClick={() => { setEditing(null); reset(); setShowModal(true); }}
          className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {pkgList.map((pkg, i) => {
          const enabled = pkg.enabled ?? true;
          return (
            <motion.div
              key={pkg.id}
              className={`card p-5 transition-opacity ${!enabled ? 'opacity-50' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: enabled ? 1 : 0.5, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: `${tierColors[pkg.tier] || '#6C63FF'}20`, color: tierColors[pkg.tier] || '#6C63FF' }}>
                  {pkg.tier}
                </span>
                <button
                  onClick={() => toggleEnabled(pkg.id)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-secondary' : 'bg-[#252840]'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-5.5 left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              <h3 className="font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-2xl font-mono font-bold text-white mb-3">{formatINR(pkg.amount)}</p>
              <div className="space-y-1 text-sm text-[#A8AABD] mb-4">
                <div className="flex justify-between"><span>Duration</span><span className="text-white">{pkg.duration}d</span></div>
                <div className="flex justify-between"><span>Daily Payout</span><span className="text-secondary font-mono">{formatINR(pkg.dailyPayout)}</span></div>
                <div className="flex justify-between"><span>Lock Period</span><span className="text-white">{pkg.lockingPeriod}d</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(pkg); setShowModal(true); }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-primary/20 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />Edit
                </button>
                <button onClick={() => handleDelete(pkg.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-danger/20 text-danger text-xs font-semibold hover:bg-danger/30 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-md p-6"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">{editing ? 'Edit Package' : 'New Package'}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#5C5F78] hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit(onSave)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Package Name</label>
                    <input {...register('name')} defaultValue={editing?.name} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Amount (₹)</label>
                    <input {...register('amount')} type="number" defaultValue={editing?.amount} className="input-field font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Duration (days)</label>
                    <input {...register('duration')} type="number" defaultValue={editing?.duration} className="input-field font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Daily Payout (₹)</label>
                    <input {...register('dailyPayout')} type="number" defaultValue={editing?.dailyPayout} className="input-field font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Lock Period (days)</label>
                    <input {...register('lockingPeriod')} type="number" defaultValue={editing?.lockingPeriod} className="input-field font-mono" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#A8AABD] mb-1.5">Tier</label>
                    <select {...register('tier')} defaultValue={editing?.tier} className="input-field">
                      <option>Starter</option>
                      <option>Premium</option>
                      <option>Elite</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full">
                  {editing ? 'Update Package' : 'Create Package'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
