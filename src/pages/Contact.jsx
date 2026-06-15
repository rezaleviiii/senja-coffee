import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import igIcon from '../assets/ig.png'
import fbIcon from '../assets/fb.png'
import { Helmet } from 'react-helmet-async'


function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('https://formspree.io/f/xykalpbn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (response.ok) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
    setLoading(false)
  }

  return (
    <div className="px-8 py-16 max-w-5xl mx-auto">
      <Helmet>
        <title>Hubungi Kami | Senja Coffee & Co.</title>
        <meta name="description" content="Hubungi Senja Coffee & Co. untuk reservasi, kerjasama, atau kritik dan saran. Kami siap membantu!" />
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-12">Hubungi Kami</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Kiri: Info Kontak */}
        <div>
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Informasi Kontak</h2>

          <div className="flex items-start gap-4 mb-4">
            <MapPin className="text-amber-700 mt-1" />
            <p className="text-gray-700">Jl. Senja Indah No. 12, Cikarang, Jawa Barat</p>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <Phone className="text-amber-700 mt-1" />
            <p className="text-gray-700">0812-3456-7890</p>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <Mail className="text-amber-700 mt-1" />
            <p className="text-gray-700">hello@senjacoffee.co</p>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Clock className="text-amber-700 mt-1" />
            <div className="text-gray-700">
              <p>Senin - Jumat: 08.00 - 22.00</p>
              <p>Sabtu - Minggu: 09.00 - 23.00</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-3">Sosial Media</p>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/senja_coffee.co" target="_blank" className="flex items-center gap-3 text-gray-700 hover:text-amber-700 transition">
                <img src={igIcon} alt="Instagram" className="w-8 h-8" />
                <span>@senja_coffee.co</span>
              </a>
              <a href="https://facebook.com/senja_coffee.co" target="_blank" className="flex items-center gap-3 text-gray-700 hover:text-amber-700 transition">
                <img src={fbIcon} alt="Facebook" className="w-8 h-8" />
                <span>@senja_coffee.co</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden h-64 shadow-md">
            <iframe
              title="Lokasi Senja Coffee Co."
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d107.1!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCikarang!5e0!3m2!1sen!2sid!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Kanan: Form Kritik & Saran */}
        <div>
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Kritik & Saran</h2>
          <p className="text-gray-500 mb-6">Kami senang mendengar masukan dari kamu untuk terus berkembang.</p>

          {/* Notifikasi sukses */}
          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
              <span>✅</span>
              <span>Pesan berhasil terkirim! Kami akan segera menghubungimu.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Masukkan nama kamu"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="contoh@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Topik</label>
              <select
                name="topic"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-700"
              >
                <option>Kritik & Saran</option>
                <option>Pertanyaan Umum</option>
                <option>Reservasi / Booking Tempat</option>
                <option>Kerjasama / Partnership</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tulis pesanmu di sini..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact