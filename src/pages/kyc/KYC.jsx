import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Check, ArrowRight, ArrowLeft, Upload, User, CreditCard, Shield, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const steps = ['Personal Details', 'PAN Card', 'Aadhaar Card', 'Selfie & Passbook'];
const kycStatus = 'pending'; // pending | approved | rejected

function DocUpload({ label, onUpload, uploaded, side }) {
  return (
    <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${uploaded ? 'border-secondary bg-secondary/5' : 'border-[#252840] hover:border-primary'}`}>
      {uploaded ? (
        <>
          <Check className="w-8 h-8 text-secondary mb-2" />
          <p className="text-secondary text-sm font-medium">Uploaded{side ? ` (${side})` : ''}</p>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 text-[#5C5F78] mb-2" />
          <p className="text-[#A8AABD] text-sm">{label}</p>
          <p className="text-[#5C5F78] text-xs mt-1">PNG, JPG up to 5MB</p>
        </>
      )}
      <input type="file" className="hidden" accept="image/*" onChange={() => onUpload(true)} />
    </label>
  );
}

export default function KYC() {
  const [step, setStep] = useState(0);
  const [docs, setDocs] = useState({
    panFront: false,
    aadhaarFront: false,
    aadhaarBack: false,
    selfie: false,
    passbook: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleFinalSubmit = () => {
    setSubmitted(true);
    toast.success('KYC submitted for review!');
  };

  const statusConfig = {
    pending: { color: 'bg-warning/10 border-warning/30 text-warning', icon: AlertCircle, text: 'KYC Pending — Complete your verification to unlock all features' },
    approved: { color: 'bg-secondary/10 border-secondary/30 text-secondary', icon: CheckCircle, text: 'KYC Approved — Your identity has been verified successfully' },
    rejected: { color: 'bg-danger/10 border-danger/30 text-danger', icon: AlertCircle, text: 'KYC Rejected — Reason: Document was not clear. Please re-upload.' },
  };
  const sc = statusConfig[kycStatus];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-warning" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white">KYC Under Review</h2>
        <p className="text-[#A8AABD] text-center max-w-xs">Your documents are being verified. This usually takes 24–48 hours.</p>
        <div className="flex flex-col items-center gap-2 text-sm text-[#A8AABD]">
          <p>✓ Personal details submitted</p>
          <p>✓ PAN card uploaded</p>
          <p>✓ Aadhaar card uploaded</p>
          <p>✓ Selfie & passbook uploaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Complete your identity verification</p>
      </div>

      {/* Status banner */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${sc.color}`}>
        <sc.icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{sc.text}</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center overflow-x-auto gap-2 pb-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
              ${i < step ? 'bg-secondary text-white' : i === step ? 'bg-primary text-white' : 'bg-[#252840] text-[#5C5F78]'}`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-12 rounded flex-shrink-0 ${i < step ? 'bg-secondary' : 'bg-[#252840]'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" className="card p-6 space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">Full Name</label>
                <input {...register('fullName')} type="text" placeholder="As per PAN card" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">Date of Birth</label>
                <input {...register('dob')} type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">Gender</label>
                <select {...register('gender')} className="input-field">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">Mobile Number</label>
                <input {...register('mobile')} type="tel" placeholder="+91 98765 43210" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-[#A8AABD] mb-1.5">Address</label>
                <input {...register('address')} type="text" placeholder="House / Flat no., Street, Area" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">City</label>
                <input {...register('city')} type="text" placeholder="Mumbai" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">State</label>
                <input {...register('state')} type="text" placeholder="Maharashtra" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[#A8AABD] mb-1.5">PIN Code</label>
                <input {...register('pin')} type="text" placeholder="400001" className="input-field font-mono" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" className="card p-6 space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> PAN Card</h3>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">PAN Number</label>
              <input {...register('pan')} type="text" placeholder="ABCDE1234F" className="input-field font-mono uppercase" maxLength={10} />
            </div>
            <DocUpload label="Upload PAN Card Front" uploaded={docs.panFront} onUpload={(v) => setDocs({ ...docs, panFront: v })} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" className="card p-6 space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Aadhaar Card</h3>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Aadhaar Number</label>
              <input {...register('aadhaar')} type="text" placeholder="XXXX XXXX XXXX" className="input-field font-mono" maxLength={14} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DocUpload label="Upload Front Side" uploaded={docs.aadhaarFront} onUpload={(v) => setDocs({ ...docs, aadhaarFront: v })} side="Front" />
              <DocUpload label="Upload Back Side" uploaded={docs.aadhaarBack} onUpload={(v) => setDocs({ ...docs, aadhaarBack: v })} side="Back" />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" className="card p-6 space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-semibold text-white flex items-center gap-2"><Camera className="w-4 h-4 text-primary" /> Selfie & Bank Passbook</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DocUpload label="Upload Live Selfie" uploaded={docs.selfie} onUpload={(v) => setDocs({ ...docs, selfie: v })} />
              <DocUpload label="Bank Passbook / Statement" uploaded={docs.passbook} onUpload={(v) => setDocs({ ...docs, passbook: v })} />
            </div>
            <div className="p-3 rounded-xl bg-[#0D0F1A] border border-[#252840] text-xs text-[#A8AABD]">
              <p>• Hold a plain white paper with today's date and sign it in your selfie</p>
              <p>• Passbook should show your name, account no., IFSC, and bank details</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />Back
          </button>
        )}
        <motion.button
          onClick={step === 3 ? handleFinalSubmit : () => setStep(step + 1)}
          className="btn-primary flex items-center justify-center gap-2 flex-1"
          whileTap={{ scale: 0.97 }}
        >
          {step === 3 ? 'Submit KYC' : 'Continue'}
          {step < 3 && <ArrowRight className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  );
}
