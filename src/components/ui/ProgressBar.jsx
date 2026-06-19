import { motion } from 'framer-motion';
import clsx from 'clsx';

export function ProgressBar({ value = 0, max = 100, color = '#6C63FF', className = '', showLabel = false, height = 'h-2' }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={clsx('relative w-full bg-[#252840] rounded-full overflow-hidden', height, className)}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {showLabel && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
