
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface BeatUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const keys = ['A Minor', 'B Minor', 'C Minor', 'D Minor', 'E Minor', 'F Minor', 'G Minor',
              'A Major', 'B Major', 'C Major', 'D Major', 'E Major', 'F Major', 'G Major'];

export const BeatUploadModal: React.FC<BeatUploadModalProps> = ({ isOpen, onClose }) => {
  const [beatName, setBeatName] = useState('');
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [uploader, setUploader] = useState('');
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverArt(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverArtPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!beatName || !key || !bpm || !price || !phone || !uploader || !coverArt || !mp3File) {
      alert('Please fill all fields.');
      return;
    }

    setLoading(true);
    const timestamp = Date.now();

    // Get user ID
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be signed in to upload a beat.");
      setLoading(false);
      return;
    }

    // Upload cover art
    const { data: coverData, error: coverError } = await supabase.storage
      .from('beat-files')
      .upload(`covers/${timestamp}-${coverArt.name}`, coverArt);

    if (coverError) {
      alert('Cover art upload failed');
      setLoading(false);
      return;
    }

    const coverUrl = supabase.storage.from('beat-files').getPublicUrl(coverData.path).data.publicUrl;

    // Upload MP3
    const { data: audioData, error: audioError } = await supabase.storage
      .from('beat-files')
      .upload(`beats/${timestamp}-${mp3File.name}`, mp3File);

    if (audioError) {
      alert('MP3 upload failed');
      setLoading(false);
      return;
    }

    const audioUrl = supabase.storage.from('beat-files').getPublicUrl(audioData.path).data.publicUrl;

    // Insert into DB with user_id
    const { error: dbError } = await supabase.from('beats').insert({
      name: beatName,
      key,
      bpm: parseInt(bpm),
      price: parseFloat(price),
      phone,
      uploader,
      cover_url: coverUrl,
      audio_url: audioUrl,
      user_id: user.id
    });

    setLoading(false);

    if (dbError) {
      console.error('Supabase Insert Error FULL:', dbError);
      alert('Failed to save beat. See console for details.');
    } else {
      alert('Beat uploaded successfully!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 relative shadow-lg">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Beat</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Beat Name"
              className="border rounded p-2"
              value={beatName}
              onChange={(e) => setBeatName(e.target.value)}
            />
            <input
              type="text"
              placeholder="BPM"
              className="border rounded p-2"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="border rounded p-2"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            >
              <option value="">Key</option>
              {keys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Price (NPR)"
              className="border rounded p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Uploader Name"
            className="w-full border rounded p-2"
            value={uploader}
            onChange={(e) => setUploader(e.target.value)}
          />
          <div>
            <label className="block text-sm mb-1">Upload Cover Art</label>
            <input type="file" accept="image/*" onChange={handleCoverArtChange} className="w-full" />
            {coverArtPreview && (
              <img src={coverArtPreview} alt="Cover Art Preview" className="mt-2 rounded w-full h-auto" />
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Upload MP3 File</label>
            <input type="file" accept="audio/mp3" onChange={(e) => setMp3File(e.target.files?.[0] || null)} className="w-full" />
          </div>
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
