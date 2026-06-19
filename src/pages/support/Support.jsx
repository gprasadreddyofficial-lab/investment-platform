import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, MessageSquare, Upload, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import Badge from '../../components/ui/Badge';

const categories = ['Deposit', 'Withdrawal', 'Investment', 'KYC', 'Account', 'Other'];
const priorities = [
  { val: 'low', label: 'Low', color: 'text-secondary bg-secondary/20' },
  { val: 'medium', label: 'Medium', color: 'text-warning bg-warning/20' },
  { val: 'high', label: 'High', color: 'text-danger bg-danger/20' },
];

export default function Support() {
  const { supportTickets, addTicket } = useStore();
  const [activeTicket, setActiveTicket] = useState(null);
  const [priority, setPriority] = useState('medium');
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const ticket = {
      id: `TKT${Date.now()}`,
      subject: data.subject,
      category: data.category,
      priority,
      status: 'open',
      created: new Date().toISOString().split('T')[0],
      lastUpdate: 'Just now',
      messages: [{ sender: 'user', text: data.description, time: new Date().toLocaleString() }],
    };
    addTicket(ticket);
    reset();
    toast.success('Ticket submitted!');
  };

  const ticket = supportTickets.find((t) => t.id === activeTicket);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Support</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Get help from our team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raise ticket */}
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            New Support Ticket
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Subject</label>
              <input {...register('subject', { required: true })} type="text" placeholder="Brief description of your issue" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Category</label>
              <select {...register('category', { required: true })} className="input-field">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-2">Priority</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button key={p.val} type="button" onClick={() => setPriority(p.val)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border ${priority === p.val ? `${p.color} border-current` : 'bg-[#252840] text-[#A8AABD] border-transparent hover:text-white'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Description</label>
              <textarea {...register('description', { required: true })} rows={4}
                placeholder="Describe your issue in detail..."
                className="input-field resize-none" />
            </div>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#252840] cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-4 h-4 text-[#5C5F78]" />
              <span className="text-sm text-[#A8AABD]">Attach file (optional)</span>
              <input type="file" className="hidden" />
            </label>
            <motion.button type="submit" className="btn-primary w-full ripple" whileTap={{ scale: 0.97 }}>
              Submit Ticket
            </motion.button>
          </form>
        </motion.div>

        {/* Ticket list */}
        <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="p-5 border-b border-[#252840]">
            <h3 className="font-semibold text-white">Your Tickets</h3>
          </div>
          <div className="divide-y divide-[#252840] max-h-[500px] overflow-y-auto">
            {supportTickets.map((t) => (
              <div key={t.id}
                onClick={() => setActiveTicket(t.id)}
                className="flex items-start gap-3 p-4 hover:bg-[#1a1d2e] cursor-pointer transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-white text-sm">{t.subject}</span>
                    <Badge status={t.status} label={t.status.replace('_', ' ')} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#5C5F78]">{t.id}</span>
                    <span className="text-xs text-[#5C5F78]">·</span>
                    <span className="text-xs text-[#5C5F78]">{t.category}</span>
                    <Badge status={t.priority} label={t.priority} className="text-[10px]" />
                  </div>
                  <p className="text-xs text-[#5C5F78] mt-0.5">Updated {t.lastUpdate}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#5C5F78] flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ticket thread modal */}
      <AnimatePresence>
        {ticket && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setActiveTicket(null)}
          >
            <motion.div
              className="bg-[#161827] border border-[#252840] rounded-2xl w-full max-w-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-[#252840]">
                <div>
                  <h3 className="font-bold text-white">{ticket.subject}</h3>
                  <p className="text-xs text-[#5C5F78] mt-0.5">{ticket.id} · {ticket.category}</p>
                </div>
                <button onClick={() => setActiveTicket(null)} className="text-[#5C5F78] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
                {ticket.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-primary/20 text-white' : 'bg-[#252840] text-[#A8AABD]'}`}>
                      {msg.sender === 'admin' && <p className="text-xs text-primary font-semibold mb-1">Support Team</p>}
                      <p>{msg.text}</p>
                      <p className="text-[10px] text-[#5C5F78] mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#252840] flex gap-3">
                <input type="text" placeholder="Type a message..." className="input-field flex-1 h-10 text-sm" />
                <button className="btn-primary text-sm px-4">Send</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
