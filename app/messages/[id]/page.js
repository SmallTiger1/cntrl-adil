return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/messages")}
          className="text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Retour aux messages
        </button>

        <h1 className="text-4xl font-bold text-white mt-4">
          Détails du Message
        </h1>
        <p className="text-gray-400 mt-2">
          Consultation du message reçu
        </p>
      </div>

      {/* Card */}
      <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {message.firstName} {message.lastName}
          </h2>

          <p className="text-cyan-100 text-sm mt-1">
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Prénom</span>
              <p className="text-white font-medium mt-1">
                {message.firstName}
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Nom</span>
              <p className="text-white font-medium mt-1">
                {message.lastName}
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Téléphone</span>
              <p className="text-white font-medium mt-1">
                {message.phone}
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Email</span>
              <a
                href={`mailto:${message.email}`}
                className="text-cyan-400 hover:text-cyan-300 mt-1 block"
              >
                {message.email}
              </a>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Service</span>
              <p className="text-white font-medium mt-1">
                {message.service}
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <span className="text-gray-400 text-sm">Sujet</span>
              <p className="text-white font-medium mt-1">
                {message.subject}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Message
            </h3>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6 flex justify-end">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition disabled:opacity-50"
          >
            {deleting ? "Suppression..." : "🗑 Supprimer"}
          </button>
        </div>
      </div>
    </div>
  </div>
);