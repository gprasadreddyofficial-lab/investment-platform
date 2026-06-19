import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Reset link sent to ' + data.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg bg-grid p-6">
      <motion.div
        className="glass-card p-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">WealthPro</span>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Mail className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Forgot password?</h2>
        <p className="text-[#A8AABD] text-sm mb-6">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-[#A8AABD] mb-1.5">Email address</label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="rahul@example.com"
              className="input-field"
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center"
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Send Reset Link'}
          </motion.button>
        </form>

        <Link to="/login" className="flex items-center justify-center gap-2 text-[#A8AABD] text-sm mt-6 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
