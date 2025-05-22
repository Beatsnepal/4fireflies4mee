import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadAlbumModal() {
  const [session, setSession] = useState(null);
  const [form, setForm] = useState({
    name: "",
    artist: "",
    price: "",
    phone: "",
    coverImage: null,
    preview1: null,
    preview2: null,
    preview3: null,
    qrCode: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      console.log("🔐 SESSION:", data.session);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadFile = async (bucket, file) => {
    const cleanName = file.name.replace(/\s+/g, "_");
    const path = `${Date.now()}-${cleanName}`;
    const { data, error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) {
      console.error("❌ Upload error:", error.message);
      throw error;
    }
    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!session?.user?.id) {
      alert("❌ You must be logged in.");
      return;
    }

    console.log("📤 Uploading as user:", session.user.id);

    setLoading(true);

    try {
      const coverUrl = await uploadFile("album-covers", form.coverImage);
      const preview1 = await uploadFile("album-previews", form.preview1);
      const preview2 = await uploadFile("album-previews", form.preview2);
      const preview3 = await uploadFile("album-previews", form.preview3);
      const qrCode = await uploadFile("album-qrcodes", form.qrCode);

      const albumData = {
        name: form.name,
        artist_name: form.artist,
        price: form.price,
        phone_number: form.phone,
        user_id: session.user.id,
        album_url: null,
        cover_url: coverUrl,
        preview_1_url: preview1,
        preview_2_url: preview2,
        preview_3_url: preview3,
        qr_code_url: qrCode,
      };

      console.log("⬆️ INSERTING album:", albumData);

      const { data, error } = await supabase.from("albums").insert(albumData).select("*");

      if (error) {
        console.error("🚫 INSERT ERROR:", error.message);
        setErrorMessage("Upload failed: " + error.message);
        return;
      }

      alert("✅ Album uploaded successfully!");
    } catch (err) {
      console.error("⚠️ Unexpected error:", err.message);
      setErrorMessage("Upload failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      {session?.user?.id ? (
        <div className="p-3 mb-4 bg-green-100 text-green-800 rounded text-sm">
          ✅ Logged in as: <b>{session.user.id}</b>
        </div>
      ) : (
        <div className="p-3 mb-4 bg-red-100 text-red-800 rounded text-sm">
          ❌ Not logged in.
        </div>
      )}

      {errorMessage && (
        <div className="p-3 mb-4 bg-red-100 text-red-800 rounded text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-900">Upload New Album</h2>

        <div className="space-y-4">
          <input type="text" name="name" onChange={handleChange} placeholder="Album Name" className="w-full p-3 border rounded" required />
          <input type="text" name="artist" onChange={handleChange} placeholder="Artist Name" className="w-full p-3 border rounded" required />
          <input type="number" name="price" onChange={handleChange} placeholder="Price (NPR)" className="w-full p-3 border rounded" required />
          <input type="text" name="phone" onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded" required />
          <input type="file" name="coverImage" accept="image/*" onChange={handleChange} required />
          <input type="file" name="preview1" accept="audio/mp3" onChange={handleChange} required />
          <input type="file" name="preview2" accept="audio/mp3" onChange={handleChange} required />
          <input type="file" name="preview3" accept="audio/mp3" onChange={handleChange} required />
          <input type="file" name="qrCode" accept="image/*" onChange={handleChange} required />

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded">
            {loading ? "Uploading..." : "Upload Album"}
          </button>
        </div>
      </form>
    </div>
  );
}