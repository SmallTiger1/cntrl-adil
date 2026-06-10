"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publicationDate: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    
    setUploading(true);
    const formDataFile = new FormData();
    formDataFile.append("image", file);
    
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formDataFile });
      const data = await res.json();
      if (data.imageUrl) setFormData(prev => ({ ...prev, image: data.imageUrl }));
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, publicationDate: formData.publicationDate || new Date() })
    });
    
    if (res.ok) router.push("/blog");
    else { alert("Error creating blog post"); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Dashboard
        </a>
        
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Create New Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.publicationDate}
                  onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all">
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
                {preview && (
                  <div className="relative group">
                    <img src={preview} alt="Preview" className="w-14 h-14 object-cover rounded-lg border" />
                    <button type="button" onClick={() => { setPreview(""); setFormData({...formData, image: ""}) }} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg">✕</button>
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 mt-4"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}