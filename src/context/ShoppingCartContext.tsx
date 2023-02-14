import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"


type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
  price: number
  type: string
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  // increaseCartQuantity is equivalent to "add item to cart"
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

// Function to render our shopping cart and store functionality of items (adding to basket, removing from basket, quantity in basket, etc.)
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  // Open and close cart
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  // Included item price when adding to cart
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        let item1 = storeItems.find(item => item.id === id)
        // item1 can be undefined (hence errors in line 58), issue needs fixing but does not impede functionality
        return [...currItems, { id, quantity: 1, price: item1.price, type: item1.type }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            // If item is already in cart, then increase its quantity by 1
            return { ...item, quantity: item.quantity + 1, price: item.price, type: item.type }
          } else {
            return item
          }
        })
      }
    })
  }

  // Item decresed by Id only, nothing else required
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  // Item is deleted by Id only, nothing else required
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}