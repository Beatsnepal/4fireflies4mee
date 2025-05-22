import { useEffect, useRef, useState } from "react";

export default function AlbumCard({ album }) {
  const [showPopup, setShowPopup] = useState(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    // Pause other audios when one is played
    audioRefs.current.forEach((audio, i) => {
      if (!audio) return;
      audio.onplay = () => {
        audioRefs.current.forEach((otherAudio, j) => {
          if (i !== j && otherAudio && !otherAudio.paused) {
            otherAudio.pause();
          }
        });
      };
    });
  }, []);

  if (album.name === "Test Album" && album.artist_name === "Test Artist") return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col relative">
      {/* EDIT & DELETE BUTTONS */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm">
          Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
          Delete
        </button>
      </div>

      {/* COVER ART */}
      <div className="w-full aspect-w-1 aspect-h-1 mb-4">
        <img
          src={album.cover_url || 'https://via.placeholder.com/300?text=No+Cover'}
          alt="Album Cover"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      {/* ALBUM INFO */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-blue-900">{album.name || 'Untitled Album'}</h2>
        <p className="text-gray-700 mb-1">By {album.artist_name || 'Unknown Artist'}</p>
        <p className="text-green-600 font-semibold mb-3">NPR {album.price}</p>

        {/* AUDIO PREVIEWS */}
        <div className="space-y-2 mb-4">
          <audio ref={(el) => { if (el) audioRefs.current[0] = el; }} controls className="w-full" src={album.preview_1_url}></audio>
          <audio ref={(el) => { if (el) audioRefs.current[1] = el; }} controls className="w-full" src={album.preview_2_url}></audio>
          <audio ref={(el) => { if (el) audioRefs.current[2] = el; }} controls className="w-full" src={album.preview_3_url}></audio>
        </div>

        {/* BUY BUTTON */}
        <button
          onClick={() => setShowPopup(true)}
          className="mt-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
        >
          Buy Album
        </button>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Contact to Purchase</h3>
            <img
              src={album.qr_code_url}
              alt="QR Code"
              className="w-40 h-40 mx-auto rounded mb-4"
            />
            <p className="text-lg text-green-700 font-semibold">📞 {album.phone_number}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
