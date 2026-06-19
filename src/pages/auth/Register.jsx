import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Zap, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const steps = ['Personal Info', 'Set Password', 'Verify Email'];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { login } = useStore();
  const navigate = useNavigate();

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleFinalSubmit = () => {
    login('rahul@example.com', 'password');
    toast.success('Account created successfully! 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-dark-bg">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-grid relative overflow-hidden p-12 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">WealthPro</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Start Your <span className="text-secondary">Investment Journey</span>
          </h1>
          <p className="text-[#A8AABD]">Join thousands of smart investors and start earning daily returns from day one.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Min. Investment', value: '₹10,000' },
              { label: 'Daily Returns', value: 'Up to 1.4%' },
              { label: 'Max. Duration', value: '200 Days' },
              { label: 'Total Members', value: '12,847+' },
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 text-center">
                <p className="text-xl font-bold font-mono text-white">{item.value}</p>
                <p className="text-xs text-[#A8AABD] mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6">
        <motion.div
          className="glass-card p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${i < currentStep ? 'bg-secondary text-white' : i === currentStep ? 'bg-primary text-white' : 'bg-[#252840] text-[#5C5F78]'}`}>
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 w-8 rounded ${i < currentStep ? 'bg-secondary' : 'bg-[#252840]'}`} />}
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{steps[currentStep]}</h3>
          <p className="text-[#A8AABD] text-sm mb-6">Step {currentStep + 1} of {steps.length}</p>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Full Name</label>
                  <input {...register('name')} type="text" placeholder="Rahul Sharma" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Email address</label>
                  <input {...register('email')} type="email" placeholder="rahul@example.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Mobile Number</label>
                  <input {...register('mobile')} type="tel" placeholder="+91 98765 43210" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Referral Code (optional)</label>
                  <input {...register('referral')} type="text" placeholder="RAHUL2024" className="input-field" />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Create Password</label>
                  <div className="relative">
                    <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="input-field pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C5F78] hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Confirm Password</label>
                  <input {...register('confirmPassword')} type="password" placeholder="••••••••" className="input-field" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-primary" />
                  <span className="text-sm text-[#A8AABD]">
                    I agree to the <span className="text-primary">Terms & Conditions</span> and <span className="text-primary">Privacy Policy</span>
                  </span>
                </label>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <p className="text-[#A8AABD] text-sm">Enter the 6-digit OTP sent to your email</p>
                <div className="flex gap-2 justify-between">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      value={val}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      maxLength={1}
                      className="w-11 h-12 text-center text-xl font-bold input-field p-0"
                    />
                  ))}
                </div>
                <p className="text-xs text-[#5C5F78] text-center">
                  Didn't receive? <button className="text-primary hover:underline">Resend OTP</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-secondary flex items-center gap-2 flex-1">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <motion.button
              onClick={currentStep === 2 ? handleFinalSubmit : handleNext}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
              whileTap={{ scale: 0.97 }}
            >
              {currentStep === 2 ? 'Create Account' : 'Continue'}
              {currentStep < 2 && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </div>

          <p className="text-center text-[#A8AABD] text-sm mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
