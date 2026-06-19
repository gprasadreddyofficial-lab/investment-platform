import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Bell, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockAdminUsers } from '../../data/mockData';

export default function AdminNotifications() {
  const { register, handleSubmit, reset } = useForm();
  const [sent, setSent] = useState([]);

  const onSend = (data) => {
    setSent([{ ...data, id: Date.now(), time: 'Just now' }, ...sent]);
    toast.success('Notification sent!');
    reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Send Notifications</h1>
        <p className="text-[#A8AABD] text-sm mt-1">Push notifications to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Compose Notification</h3>
          <form onSubmit={handleSubmit(onSend)} className="space-y-4">
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Target Audience</label>
              <select {...register('target')} className="input-field">
                <option>All Users</option>
                <option>Active Investors</option>
                <option>Pending KYC</option>
                <option>Specific User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Notification Type</label>
              <select {...register('type')} className="input-field">
                <option>General</option>
                <option>Promotional</option>
                <option>System Alert</option>
                <option>Payout Update</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Title</label>
              <input {...register('title', { required: true })} type="text" placeholder="Notification title" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-[#A8AABD] mb-1.5">Message</label>
              <textarea {...register('message', { required: true })} rows={3} placeholder="Enter notification message..." className="input-field resize-none" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-warning/20 text-warning border border-warning/30 font-semibold flex items-center justify-center gap-2 hover:bg-warning/30 transition-colors">
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </form>
        </motion.div>

        <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="p-5 border-b border-[#252840]">
            <h3 className="font-semibold text-white">Recently Sent</h3>
          </div>
          <div className="divide-y divide-[#252840]">
            {sent.length === 0 && (
              <p className="text-[#A8AABD] text-sm text-center py-8">No notifications sent yet</p>
            )}
            {sent.map((n) => (
              <div key={n.id} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">{n.title}</span>
                  <span className="text-[10px] text-[#5C5F78]">{n.time}</span>
                </div>
                <p className="text-xs text-[#A8AABD]">{n.message}</p>
                <p className="text-[10px] text-primary mt-1">→ {n.target}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
