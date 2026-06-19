import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Check, Copy, Upload, ArrowRight, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const quickAmounts = [1000, 5000, 10000, 25000];
const paymentMethods = [
  { id: 'upi', label: 'UPI Payment', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦', desc: 'NEFT / RTGS / IMPS' },
  { id: 'qr', label: 'QR Code', icon: '📷', desc: 'Scan and pay instantly' },
];

const steps = ['Enter Amount', 'Payment Method', 'Upload Proof'];

const timeline = [
  { label: 'Deposit Submitted', done: true, active: false },
  { label: 'Under Review', done: false, active: true },
  { label: 'Approved', done: false, active: false },
  { label: 'Credited to Wallet', done: false, active: false },
];

export default function Deposit() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { submitDeposit } = useStore();
  const { register, handleSubmit } = useForm();

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleFinalSubmit = () => {
    submitDeposit({ amount: Number(amount), method });
    setSubmitted(true);
    toast.success('Deposit submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-secondary" />
        </motion.div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Deposit Submitted!</h2>
          <p className="text-[#A8AABD]">Your deposit of ₹{Number(amount).toLocaleString('en-IN')} is under review.</p>
        </div>
        <div className="w-full max-w-sm">
          <div className="space-y-3">
            {timeline.map((t, i) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-secondary' : t.active ? 'bg-warning' : 'bg-[#252840]'}`}>
                  {t.done ? <Check className="w-3.5 h-3.5 text-white" /> : <span className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <span className={`text-sm ${t.done || t.active ? 'text-white font-medium' : 'text-[#5C5F78]'}`}>{t.label}</span>
                {t.active && <Clock className="w-3.5 h-3.5 text-warning ml-auto" />}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { setSubmitted(false); setStep(0); setAmount(''); setMethod(''); setFile(null); }}
          className="btn-primary">New Deposit</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Add money to your wallet</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${i < step ? 'bg-secondary text-white' : i === step ? 'bg-primary text-white' : 'bg-[#252840] text-[#5C5F78]'}`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 w-12 sm:w-20 rounded ${i < step ? 'bg-secondary' : 'bg-[#252840]'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" className="card p-6 space-y-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white">Enter Amount</h3>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Deposit Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input-field text-xl font-mono"
                min={500}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((a) => (
                <button key={a} onClick={() => setAmount(String(a))}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold font-mono transition-colors ${amount === String(a) ? 'bg-primary text-white' : 'bg-[#252840] text-[#A8AABD] hover:text-white'}`}>
                  ₹{a.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
            {amount && (
              <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                <p className="text-secondary text-sm">You are depositing <span className="font-bold font-mono">₹{Number(amount).toLocaleString('en-IN')}</span></p>
              </div>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" className="card p-6 space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white">Choose Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${method === m.id ? 'border-primary bg-primary/10' : 'border-[#252840] hover:border-[#3d405e]'}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold text-white text-sm">{m.label}</p>
                    <p className="text-xs text-[#A8AABD]">{m.desc}</p>
                  </div>
                  {method === m.id && <Check className="w-5 h-5 text-primary ml-auto" />}
                </button>
              ))}
            </div>

            {method === 'upi' && (
              <div className="p-4 rounded-xl bg-[#0D0F1A] border border-[#252840] space-y-3">
                <p className="text-sm font-semibold text-white">UPI Payment Details</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#A8AABD] text-sm">UPI ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white text-sm">wealthpro@upi</span>
                    <button onClick={() => copyText('wealthpro@upi')} className="text-primary hover:text-white"><Copy className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
                  <div className="text-[#0D0F1A] text-xs font-mono text-center p-2">QR CODE<br />PLACEHOLDER</div>
                </div>
              </div>
            )}

            {method === 'bank' && (
              <div className="p-4 rounded-xl bg-[#0D0F1A] border border-[#252840] space-y-3">
                <p className="text-sm font-semibold text-white">Bank Transfer Details</p>
                {[
                  ['Account Name', 'WealthPro Investments Pvt. Ltd.'],
                  ['Account No.', '9876543210001234'],
                  ['IFSC Code', 'HDFC0001234'],
                  ['Bank', 'HDFC Bank, Mumbai Branch'],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[#A8AABD] text-sm">{label}:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white text-xs">{val}</span>
                      <button onClick={() => copyText(val)} className="text-primary hover:text-white"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" className="card p-6 space-y-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white">Upload Payment Proof</h3>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Transaction Reference Number</label>
              <input {...register('txnRef')} type="text" placeholder="UTR / Transaction ID" className="input-field font-mono" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-3">Payment Screenshot</label>
              <label
                className="flex flex-col items-center justify-center border-2 border-dashed border-[#252840] rounded-xl p-8 cursor-pointer hover:border-primary transition-colors"
                htmlFor="proof-upload"
              >
                {file ? (
                  <div className="text-center">
                    <Check className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="text-secondary font-medium text-sm">{file.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#5C5F78] mb-2" />
                    <p className="text-[#A8AABD] text-sm">Drag & drop or click to upload</p>
                    <p className="text-[#5C5F78] text-xs mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input id="proof-upload" type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />Back
          </button>
        )}
        <motion.button
          onClick={step === 2 ? handleFinalSubmit : () => {
            if (step === 0 && !amount) { toast.error('Enter an amount first'); return; }
            if (step === 1 && !method) { toast.error('Select a payment method'); return; }
            setStep(step + 1);
          }}
          className="btn-primary flex items-center gap-2 flex-1 justify-center ripple"
          whileTap={{ scale: 0.97 }}
        >
          {step === 2 ? 'Submit Deposit' : 'Continue'}
          {step < 2 && <ArrowRight className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  );
}
