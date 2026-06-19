import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Check, AlertCircle, ArrowRight, Clock } from 'lucide-react';
import { addDays, format } from 'date-fns';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

const methods = ['Bank Transfer', 'UPI', 'IMPS'];

export default function Withdraw() {
  const { walletBalance, kycStatus, investments, submitWithdrawal, transactions } = useStore();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const adminFeeRate = 0.02;
  const gstRate = 0.18;
  const numAmount = Number(amount) || 0;
  const adminFee = numAmount * adminFeeRate;
  const gst = adminFee * gstRate;
  const youReceive = numAmount - adminFee - gst;

  const kycApproved = kycStatus === 'approved';
  const activeInv = investments.filter((i) => i.status === 'active');
  const lockOk = activeInv.every((i) => i.elapsed >= 30);
  const minOk = numAmount >= 500;
  const balanceOk = numAmount <= walletBalance;

  const checks = [
    { label: 'KYC Approved', ok: kycApproved, action: '/kyc', msg: 'Complete KYC →' },
    { label: 'Locking Period Completed', ok: lockOk, msg: lockOk ? null : 'Active investments still in lock' },
    { label: 'Minimum ₹500', ok: minOk, msg: 'Enter ₹500 or more' },
    { label: 'Sufficient Balance', ok: balanceOk, msg: `Balance: ${formatINR(walletBalance)}` },
  ];

  const canWithdraw = kycApproved && lockOk && minOk && balanceOk;

  const onSubmit = () => {
    submitWithdrawal({ amount: numAmount, method, charges: adminFee + gst, netAmount: youReceive });
    setSubmitted(true);
    toast.success('Withdrawal request submitted!');
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
          <Check className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-white">Withdrawal Requested</h2>
        <p className="text-[#A8AABD]">Processing time: 24–48 hours</p>
        <p className="text-secondary font-mono font-bold text-xl">+{formatINR(youReceive)}</p>
        <p className="text-[#A8AABD] text-sm">Est. settlement: {format(addDays(new Date(), 2), 'dd MMM yyyy')}</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary mt-4">New Withdrawal</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Transfer your earnings to your bank account</p>
      </div>

      {/* Checklist */}
      <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="font-semibold text-white mb-4">Withdrawal Requirements</h3>
        <div className="space-y-3">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${c.ok ? 'bg-secondary/20' : 'bg-warning/20'}`}>
                {c.ok ? <Check className="w-3.5 h-3.5 text-secondary" /> : <AlertCircle className="w-3.5 h-3.5 text-warning" />}
              </div>
              <span className="text-sm text-white flex-1">{c.label}</span>
              {!c.ok && c.msg && <span className="text-warning text-xs">{c.msg}</span>}
              {c.ok && <Badge status="approved" label="✓" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Form */}
      <motion.div className="card p-5 space-y-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div>
          <label className="block text-sm text-[#A8AABD] mb-1.5">Withdrawal Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min ₹500"
            className="input-field text-xl font-mono"
          />
          <p className="text-xs text-[#5C5F78] mt-1">Available: <span className="text-secondary font-mono">{formatINR(walletBalance)}</span></p>
        </div>

        {/* Fee breakdown */}
        {numAmount > 0 && (
          <motion.div
            className="p-4 rounded-xl bg-[#0D0F1A] border border-[#252840] space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-white mb-3">Fee Breakdown</p>
            {[
              ['Requested Amount', formatINR(numAmount), 'text-white'],
              ['Admin Fee (2%)', `– ${formatINR(adminFee)}`, 'text-danger'],
              ['GST on Fee (18%)', `– ${formatINR(gst)}`, 'text-warning'],
            ].map(([label, val, color]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[#A8AABD]">{label}</span>
                <span className={`font-mono ${color}`}>{val}</span>
              </div>
            ))}
            <div className="border-t border-[#252840] pt-2 flex justify-between">
              <span className="font-semibold text-white">You Receive</span>
              <span className="font-bold font-mono text-secondary text-lg">{formatINR(youReceive)}</span>
            </div>
          </motion.div>
        )}

        <div>
          <label className="block text-sm text-[#A8AABD] mb-2">Payment Method</label>
          <div className="flex gap-2">
            {methods.map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${method === m ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {method === 'UPI' && (
          <div>
            <label className="block text-sm text-[#A8AABD] mb-1.5">UPI ID</label>
            <input {...register('upiId')} type="text" placeholder="yourname@upi" className="input-field" />
          </div>
        )}

        {(method === 'Bank Transfer' || method === 'IMPS') && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Account Number</label>
              <input {...register('accountNo')} type="text" placeholder="Enter account number" className="input-field font-mono" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">IFSC Code</label>
              <input {...register('ifsc')} type="text" placeholder="HDFC0001234" className="input-field font-mono" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-[#A8AABD] bg-[#0D0F1A] rounded-xl p-3">
          <Clock className="w-4 h-4 text-warning flex-shrink-0" />
          <span>Processing time: 24–48 hours · Est. settlement: {format(addDays(new Date(), 2), 'dd MMM yyyy')}</span>
        </div>

        <motion.button
          onClick={canWithdraw ? onSubmit : undefined}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ripple flex items-center justify-center gap-2 ${canWithdraw ? 'bg-primary hover:bg-primary/90' : 'bg-[#252840] cursor-not-allowed opacity-60'}`}
          whileTap={canWithdraw ? { scale: 0.97 } : {}}
        >
          Submit Withdrawal
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* History */}
      <motion.div className="card overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="p-5 border-b border-[#252840]">
          <h3 className="font-semibold text-white">Withdrawal History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252840]">
                {['ID', 'Date', 'Amount', 'Charges', 'Net Amount', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#5C5F78] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.withdrawals.map((w, i) => (
                <tr key={w.id} className="table-row">
                  <td className="px-5 py-3.5 text-xs font-mono text-[#A8AABD]">{w.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#A8AABD]">{w.date}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-white">{formatINR(w.amount)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-danger">– {formatINR(w.charges)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold text-secondary">{formatINR(w.netAmount)}</td>
                  <td className="px-5 py-3.5"><Badge status={w.status} label={w.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
