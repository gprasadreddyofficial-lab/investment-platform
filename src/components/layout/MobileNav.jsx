import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Wallet, TrendingUp, User } from 'lucide-react';
import clsx from 'clsx';

const mobileNav = [
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/packages', label: 'Invest', icon: Package },
  { path: '/wallet', label: 'Wallet', icon: Wallet },
  { path: '/earnings', label: 'Earnings', icon: TrendingUp },
  { path: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  return (
    <nav className="bottom-nav lg:hidden">
      {mobileNav.map(({ path, label, icon: Icon }) => (
        <NavLink key={path} to={path} className="flex-1">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 py-1">
              <Icon
                className={clsx('w-5 h-5 transition-colors', isActive ? 'text-primary' : 'text-[#5C5F78]')}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className={clsx('text-[10px] font-medium', isActive ? 'text-primary' : 'text-[#5C5F78]')}>
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" style={{ left: '50%', transform: 'translateX(-50%)' }} />
              )}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
