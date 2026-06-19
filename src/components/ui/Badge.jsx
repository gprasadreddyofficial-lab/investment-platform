import clsx from 'clsx';

const variants = {
  active: 'bg-secondary/20 text-secondary',
  completed: 'bg-[#5C5F78]/20 text-[#A8AABD]',
  expired: 'bg-danger/20 text-danger',
  pending: 'bg-warning/20 text-warning',
  approved: 'bg-secondary/20 text-secondary',
  rejected: 'bg-danger/20 text-danger',
  credited: 'bg-secondary/20 text-secondary',
  open: 'bg-primary/20 text-primary',
  in_progress: 'bg-warning/20 text-warning',
  resolved: 'bg-secondary/20 text-secondary',
  suspended: 'bg-danger/20 text-danger',
  high: 'bg-danger/20 text-danger',
  medium: 'bg-warning/20 text-warning',
  low: 'bg-secondary/20 text-secondary',
  starter: 'bg-secondary/20 text-secondary',
  premium: 'bg-primary/20 text-primary',
  elite: 'bg-warning/20 text-warning',
};

export function Badge({ status, label, className = '' }) {
  const key = (status || label || '').toLowerCase().replace(' ', '_');
  const style = variants[key] || 'bg-[#252840] text-[#A8AABD]';

  return (
    <span className={clsx('badge', style, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      {label || status}
    </span>
  );
}

export default Badge;
