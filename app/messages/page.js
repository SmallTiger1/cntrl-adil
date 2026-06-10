"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete message from ${name}?`)) {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) fetchMessages();
      else alert("Error deleting message");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to Dashboard</a>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Contact Messages</h1>
          <p className="text-slate-500 mt-1">{messages.length} messages received</p>
        </div>
        
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
            No messages received yet.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((m) => (
                    <tr key={m._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{m.firstName} {m.lastName}</p>
                        <p className="text-sm text-slate-500">{m.subject}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{m.email}</p>
                        <p className="text-sm text-slate-500">{m.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{m.service}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Link href={`/messages/${m._id}`} className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium">View</Link>
                          <button onClick={() => handleDelete(m._id, `${m.firstName} ${m.lastName}`)} className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}