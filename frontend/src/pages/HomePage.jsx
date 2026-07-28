import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/catalog/CategoryCard'
import FundraisingCard from '../components/catalog/FundraisingCard'
import CategoryService from '../services/CategoryService'
import FundraisingService from '../services/FundraisingService'

const HomePage = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [fundraisings, setFundraisings] = useState([])
  const [loadingCat, setLoadingCat] = useState(true)
  const [loadingFund, setLoadingFund] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await CategoryService.getAll()
        setCategories(cats)
      } catch (err) {
        setError('Impossible de charger les catégories')
      } finally {
        setLoadingCat(false)
      }

      try {
        const funds = await FundraisingService.getAll()
        setFundraisings(funds.slice(0, 6))
      } catch (err) {
        setError('Impossible de charger les collectes')
      } finally {
        setLoadingFund(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ backgroundColor: '#FDF6F4', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section className="px-6 py-14 max-w-6xl mx-auto">
        <div className="flex flex-col items-start">

          {/* Tag */}
          <span className="text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: '#E1F5EE', color: '#085041' }}>
            Plateforme de collecte de fonds
          </span>

          {/* Titre */}
          <h1 className="text-4xl font-semibold mb-3"
            style={{ color: '#085041', lineHeight: '1.25' }}>
            Ensemble, soutenons<br />ce qui compte vraiment
          </h1>

          {/* Sous-titre */}
          <p className="text-base mb-8 max-w-lg"
            style={{ color: 'var(--text-secondary)' }}>
            Créez ou participez à des collectes de fonds pour vos causes.
            Chaque don, petit ou grand, fait la différence.
          </p>

          {/* Boutons */}
          <div className="flex gap-3 mb-12">
            <button
              onClick={() => navigate('/fundraisings')}
              className="px-6 py-3 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1D9E75' }}>
              Voir les collectes
            </button>
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-3 rounded-xl text-sm font-medium transition hover:opacity-90"
              style={{
                backgroundColor: 'transparent',
                border: '0.5px solid #0F6E56',
                color: '#085041'
              }}>
              Créer une collecte
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            {[
              { num: '4 238', label: 'Donateurs' },
              { num: '186', label: 'Collectes actives' },
              { num: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '0.5px solid var(--border)'
                }}>
                <p className="text-xl font-semibold mb-0.5"
                  style={{ color: '#1D9E75' }}>
                  {stat.num}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="px-6 py-10 max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Catégories
          </h2>
          <button
            onClick={() => navigate('/categories')}
            className="text-sm transition"
            style={{ color: '#1D9E75', background: 'none', border: 'none', cursor: 'pointer' }}>
            Voir tout →
          </button>
        </div>

        {loadingCat ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl animate-pulse"
                style={{ backgroundColor: 'var(--surface-1)' }} />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm px-4 py-3 rounded-lg"
            style={{ backgroundColor: '#FCEBEB', color: '#A32D2D' }}>
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat) => (
              <div key={cat.idCategorie}
                onClick={() => navigate('/categories')}>
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        )}

      </section>

      {/* ===== COLLECTES RECENTES ===== */}
      <section className="px-6 py-10 max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Collectes récentes
          </h2>
          <button
            onClick={() => navigate('/fundraisings')}
            className="text-sm transition"
            style={{ color: '#1D9E75', background: 'none', border: 'none', cursor: 'pointer' }}>
            Voir tout →
          </button>
        </div>

        {loadingFund ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl animate-pulse"
                style={{ backgroundColor: 'var(--surface-1)' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fundraisings.map((fund) => (
              <FundraisingCard key={fund.idCagnotte} fundraising={fund} />
            ))}
          </div>
        )}

      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="px-6 py-14 max-w-6xl mx-auto">
        <div className="rounded-2xl px-10 py-12 text-center"
          style={{ backgroundColor: '#085041' }}>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Prêt à lancer votre collecte ?
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Créez votre campagne en quelques minutes et commencez à collecter des fonds.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 rounded-xl text-sm font-medium transition hover:opacity-90"
            style={{ backgroundColor: '#5DCAA5', color: '#085041' }}>
            Commencer maintenant
          </button>
        </div>
      </section>

    </div>
  )
}

export default HomePage