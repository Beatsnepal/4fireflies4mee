
import React, { useState } from 'react';
import { X, Headphones, Link } from 'lucide-react';

interface JoinServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    experience: string;
    youtubeUrl: string;
    price: number;
    phone: string;
    deliveryHours: number;
  }) => void;
}

export const JoinServiceModal: React.FC<JoinServiceModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryHours, setDeliveryHours] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      experience,
      youtubeUrl,
      price: Number(price),
      phone,
      deliveryHours: Number(deliveryHours)
    });
    setName('');
    setExperience('');
    setYoutubeUrl('');
    setPrice('');
    setPhone('');
    setDeliveryHours('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <Headphones size={20} className="mr-2" />
            Join as Mixing/Mastering Engineer
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <select id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required className="w-full px-3 py-2 border rounded-md">
                <option value="">Select experience</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Your Rate per Track (NPR)</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="1" required className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label htmlFor="deliveryHours" className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
              <select
                id="deliveryHours"
                value={deliveryHours}
                onChange={(e) => setDeliveryHours(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select delivery time</option>
                <option value="6">6 Hours</option>
                <option value="12">12 Hours</option>
                <option value="24">24 Hours</option>
                <option value="48">2 Days</option>
                <option value="72">3 Days</option>
              </select>
            </div>

            <div>
              <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-1">Sample Work (YouTube URL)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Link size={16} />
                </span>
                <input type="url" id="youtubeUrl" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." required className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-800 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
