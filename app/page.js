export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Beauty Spa Admin Dashboard</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/products" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-2">🛍️</div>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p className="text-gray-600">Manage your products catalog</p>
          </a>
          
          <a href="/blog" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-2">📝</div>
            <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
            <p className="text-gray-600">Manage blog articles</p>
          </a>
          
          <a href="/messages" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-2">✉️</div>
            <h2 className="text-xl font-semibold mb-2">Messages</h2>
            <p className="text-gray-600">View contact messages</p>
          </a>
        </div>
      </div>
    </div>
  );
}
