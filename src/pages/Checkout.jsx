import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { CheckCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

function formatStruk(order) {
  const line = '=========================='
  const dash = '------------------------------'

  const itemLines = order.items.map((item) => {
    const opsiLine = item.options.length > 0
      ? `   [${item.options.join(', ')}]\n`
      : ''
    return `${item.qty}x ${item.name}\n${opsiLine}   Rp ${item.subtotal.toLocaleString('id-ID')}`
  }).join('\n\n')

  return `${line}
     SENJA COFFEE & CO
${line}
Order ID : ${order.id}
Nama     : ${order.nama}
Waktu    : ${order.waktu}
${dash}
${itemLines}
${dash}
TOTAL    : Rp ${order.total.toLocaleString('id-ID')}
${line}
Tunjukkan ke kasir untuk
proses pesanan. Terima kasih!`
}

function Checkout() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const [nama, setNama] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [savedOrder, setSavedOrder] = useState(null) // ← simpan snapshot pesanan

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)

  function handleKonfirmasi() {
    const id = 'SCJ-' + Date.now().toString().slice(-6)

    // Simpan snapshot pesanan SEBELUM cart dikosongkan
    setSavedOrder({
      id,
      nama: nama || 'Pelanggan',
      items: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        options: item.options,
        subtotal: item.totalPrice * item.quantity,
      })),
      total: grandTotal,
      waktu: new Date().toLocaleString('id-ID'),
    })

    setOrderId(id)
    setShowConfirm(false)
    setShowQR(true)
    clearCart() // Baru dikosongkan setelah snapshot disimpan
  }

  if (cart.length === 0 && !showQR) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Helmet>
          <title>Konfirmasi Pesanan | Senja Coffee & Co.</title>
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Keranjang kosong</h2>
        <Link to="/menu" className="bg-amber-700 text-white px-6 py-3 rounded-full">
          Kembali ke Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-16 max-w-2xl mx-auto">

      {/* Tampilan QR Code */}
      {showQR && savedOrder ? (
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Pesanan Dikonfirmasi!</h1>
          <p className="text-gray-600 mb-2">Tunjukkan QR Code ini ke kasir</p>
          <p className="text-amber-700 font-semibold mb-8">Order ID: {savedOrder.id}</p>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
              <QRCodeSVG
                value={formatStruk(savedOrder)}
                size={220}
                bgColor="#ffffff"
                fgColor="#78350f"
                level="M"
              />
              <p className="text-center text-sm text-gray-500 mt-3 font-medium">{savedOrder.id}</p>
            </div>
          </div>

          {/* Ringkasan dari savedOrder, bukan dari cart */}
          <div className="bg-amber-50 rounded-lg p-6 text-left mb-8">
            <h3 className="font-bold text-amber-900 mb-3">
              Pesanan atas nama: {savedOrder.nama}
            </h3>
            {savedOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{item.name} x{item.qty}</span>
                <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="border-t border-amber-200 mt-3 pt-3 flex justify-between font-bold text-amber-900">
              <span>Total</span>
              <span>Rp {savedOrder.total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Setelah pembayaran selesai di kasir, pesananmu akan segera diproses. Terima kasih! ☕
          </p>

          <button
            onClick={() => {
              navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Kembali ke Beranda
          </button>
        </div>

      ) : (
        <>
          <h1 className="text-4xl font-bold text-amber-900 mb-8">Konfirmasi Pesanan</h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Nama Pemesan <span className="text-gray-400 text-sm font-normal">(opsional, untuk dipanggil kasir)</span>
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Reza"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y mb-6">
            {cart.map((item, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-amber-900">{item.name} <span className="text-gray-500 font-normal">x{item.quantity}</span></p>
                    {item.options.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.options.map((opt, i) => (
                          <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-700">
                    Rp {(item.totalPrice * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between text-xl font-bold text-amber-900">
              <span>Total Pembayaran</span>
              <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">* Pembayaran dilakukan langsung di kasir</p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/cart"
              className="flex-1 border border-amber-700 text-amber-700 font-semibold py-3 rounded-lg text-center hover:bg-amber-50 transition"
            >
              ← Kembali ke Keranjang
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition"
            >
              Konfirmasi Pesanan
            </button>
          </div>
        </>
      )}

      {/* Popup Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Pesanan Sudah Benar?</h2>
            <p className="text-gray-600 mb-6">
              Pastikan semua item dan opsi pesananmu sudah sesuai sebelum dikonfirmasi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Cek Lagi
              </button>
              <button
                onClick={handleKonfirmasi}
                className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition"
              >
                Ya, Konfirmasi!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout