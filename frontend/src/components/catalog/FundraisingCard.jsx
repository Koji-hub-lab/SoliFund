import { useNavigate } from 'react-router-dom'

const FundraisingCard = ({ fundraising }) => {
  const navigate = useNavigate()

  const pourcentage = fundraising.objectif > 0
    ? Math.min(Math.round((fundraising.montantCollecte / fundraising.objectif) * 100), 100)
    : 0

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' XAF'
  }

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'ACTIVE': return { bg: '#E1F5EE', color: '#085041' }
      case 'TERMINEE': return { bg: '#F3F4F6', color: '#6B7280' }
      case 'SUSPENDUE': return { bg: '#FEF3C7', color: '#92400E' }
      default: return { bg: '#F3F4F6', color: '#6B7280' }
    }
  }

  const statutStyle = getStatutColor(fundraising.statut)

  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '0.5px solid var(--border)',
      }}
      onClick={() => navigate(`/fundraisings/${fundraising.idCagnotte}`)}
    >
      {/* Image / Emoji header */}
      <div
        className="h-28 flex items-center justify-center text-4xl"
        style={{ backgroundColor: '#E1F5EE' }}
      >
        {fundraising.icone || '💝'}
      </div>

      <div className="p-4">

        {/* Catégorie + Statut */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: '#1D9E75' }}>
            {fundraising.categorie?.nom || 'Général'}
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: statutStyle.bg, color: statutStyle.color }}
          >
            {fundraising.statut}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-sm font-medium mb-3 line-clamp-2"
          style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>
          {fundraising.titre}
        </h3>

        {/* Barre de progression */}
        <div className="rounded-full h-1.5 mb-2 overflow-hidden"
          style={{ backgroundColor: 'var(--surface-1)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pourcentage}%`, backgroundColor: '#1D9E75' }}
          />
        </div>

        {/* Montants */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium" style={{ color: '#1D9E75' }}>
            {formatMontant(fundraising.montantCollecte)}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {pourcentage}% de {formatMontant(fundraising.objectif)}
          </span>
        </div>

        {/* Bouton Donner */}
        <button
          className="w-full py-2 rounded-lg text-xs font-medium text-white transition"
          style={{ backgroundColor: '#1D9E75' }}
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/fundraisings/${fundraising.idCagnotte}`)
          }}
        >
          Faire un don
        </button>

      </div>
    </div>
  )
}

export default FundraisingCard