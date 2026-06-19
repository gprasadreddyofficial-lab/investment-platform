import { useCountdown } from '../../hooks/useCountdown';

export function Countdown({ targetDate, className = '' }) {
  const { formatted } = useCountdown(targetDate);

  return (
    <span className={`font-mono text-sm text-secondary ${className}`}>
      {formatted}
    </span>
  );
}

export default Countdown;
