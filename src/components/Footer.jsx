import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import logo from '../assets/logo.WebP'
import igIcon from '../assets/ig.WebP'
import fbIcon from '../assets/fb.WebP'

function Footer() {
  return (
    <footer className="bg-amber-950 text-white">

      {/* Main Footer */}
      <div className="px-8 py-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Kolom 1: Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Senja Coffee & Co" className="w-10 h-10" />
            <h3 className="text-lg font-bold">Senja Coffee & Co.</h3>
          </div>
          <p className="text-amber-300 text-sm leading-relaxed">
            Tempat ngopi santai dengan suasana hangat, kopi berkualitas, dan senja yang selalu indah.
          </p>
          {/* Sosmed */}
          <div className="flex gap-3 mt-4">
            <a href="https://instagram.com/senja_coffee.co" target="_blank" className="hover:opacity-75 transition">
              <img src={igIcon} alt="Instagram" className="w-7 h-7" />
            </a>
            <a href="https://facebook.com/senja_coffee.co" target="_blank" className="hover:opacity-75 transition">
              <img src={fbIcon} alt="Facebook" className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h4 className="font-bold text-amber-300 mb-4 uppercase text-sm tracking-wide">Navigasi</h4>
          <div className="flex flex-col gap-2 text-sm text-amber-100">
            <Link to="/" className="hover:text-amber-300 transition">Home</Link>
            <Link to="/menu" className="hover:text-amber-300 transition">Menu</Link>
            <Link to="/about" className="hover:text-amber-300 transition">Tentang Kami</Link>
            <Link to="/contact" className="hover:text-amber-300 transition">Hubungi Kami</Link>
            <Link to="/cart" className="hover:text-amber-300 transition">Keranjang</Link>
          </div>
        </div>

        {/* Kolom 3: Jam Operasional */}
        <div>
          <h4 className="font-bold text-amber-300 mb-4 uppercase text-sm tracking-wide">Jam Buka</h4>
          <div className="flex flex-col gap-2 text-sm text-amber-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p>Senin - Jumat</p>
                <p className="text-amber-300">08.00 - 22.00</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p>Sabtu - Minggu</p>
                <p className="text-amber-300">09.00 - 23.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 4: Kontak */}
        <div>
          <h4 className="font-bold text-amber-300 mb-4 uppercase text-sm tracking-wide">Kontak</h4>
          <div className="flex flex-col gap-3 text-sm text-amber-100">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>Jl. Senja Indah No. 12, Cikarang, Jawa Barat</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <p>0812-3456-7890</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <p>hello@senjacoffee.co</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-900 px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-amber-400">
          <p>© 2026 Senja Coffee & Co. All rights reserved.</p>
          <p>Made with ☕ in Cikarang, Jawa Barat</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer