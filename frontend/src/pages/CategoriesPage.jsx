import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/catalog/CategoryCard'
import CategoryService from '../services/CategoryService'

const CategoriesPage = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll()
        setCategories(data)
      } catch (err) {
        setError('Impossible de charger les catégories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div style={{ backgroundColor: '#FDF6F4', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2"
            style={{ color: '#085041' }}>
            Catégories
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Explorez les collectes par catégorie
          </p>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-28 rounded-xl animate-pulse"
                style={{ backgroundColor: 'var(--surface-1)' }} />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm px-4 py-3 rounded-lg"
            style={{ backgroundColor: '#FCEBEB', color: '#A32D2D' }}>
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Aucune catégorie disponible pour le moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.idCategorie}
                onClick={() => navigate(`/fundraisings?categorieId=${cat.idCategorie}`)}>
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default CategoriesPage