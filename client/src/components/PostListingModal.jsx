import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

const PostListingModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'sale',
    category: 'vegetables',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Error posting listing:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-[#f5f5f4] flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#166534]">Create New Listing</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#f5f5f4] rounded-full transition-colors">
            <X className="w-5 h-5 text-[#111827]/40" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#111827]/40 mb-1">Title</label>
              <input 
                required
                className="w-full bg-[#f5f5f4] border-none rounded-xl p-3 focus:ring-2 ring-[#166534]/20"
                placeholder="e.g., Fresh Organic Kale"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#111827]/40 mb-1">Type</label>
              <select 
                className="w-full bg-[#f5f5f4] border-none rounded-xl p-3 focus:ring-2 ring-[#166534]/20"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="sale">For Sale</option>
                <option value="swap">Swap/Trade</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#111827]/40 mb-1">Price (R)</label>
              <input 
                type="number"
                disabled={formData.type === 'swap'}
                className="w-full bg-[#f5f5f4] border-none rounded-xl p-3 focus:ring-2 ring-[#166534]/20 disabled:opacity-50"
                placeholder="20"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#111827]/40 mb-1">Category</label>
            <select 
                className="w-full bg-[#f5f5f4] border-none rounded-xl p-3 focus:ring-2 ring-[#166534]/20"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="vegetables">Vegetables</option>
                <option value="seedlings">Seedlings</option>
                <option value="compost">Compost</option>
                <option value="tools">Upcycled Tool</option>
              </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#111827]/40 mb-1">Location</label>
            <input 
              required
              className="w-full bg-[#f5f5f4] border-none rounded-xl p-3 focus:ring-2 ring-[#166534]/20"
              placeholder="e.g., Khayelitsha Sector 2"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#166534] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostListingModal;
