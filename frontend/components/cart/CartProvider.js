'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const saved = window.localStorage.getItem('buildmart-cart')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('buildmart-cart', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.quantity * Number(item.price || 0), 0)

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      addItem(product) {
        setItems((current) => {
          const existing = current.find((item) => item._id === product._id)
          if (existing) {
            return current.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          }
          return [...current, { ...product, quantity: 1 }]
        })
      },
      updateQuantity(id, quantity) {
        setItems((current) =>
          current
            .map((item) => (item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter(Boolean),
        )
      },
      removeItem(id) {
        setItems((current) => current.filter((item) => item._id !== id))
      },
      clearCart() {
        setItems([])
      },
    }),
    [items, subtotal, totalItems],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}
