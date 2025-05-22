
'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';
import { EditBeatModal } from '@/components/EditBeatModal';

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [beats, setBeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeat, setSelectedBeat] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const refreshBeats = async (userId: string) => {
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBeats(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        window.location.href = "/signin";
        return;
      }

      setUser(user);
      await refreshBeats(user.id);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this beat?");
    if (!confirm) return;

    const { error } = await supabase.from('beats').delete().eq('id', id);
    if (!error && user) {
      await refreshBeats(user.id);
      alert("Deleted!");
    }
  };

  return (
    <>
      <Navbar onUploadClick={() => {}} />
      <section className="py-20 bg-white text-blue-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white text-blue-900 px-6 py-6 rounded-xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0">🎧 My Profile</h2>
            {user && (
              <p className="text-md md:text-lg font-medium">
                Logged in as <span className="font-bold">{user.email}</span>
              </p>
            )}
          </div>

          {loading ? (
            <p className="text-center text-blue-300">Loading your beats...</p>
          ) : beats.length === 0 ? (
            <p className="text-center text-blue-300">You haven't uploaded any beats yet.</p>
          ) : (
            <div className="overflow-x-auto bg-blue-50 rounded-lg shadow border border-blue-100">
              <audio id="profile-audio" className="hidden"></audio>
              <table className="min-w-full text-left text-sm text-blue-900">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Key & BPM</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {beats.map((beat, index) => (
                    <tr key={beat.id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-semibold flex items-center gap-2">
                        <button
                          onClick={() => {
                            const audio = document.getElementById('profile-audio') as HTMLAudioElement;
                            const playIcon = document.getElementById(`icon-${beat.id}`);
                            if (audio.src !== beat.audio_url) {
                              audio.src = beat.audio_url;
                              audio.play();
                              if (playIcon) playIcon.textContent = "⏸️";
                              audio.onended = () => { if (playIcon) playIcon.textContent = "▶️"; };
                            } else if (audio.paused) {
                              audio.play();
                              if (playIcon) playIcon.textContent = "⏸️";
                            } else {
                              audio.pause();
                              if (playIcon) playIcon.textContent = "▶️";
                            }
                          }}
                          className="text-lg text-blue-700 hover:text-blue-900 transition"
                          style={{ background: "none", border: "none" }}
                        >
                          <span id={`icon-${beat.id}`}>▶️</span>
                        </button>
                        {beat.name}
                      </td>
                      <td className="px-4 py-2">{beat.key} • {beat.bpm} BPM</td>
                      <td className="px-4 py-2">Rs {beat.price}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBeat(beat);
                            setIsEditOpen(true);
                          }}
                          className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(beat.id)}
                          className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {isEditOpen && selectedBeat && (
        <EditBeatModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          beat={selectedBeat}
          onUpdate={() => user && refreshBeats(user.id)}
        />
      )}
    </>
  );
}
