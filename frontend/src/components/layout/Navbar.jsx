import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const initials = (user) => {
    if (!user) return '?'
    return `${user.nom?.[0] || ''}${user.prenom?.[0] || ''}`.toUpperCase()
  }

  return (
    <nav style={{ backgroundColor: 'var(--surface-2)', borderBottom: '0.5px solid var(--border)' }}
      className="px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      {/* Gauche — Logo + Badge + Liens */}
      <div className="flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg"
            style={{ backgroundColor: '#E1F5EE' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
              viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="font-medium text-sm" style={{ color: '#085041' }}>
            SoliFund
          </span>
        </Link>

        {/* Badge Beta */}
        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: '#E1F5EE', color: '#085041' }}>
          Beta
        </span>

        {/* Liens navigation */}
        <div className="flex items-center gap-1">
          <Link to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition no-underline"
            style={{
              color: isActive('/') ? '#1D9E75' : 'var(--text-secondary)',
              backgroundColor: isActive('/') ? '#E1F5EE' : 'transparent',
              fontWeight: isActive('/') ? '500' : '400'
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Accueil
          </Link>

          <Link to="/fundraisings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition no-underline"
            style={{
              color: isActive('/fundraisings') ? '#1D9E75' : 'var(--text-secondary)',
              backgroundColor: isActive('/fundraisings') ? '#E1F5EE' : 'transparent',
              fontWeight: isActive('/fundraisings') ? '500' : '400'
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Collectes
          </Link>

          <Link to="/categories"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition no-underline"
            style={{
              color: isActive('/categories') ? '#1D9E75' : 'var(--text-secondary)',
              backgroundColor: isActive('/categories') ? '#E1F5EE' : 'transparent',
              fontWeight: isActive('/categories') ? '500' : '400'
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Catégories
          </Link>
        </div>
      </div>

      {/* Droite — Notifications + Avatar + Créer */}
      <div className="flex items-center gap-2">

        {user ? (
          <>
            {/* Notification */}
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
              style={{ backgroundColor: 'var(--surface-1)', border: '0.5px solid var(--border)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                viewBox="0 0 24 24" stroke="var(--text-secondary)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Point rouge notification */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#E24B4A', border: '1.5px solid var(--surface-2)' }}>
              </span>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium cursor-pointer"
              style={{ backgroundColor: '#1D9E75' }}>
              {initials(user)}
            </div>

            {/* Bouton Créer */}
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white border-none cursor-pointer transition"
              style={{ backgroundColor: '#085041' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Créer
            </button>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs cursor-pointer transition"
              style={{
                backgroundColor: 'var(--surface-1)',
                border: '0.5px solid var(--border)',
                color: 'var(--text-secondary)'
              }}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login"
              className="px-3 py-1.5 rounded-lg text-xs no-underline transition"
              style={{
                backgroundColor: 'var(--surface-1)',
                border: '0.5px solid var(--border)',
                color: 'var(--text-secondary)'
              }}>
              Connexion
            </Link>
            <Link to="/register"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white no-underline"
              style={{ backgroundColor: '#1D9E75' }}>
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar