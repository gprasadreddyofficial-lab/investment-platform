import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import FloatingWallet from '../FloatingWallet';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#161827',
            color: '#fff',
            border: '1px solid #252840',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#00D4AA', secondary: '#fff' } },
          error: { iconTheme: { primary: '#FF4D6D', secondary: '#fff' } },
        }}
      />

      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 pb-20 lg:pb-6">
          <div className="p-4 lg:p-6 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <MobileNav />
      <FloatingWallet />
    </div>
  );
}

export default Layout;
