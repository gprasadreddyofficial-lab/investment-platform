import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Calendar, TrendingUp, Star, X, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

function ConfettiPiece({ delay }) {
  const colors = ['#6C63FF', '#00D4AA', '#FFB830', '#FF4D6D'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * 100;
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ backgroundColor: color, left: `${x}%`, top: 0 }}
      initial={{ y: -10, rotate: 0, opacity: 1 }}
      animate={{ y: 300, rotate: 360 * 3, opacity: 0 }}
      transition={{ duration: 1.5, delay, ease: 'easeIn' }}
    />
  );
}

function InvestModal({ pkg, onClose }) {
  const { walletBalance, addInvestment } = useStore();
  const [success, setSuccess] = useState(false);
  const canAfford = walletBalance >= pkg.amount;

  const handleConfirm = () => {
    if (!canAfford) {
      toast.error('Insufficient wallet balance. Please deposit funds.');
      return;
    }
    addInvestment({
      id: `INV${Date.now()}`,
      package: pkg.name,
      amount: pkg.amount,
      earned: 0,
      remaining: pkg.totalReturn,
      startDate: new Date().toISOString().split('T')[0],
      duration: pkg.duration,
      elapsed: 0,
      status: 'active',
      dailyPayout: pkg.dailyPayout,
    });
    setSuccess(true);
    setTimeout(() => {
      toast.success('Investment activated! 🎉');
      onClose();
    }, 2500);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-md overflow-hidden relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {success ? (
          <div className="relative p-8 text-center overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => <ConfettiPiece key={i} delay={i * 0.05} />)}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-secondary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Investment Activated!</h3>
            <p className="text-[#A8AABD]">Your <span className="text-white font-semibold">{pkg.name}</span> is now active and earning daily payouts.</p>
            <p className="text-secondary font-mono text-lg font-bold mt-2">+{formatINR(pkg.dailyPayout)}/day</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Confirm Investment</h3>
              <button onClick={onClose} className="text-[#5C5F78] hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ['Package', pkg.name],
                ['Investment Amount', formatINR(pkg.amount)],
                ['Duration', `${pkg.duration} days`],
                ['Locking Period', `${pkg.lockingPeriod} days`],
                ['Daily Payout', formatINR(pkg.dailyPayout)],
                ['Total Return', formatINR(pkg.totalReturn)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-[#252840]">
                  <span className="text-[#A8AABD] text-sm">{label}</span>
                  <span className={`font-mono font-semibold text-sm ${label === 'Total Return' || label === 'Daily Payout' ? 'text-secondary' : 'text-white'}`}>{val}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#0D0F1A] border border-[#252840] mb-6">
              <div className="flex justify-between">
                <span className="text-[#A8AABD] text-sm">Wallet Balance</span>
                <span className={`font-mono font-semibold text-sm ${canAfford ? 'text-secondary' : 'text-danger'}`}>{formatINR(walletBalance)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[#A8AABD] text-sm">After Investment</span>
                <span className="font-mono font-semibold text-sm text-white">{formatINR(Math.max(walletBalance - pkg.amount, 0))}</span>
              </div>
            </div>

            {!canAfford && (
              <p className="text-danger text-xs text-center mb-4">⚠ Insufficient balance. Please deposit funds first.</p>
            )}

            <motion.button
              onClick={handleConfirm}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ripple ${canAfford ? 'bg-primary hover:bg-primary/90' : 'bg-[#252840] cursor-not-allowed'}`}
              whileTap={canAfford ? { scale: 0.97 } : {}}
            >
              {canAfford ? 'Activate Investment' : 'Insufficient Balance'}
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const { packages } = useStore();
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [filter, setFilter] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const tierColors = { Starter: '#00D4AA', Premium: '#6C63FF', Elite: '#FFB830' };

  const toggleCompare = (pkg) => {
    if (compareList.find((p) => p.id === pkg.id)) {
      setCompareList(compareList.filter((p) => p.id !== pkg.id));
    } else if (compareList.length < 2) {
      const newList = [...compareList, pkg];
      setCompareList(newList);
      if (newList.length === 2) setShowCompare(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Investment Packages</h1>
          <p className="text-[#A8AABD] text-sm mt-1">Choose a plan and start earning daily returns</p>
        </div>
        {compareList.length > 0 && (
          <button onClick={() => compareList.length === 2 && setShowCompare(true)}
            className="text-sm text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
            Compare ({compareList.length}/2)
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['All', 'Starter', 'Premium', 'Elite'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {packages
          .filter((p) => filter === 'All' || p.tier === filter)
          .map((pkg, i) => (
            <motion.div
              key={pkg.id}
              className="card p-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${pkg.color}20` }}
            >
              {pkg.popular && (
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-warning bg-warning/20 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-warning" />
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <Badge status={pkg.tier.toLowerCase()} label={pkg.tier} className="mb-3" />
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-[#A8AABD] text-xs mt-1">{pkg.description}</p>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold font-mono text-white">{formatINR(pkg.amount)}</p>
                <p className="text-[#A8AABD] text-xs mt-1">Investment amount</p>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[#A8AABD]"><Calendar className="w-3.5 h-3.5" /> Duration</span>
                  <span className="font-semibold text-white">{pkg.duration} days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[#A8AABD]"><TrendingUp className="w-3.5 h-3.5" /> Daily Payout</span>
                  <span className="font-semibold text-secondary font-mono">{formatINR(pkg.dailyPayout)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[#A8AABD]"><Lock className="w-3.5 h-3.5" /> Lock Period</span>
                  <span className="font-semibold text-white">{pkg.lockingPeriod} days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[#A8AABD]"><Sparkles className="w-3.5 h-3.5" /> Total Return</span>
                  <span className="font-bold text-secondary font-mono">{formatINR(pkg.totalReturn)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <motion.button
                  onClick={() => setSelectedPkg(pkg)}
                  className="w-full py-2.5 rounded-xl font-semibold text-white text-sm ripple transition-all"
                  style={{ backgroundColor: pkg.color }}
                  whileHover={{ opacity: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Invest Now
                </motion.button>
                <button
                  onClick={() => toggleCompare(pkg)}
                  className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${compareList.find((p) => p.id === pkg.id) ? 'bg-primary/20 text-primary' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}
                >
                  {compareList.find((p) => p.id === pkg.id) ? '✓ Added to Compare' : 'Compare'}
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Invest Modal */}
      <AnimatePresence>
        {selectedPkg && <InvestModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompare && compareList.length === 2 && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowCompare(false)}
          >
            <motion.div
              className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Package Comparison</h3>
                <button onClick={() => setShowCompare(false)} className="text-[#5C5F78] hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-4 pt-8">
                  {['Investment', 'Duration', 'Daily Payout', 'Lock Period', 'Total Return'].map((label) => (
                    <div key={label} className="h-12 flex items-center text-[#A8AABD] text-sm">{label}</div>
                  ))}
                </div>
                {compareList.map((pkg) => (
                  <div key={pkg.id} className="space-y-4 text-center p-3 rounded-xl bg-[#0D0F1A] border border-[#252840]">
                    <p className="font-bold text-white">{pkg.name}</p>
                    {[
                      formatINR(pkg.amount),
                      `${pkg.duration} days`,
                      formatINR(pkg.dailyPayout),
                      `${pkg.lockingPeriod} days`,
                      formatINR(pkg.totalReturn),
                    ].map((val, i) => (
                      <div key={i} className="h-12 flex items-center justify-center font-mono font-semibold text-sm text-white">{val}</div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
