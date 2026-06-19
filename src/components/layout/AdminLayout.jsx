import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import {
  LayoutDashboard, Users, Package, Briefcase, ArrowDownToLine,
  ArrowUpFromLine, FileCheck, TrendingUp, BarChart3, Bell, Zap, LogOut,
} from 'lucide-react';
import useStore from '../../store/useStore';
import clsx from 'clsx';

const adminNav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/packages', label: 'Packages', icon: Package },
  { path: '/admin/investments', label: 'Investments', icon: Briefcase },
  { path: '/admin/deposits', label: 'Deposits', icon: ArrowDownToLine },
  { path: '/admin/withdrawals', label: 'Withdrawals', icon: ArrowUpFromLine },
  { path: '/admin/kyc', label: 'KYC Review', icon: FileCheck },
  { path: '/admin/earnings', label: 'Earnings Engine', icon: TrendingUp },
  { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { path: '/admin/notifications', label: 'Notifications', icon: Bell },
];

export function AdminLayout() {
  const { logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <Toaster position="top-right" toastOptions={{ style: { background: '#161827', color: '#fff', border: '1px solid #252840' } }} />

      {/* Admin Sidebar */}
      <aside className="w-60 bg-[#0f1218] border-r border-[#1e2235] flex flex-col flex-shrink-0 hidden lg:flex">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1e2235]">
          <div className="w-8 h-8 rounded-lg bg-warning flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#0D0F1A]" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">WealthPro</span>
            <span className="block text-[10px] text-warning font-semibold tracking-wider">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {adminNav.map(({ path, label, icon: Icon, exact }) => (
            <NavLink key={path} to={path} end={exact}>
              {({ isActive }) => (
                <div className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer',
                  isActive ? 'bg-warning/20 text-warning' : 'text-[#A8AABD] hover:bg-[#1e2235] hover:text-white'
                )}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#1e2235] p-3">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-all w-full">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-[#0f1218] border-b border-[#1e2235] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-semibold text-white">Admin Panel</h1>
          <span className="text-warning text-xs font-semibold bg-warning/10 border border-warning/20 px-3 py-1 rounded-full">ADMIN ACCESS</span>
        </header>
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
