import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import logo from '../assets/logo.png'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
        <nav className="bg-amber-900 text-white px-8 py-4 sticky top-0 z-40 shadow-md">
        <div className="flex justify-between items-center">

        {/* Logo + Brand Name */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Senja Coffee & Co Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Senja Coffee & Co.</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {/* Ikon Keranjang - Desktop */}
          <Link to="/cart" className="relative">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger + Keranjang - Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar