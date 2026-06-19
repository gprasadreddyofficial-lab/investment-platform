import { useCountUp } from '../../hooks/useCountUp';
import { formatINR } from '../../data/mockData';

export function CountUp({ value, prefix = '', suffix = '', currency = false, decimals = 0, className = '', duration = 1500 }) {
  const count = useCountUp(value, duration);

  const display = currency
    ? formatINR(count)
    : `${prefix}${decimals > 0 ? count.toFixed(decimals) : count.toLocaleString('en-IN')}${suffix}`;

  return <span className={className}>{display}</span>;
}

export default CountUp;
