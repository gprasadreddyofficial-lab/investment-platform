import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, ZoomIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockAdminUsers } from '../../data/mockData';
import Badge from '../../components/ui/Badge';

const kycRequests = mockAdminUsers.filter((u) => u.kycStatus === 'pending').concat(
  [{ id: 'USR006', name: 'Pooja Mehta', email: 'pooja@example.com', kycStatus: 'pending', joinDate: '2024-02-15' }]
);

export default function AdminKYC() {
  const [requests, setRequests] = useState(kycRequests);
  const [reviewing, setReviewing] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [lightbox, setLightbox] = useState(null);

  const handleApprove = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    toast.success('KYC approved successfully');
    setReviewing(null);
  };

  const handleReject = (id) => {
    if (!rejectReason.trim()) { toast.error('Enter rejection reason'); return; }
    setRequests(requests.filter((r) => r.id !== id));
    toast.error(`KYC rejected: ${rejectReason}`);
    setReviewing(null);
    setRejectReason('');
  };

  const docPlaceholders = ['PAN Card', 'Aadhaar Front', 'Aadhaar Back', 'Selfie'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">KYC Review</h1>
        <p className="text-[#A8AABD] text-sm mt-1">{requests.length} pending reviews</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((user, i) => (
          <motion.div key={user.id} className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">{user.name.charAt(0)}</div>
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-xs text-[#5C5F78]">{user.email}</p>
              </div>
            </div>
            <p className="text-xs text-[#A8AABD] mb-3">Submitted: {user.joinDate}</p>
            {/* Doc thumbnails */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {docPlaceholders.slice(0, 2).map((doc) => (
                <button key={doc} onClick={() => setLightbox(doc)}
                  className="relative aspect-video bg-[#252840] rounded-lg flex items-center justify-center text-xs text-[#A8AABD] hover:bg-[#2d3050] transition-colors overflow-hidden group">
                  <span>{doc}</span>
                  <ZoomIn className="w-4 h-4 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
            <button onClick={() => setReviewing(user)}
              className="w-full py-2.5 rounded-xl bg-warning/20 text-warning border border-warning/30 text-sm font-semibold hover:bg-warning/30 transition-colors">
              Review Documents
            </button>
          </motion.div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-20">
          <Check className="w-12 h-12 text-secondary mx-auto mb-4" />
          <p className="text-white font-semibold text-lg">All caught up!</p>
          <p className="text-[#A8AABD] text-sm">No pending KYC reviews</p>
        </div>
      )}

      {/* Review Modal */}
      <AnimatePresence>
        {reviewing && (
          <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setReviewing(null)}>
            <motion.div className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between p-5 border-b border-[#252840]">
                <div>
                  <h3 className="font-bold text-white">{reviewing.name}</h3>
                  <p className="text-xs text-[#5C5F78]">{reviewing.email}</p>
                </div>
                <button onClick={() => setReviewing(null)} className="text-[#5C5F78] hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {docPlaceholders.map((doc) => (
                    <button key={doc} onClick={() => setLightbox(doc)}
                      className="aspect-video bg-[#252840] rounded-xl flex flex-col items-center justify-center gap-2 text-[#A8AABD] hover:bg-[#2d3050] transition-colors group">
                      <ZoomIn className="w-6 h-6 group-hover:text-white transition-colors" />
                      <span className="text-xs">{doc}</span>
                    </button>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-[#A8AABD] mb-1.5">Rejection Reason (required for reject)</label>
                  <input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                    type="text" placeholder="e.g., Document not clear, Name mismatch" className="input-field" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleReject(reviewing.id)}
                    className="flex-1 py-3 rounded-xl bg-danger/20 text-danger border border-danger/30 font-semibold hover:bg-danger/30 transition-colors flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />Reject
                  </button>
                  <button onClick={() => handleApprove(reviewing.id)}
                    className="flex-1 py-3 rounded-xl bg-secondary/20 text-secondary border border-secondary/30 font-semibold hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />Approve
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <div className="max-w-2xl w-full aspect-video bg-[#252840] rounded-2xl flex items-center justify-center relative">
              <p className="text-[#A8AABD]">{lightbox} — Document Preview</p>
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white"><X className="w-5 h-5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
