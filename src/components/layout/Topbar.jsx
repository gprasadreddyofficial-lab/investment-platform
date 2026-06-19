import { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { formatINRFull } from '../../data/mockData';

export function Topbar() {
  const { user, notifications, unreadCount, markAllRead, logout, liveEarnings, tickEarnings, isAdmin } = useStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [displayEarnings, setDisplayEarnings] = useState(liveEarnings);
  const navigate = useNavigate();

  // Simulate live earnings
  useEffect(() => {
    const interval = setInterval(() => {
      tickEarnings();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayEarnings(liveEarnings);
  }, [liveEarnings]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifIcons = { payout: '💰', deposit: '📥', withdrawal: '📤', kyc: '🪪' };

  return (
    <header className="sticky top-0 h-16 bg-[#161827]/95 backdrop-blur-md border-b border-[#252840] z-30 flex items-center justify-between px-5 lg:px-6">

      {/* Left: Greeting */}
      <div className="hidden sm:block">
        <p className="text-sm text-[#A8AABD]">
          {greeting}, <span className="text-white font-semibold">{user.name.split(' ')[0]}</span> 👋
        </p>
      </div>

      {/* Right: Earnings ticker + actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Live earnings ticker */}
        {!isAdmin && (
          <div className="hidden md:flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-lg px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary font-mono text-sm font-semibold">
              {formatINRFull(displayEarnings)} earned
            </span>
          </div>
        )}

        {/* Search */}
        <button className="w-9 h-9 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white transition-colors">
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="w-9 h-9 rounded-lg bg-[#252840] flex items-center justify-center text-[#A8AABD] hover:text-white transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                className="absolute right-0 top-12 w-80 bg-[#161827] border border-[#252840] rounded-xl shadow-2xl z-50"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between p-4 border-b border-[#252840]">
                  <span className="font-semibold text-white">Notifications</span>
                  <button onClick={markAllRead} className="text-primary text-xs hover:underline">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`flex gap-3 p-4 border-b border-[#252840] hover:bg-[#1a1d2e] transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                      <span className="text-lg">{notifIcons[n.type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-snug">{n.message}</p>
                        <p className="text-xs text-[#5C5F78] mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 bg-[#252840] rounded-lg px-3 py-1.5 hover:bg-[#2d3050] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-white hidden sm:block">{user.name.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 text-[#5C5F78]" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                className="absolute right-0 top-12 w-48 bg-[#161827] border border-[#252840] rounded-xl shadow-2xl z-50 overflow-hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={() => { navigate('/profile'); setShowProfile(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-[#A8AABD] hover:bg-[#252840] hover:text-white transition-colors text-sm">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-danger hover:bg-danger/10 transition-colors text-sm">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
