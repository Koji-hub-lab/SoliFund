import axiosInstance from '../utils/axiosConfig'

const FundraisingService = {

  // Récupérer toutes les cagnottes
  getAll: async () => {
    const response = await axiosInstance.get('/fundraisings')
    return response.data
  },

  // Récupérer une cagnotte par ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/fundraisings/${id}`)
    return response.data
  },

  // Récupérer les cagnottes par catégorie
  getByCategory: async (categoryId) => {
    const response = await axiosInstance.get(`/fundraisings?categorieId=${categoryId}`)
    return response.data
  },
}

export default FundraisingService