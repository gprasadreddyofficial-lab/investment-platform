import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Copy, ExternalLink, Shield, AlertTriangle, Eye, EyeOff, Monitor, Smartphone, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import useStore from '../../store/useStore';
import { formatINR } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

export default function Profile() {
  const { user, kycStatus, loginActivity } = useStore();
  const [editing, setEditing] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { name: user.name, email: user.email, mobile: user.mobile } });

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast.success('Referral code copied!');
  };

  const onSave = (data) => {
    setEditing(false);
    toast.success('Profile updated!');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Manage your account settings</p>
      </div>

      {/* Hero card */}
      <motion.div className="card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <Badge status={kycStatus} label={`KYC ${kycStatus}`} />
            </div>
            <p className="text-[#A8AABD] text-sm mt-0.5">{user.email}</p>
            <p className="text-[#5C5F78] text-xs mt-1">Member since {format(new Date(user.memberSince), 'MMM dd, yyyy')}</p>
          </div>
          <button onClick={() => setEditing(!editing)} className={editing ? 'btn-secondary text-sm' : 'btn-primary text-sm'}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing && (
          <motion.form
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmit(onSave)}
          >
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Full Name</label>
              <input {...register('name')} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Email</label>
              <input {...register('email')} type="email" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Mobile</label>
              <input {...register('mobile')} className="input-field" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full">Save Changes</button>
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Investment', value: formatINR(user.totalInvestment), color: 'text-primary' },
          { label: 'Total Earnings', value: formatINR(user.totalEarnings), color: 'text-secondary' },
          { label: 'Wallet Balance', value: formatINR(user.walletBalance), color: 'text-warning' },
          { label: 'Total Deposits', value: formatINR(user.totalDeposits), color: 'text-white' },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#A8AABD] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Referral */}
      <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-semibold text-white mb-4">Referral Program</h3>
        <p className="text-[#A8AABD] text-sm mb-4">Invite friends and earn ₹500 for every successful referral.</p>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 flex items-center gap-2 bg-[#0D0F1A] border border-[#252840] rounded-lg px-4 py-2.5">
            <span className="font-mono font-bold text-white">{user.referralCode}</span>
          </div>
          <button onClick={copyCode} className="flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors">
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <a href={`https://wa.me/?text=Join WealthPro with my code ${user.referralCode}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#25D366]/30 transition-colors">
            <ExternalLink className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div className="card p-5 space-y-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="font-semibold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Security</h3>

        <div>
          <p className="text-sm font-medium text-white mb-3">Change Password</p>
          <div className="space-y-3">
            <div className="relative">
              <input type={showPwd ? 'text' : 'password'} placeholder="Current password" className="input-field pr-10" />
              <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C5F78]">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <input type="password" placeholder="New password" className="input-field" />
            <input type="password" placeholder="Confirm new password" className="input-field" />
            <button className="btn-primary text-sm px-4 py-2" onClick={() => toast.success('Password updated!')}>Update Password</button>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-[#252840]">
          <div>
            <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
            <p className="text-xs text-[#A8AABD]">Add an extra layer of security</p>
          </div>
          <button
            onClick={() => { setShow2FA(!show2FA); toast.success(show2FA ? '2FA disabled' : '2FA enabled'); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${show2FA ? 'bg-primary' : 'bg-[#252840]'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${show2FA ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </motion.div>

      {/* Login Activity */}
      <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="p-5 border-b border-[#252840]">
          <h3 className="font-semibold text-white">Login Activity</h3>
        </div>
        <div className="divide-y divide-[#252840]">
          {loginActivity.map((l) => (
            <div key={l.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#1a1d2e] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#252840] flex items-center justify-center flex-shrink-0">
                {l.device.includes('iPhone') || l.device.includes('Android') ? <Smartphone className="w-4 h-4 text-[#A8AABD]" /> : <Monitor className="w-4 h-4 text-[#A8AABD]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{l.device}</p>
                <p className="text-xs text-[#5C5F78]">{l.ip} · {l.location}</p>
              </div>
              <p className="text-xs text-[#A8AABD] flex-shrink-0">{l.time}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div
        className="card border-danger/30 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setShowDanger(!showDanger)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" />
            <h3 className="font-semibold text-danger">Danger Zone</h3>
          </div>
          <ChevronDown className={`w-4 h-4 text-danger transition-transform ${showDanger ? 'rotate-180' : ''}`} />
        </button>
        {showDanger && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-danger/20">
              <p className="text-[#A8AABD] text-sm mt-4 mb-4">Deactivating your account will suspend all active investments and freeze your wallet balance.</p>
              <button className="px-4 py-2 bg-danger/10 border border-danger/30 text-danger rounded-lg text-sm font-semibold hover:bg-danger/20 transition-colors"
                onClick={() => toast.error('Account deactivation requires admin approval')}>
                Request Account Deactivation
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
