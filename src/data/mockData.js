export const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  mobile: "+91 98765 43210",
  walletBalance: 24500,
  totalInvestment: 150000,
  totalEarnings: 18340,
  totalWithdrawals: 5000,
  totalDeposits: 155000,
  kycStatus: "approved",
  memberSince: "2024-01-15",
  referralCode: "RAHUL2024",
  avatar: null,
};

export const mockPackages = [
  {
    id: 1,
    name: "Starter Plan",
    tier: "Starter",
    amount: 10000,
    duration: 100,
    dailyPayout: 120,
    lockingPeriod: 30,
    totalReturn: 12000,
    status: "active",
    popular: false,
    color: "#00D4AA",
    description: "Perfect entry point for new investors",
  },
  {
    id: 2,
    name: "Growth Plan",
    tier: "Premium",
    amount: 25000,
    duration: 120,
    dailyPayout: 325,
    lockingPeriod: 45,
    totalReturn: 39000,
    status: "active",
    popular: true,
    color: "#6C63FF",
    description: "Most popular plan with balanced returns",
  },
  {
    id: 3,
    name: "Premium Plan",
    tier: "Premium",
    amount: 50000,
    duration: 180,
    dailyPayout: 650,
    lockingPeriod: 60,
    totalReturn: 117000,
    status: "active",
    popular: false,
    color: "#6C63FF",
    description: "High-yield plan for serious investors",
  },
  {
    id: 4,
    name: "Elite Plan",
    tier: "Elite",
    amount: 100000,
    duration: 200,
    dailyPayout: 1400,
    lockingPeriod: 90,
    totalReturn: 280000,
    status: "active",
    popular: false,
    color: "#FFB830",
    description: "Maximum returns for elite investors",
  },
];

export const mockInvestments = [
  {
    id: "INV001",
    package: "Growth Plan",
    amount: 25000,
    earned: 6825,
    remaining: 32175,
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    duration: 120,
    elapsed: 21,
    status: "active",
    dailyPayout: 325,
  },
  {
    id: "INV002",
    package: "Starter Plan",
    amount: 10000,
    earned: 12000,
    remaining: 0,
    startDate: "2023-11-01",
    endDate: "2024-02-09",
    duration: 100,
    elapsed: 100,
    status: "completed",
    dailyPayout: 120,
  },
  {
    id: "INV003",
    package: "Elite Plan",
    amount: 100000,
    earned: 42000,
    remaining: 238000,
    startDate: "2024-01-10",
    endDate: "2024-07-28",
    duration: 200,
    elapsed: 30,
    status: "active",
    dailyPayout: 1400,
  },
  {
    id: "INV004",
    package: "Premium Plan",
    amount: 50000,
    earned: 0,
    remaining: 117000,
    startDate: "2023-10-01",
    endDate: "2024-03-28",
    duration: 180,
    elapsed: 180,
    status: "expired",
    dailyPayout: 650,
  },
];

export const mockEarnings = {
  total: 18340,
  today: 975,
  monthly: 12650,
  history: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
    amount: Math.floor(Math.random() * 500 + 600),
    status: "credited",
    investmentId: i % 3 === 0 ? "INV001" : i % 3 === 1 ? "INV003" : "INV002",
    package: i % 3 === 0 ? "Growth Plan" : i % 3 === 1 ? "Elite Plan" : "Starter Plan",
  })),
  byPackage: [
    { package: "Starter Plan", earned: 3200, color: "#00D4AA" },
    { package: "Growth Plan", earned: 6825, color: "#6C63FF" },
    { package: "Elite Plan", earned: 8315, color: "#FFB830" },
  ],
};

export const mockTransactions = {
  deposits: [
    { id: "DEP001", date: "2024-02-15", amount: 25000, method: "UPI", status: "approved", txnId: "UPI2024021512345" },
    { id: "DEP002", date: "2024-01-20", amount: 50000, method: "Bank Transfer", status: "approved", txnId: "NEFT20240120ABCDE" },
    { id: "DEP003", date: "2024-01-05", amount: 10000, method: "UPI", status: "pending", txnId: "UPI2024010512345" },
    { id: "DEP004", date: "2023-12-22", amount: 70000, method: "IMPS", status: "approved", txnId: "IMPS20231222XYZ89" },
  ],
  withdrawals: [
    { id: "WIT001", date: "2024-02-10", amount: 5000, charges: 100, netAmount: 4900, status: "completed", method: "UPI" },
    { id: "WIT002", date: "2024-01-28", amount: 10000, charges: 200, netAmount: 9800, status: "pending", method: "Bank Transfer" },
  ],
};

export const mockWalletLedger = [
  { id: "TXN001", date: "2024-02-15", type: "Credit", description: "Deposit via UPI", amount: 25000, balance: 24500 },
  { id: "TXN002", date: "2024-02-14", type: "Credit", description: "Daily payout – Growth Plan", amount: 325, balance: -500 },
  { id: "TXN003", date: "2024-02-13", type: "Debit", description: "Investment – Growth Plan", amount: -25000, balance: -825 },
  { id: "TXN004", date: "2024-02-12", type: "Credit", description: "Daily payout – Elite Plan", amount: 1400, balance: 24175 },
  { id: "TXN005", date: "2024-02-11", type: "Debit", description: "Withdrawal – UPI", amount: -5000, balance: 22775 },
  { id: "TXN006", date: "2024-02-10", type: "Credit", description: "Deposit via IMPS", amount: 50000, balance: 27775 },
];

