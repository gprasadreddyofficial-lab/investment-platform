import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Briefcase, TrendingUp, Wallet,
  ArrowDownToLine, ArrowUpFromLine, FileCheck, Receipt,
  User, HeadphonesIcon, ChevronLeft, ChevronRight, Zap, LogOut,
} from 'lucide-react';
import useStore from '../../store/useStore';
import clsx from 'clsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/packages', label: 'Invest', icon: Package },
  { path: '/my-investments', label: 'My Investments', icon: Briefcase },
  { path: '/earnings', label: 'Earnings', icon: TrendingUp },
  { path: '/wallet', label: 'Wallet', icon: Wallet },
  { path: '/deposit', label: 'Deposit', icon: ArrowDownToLine },
  { path: '/withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
  { path: '/kyc', label: 'KYC', icon: FileCheck },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/support', label: 'Support', icon: HeadphonesIcon },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, logout, user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      className="flex-shrink-0 bg-[#161827] border-r border-[#252840] z-40 flex-col hidden lg:flex h-screen sticky top-0"
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#252840]">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              className="font-bold text-white text-lg whitespace-nowrap overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              WealthPro
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path}>
            {({ isActive }) => (
              <div
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-[#A8AABD] hover:bg-[#252840] hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#252840] p-3 space-y-1">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-[#5C5F78] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#A8AABD] hover:bg-[#252840] hover:text-white transition-all duration-200 w-full"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
