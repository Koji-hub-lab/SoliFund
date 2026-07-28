const CategoryCard = ({ category }) => {

  const defaultIcons = {
    'Education': '🎓',
    'Santé': '❤️',
    'Environnement': '🌱',
    'Alimentation': '🌾',
    'Logement': '🏠',
    'Urgences': '🚨',
  }

  const defaultColors = {
    'Education': '#E1F5EE',
    'Santé': '#FAECE7',
    'Environnement': '#EAF3DE',
    'Alimentation': '#FAEEDA',
    'Logement': '#E6F1FB',
    'Urgences': '#FCEBEB',
  }

  const icon = category.icone || defaultIcons[category.nom] || '📦'
  const bgColor = category.couleur || defaultColors[category.nom] || '#F3F4F6'

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '0.5px solid var(--border)',
      }}
    >
      {/* Icône */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>

      {/* Nom */}
      <p className="text-sm font-medium text-center mb-1"
        style={{ color: 'var(--text-primary)' }}>
        {category.nom}
      </p>

      {/* Nombre de collectes */}
      {category.nombreCollectes !== undefined && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {category.nombreCollectes} collecte{category.nombreCollectes > 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}

export default CategoryCard