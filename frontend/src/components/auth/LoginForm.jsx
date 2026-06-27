import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: '#FDF6F4' }}>

      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
        style={{ border: '0.5px solid #e5e7eb' }}>

        {/* Bannière verte */}
        <div className="flex items-center gap-3 px-6 py-5"
          style={{ backgroundColor: '#085041' }}>
          <div className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="#5DCAA5" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium text-sm">SoliFund</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Ensemble, on fait la différence
            </p>
          </div>
        </div>

        <div className="px-6 pt-5 pb-6">

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-5"
            style={{ backgroundColor: '#f3f4f6' }}>
            <div className="flex-1 text-center py-2 rounded-lg text-sm font-medium bg-white"
              style={{ color: '#1D9E75', border: '0.5px solid #e5e7eb' }}>
              Connexion
            </div>
            <Link to="/register"
              className="flex-1 text-center py-2 rounded-lg text-sm font-medium"
              style={{ color: '#9ca3af' }}>
              Inscription
            </Link>
          </div>

          {/* Erreur */}
          {error && (
            <div className="text-sm px-4 py-3 rounded-lg mb-4"
              style={{ backgroundColor: '#FCEBEB', color: '#A32D2D', border: '0.5px solid #F09595' }}>
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vous@email.com"
                required
                className="w-full text-sm rounded-lg py-2.5 pl-9 pr-3 outline-none"
                style={{
                  border: '0.5px solid #d1d5db',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                }}
              />
            </div>

            {/* Mot de passe */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full text-sm rounded-lg py-2.5 pl-9 pr-3 outline-none"
                style={{
                  border: '0.5px solid #d1d5db',
                  backgroundColor: '#f9fafb',
                  color: '#111827',
                }}
              />
            </div>

            {/* Mot de passe oublié */}
            <div className="text-right">
              <span className="text-xs cursor-pointer" style={{ color: '#1D9E75' }}>
                Mot de passe oublié ?
              </span>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition"
              style={{ backgroundColor: loading ? '#9FE1CB' : '#1D9E75' }}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1" style={{ height: '0.5px', backgroundColor: '#e5e7eb' }}></div>
            <span className="text-xs" style={{ color: '#9ca3af' }}>ou continuer avec</span>
            <div className="flex-1" style={{ height: '0.5px', backgroundColor: '#e5e7eb' }}></div>
          </div>

          {/* Boutons sociaux */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium"
              style={{ border: '0.5px solid #d1d5db', backgroundColor: '#f9fafb', color: '#6b7280' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26 9.77A7.44 7.44 0 0 1 12 4.56c1.88 0 3.57.69 4.88 1.82l3.63-3.63A12 12 0 0 0 0 12a12 12 0 0 0 .67 3.95l4.59-3.54v-.64z"/>
                <path fill="#34A853" d="M12 24a12 12 0 0 0 8.31-3.3l-4.25-3.3A7.15 7.15 0 0 1 12 19.44a7.44 7.44 0 0 1-6.71-4.22L.67 18.77A12 12 0 0 0 12 24z"/>
                <path fill="#FBBC05" d="M19.44 7.56H12v4.44h4.19A7.1 7.1 0 0 1 16 14.14l4.25 3.3A12 12 0 0 0 24 12c0-.82-.08-1.62-.23-2.39H12z"/>
                <path fill="#4285F4" d="M5.29 14.22A7.44 7.44 0 0 1 4.56 12c0-.77.12-1.52.33-2.23L.31 6.23A12 12 0 0 0 0 12c0 1.93.46 3.75 1.28 5.35l4.01-3.13z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium"
              style={{ border: '0.5px solid #d1d5db', backgroundColor: '#f9fafb', color: '#6b7280' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.31 24 12 24 5.37 18.63 0 12 0z"/>
              </svg>
              GitHub
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginForm