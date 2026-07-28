import { useState, useEffect } from 'react'
import FundraisingCard from '../components/catalog/FundraisingCard'
import FundraisingService from '../services/FundraisingService'

const FundraisingsPage = () => {
  const [fundraisings, setFundraisings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchFundraisings = async () => {
      try {
        const data = await FundraisingService.getAll()
        setFundraisings(data)
      } catch (err) {
        setError('Impossible de charger les collectes')
      } finally {
        setLoading(false)
      }
    }
    fetchFundraisings()
  }, [])

  const filtered = fundraisings.filter((f) =>
    f.titre?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ backgroundColor: '#FDF6F4', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1"
              style={{ color: '#085041' }}>
              Toutes les collectes
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {fundraisings.length} collecte{fundraisings.length > 1 ? 's' : ''} disponible{fundraisings.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Recherche */}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une collecte..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                border: '0.5px solid var(--border)',
                backgroundColor: 'var(--surface-2)',
                color: 'var(--text-primary)',
                width: '260px'
              }}
            />
          </div>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl animate-pulse"
                style={{ backgroundColor: 'var(--surface-1)' }} />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm px-4 py-3 rounded-lg"
            style={{ backgroundColor: '#FCEBEB', color: '#A32D2D' }}>
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Aucune collecte trouvée pour "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((fund) => (
              <FundraisingCard key={fund.idCagnotte} fundraising={fund} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default FundraisingsPage