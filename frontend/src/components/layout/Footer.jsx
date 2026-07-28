const Footer = () => {
  return (
    <footer className="py-8 px-6 mt-auto"
      style={{ borderTop: '0.5px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg"
              style={{ backgroundColor: '#E1F5EE' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-medium text-sm" style={{ color: '#085041' }}>SoliFund</span>
          </div>

          {/* Liens */}
          <div className="flex items-center gap-6">
            {['Accueil', 'Collectes', 'Catégories', 'À propos'].map((item) => (
              <span key={item} className="text-xs cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ height: '0.5px', backgroundColor: 'var(--border)' }} className="mb-4"></div>

        {/* Bas */}
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 SoliFund — Projet académique
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Confidentialité
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Conditions d'utilisation
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer