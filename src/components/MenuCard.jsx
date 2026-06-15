function MenuCard({ name, price, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          src={image || `https://placehold.co/400x300/3b2417/ffffff?text=${encodeURIComponent(name)}`}
          alt={name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">Rp {price.toLocaleString('id-ID')}</p>
      </div>
    </div>
  )
}

export default MenuCard