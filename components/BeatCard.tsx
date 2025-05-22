import React, { useState, useRef } from 'react';
import { Play, Pause, Phone, MoreVertical, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { EditBeatModal } from './EditBeatModal';

interface Beat {
  id: number;
  name: string;
  key: string;
  bpm: number;
  price: number;
  phone: string;
  uploader: string;
  coverArt: string;
  audioUrl: string;
  producerPhone: string;
}

interface BeatCardProps {
  beat: Beat;
  onDelete?: () => void;
}

export const BeatCard: React.FC<BeatCardProps> = ({ beat, onDelete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this beat?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('beats').delete().eq('id', beat.id);
    if (error) {
      alert('Failed to delete beat: ' + error.message);
    } else {
      alert('Beat deleted!');
      if (onDelete) onDelete();
    }
  };

  const storedPhone = localStorage.getItem('userPhone');
  const isOwner = beat.phone === storedPhone;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow-2xl transition-all duration-200">
      {/* Cover Art */}
      <div className="aspect-square w-full bg-gray-100 relative">
        <img src={beat.coverArt} alt={beat.name} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          NPR {beat.price}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{beat.name}</h3>
            <p className="text-sm text-gray-600">{beat.uploader}</p>
            <p className="text-sm text-gray-600">{beat.key} • {beat.bpm} BPM</p>
          </div>

          {isOwner && (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500 hover:text-black">
                <MoreVertical size={20} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded z-10 w-28">
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      setSelectedBeat(beat);
                      setIsEditOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-red-100 text-sm text-red-600"
                    onClick={() => {
                      setMenuOpen(false);
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={togglePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setShowCallPopup(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow"
          >
            <Phone size={18} />
            <span>Buy</span>
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={beat.audioUrl}
        onEnded={() => setIsPlaying(false)}
        hidden
      />

      {/* Call Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-center relative w-72">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              onClick={() => setShowCallPopup(false)}
            >
              <X size={20} />
            </button>
            <p className="text-lg font-semibold">📞 Call the producer:</p>
            <a
              href={`tel:${beat.producerPhone}`}
              className="block mt-4 text-xl font-bold underline"
            >
              {beat.producerPhone}
            </a>
          </div>
        </div>
      )}

      {isEditOpen && selectedBeat && (
        <EditBeatModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          beat={selectedBeat}
          onUpdate={onDelete}
        />
      )}
    </div>
  );
};
