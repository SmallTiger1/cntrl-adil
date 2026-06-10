return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/products")}
          className="text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Retour aux produits
        </button>

        <h1 className="text-4xl font-bold text-white mt-4">
          Ajouter un Produit
        </h1>
        <p className="text-gray-400 mt-2">
          Créer un nouveau produit pour votre boutique
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Product Name */}
        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">
            Nom du produit *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Nom du produit"
            required
          />
        </div>

        {/* Prices */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Prix (DH) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Ancien Prix
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.oldPrice}
              onChange={(e) =>
                setFormData({ ...formData, oldPrice: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-3">
            Image du produit
          </label>

          <div className="border-2 border-dashed border-slate-600 rounded-2xl p-6 text-center">
            {preview ? (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-xl shadow-lg"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setFormData({ ...formData, image: "" });
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-3">📷</div>

                <label className="cursor-pointer inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl transition">
                  {uploading ? "Téléchargement..." : "Choisir une image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                <p className="text-gray-400 mt-3 text-sm">
                  PNG, JPG, WEBP
                </p>
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="px-6 py-3 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 transition"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer le produit"}
          </button>
        </div>
      </form>
    </div>
  </div>
);