import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMenuForm from './pages/admin/AdminMenuForm'
import AdminMenuEdit from './pages/admin/AdminMenuEdit'

function App() {
  const location = useLocation()

  return (
    <>
      <LoadingScreen />
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/menu/tambah" element={<AdminMenuForm />} />
          <Route path="/admin/menu/edit/:id" element={<AdminMenuEdit />} /> 
        </Routes>
      </AnimatePresence>
      {!location.pathname.startsWith('/admin') && <Footer />}
    </>
  )
}
export default App