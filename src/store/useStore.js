import { create } from 'zustand';
import {
  mockUser,
  mockPackages,
  mockInvestments,
  mockEarnings,
  mockTransactions,
  mockNotifications,
  mockAdminStats,
  mockAdminUsers,
  mockWalletLedger,
  mockSupportTickets,
  mockLoginActivity,
} from '../data/mockData';

const useStore = create((set, get) => ({
  // Auth
  isAuthenticated: false,
  isAdmin: false,
  user: mockUser,

  login: (email, password) => {
    if (email === 'admin@example.com') {
      set({ isAuthenticated: true, isAdmin: true });
    } else {
      set({ isAuthenticated: true, isAdmin: false });
    }
  },
  logout: () => set({ isAuthenticated: false, isAdmin: false }),

  // User data
  walletBalance: mockUser.walletBalance,
  totalEarnings: mockUser.totalEarnings,
  liveEarnings: mockUser.totalEarnings,

  // Packages
  packages: mockPackages,

  // Investments
  investments: mockInvestments,
  addInvestment: (investment) =>
    set((state) => ({
      investments: [investment, ...state.investments],
      walletBalance: state.walletBalance - investment.amount,
    })),

  // Earnings
  earnings: mockEarnings,

  // Transactions
  transactions: mockTransactions,

  // Wallet
  walletLedger: mockWalletLedger,

  // Notifications
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  // Admin
  adminStats: mockAdminStats,
  adminUsers: mockAdminUsers,

  // Support
  supportTickets: mockSupportTickets,
  addTicket: (ticket) =>
    set((state) => ({ supportTickets: [ticket, ...state.supportTickets] })),

  // Login activity
  loginActivity: mockLoginActivity,

  // KYC
  kycStatus: mockUser.kycStatus,

  // UI state
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  // Deposit
  submitDeposit: (data) => {
    set((state) => ({
      transactions: {
        ...state.transactions,
        deposits: [
          { id: `DEP${Date.now()}`, date: new Date().toISOString().split('T')[0], ...data, status: 'pending' },
          ...state.transactions.deposits,
        ],
      },
    }));
  },

  // Withdraw
  submitWithdrawal: (data) => {
    set((state) => ({
      walletBalance: state.walletBalance - data.amount,
      transactions: {
        ...state.transactions,
        withdrawals: [
          {
            id: `WIT${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            ...data,
            status: 'pending',
          },
          ...state.transactions.withdrawals,
        ],
      },
    }));
  },

  // Simulate live earnings tick
  tickEarnings: () =>
    set((state) => ({
      liveEarnings: state.liveEarnings + Math.random() * 2,
    })),
}));

export default useStore;
