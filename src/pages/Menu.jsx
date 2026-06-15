import AnimatedSection from '../components/AnimatedSection'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { coffeeMenu, nonCoffeeMenu, foodMenu } from '../data/menuData'
import MenuCard from '../components/MenuCard'
import MenuModal from '../components/MenuModal'
import { Helmet } from 'react-helmet-async'



const categories = [
  { key: 'semua', label: 'Semua' },
  { key: 'kopi', label: 'Kopi' },
  { key: 'nonkopi', label: 'Non-Kopi' },
  { key: 'makanan', label: 'Makanan' },
]

function Menu() {
  const location = useLocation()
  const [selectedItem, setSelectedItem] = useState(() => location.state?.openItem || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')
  const [sortOrder, setSortOrder] = useState('')

  const allMenu = [
    ...coffeeMenu.map((item) => ({ ...item, category: 'kopi', uid: `kopi-${item.id}` })),
    ...nonCoffeeMenu.map((item) => ({ ...item, category: 'nonkopi', uid: `nonkopi-${item.id}` })),
    ...foodMenu.map((item) => ({ ...item, category: 'makanan', uid: `makanan-${item.id}` })),
  ]

  let displayedMenu = activeCategory === 'semua'
  ? allMenu
  : allMenu.filter((item) => item.category === activeCategory)

// Filter berdasarkan search
if (searchQuery.trim() !== '') {
  displayedMenu = displayedMenu.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
}
  if (sortOrder === 'asc') {
    displayedMenu = [...displayedMenu].sort((a, b) => a.price - b.price)
  } else if (sortOrder === 'desc') {
    displayedMenu = [...displayedMenu].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="px-8 py-16 max-w-6xl mx-auto">
      <Helmet>
        <title>Menu Kami | Senja Coffee & Co.</title>
        <meta name="description" content="..." />
      </Helmet>

      <AnimatedSection direction="up">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-10">Menu Kami</h1>
      </AnimatedSection>  

      <AnimatedSection direction="up" delay={0.1}>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeCategory === cat.key
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
{/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu..."
            className="w-full border border-gray-300 rounded-full px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>   
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.3}>
      <div className="flex justify-center mb-12">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700"
        >
          <option value="">Urutkan Harga</option>
          <option value="asc">Termurah ke Termahal</option>
          <option value="desc">Termahal ke Termurah</option>
        </select>
      </div>
      </AnimatedSection>

      {displayedMenu.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-2xl mb-2">☕</p>
          <p className="font-semibold">Menu "{searchQuery}" tidak ditemukan</p>
          <p className="text-sm mt-1">Coba kata kunci lain atau pilih kategori berbeda</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedMenu.map((item) => (
            <MenuCard
              key={item.uid}
              name={item.name}
              price={item.price}
              image={item.image}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}
      {selectedItem && (
        <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}

export default Menu