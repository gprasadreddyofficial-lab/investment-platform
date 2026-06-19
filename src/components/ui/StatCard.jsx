import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import CountUp from './CountUp';

export function StatCard({ title, value, icon: Icon, color = '#6C63FF', trend, prefix = '', suffix = '', currency = false, delay = 0 }) {
  return (
    <motion.div
      className="card p-5 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 blur-2xl"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between mb-4">
        <p className="text-[#A8AABD] text-sm font-medium">{title}</p>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-white font-mono">
            <CountUp
              value={value}
              prefix={prefix}
              suffix={suffix}
              currency={currency}
              duration={1500 + delay * 300}
            />
          </div>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-secondary" />
              <span className="text-secondary text-xs font-medium">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
