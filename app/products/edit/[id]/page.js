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
          Modifier le Produit
        </h1>

        <p className="text-gray-400 mt-2">
          Mettre à jour les informations du produit
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Image */}
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
                  className="w-48 h-48 object-cover rounded-xl shadow-lg"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setFormData({ ...formData, image: "" });
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-3">🖼️</div>

                <label className="cursor-pointer inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl transition">
                  {uploading ? "Téléchargement..." : "Changer l'image"}

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

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="px-6 py-3 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 transition"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition disabled:opacity-50"
          >
            {saving ? "Sauvegarde..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  </div>
);