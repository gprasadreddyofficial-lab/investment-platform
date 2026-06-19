import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Plus, Minus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatINR } from '../data/mockData';

export function FloatingWallet() {
  const [open, setOpen] = useState(false);
  const { walletBalance } = useStore();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-5 z-50 hidden lg:block">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-16 right-0 w-56 bg-[#161827] border border-[#252840] rounded-2xl shadow-2xl p-4"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A8AABD] font-medium">Wallet Balance</span>
              <button onClick={() => setOpen(false)} className="text-[#5C5F78] hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-2xl font-bold font-mono text-white mb-4">{formatINR(walletBalance)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { navigate('/deposit'); setOpen(false); }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-secondary/20 text-secondary text-sm font-semibold py-2 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Deposit
              </button>
              <button
                onClick={() => { navigate('/withdraw'); setOpen(false); }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary/20 text-primary text-sm font-semibold py-2 rounded-lg hover:bg-primary/30 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
                Withdraw
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg glow-violet"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wallet className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}

export default FloatingWallet;
