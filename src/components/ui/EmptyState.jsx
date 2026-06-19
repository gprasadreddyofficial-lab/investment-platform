import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EmptyState({ icon: Icon = TrendingUp, title = 'Nothing here yet', description = '', ctaLabel, ctaPath }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-[#A8AABD] text-sm mb-6 max-w-xs">{description}</p>}
      {ctaLabel && ctaPath && (
        <button className="btn-primary" onClick={() => navigate(ctaPath)}>
          {ctaLabel}
        </button>
      )}
    </motion.div>
  );
}

export default EmptyState;
