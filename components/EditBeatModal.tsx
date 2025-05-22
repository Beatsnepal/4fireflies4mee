
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface EditBeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: any;
  onUpdate: () => void;
}

export const EditBeatModal: React.FC<EditBeatModalProps> = ({ isOpen, onClose, beat, onUpdate }) => {
  const [name, setName] = useState(beat.name);
  const [key, setKey] = useState(beat.key);
  const [bpm, setBpm] = useState(beat.bpm.toString());
  const [price, setPrice] = useState(beat.price.toString());
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('beats').update({
      name,
      key,
      bpm: parseInt(bpm),
      price: parseFloat(price),
    }).eq('id', beat.id);

    setLoading(false);

    if (error) {
      alert('Failed to update beat: ' + error.message);
    } else {
      alert('Beat updated!');
      onUpdate();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Beat</h2>
        <form className="space-y-3" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Beat Name"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Key"
            className="w-full border rounded p-2"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="BPM"
            className="w-full border rounded p-2"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="w-full border rounded p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Beat'}
          </button>
        </form>
      </div>
    </div>
  );
};
