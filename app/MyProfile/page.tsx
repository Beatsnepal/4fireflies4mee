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

    if (!error && data) setBeats(data);
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
    const confirmDelete = window.confirm("Are you sure you want to delete this beat?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('beats').delete().eq('id', id);
    if (!error && user) {
      await refreshBeats(user.id);
      alert("Beat deleted!");
    }
  };

  return (
    <>
      <Navbar onUploadClick={() => {}} />
      <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-xl px-6 py-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 md:mb-0">
              🎧 My Profile
            </h2>
            {user && (
              <p className="text-md sm:text-lg text-blue-700 font-medium">
                Logged in as <span className="font-semibold">{user.email}</span>
              </p>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center text-blue-400 text-lg">Loading your beats...</p>
          ) : beats.length === 0 ? (
            <p className="text-center text-blue-400 text-lg">You haven't uploaded any beats yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow border border-blue-100 bg-white">
              <audio id="profile-audio" className="hidden" />

              <table className="min-w-full divide-y divide-blue-100 text-sm sm:text-base">
                <thead className="bg-blue-600 text-white text-left">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Track</th>
                    <th className="px-4 py-3">Key & BPM</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {beats.map((beat, index) => (
                    <tr key={beat.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-blue-800 flex items-center gap-2">
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
                          className="text-xl text-blue-600 hover:text-blue-800"
                          style={{ background: "none", border: "none" }}
                        >
                          <span id={`icon-${beat.id}`}>▶️</span>
                        </button>
                        {beat.name}
                      </td>
                      <td className="px-4 py-3 text-blue-700">{beat.key} • {beat.bpm} BPM</td>
                      <td className="px-4 py-3 text-blue-700">Rs {beat.price}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBeat(beat);
                            setIsEditOpen(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-1 rounded shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(beat.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded shadow"
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
