"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publicationDate: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [postId, setPostId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
      fetchPost(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  const fetchPost = async (id) => {
    try {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      setFormData({
        title: data.title || "",
        author: data.author || "",
        description: data.description || "",
        publicationDate: data.publicationDate ? new Date(data.publicationDate).toISOString().split("T")[0] : "",
        image: data.image || ""
      });
      if (data.image) setPreview(data.image);
    } catch (err) {
      setError("Post not found");
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, publicationDate: formData.publicationDate || new Date() })
      });
      if (res.ok) router.push("/blog");
      else setError("Error updating blog post");
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Blog
        </a>
        
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all">
                  {uploading ? "Uploading..." : "Change Image"}
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
            
            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={saving || uploading} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50">
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <a href="/blog" className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}