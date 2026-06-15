import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(item) {
    setCart((prev) => {
      // Cek apakah item dengan opsi yang sama sudah ada
      const existingIndex = prev.findIndex(
        (i) => i.name === item.name && JSON.stringify(i.options) === JSON.stringify(item.options)
      )
      if (existingIndex !== -1) {
        // Kalau sudah ada, tambah quantity-nya
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }
      // Kalau belum ada, tambah sebagai item baru dengan quantity 1
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  function updateQuantity(index, delta) {
    setCart((prev) => {
      const updated = [...prev]
      const newQty = updated[index].quantity + delta
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index)
      }
      updated[index] = { ...updated[index], quantity: newQty }
      return updated
    })
  }

  function updateItem(index, newItemData) {
    setCart((prev) => {
      const updated = [...prev]
      updated[index] = { ...newItemData, quantity: updated[index].quantity }
      return updated
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateItem }}>
      {children}
    </CartContext.Provider>
  )

  function clearCart() {
  setCart([])
  }

  return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateItem, clearCart }}>
    {children}
  </CartContext.Provider>
  )
}


export function useCart() {
  return useContext(CartContext)
}