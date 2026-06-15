import { useState } from 'react'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext'

// Daftar tambahan harga untuk opsi-opsi tertentu (dalam Rupiah)
const ADDON_PRICES = {
  'Oat Milk (+Rp5.000)': 5000,
  'Almond Milk (+Rp5.000)': 5000,
  'Extra Shot Espresso': 5000,
  'Whipped Cream': 5000,
  'Caramel Drizzle': 5000,
  'Extra Powder Topping': 3000,
  'Boba': 5000,
  'Egg Pudding': 5000,
  'Grass Jelly': 5000,
  'Extra Lychee Fruit (+2 pcs)': 5000,
  'Extra Cheese Slice': 5000,
  'Extra Egg': 5000,
  'Extra Patty/Beef Bacon': 10000,
  'Extra Dipping Sauce (Cheese/BBQ Sauce)': 5000,
  'Add 1 Scoop Vanilla Ice Cream (+Rp8.000)': 8000,
  'Parutan Keju': 3000,
  'Biskuit Crumble': 3000,
}

function MenuModal({ item, onClose, isEditMode = false, onSave }) {
  const { addToCart } = useCart()
  const [selections, setSelections] = useState({})
  const [multi, setMulti] = useState({})

  function select(key, value) {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  function toggleMulti(key, value) {
    setMulti((prev) => {
      const current = prev[key] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [key]: updated }
    })
  }

  const sub = item.subcategory
  const suhu = selections.suhu ?? 'Hot'
  const chosenOptions = [...Object.values(selections), ...Object.values(multi).flat()]
  const addOnTotal = chosenOptions.reduce((sum, opt) => sum + (ADDON_PRICES[opt] || 0), 0)
  const totalPrice = item.price + addOnTotal

  function handleAddToCart() {
    const cartItem = {
      name: item.name,
      basePrice: item.price,
      totalPrice,
      options: chosenOptions.filter(Boolean),
    }
    if (isEditMode && onSave) {
      onSave(cartItem)
    } else {
      addToCart(cartItem)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 bg-white rounded-full p-1 shadow z-10">
          <X size={20} />
        </button>

        <img
          src={item.image || `https://placehold.co/500x300/3b2417/ffffff?text=${encodeURIComponent(item.name)}`}
          alt={item.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-1">{item.name}</h2>
          <p className="text-amber-700 font-semibold mb-4">Rp {item.price.toLocaleString('id-ID')}</p>
          <p className="text-gray-600 text-sm mb-6">
            {item.description || 'Menu favorit di Senja Coffee & Co, dibuat dengan bahan pilihan terbaik untuk menemani harimu.'}
          </p>

          {/* KOPI SUSU & BERASA */}
          {sub === 'kopi-susu' && (
            <>
              <OptionGroup label="Suhu" options={['Hot', 'Iced']} selected={suhu} onSelect={(v) => select('suhu', v)} />
              <OptionGroup label="Level Gula / Sirup" options={['Less Sugar (50%)', 'Normal (100%)', 'Extra Sugar (130%)']} selected={selections.gula ?? 'Normal (100%)'} onSelect={(v) => select('gula', v)} />
              {suhu === 'Iced' && (
                <OptionGroup label="Level Es" options={['No Ice', 'Less Ice', 'Normal Ice']} selected={selections.levelEs ?? 'Normal Ice'} onSelect={(v) => select('levelEs', v)} />
              )}
              <CheckboxGroup label="Ekstra (Opsional)" options={['Extra Shot Espresso', 'Whipped Cream', 'Caramel Drizzle']} selected={multi.extras ?? []} onToggle={(v) => toggleMulti('extras', v)} />
            </>
          )}

          {/* KOPI HITAM & KLASIK */}
          {sub === 'kopi-hitam' && (
            <>
              <OptionGroup label="Suhu" options={['Hot', 'Iced']} selected={suhu} onSelect={(v) => select('suhu', v)} />
              <OptionGroup label="Level Gula" options={['No Sugar (Default)', 'Add Liquid Sugar (Separated)']} selected={selections.gula ?? 'No Sugar (Default)'} onSelect={(v) => select('gula', v)} />
            </>
          )}

          {/* LATTE NON-KOPI */}
          {sub === 'latte-nonkopi' && (
            <>
              <OptionGroup label="Suhu" options={['Hot', 'Iced']} selected={suhu} onSelect={(v) => select('suhu', v)} />
              <OptionGroup label="Level Manis" options={['Less Sugar', 'Normal', 'Extra Sugar']} selected={selections.manis ?? 'Normal'} onSelect={(v) => select('manis', v)} />
              {suhu === 'Iced' && (
                <OptionGroup label="Level Es" options={['No Ice', 'Less Ice', 'Normal Ice']} selected={selections.levelEs ?? 'Normal Ice'} onSelect={(v) => select('levelEs', v)} />
              )}
              <OptionGroup label="Substitusi Susu" options={['Regular Milk', 'Oat Milk (+Rp5.000)']} selected={selections.susu ?? 'Regular Milk'} onSelect={(v) => select('susu', v)} />
              <CheckboxGroup label="Topping" options={['Whipped Cream', 'Extra Powder Topping']} selected={multi.topping ?? []} onToggle={(v) => toggleMulti('topping', v)} />
            </>
          )}

          {/* TEH SUSU */}
          {sub === 'teh-susu' && (
            <>
              <OptionGroup label="Suhu" options={['Hot', 'Iced']} selected={suhu} onSelect={(v) => select('suhu', v)} />
              <OptionGroup label="Level Manis" options={['Less Sugar', 'Normal', 'Extra Sugar']} selected={selections.manis ?? 'Normal'} onSelect={(v) => select('manis', v)} />
              {suhu === 'Iced' && (
                <OptionGroup label="Level Es" options={['No Ice', 'Less Ice', 'Normal Ice']} selected={selections.levelEs ?? 'Normal Ice'} onSelect={(v) => select('levelEs', v)} />
              )}
              <CheckboxGroup label="Ekstra Topping (Chewy)" options={['Boba', 'Egg Pudding', 'Grass Jelly']} selected={multi.chewy ?? []} onToggle={(v) => toggleMulti('chewy', v)} />
            </>
          )}

          {/* TEH BUAH & MINUMAN SEGAR */}
          {sub === 'teh-buah' && (
            <>
              {item.name === 'Lemon Tea' && (
                <OptionGroup label="Suhu" options={['Hot', 'Iced']} selected={selections.suhu ?? 'Iced'} onSelect={(v) => select('suhu', v)} />
              )}
              <OptionGroup label="Level Manis" options={['Less Sugar', 'Normal', 'Extra Sugar']} selected={selections.manis ?? 'Normal'} onSelect={(v) => select('manis', v)} />
              <OptionGroup label="Level Es" options={['Less Ice', 'Normal Ice']} selected={selections.levelEs ?? 'Normal Ice'} onSelect={(v) => select('levelEs', v)} />
              {item.name === 'Lychee Tea' && (
                <CheckboxGroup label="Ekstra Buah" options={['Extra Lychee Fruit (+2 pcs)']} selected={multi.ekstraBuah ?? []} onToggle={(v) => toggleMulti('ekstraBuah', v)} />
              )}
              {item.name === 'Lemon Tea' && (
                <CheckboxGroup label="Ekstra Buah" options={['Extra Slice Lemon']} selected={multi.ekstraBuah ?? []} onToggle={(v) => toggleMulti('ekstraBuah', v)} />
              )}
            </>
          )}

          {/* AIR MINERAL */}
          {sub === 'air-mineral' && (
            <OptionGroup label="Suhu Penyimpanan" options={['Cold (Kulkas)', 'Normal (Suhu Ruangan)']} selected={selections.suhuSimpan ?? 'Cold (Kulkas)'} onSelect={(v) => select('suhuSimpan', v)} />
          )}

          {/* MAKANAN BERAT */}
          {sub === 'makanan-berat' && (
            <>
              <OptionGroup label="Tingkat Kepedasan" options={['Tidak Pedas', 'Sedang', 'Pedas']} selected={selections.pedas ?? 'Tidak Pedas'} onSelect={(v) => select('pedas', v)} />
              {item.name === 'Nasi Goreng' && (
                <OptionGroup label="Opsi Telur" options={['Ceplok Setengah Matang', 'Ceplok Matang', 'Dadar']} selected={selections.telur ?? 'Ceplok Setengah Matang'} onSelect={(v) => select('telur', v)} />
              )}
              <CheckboxGroup label="Kustomisasi Komponen" options={['Tanpa Bawang', 'Tanpa Sayur']} selected={multi.komponen ?? []} onToggle={(v) => toggleMulti('komponen', v)} />
              <CheckboxGroup label="Ekstra / Add-on" options={['Extra Cheese Slice', 'Extra Egg', 'Extra Patty/Beef Bacon']} selected={multi.ekstraBerat ?? []} onToggle={(v) => toggleMulti('ekstraBerat', v)} />
            </>
          )}

          {/* CAMILAN GURIH */}
          {sub === 'camilan-gurih' && (
            <>
              {item.name === 'French Fries' && (
                <OptionGroup label="Pilihan Bumbu" options={['Original (Asin)', 'BBQ', 'Cheese Powder']} selected={selections.bumbu ?? 'Original (Asin)'} onSelect={(v) => select('bumbu', v)} />
              )}
              <CheckboxGroup label="Pilihan Saus" options={['Saus Sambal', 'Saus Tomat', 'Mayones']} selected={multi.saus ?? []} onToggle={(v) => toggleMulti('saus', v)} />
              <CheckboxGroup label="Ekstra / Add-on" options={['Extra Dipping Sauce (Cheese/BBQ Sauce)']} selected={multi.ekstraGurih ?? []} onToggle={(v) => toggleMulti('ekstraGurih', v)} />
            </>
          )}

          {/* PASTRY & DESSERT MANIS */}
          {sub === 'pastry-manis' && (
            <>
              <OptionGroup
                label="Instruksi Penyajian"
                options={['Dihangatkan (Warm)', 'Suhu Ruang / Dingin']}
                selected={selections.penyajian ?? (item.name === 'Croissant' || item.name === 'Banana Bread' ? 'Dihangatkan (Warm)' : 'Suhu Ruang / Dingin')}
                onSelect={(v) => select('penyajian', v)}
              />
              <CheckboxGroup label="Ekstra / Add-on" options={['Add 1 Scoop Vanilla Ice Cream (+Rp8.000)']} selected={multi.ekstraPastry ?? []} onToggle={(v) => toggleMulti('ekstraPastry', v)} />
            </>
          )}

          {/* CAMILAN MANIS GORENG/PANGGANG */}
          {sub === 'camilan-manis' && (
            <>
              {item.name === 'Donut' && (
                <OptionGroup label="Varian Rasa" options={['Cokelat Meses', 'Keju', 'Gula Halus']} selected={selections.varianRasa ?? 'Cokelat Meses'} onSelect={(v) => select('varianRasa', v)} />
              )}
              <OptionGroup label="Pilihan Sirup/Saus" options={['Madu', 'Maple Syrup', 'Saus Cokelat', 'Susu Kental Manis']} selected={selections.sirup ?? 'Madu'} onSelect={(v) => select('sirup', v)} />
              <CheckboxGroup label="Ekstra Topping" options={['Parutan Keju', 'Biskuit Crumble']} selected={multi.toppingManis ?? []} onToggle={(v) => toggleMulti('toppingManis', v)} />
            </>
          )}

            <button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition"
          >
            {isEditMode ? 'Simpan Perubahan' : `Tambah ke Keranjang — Rp ${totalPrice.toLocaleString('id-ID')}`}
          </button>        
        </div>
      </div>
    </div>
  )
}

function OptionGroup({ label, options, selected, onSelect }) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              selected === opt
                ? 'bg-amber-700 text-white border-amber-700'
                : 'border-gray-300 text-gray-700 hover:border-amber-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxGroup({ label, options, selected, onToggle }) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              selected.includes(opt)
                ? 'bg-amber-700 text-white border-amber-700'
                : 'border-gray-300 text-gray-700 hover:border-amber-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MenuModal