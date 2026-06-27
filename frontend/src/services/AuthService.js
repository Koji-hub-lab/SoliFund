import axiosInstance from '../utils/axiosConfig'

const AuthService = {

  // Inscription
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  },

  // Connexion
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials)
    // Stocker le token JWT dans localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Vérifier si connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  // Récupérer le profil depuis l'API
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile')
    return response.data
  },
}

export default AuthService
