'use client'

import { CartProvider } from './cart/CartProvider'

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>
}
