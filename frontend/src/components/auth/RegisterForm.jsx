import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validatePassword = (password) => {
    if (password.length < 8) return 'Minimum 8 caractères'
    if (!/[A-Z]/.test(password)) return 'Au moins 1 majuscule requise'
    if (!/[a-z]/.test(password)) return 'Au moins 1 minuscule requise'
    if (!/[0-9]/.test(password)) return 'Au moins 1 chiffre requis'
    if (!/[!@#$%^&*]/.test(password)) return 'Au moins 1 caractère spécial requis (!@#$%^&*)'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const passwordError = validatePassword(formData.motDePasse)
    if (passwordError) { setError(passwordError); return }

    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      const { confirmerMotDePasse, ...dataToSend } = formData
      await register(dataToSend)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    border: '0.5px solid #d1d5db',
    backgroundColor: '#f9fafb',
    color: '#111827',
  }

  const fieldClass = "w-full text-sm rounded-lg py-2.5 pl-9 pr-3 outline-none"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: '#FDF6F4' }}>

      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
        style={{ border: '0.5px solid #e5e7eb' }}>

        {/* Bannière */}
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
              Rejoignez la communauté
            </p>
          </div>
        </div>

        <div className="px-6 pt-5 pb-6">

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-5"
            style={{ backgroundColor: '#f3f4f6' }}>
            <Link to="/login"
              className="flex-1 text-center py-2 rounded-lg text-sm font-medium"
              style={{ color: '#9ca3af' }}>
              Connexion
            </Link>
            <div className="flex-1 text-center py-2 rounded-lg text-sm font-medium bg-white"
              style={{ color: '#1D9E75', border: '0.5px solid #e5e7eb' }}>
              Inscription
            </div>
          </div>

          {/* Succès */}
          {success && (
            <div className="text-sm px-4 py-3 rounded-lg mb-4"
              style={{ backgroundColor: '#E1F5EE', color: '#085041', border: '0.5px solid #9FE1CB' }}>
              Compte créé avec succès ! Redirection vers la connexion...
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="text-sm px-4 py-3 rounded-lg mb-4"
              style={{ backgroundColor: '#FCEBEB', color: '#A32D2D', border: '0.5px solid #F09595' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Nom + Prénom */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input type="text" name="nom" value={formData.nom}
                  onChange={handleChange} placeholder="Nom" required
                  className={fieldClass} style={inputStyle} />
              </div>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input type="text" name="prenom" value={formData.prenom}
                  onChange={handleChange} placeholder="Prénom" required
                  className={fieldClass} style={inputStyle} />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="vous@email.com" required
                className={fieldClass} style={inputStyle} />
            </div>

            {/* Téléphone */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input type="tel" name="telephone" value={formData.telephone}
                onChange={handleChange} placeholder="+237 6XX XXX XXX"
                className={fieldClass} style={inputStyle} />
            </div>

            {/* Mot de passe */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input type="password" name="motDePasse" value={formData.motDePasse}
                onChange={handleChange} placeholder="Mot de passe" required
                className={fieldClass} style={inputStyle} />
            </div>

            {/* Confirmer */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input type="password" name="confirmerMotDePasse" value={formData.confirmerMotDePasse}
                onChange={handleChange} placeholder="Confirmer le mot de passe" required
                className={fieldClass} style={inputStyle} />
            </div>

            {/* Hint mot de passe */}
            <p className="text-xs" style={{ color: '#9ca3af' }}>
              Min. 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
            </p>

            {/* Bouton */}
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition"
              style={{ backgroundColor: loading ? '#9FE1CB' : '#1D9E75' }}>
              {loading ? 'Inscription en cours...' : 'Créer mon compte'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm