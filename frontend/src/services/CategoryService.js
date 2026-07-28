import axiosInstance from '../utils/axiosConfig'

const CategoryService = {

  // Récupérer toutes les catégories
  getAll: async () => {
    const response = await axiosInstance.get('/categories')
    return response.data
  },

  // Récupérer une catégorie par ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`)
    return response.data
  },
}

export default CategoryService