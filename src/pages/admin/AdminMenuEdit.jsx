import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminMenuForm from './AdminMenuForm'

const API_URL = 'https://senja-coffee-backend-production.up.railway.app'

export default function AdminMenuEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_URL}/api/menus/${id}`)
        const data = await res.json()
        setMenuData(data)
      } catch (err) {
        console.error('Gagal fetch menu:', err)
        navigate('/admin/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <p className="text-amber-700">Memuat data menu...</p>
    </div>
  )

  return <AdminMenuForm editData={menuData} />
}