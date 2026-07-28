import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import FundraisingsPage from './pages/FundraisingsPage'

// Route protégée — redirige vers /login si non connecté
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

// Layout avec Navbar et Footer
const Layout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      {children}
    </main>
    <Footer />
  </div>
)

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques sans Navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes avec Navbar et Footer */}
      <Route path="/" element={
        <Layout>
          <HomePage />
        </Layout>
      } />

      <Route path="/categories" element={
        <Layout>
          <CategoriesPage />
        </Layout>
      } />

      <Route path="/fundraisings" element={
        <Layout>
          <FundraisingsPage />
        </Layout>
      } />

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App