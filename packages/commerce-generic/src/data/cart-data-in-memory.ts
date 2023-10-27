import products from './products.json'
import { Cart, CartItem } from '@composable/types'
import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

const findProductById = (id: string) => {
  return products.find((product) => product.id === id) ?? products[0]
}

const storageFilePath = path.join(
  os.tmpdir(),
  'composable-ui-temp-cart-storage.json'
)

console.log({ storageFilePath })

const fileExist = async (filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch (e) {
    console.log(`[cartDataInMemory] File ${storageFilePath} does not exists`)
    return false
  }
}

const getMapFromFile = async () => {
  if (!(await fileExist(storageFilePath))) {
    return new Map<string, Cart>()
  }
  const buffer = await fs.readFile(storageFilePath)
  const map = new Map<string, Cart>(JSON.parse(buffer.toString()))
  console.log({ map })
  return map
}
const saveMapToFile = async (map: Map<string, Cart>) => {
  await fs.writeFile(storageFilePath, JSON.stringify(Array.from(map.entries())))
  return map
}

export const getCart = async (cartId: string): Promise<Cart | undefined> => {
  const cartsData = await getMapFromFile()
  return cartsData.get(cartId)
}

export const saveCart = async (cart: Cart) => {
  const cartsData = await getMapFromFile()
  cartsData.set(cart.id, cart)
  await saveMapToFile(cartsData)
  return cart
}

export const deleteCart = async (cartId: string) => {
  const cartsData = await getMapFromFile()
  const deleteResult = cartsData.delete(cartId)
  await saveMapToFile(cartsData)
  return deleteResult
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
