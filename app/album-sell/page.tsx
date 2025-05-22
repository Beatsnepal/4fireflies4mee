'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AlbumCard from '@/components/AlbumCard';
import UploadAlbumModal from '@/components/UploadAlbumModal';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AlbumSellPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const ADMIN_ID = '592d839a-739f-4043-bea7-6e96f4c8f456';

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase.from('albums').select('*');
      if (!error && data) {
        setAlbums(data);
      } else {
        console.error('Error loading albums:', error);
      }
    };

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUser(data.user);
      }
    };

    fetchAlbums();
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Navbar onUploadClick={() => {}} />
      <main className="px-4 sm:px-6 lg:px-12 py-10 grow">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-12">
          🎵 Explore Albums for Sale
        </h1>

        {user?.id === ADMIN_ID && (
          <div className="flex justify-center mb-12">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
              <UploadAlbumModal />
            </div>
          </div>
        )}

        {/* Scrollable horizontally on mobile, grid on desktop */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex flex-nowrap gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {albums.length > 0 ? (
              albums.map((album) => (
                <div key={album.id} className="flex-shrink-0 sm:flex-shrink sm:contents">
                  <AlbumCard album={album} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No albums uploaded yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
