"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
      else alert("Error deleting post");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to Dashboard</a>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Blog Posts</h1>
            <p className="text-slate-500 mt-1">{posts.length} articles published</p>
          </div>
          <Link href="/blog/create" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
            + Add New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
            No blog posts found. Start by creating your first article.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Article</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {post.image && <img src={post.image} className="w-12 h-12 rounded-lg object-cover" alt="" />}
                        <div>
                          <p className="font-semibold text-slate-900">{post.title}</p>
                          <p className="text-sm text-slate-500 truncate max-w-[200px]">{post.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{post.author}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {new Date(post.publicationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/blog/edit/${post._id}`} className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium">Edit</Link>
                        <button onClick={() => handleDelete(post._id, post.title)} className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}