export const mockNotifications = [
  { id: 1, type: "payout", message: "Daily payout of ₹325 credited to your wallet", time: "2 min ago", read: false },
  { id: 2, type: "deposit", message: "Deposit of ₹25,000 approved successfully", time: "1 hour ago", read: false },
  { id: 3, type: "kyc", message: "Your KYC has been approved", time: "2 days ago", read: true },
  { id: 4, type: "payout", message: "Daily payout of ₹1,400 credited to your wallet", time: "1 day ago", read: true },
  { id: 5, type: "withdrawal", message: "Withdrawal of ₹5,000 processed successfully", time: "3 days ago", read: true },
];

export const mockAdminStats = {
  totalUsers: 12847,
  activeUsers: 8432,
  totalInvestments: 98654320,
  activeInvestments: 72345670,
  totalDeposits: 456789000,
  totalWithdrawals: 123400000,
  pendingWithdrawals: 47,
  pendingKYC: 23,
  revenueGenerated: 12345670,
};

export const mockAdminUsers = [
  { id: "USR001", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", kycStatus: "approved", walletBalance: 24500, status: "active", joinDate: "2024-01-15" },
  { id: "USR002", name: "Priya Patel", email: "priya@example.com", phone: "+91 87654 32109", kycStatus: "pending", walletBalance: 15000, status: "active", joinDate: "2024-01-20" },
  { id: "USR003", name: "Amit Kumar", email: "amit@example.com", phone: "+91 76543 21098", kycStatus: "rejected", walletBalance: 0, status: "suspended", joinDate: "2024-02-01" },
  { id: "USR004", name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 65432 10987", kycStatus: "approved", walletBalance: 85000, status: "active", joinDate: "2024-01-05" },
  { id: "USR005", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 54321 09876", kycStatus: "approved", walletBalance: 42000, status: "active", joinDate: "2023-12-15" },
];

export const mockDailyData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
  earnings: Math.floor(Math.random() * 2000 + 800),
  deposits: Math.floor(Math.random() * 50000 + 20000),
  withdrawals: Math.floor(Math.random() * 20000 + 5000),
}));

export const mockMonthlyData = [
  { month: "Sep", investment: 320000 },
  { month: "Oct", investment: 450000 },
  { month: "Nov", investment: 380000 },
  { month: "Dec", investment: 520000 },
  { month: "Jan", investment: 610000 },
  { month: "Feb", investment: 480000 },
];

export const mockWithdrawalTrend = [
  { month: "Sep", amount: 45000 },
  { month: "Oct", amount: 62000 },
  { month: "Nov", amount: 38000 },
  { month: "Dec", amount: 75000 },
  { month: "Jan", amount: 92000 },
  { month: "Feb", amount: 58000 },
];

export const mockSupportTickets = [
  {
    id: "TKT001",
    subject: "Withdrawal not processed",
    category: "Withdrawal",
    priority: "high",
    status: "open",
    created: "2024-02-14",
    lastUpdate: "2 hours ago",
    messages: [
      { sender: "user", text: "My withdrawal of ₹5,000 has been pending for 3 days. Please help.", time: "2024-02-14 10:00" },
      { sender: "admin", text: "We are looking into your withdrawal request. Our team will process it within 24 hours.", time: "2024-02-14 11:30" },
    ],
  },
  {
    id: "TKT002",
    subject: "KYC documents re-upload",
    category: "KYC",
    priority: "medium",
    status: "in_progress",
    created: "2024-02-13",
    lastUpdate: "1 day ago",
    messages: [
      { sender: "user", text: "My KYC was rejected. I want to re-upload my Aadhaar card.", time: "2024-02-13 09:00" },
    ],
  },
  {
    id: "TKT003",
    subject: "Investment package query",
    category: "Investment",
    priority: "low",
    status: "resolved",
    created: "2024-02-10",
    lastUpdate: "3 days ago",
    messages: [
      { sender: "user", text: "Can I invest in multiple packages simultaneously?", time: "2024-02-10 14:00" },
      { sender: "admin", text: "Yes, you can invest in multiple packages at the same time.", time: "2024-02-10 15:00" },
    ],
  },
];

export const mockLoginActivity = [
  { id: 1, device: "Chrome / Windows", ip: "103.21.45.67", location: "Mumbai, MH", time: "Today, 09:41 AM" },
  { id: 2, device: "Safari / iPhone 14", ip: "49.32.12.88", location: "Mumbai, MH", time: "Yesterday, 11:20 PM" },
  { id: 3, device: "Chrome / Android", ip: "103.21.45.67", location: "Pune, MH", time: "Feb 13, 3:15 PM" },
  { id: 4, device: "Firefox / Windows", ip: "115.42.99.12", location: "Delhi, DL", time: "Feb 12, 8:00 AM" },
  { id: 5, device: "Chrome / MacOS", ip: "103.21.45.67", location: "Mumbai, MH", time: "Feb 10, 6:45 PM" },
];

export const mockKYCData = {
  status: "pending",
  personalDetails: {
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  },
  panDetails: { number: "", frontUploaded: false },
  aadhaarDetails: { number: "", frontUploaded: false, backUploaded: false },
  selfieUploaded: false,
  passbookUploaded: false,
};

export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatINRFull = (amount) => {
  if (amount === undefined || amount === null) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};
