'use client';

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AlbumCard from "../../components/AlbumCard";
import UploadAlbumModal from "../../components/UploadAlbumModal";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function AlbumSellPage() {
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState(null);

  const ADMIN_ID = "592d839a-739f-4043-bea7-6e96f4c8f456";

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase.from("albums").select("*");
      if (!error) setAlbums(data);
    };

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchAlbums();
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar onUploadClick={() => {}} />
      <div className="p-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-sm">
          🎵 Explore Albums for Sale
        </h1>

        {user?.id === ADMIN_ID && (
          <div className="mb-10 flex justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
              <UploadAlbumModal />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.length > 0 ? (
            albums.map((album) => <AlbumCard key={album.id} album={album} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No albums uploaded yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
