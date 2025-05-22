import React, { useEffect, useState } from 'react';
import { BeatCard } from './BeatCard';
import { supabase } from '../lib/supabaseClient';
import { Play } from 'lucide-react';

interface Beat {
  id: number;
  name: string;
  key: string;
  bpm: number;
  price: number;
  phone: string;
  uploader: string;
  cover_url: string;
  audio_url: string;
}

interface BeatsSectionProps {
  onUploadClick: () => void;
}

export const BeatsSection: React.FC<BeatsSectionProps> = ({ onUploadClick }) => {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeats = async () => {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching beats:', error.message);
      } else {
        setBeats(data as Beat[]);
      }

      setLoading(false);
    };

    fetchBeats();
  }, []);

  return (
    <section
      id="beats"
      className="py-20 text-black relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #e0f2fe, #ffffff)',
      }}
    >
      {/* Floating Music Notes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-10 left-10 w-16 h-16 opacity-10" fill="#3b82f6" viewBox="0 0 24 24">
          <path d="M9 17.5V6.4l11-2v11.1a3.5 3.5 0 1 1-2-3.1V7.4l-7 1.3v8.8a3.5 3.5 0 1 1-2 3z" />
        </svg>
        <svg className="absolute bottom-20 right-10 w-12 h-12 opacity-10" fill="#2563eb" viewBox="0 0 24 24">
          <path d="M9 17.5V6.4l11-2v11.1a3.5 3.5 0 1 1-2-3.1V7.4l-7 1.3v8.8a3.5 3.5 0 1 1-2 3z" />
        </svg>
        <svg className="absolute top-1/2 left-1/2 w-20 h-20 opacity-5 -translate-x-1/2 -translate-y-1/2" fill="#60a5fa" viewBox="0 0 24 24">
          <path d="M9 17.5V6.4l11-2v11.1a3.5 3.5 0 1 1-2-3.1V7.4l-7 1.3v8.8a3.5 3.5 0 1 1-2 3z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">🎵 All Uploaded Beats</h2>
          <p className="text-lg text-gray-600 mb-4">Browse beats uploaded by producers in Nepal</p>
          <div className="mx-auto w-24 h-1 rounded-full bg-blue-500 opacity-60" />
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={onUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium flex items-center space-x-2 transition shadow-lg"
          >
            <Play size={20} />
            <span>Upload Beat</span>
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading beats...</p>
        ) : beats.length === 0 ? (
          <p className="text-center text-gray-500">No beats uploaded yet.</p>
        ) : (
          <div className="bg-white border border-blue-300 rounded-2xl shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {beats.map((beat) => (
                <BeatCard
                  key={beat.id}
                  beat={{
                    id: beat.id,
                    name: beat.name,
                    key: beat.key,
                    bpm: beat.bpm,
                    price: beat.price,
                    phone: beat.phone,
                    uploader: beat.uploader,
                    coverArt: beat.cover_url,
                    audioUrl: beat.audio_url,
                    producerPhone: beat.phone
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
