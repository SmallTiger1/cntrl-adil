"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <a href="/" className="text-blue-500 hover:underline">← Back to Dashboard</a>
          <h1 className="text-2xl font-bold mt-4">Products List</h1>
        </div>
        <Link href="/products/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Add New Product
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Old Price</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price} DH</td>
                <td className="px-6 py-4">{product.oldPrice ? product.oldPrice + " DH" : "-"}</td>
                <td className="px-6 py-4">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/products/edit/${product._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
