import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Zap, TrendingUp, Shield, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const floatingStats = [
  { label: 'Total Investors', value: '12,847+', icon: Users, color: '#6C63FF' },
  { label: 'Daily Payouts', value: '₹4.2L+', icon: TrendingUp, color: '#00D4AA' },
  { label: 'Funds Secured', value: '₹45Cr+', icon: Shield, color: '#FFB830' },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    login(data.email, data.password);
    toast.success('Welcome back! 🎉');
    if (data.email === 'admin@example.com') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen flex bg-dark-bg overflow-hidden">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col flex-1 bg-grid relative overflow-hidden px-10 py-8 justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">WealthPro</span>
        </div>

        {/* Headline */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
            Invest Smart.<br />
            <span className="text-primary">Earn Daily.</span>
          </h1>
          <p className="text-[#A8AABD] text-sm max-w-xs">
            Join thousands of investors earning daily passive income through our verified investment packages.
          </p>

          {/* Stat cards — compact, stacked */}
          <div className="mt-6 space-y-3">
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card px-4 py-3 flex items-center gap-3 w-64"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-white font-bold font-mono text-sm">{stat.value}</p>
                  <p className="text-[#A8AABD] text-xs">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="relative z-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex -space-x-2">
            {['R', 'P', 'A', 'S', 'V'].map((l, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#0D0F1A] flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: ['#6C63FF', '#00D4AA', '#FFB830', '#FF4D6D', '#6C63FF'][i] }}
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-[#A8AABD] text-xs">
            Join <span className="text-white font-semibold">12,000+ investors</span> earning daily
          </p>
        </motion.div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6">
        <motion.div
          className="glass-card p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">WealthPro</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-[#A8AABD] text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Email address</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="rahul@example.com"
                className="input-field"
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C5F78] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-danger text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-primary text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 ripple"
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <p className="text-center text-[#A8AABD] text-sm mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create one
            </Link>
          </p>

          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-[#A8AABD] text-center leading-relaxed">
              Demo: <span className="text-white font-mono">rahul@example.com</span> / any password
              <br />
              Admin: <span className="text-white font-mono">admin@example.com</span> / any password
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
