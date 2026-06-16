import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://senja-coffee-backend-production.up.railway.app'

const CATEGORIES = [
  { label: 'Kopi', value: 'kopi' },
  { label: 'Non Kopi', value: 'non-kopi' },
  { label: 'Makanan', value: 'makanan' },
]

const SUBCATEGORIES = {
  kopi: ['kopi-hitam', 'kopi-susu', 'kopi-dessert'],
  'non-kopi': ['latte-nonkopi', 'teh-susu', 'teh-buah', 'air-mineral'],
  makanan: ['makanan-berat', 'camilan-gurih', 'camilan-manis', 'pastry-manis'],
}

export default function AdminMenuForm({ editData = null }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')
  const isEdit = !!editData

  const [form, setForm] = useState({
    name: editData?.name || '',
    price: editData?.price || '',
    category: editData?.category || 'kopi',
    subcategory: editData?.subcategory || 'kopi-hitam',
    is_available: editData?.is_available ?? true,
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(editData?.image_url || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subcategory kalau category berubah
      ...(name === 'category' && { subcategory: SUBCATEGORIES[value][0] })
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file) => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    )

    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage
      .from('menu-images')
      .upload(fileName, file, { upsert: true })

    if (error) throw new Error(error.message)

    const { data } = supabase.storage
      .from('menu-images')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let image_url = editData?.image_url || ''

      // Upload gambar baru kalau ada
      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

      const payload = { ...form, price: Number(form.price), image_url }
      const url = isEdit
        ? `${API_URL}/api/menus/${editData.id}`
        : `${API_URL}/api/menus`

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-playfair">
          {isEdit ? 'Edit Menu' : 'Tambah Menu Baru'}
        </h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-amber-700 hover:bg-amber-600 px-4 py-1 rounded-lg text-sm transition"
        >
          ← Kembali
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow p-6">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Nama Menu</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="contoh: Kopi Susu Gula Aren"
                required
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Harga (Rp)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="contoh: 25000"
                required
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Kategori</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Subkategori */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Subkategori</label>
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {SUBCATEGORIES[form.category].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Gambar Menu</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 text-sm"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border border-amber-200"
                />
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_available"
                id="is_available"
                checked={form.is_available}
                onChange={handleChange}
                className="w-4 h-4 accent-amber-700"
              />
              <label htmlFor="is_available" className="text-sm font-medium text-amber-900">
                Menu tersedia
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Menu'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}