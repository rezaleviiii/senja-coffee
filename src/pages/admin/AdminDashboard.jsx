import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://senja-coffee-backend-production.up.railway.app'

export default function AdminDashboard() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  // Kalau tidak ada token, redirect ke login
  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/menus`)
      const data = await res.json()
      setMenus(data)
    } catch (err) {
      console.error('Gagal fetch menu:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus menu ini?')) return
    try {
      await fetch(`${API_URL}/api/menus/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMenus()
    } catch (err) {
      console.error('Gagal hapus:', err)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-playfair">Senja Coffee — Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-amber-700 hover:bg-amber-600 px-4 py-1 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <p className="text-amber-700 text-sm">Total Menu</p>
          <p className="text-4xl font-bold text-amber-900">{menus.length}</p>
        </div>

        {/* Tombol Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-amber-900">Daftar Menu</h2>
          <button
            onClick={() => navigate('/admin/menu/tambah')}
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition text-sm"
          >
            + Tambah Menu
          </button>
        </div>

        {/* Tabel Menu */}
        {loading ? (
          <p className="text-amber-700">Memuat data...</p>
        ) : menus.length === 0 ? (
          <p className="text-amber-700">Belum ada menu. Tambahkan menu pertama!</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-amber-100 text-amber-900">
                <tr>
                  <th className="px-4 py-3 text-left">Gambar</th>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Harga</th>
                  <th className="px-4 py-3 text-left">Kategori</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu) => (
                  <tr key={menu.id} className="border-t border-amber-50 hover:bg-amber-50">
                    <td className="px-4 py-3">
                      <img
                        src={menu.image_url}
                        alt={menu.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-amber-900">{menu.name}</td>
                    <td className="px-4 py-3 text-amber-700">
                      Rp {menu.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-amber-700">{menu.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        menu.is_available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {menu.is_available ? 'Tersedia' : 'Habis'}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => navigate(`/admin/menu/edit/${menu.id}`)}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-xs hover:bg-amber-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs hover:bg-red-200 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}