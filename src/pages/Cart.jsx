import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Trash2, ShoppingCart, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import MenuModal from '../components/MenuModal'
import { coffeeMenu, nonCoffeeMenu, foodMenu } from '../data/menuData'
import { Helmet } from 'react-helmet-async'


const allMenuData = [
  ...coffeeMenu.map((i) => ({ ...i, category: 'kopi' })),
  ...nonCoffeeMenu.map((i) => ({ ...i, category: 'nonkopi' })),
  ...foodMenu.map((i) => ({ ...i, category: 'makanan' })),
]

function Cart() {
  const { cart, removeFromCart, updateQuantity, updateItem } = useCart()
  const [editingIndex, setEditingIndex] = useState(null)

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)

  function handleEditSave(newItemData) {
    updateItem(editingIndex, newItemData)
    setEditingIndex(null)
  }

  const editingCartItem = editingIndex !== null ? cart[editingIndex] : null
  const editingMenuData = editingCartItem
    ? allMenuData.find((m) => m.name === editingCartItem.name)
    : null

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Helmet>
          <title>Keranjang Pesanan | Senja Coffee & Co.</title>
        </Helmet>
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-400 mb-2">Keranjang Kosong</h2>
        <p className="text-gray-400 mb-6">Belum ada item yang ditambahkan ke keranjang.</p>
        <Link to="/menu" className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition">
          Lihat Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-900 mb-10">Keranjang Pesanan</h1>

      <div className="flex flex-col gap-4 mb-8">
        {cart.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-amber-900">{item.name}</h3>

                {item.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.options.map((opt, i) => (
                      <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                        {opt}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2 text-sm text-gray-500">
                  Harga satuan: Rp {item.totalPrice.toLocaleString('id-ID')}
                  {item.totalPrice !== item.basePrice && (
                    <span className="ml-2 text-amber-600 text-xs">
                      (termasuk add-on Rp {(item.totalPrice - item.basePrice).toLocaleString('id-ID')})
                    </span>
                  )}
                </div>
              </div>

              {/* Tombol Edit & Hapus */}
              <div className="flex gap-2">
                <button onClick={() => setEditingIndex(index)} className="text-amber-600 hover:text-amber-800 transition">
                  <Pencil size={18} />
                </button>
                <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-600 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Quantity + Subtotal */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-amber-50 transition font-bold"
                >
                  −
                </button>
                <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, +1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-amber-50 transition font-bold"
                >
                  +
                </button>
              </div>
              <p className="font-bold text-amber-900">
                Rp {(item.totalPrice * item.quantity).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan Total */}
      <div className="bg-amber-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-2 text-gray-600">
          <span>Jumlah Item</span>
          <span>{cart.reduce((sum, i) => sum + i.quantity, 0)} item</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold text-amber-900 border-t border-amber-200 pt-4 mt-2">
          <span>Total Pesanan</span>
          <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 rounded-lg text-center text-lg transition"
      >
        Lanjut ke Konfirmasi Pesanan →
      </Link>

      {/* Modal Edit */}
      {editingMenuData && (
        <MenuModal
          item={editingMenuData}
          onClose={() => setEditingIndex(null)}
          onSave={handleEditSave}
          isEditMode={true}
          initialSelections={editingCartItem.options}
        />
      )}
    </div>
  )
}

export default Cart