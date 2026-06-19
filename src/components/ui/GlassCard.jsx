import { motion } from 'framer-motion';
import clsx from 'clsx';

export function GlassCard({ children, className = '', hover = true, onClick }) {
  return (
    <motion.div
      className={clsx('glass-card p-5', className, onClick && 'cursor-pointer')}
      whileHover={hover ? { y: -2, boxShadow: '0 12px 40px rgba(108,99,255,0.15)' } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
