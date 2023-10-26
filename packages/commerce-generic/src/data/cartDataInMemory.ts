import products from './products.json'
import { Cart, CartItem } from '@composable/types'
import { randomUUID } from 'crypto'

const findProductById = (id: string) => {
  return products.find((product) => product.id === id) ?? products[0]
}

// In memory storage for carts data
const cartsData: Map<string, Cart> = new Map()

export const getCart = (cartId: string): Cart | undefined => {
  return cartsData.get(cartId)
}

export const saveCart = (cart: Cart) => {
  cartsData.set(cart.id, cart)
  return cart
}

export const deleteCart = (cartId: string) => {
  return cartsData.delete(cartId)
}

export const generateEmptyCart = (cartId?: string): Cart => ({
  id: cartId || randomUUID(),
  items: [],
  summary: {},
})

export const generateCartItem = (productId: string, quantity: number) => {
  const _product = findProductById(productId)
  return {
    brand: _product.brand,
    category: _product.category,
    id: _product.id,
    image: _product.images[0],
    name: _product.name,
    price: _product.price,
    quantity: quantity ?? 1,
    sku: _product.sku,
    slug: _product.slug,
    type: _product.type,
  }
}

export const calculateCartSummary = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce((_subtotal, item) => {
    return _subtotal + item.price * (item.quantity ?? 1)
  }, 0)
  const taxes = subtotal * 0.07
  const total = subtotal + taxes

  return {
    subtotalPrice: subtotal.toFixed(2),
    taxes: taxes.toFixed(2),
    totalPrice: total.toFixed(2),
    shipping: 'Free',
  }
}
